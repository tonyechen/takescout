import { atom } from 'recoil';

export const userInfo = atom({
    key: 'userInfo',
    default: null,
});

export const userTypeState = atom({
    key: 'userTypeState',
    default: null,
});
