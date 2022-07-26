import { atom } from 'recoil';

export const userUID = atom({
    key: 'userUID',
    default: null,
});

export const userInfo = atom({
    key: 'userInfo',
    default: null,
});

export const userTypeState = atom({
    key: 'userTypeState',
    default: null,
});
