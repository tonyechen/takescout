import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    getDocs,
    query,
    setDoc,
} from 'firebase/firestore';
import { orderBy } from 'lodash';
import React from 'react';
import { useState } from 'react';
import { userInfo, userUID } from '../atom/userInfo';
import { db } from '../firebase';
import { useRecoilValue } from 'recoil';

const DelivererPairing = ({ data, orderDocRef }) => {
    console.log(data);
    console.log(orderDocRef);

    const [recipientData, setRecipientData] = useState(null);
    const uid = useRecoilValue(userUID);
    const info = useRecoilValue(userInfo);

    if (data) {
        if (data.recipient) {
            if (!recipientData) {
                setRecipientData(data.recipient);
            }
        } else {
            const restaurantQueueRef = collection(
                db,
                data.orders[0].restaurantRef,
                'queue'
            );

            const restaurantOrdersRef = collection(
                db,
                data.orders[0].restaurantRef,
                'orders'
            );

            getDocs(restaurantQueueRef, query(orderBy('time', 'desc'))).then(
                (res) => {
                    // potential here to implement a better pairing system
                    console.log(res);
                    console.log(res.docs[0].data());
                    console.log(res.docs[0].id);

                    const recipientOrderDoc = res.docs[0];

                    if (!recipientData) {
                        // Delete Doc from the Queue of the Restaurant
                        deleteDoc(doc(restaurantQueueRef, recipientOrderDoc.id))
                            .then((res) => {
                                console.log('deleted the document');
                            })
                            .catch((err) => console.log(err.message));

                        // update the deliverer to pair up with a recipient
                        setDoc(
                            orderDocRef,
                            { recipient: recipientOrderDoc.data() },
                            { merge: true }
                        ).then((res) => {
                            console.log(
                                'update the deliverer to pair up with a recipient'
                            );
                        });

                        // let the recipient know their deliverer
                        console.log(
                            recipientOrderDoc.data().items[0].orderDocRef
                        );
                        setDoc(
                            doc(
                                db,
                                recipientOrderDoc.data().items[0].orderDocRef
                            ),
                            {
                                deliverer: data,
                                deliverer_name: `${info.first_name} ${info.last_name}`,
                            },
                            { merge: true }
                        ).then((res) => {
                            console.log(
                                'let the recipient know their deliverer'
                            );
                        });

                        addDoc(restaurantOrdersRef, recipientOrderDoc.data());
                        setRecipientData(res.docs[0].data());
                    }
                }
            );
        }
    }

    // pairing

    return (
        <div>
            {recipientData != null || (
                <div>Finding Orders You can Deliver...</div>
            )}
            {recipientData && (
                <div>
                    <div>Recipient:{data.recipient.items[0].customer}</div>
                    <div>Calculating Route</div>
                </div>
            )}
        </div>
    );
};

export default DelivererPairing;
