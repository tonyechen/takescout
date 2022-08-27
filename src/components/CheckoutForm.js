import {
    useStripe,
    useElements,
    PaymentElement,
} from '@stripe/react-stripe-js';
import { deliveryType, shoppingCart } from '../atom/cart';
import { useRecoilValue, useRecoilState } from 'recoil';
import {
    doc,
    getDoc,
    setDoc,
    serverTimestamp,
    collection,
    addDoc,
} from 'firebase/firestore';
import { db } from '../firebase';
import { userInfo, userUID } from '../atom/userInfo';
import { useNavigate } from 'react-router-dom';

const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();

    const user = useRecoilValue(userInfo);
    const [cart, setCart] = useRecoilState(shoppingCart);
    const uid = useRecoilValue(userUID);
    const type = useRecoilValue(deliveryType);

    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        // We don't want to let default form submission happen here,
        // which would refresh the page.
        event.preventDefault();

        if (!stripe || !elements) {
            // Stripe.js has not yet loaded.
            // Make sure to disable form submission until Stripe.js has loaded.
            return;
        }

        const result = await stripe
            .confirmPayment({
                //`Elements` instance that was used to create the Payment Element
                elements,
                confirmParams: {},
                redirect: 'if_required',
            })
            .then((res) => {
                if (!res.error) {
                    const userDocRef = doc(db, 'Users', uid);
                    addDoc(collection(userDocRef, 'orders'), {
                        orders: cart,
                        time: new Date(),
                        type: type,
                        isComplete: false,
                    }).then((res) => {
                        let organizedCart = new Map(); //organize by restaurant and minimize post requests
                        cart.forEach((item) => {
                            const oldList = organizedCart.get(
                                item.restaurant_name
                            )
                                ? organizedCart.get(item.restaurant_name)
                                : [];
                            organizedCart.set(item.restaurant_name, [
                                ...oldList,
                                {
                                    customer: `${user.first_name} ${user.last_name}`,
                                    orderDocRef: res.path,
                                    type: type,
                                    food: item,
                                },
                            ]);
                        });

                        const iterator = organizedCart.keys();
                        let restaurant = iterator.next().value;
                        while (restaurant) {
                            const newOrders = organizedCart.get(restaurant);
                            const restaurantDocRef = doc(
                                db,
                                newOrders[0].food.restaurantRef
                            );
                            addDoc(collection(restaurantDocRef, 'queue'), {
                                items: [...newOrders],
                                time: new Date(),
                                address: user.address,
                            })
                                .then((res) => {
                                    console.log(res);
                                })
                                .catch((err) => console.log(err.message));

                            restaurant = iterator.next().value;

                            if (!restaurant) {
                                navigate('/pairing');
                                setCart([]);
                            }
                        }
                    });
                }
            })
            .catch((err) => console.log(err.message));
    };

    return (
        <form onSubmit={handleSubmit}>
            <PaymentElement />
            <div className="">
                <button
                    disabled={!stripe}
                    className="bg-orange-400 py-2 rounded-2xl text-white w-[100%] mt-5"
                >
                    Confirm Payment
                </button>
            </div>
        </form>
    );
};

export default CheckoutForm;
