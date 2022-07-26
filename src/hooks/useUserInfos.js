import React, { useEffect } from 'react';
import { db } from '../firebase';
import { userInfo, userTypeState, userUID } from '../atom/userInfo';
import { useRecoilState, useRecoilValue } from 'recoil';
import { collection, doc, getDoc } from 'firebase/firestore';

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
                    setUserInfos(res.data());
                });
            }
        }
    }, [userID]);
};

export default useUserInfos;
