"use strict";

export const products = {
    1: {name: "Fluffball", unitPrice: 299.90},
    2: {name: "Birman", unitPrice: 349.99},
    3: {name: "Toyger", unitPrice: 499.85},
};

export function getProductDetails(productId){
    return products[productId];
}

