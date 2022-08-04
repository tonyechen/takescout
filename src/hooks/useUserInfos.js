import React, { useEffect } from 'react';
import { db } from '../firebase';
import { userInfo, userTypeState, userUID } from '../atom/userInfo';
import { useRecoilState, useRecoilValue } from 'recoil';
import { collection, doc, getDoc } from 'firebase/firestore';

// automatically fetch user's profile info
const useUserInfos = () => {
    const [userInfos, setUserInfos] = useRecoilState(userInfo);
    const userType = useRecoilValue(userTypeState);
    const userID = useRecoilValue(userUID);

    useEffect(() => {
        if (userID) {
            if (userType === 'user') {
                getDoc(doc(collection(db, 'Users'), userID)).then((res) => {
                    setUserInfos(res.data());
                });
            } else {
                getDoc(doc(collection(db, 'Partners'), userID)).then((res) => {
                    const data = res.data();

                    const partnerInfo = {
                        first_name: data.first_name,
                        last_name: data.last_name,
                        address: data.address,
                        email: data.email,
                        restaurant_name: data.restaurant_name,
                    };
                    
                    setUserInfos(partnerInfo);
                });
            }
        }
    }, [userID]);
};

export default useUserInfos;
