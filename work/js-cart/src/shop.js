"use strict";

import { addToCart, getCartItemCount, cartItems, clearCart, deleteFromCart, getCartItemDetails, totalPrice } from "./cart";
import { getProductDetails, products } from "./products";

let viewCart = false;

render();
addEventListeners();

function render() {
    renderProductList();
    renderViewCartBtn();
    if(viewCart)
        renderCartLisitng();
}

function renderProductList() {
    let productListHtml = ``;
    for (const productId in products) {
        let product = getProductDetails(productId);
        productListHtml = productListHtml +
            `<div class="card">
                <img class="image" src="https://placekitten.com/200/200?image=${productId}" alt="Denim Jeans">
                <h1>${product.name}</h1>
                <p class="price">$${product.unitPrice}</p>
                <div>
                    <button data-productid=${productId} class="add-cart">Add to Cart</button>
                </div>
            </div>`;
    }
    document.querySelector('.products').innerHTML = productListHtml;

}

function renderViewCartBtn() {
    if(viewCart===false){
        let itemCount = getCartItemCount();
        let viewBtnHtml = `<button class="button-cart">View Cart <span>(${itemCount})</span></button>`;
        document.querySelector('.view-cart').innerHTML = viewBtnHtml;
    } else {
        document.querySelector('.view-cart').innerHTML = ``;
    }
}

function addEventListeners() {
    addToCartEvents();
    viewCartEvents();
    updateQuantityEvents();
    deleteCartItemEvents();
    checkoutEvents();
    closeCartEvents();
}

function addToCartEvents() {
    const addCartEl = document.querySelector('.products');
    addCartEl.addEventListener('click', (e) => {
        if (e.target.classList.contains('add-cart')) {
            const productId = e.target.dataset.productid;
            addToCart(productId);
            render();
        }
    });
}

function viewCartEvents() {
    const viewCartEl = document.querySelector('.view-cart');
    viewCartEl.addEventListener('click', (e) => {
        viewCart = true;
        render();
    });
}

function renderCartLisitng() {
    let cartListHtml = `<div class="checkout">`;
    if(getCartItemCount()>0){
        for (const productId in cartItems) {
            let product = getProductDetails(productId);
            let cartItem = getCartItemDetails(productId);
            cartListHtml = cartListHtml +
                `<div class="bag-product">
                    <div class="image-checkout">
                        <img src="https://placekitten.com/200/200?image=${productId}" class="product-image">
                    </div>
                    <div class="description">
                        <h1>${product.name}</h1>
                        <h2>$${Number.parseFloat(cartItem.price).toFixed(2)}</h2>
                        <h3>$${Number.parseFloat(cartItem.unitPrice).toFixed(2)} per unit</h3>
                        <div class="quantity-wrapper">
                            <div>
                                <label style="margin-right: 0.5rem;">Quantity:</label>
                                <button class="decrease" data-productid=${productId}>-</button><input type="text" value="${cartItem.quantity}" class="quantity" disabled> <button class="increase" data-productid=${productId}>+</button>
                            </div>
                            <button class="btn-remove button-cart remove" data-productid=${productId}>Remove</button>
                        </div>
                    </div>
                </div>
                <hr/>`;
        }
        cartListHtml = cartListHtml + `<div class="bag-total">
                                            <div class="total">
                                                <h3>Total:  <span>$${totalPrice()}</span></h3>
                                                <button class="btn-remove button-cart chk">Checkout</button>
                                                <button class="btn-remove button-cart close">Hide Cart</button>
                                            </div>
                                        </div>`;
    }
    else{
        cartListHtml = `<div class="bag-product">
                            <h2>Nothing in the cart!</h2>
                        </div>`;
    }
    cartListHtml = cartListHtml + `</div>`;
    document.querySelector('.checkout-section').innerHTML = cartListHtml;
}

function updateQuantityEvents(){
    const updateFormEl = document.querySelector('.checkout-section');
    updateFormEl.addEventListener('click', (e) => {
        if(e.target.classList.contains('increase')){
            const productId = e.target.dataset.productid;
            const quantity = cartItems[productId].quantity + 1;
            addToCart(productId, quantity, true);
            render();
        }
        if(e.target.classList.contains('decrease')){
            const productId = e.target.dataset.productid;
            const quantity = cartItems[productId].quantity - 1;
            addToCart(productId, quantity, true);
            console.log(cartItems);
            render();
        }
    });
}

function deleteCartItemEvents(){
    const checkoutEl = document.querySelector('.checkout-section');
    checkoutEl.addEventListener('click', (e) => {
        if(e.target.classList.contains('remove')){
            const productId = e.target.dataset.productid;
            deleteFromCart(productId);
            render();
        }
    });
}

function checkoutEvents(){
    const checkoutEl = document.querySelector('.checkout-section');
    checkoutEl.addEventListener('click', (e) => {
        if(e.target.classList.contains('chk')){
            clearCart();
            viewCart = false;
            document.querySelector('.checkout-section').innerHTML = ``;
            render();
        }
    });
}

function closeCartEvents(){
    const checkoutEl = document.querySelector('.checkout-section');
    checkoutEl.addEventListener('click', (e) => {
        if(e.target.classList.contains('close')){
            viewCart = false;
            document.querySelector('.checkout-section').innerHTML = ``;
            render();
        }
    });
}