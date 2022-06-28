"use strict";

import { getProductDetails } from "./products";

export const cartItems = {};

export function addToCart(productId, quantity=1, replaceQuantity=false){
    let product = getProductDetails(productId);
    cartItems[productId] = product;
    if(replaceQuantity==false){
        if(!cartItems[productId].quantity)
            cartItems[productId].quantity = 0;
        cartItems[productId].quantity = Math.max(cartItems[productId].quantity + quantity, 0);
    }
    else
        cartItems[productId].quantity = Math.max(quantity, 0);
    cartItems[productId].price = product.unitPrice * cartItems[productId].quantity;
}

export function totalPrice(){
    let totalPrice = 0;
    for (const productId in cartItems)
        totalPrice = totalPrice + cartItems[productId].price;
    return Number.parseFloat(totalPrice).toFixed(2);
}

export function deleteFromCart(productId){
    delete cartItems[productId];
}

export function clearCart(){
    for (const productId in cartItems)
        deleteFromCart(productId);
}

export function getCartItemCount(){
    let count = 0;
    for(const item in cartItems)
        count = count + cartItems[item].quantity;
    return count;
}

export function getCartItemDetails(productId){
    return cartItems[productId];
}