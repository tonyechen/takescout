import { doc, onSnapshot } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { userUID } from '../atom/userInfo';
import DelivererPairing from '../components/DelivererPairing';
import RecipientPairing from '../components/RecipientPairing';
import { db } from '../firebase';

const Pairing = () => {
    const uid = useRecoilValue(userUID);
    const orderID = useParams().id;

    const orderDocRef = doc(db, 'Users', uid, 'orders', orderID);

    const [data, setData] = useState({});

    useEffect(() => {
        onSnapshot(orderDocRef, (doc) => {
            setData(doc.data());
        });
    }, [orderID]);

    return (
        <div>
            <p>You are a: {data.type}</p>
            {data.type == 'recipient' ? (
              // recipient interface
                <div>
                    {data.deliverer || <p>Waiting for Deliverer...</p>}
                    {data.deliverer && <RecipientPairing data={data} />}
                </div>
            ) : (
              // deliverer interface
                <DelivererPairing data={data}/>
            )}
        </div>
    );
};

export default Pairing;
