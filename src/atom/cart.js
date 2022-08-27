import { atom } from 'recoil';

export const shoppingCart = atom({
    key: 'shoppingCart',
    default: [],
});

export const deliveryType = atom({
    key: 'deliveryType',
    default: 'recipient',
});