/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/cart.js":
/*!*********************!*\
  !*** ./src/cart.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "addToCart": () => (/* binding */ addToCart),
/* harmony export */   "cartItems": () => (/* binding */ cartItems),
/* harmony export */   "clearCart": () => (/* binding */ clearCart),
/* harmony export */   "deleteFromCart": () => (/* binding */ deleteFromCart),
/* harmony export */   "getCartItemCount": () => (/* binding */ getCartItemCount),
/* harmony export */   "getCartItemDetails": () => (/* binding */ getCartItemDetails),
/* harmony export */   "totalPrice": () => (/* binding */ totalPrice)
/* harmony export */ });
/* harmony import */ var _products__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./products */ "./src/products.js");



var cartItems = {};
function addToCart(productId) {
  var quantity = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
  var replaceQuantity = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  var product = (0,_products__WEBPACK_IMPORTED_MODULE_0__.getProductDetails)(productId);
  cartItems[productId] = product;

  if (replaceQuantity == false) {
    if (!cartItems[productId].quantity) cartItems[productId].quantity = 0;
    cartItems[productId].quantity = Math.max(cartItems[productId].quantity + quantity, 0);
  } else cartItems[productId].quantity = Math.max(quantity, 0);

  cartItems[productId].price = product.unitPrice * cartItems[productId].quantity;
}
function totalPrice() {
  var totalPrice = 0;

  for (var productId in cartItems) {
    totalPrice = totalPrice + cartItems[productId].price;
  }

  return Number.parseFloat(totalPrice).toFixed(2);
}
function deleteFromCart(productId) {
  delete cartItems[productId];
}
function clearCart() {
  for (var productId in cartItems) {
    deleteFromCart(productId);
  }
}
function getCartItemCount() {
  var count = 0;

  for (var item in cartItems) {
    count = count + cartItems[item].quantity;
  }

  return count;
}
function getCartItemDetails(productId) {
  return cartItems[productId];
}

/***/ }),

/***/ "./src/products.js":
/*!*************************!*\
  !*** ./src/products.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getProductDetails": () => (/* binding */ getProductDetails),
/* harmony export */   "products": () => (/* binding */ products)
/* harmony export */ });


var products = {
  1: {
    name: "Fluffball",
    unitPrice: 299.90
  },
  2: {
    name: "Birman",
    unitPrice: 349.99
  },
  3: {
    name: "Toyger",
    unitPrice: 499.85
  }
};
function getProductDetails(productId) {
  return products[productId];
}

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!*********************!*\
  !*** ./src/shop.js ***!
  \*********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _cart__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./cart */ "./src/cart.js");
/* harmony import */ var _products__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./products */ "./src/products.js");




var viewCart = false;
render();
addEventListeners();

function render() {
  renderProductList();
  renderViewCartBtn();
  if (viewCart) renderCartLisitng();
}

function renderProductList() {
  var productListHtml = "";

  for (var productId in _products__WEBPACK_IMPORTED_MODULE_1__.products) {
    var product = (0,_products__WEBPACK_IMPORTED_MODULE_1__.getProductDetails)(productId);
    productListHtml = productListHtml + "<div class=\"card\">\n                <img class=\"image\" src=\"https://placekitten.com/200/200?image=".concat(productId, "\" alt=\"Denim Jeans\">\n                <h1>").concat(product.name, "</h1>\n                <p class=\"price\">$").concat(product.unitPrice, "</p>\n                <div>\n                    <button data-productid=").concat(productId, " class=\"add-cart\">Add to Cart</button>\n                </div>\n            </div>");
  }

  document.querySelector('.products').innerHTML = productListHtml;
}

function renderViewCartBtn() {
  if (viewCart === false) {
    var itemCount = (0,_cart__WEBPACK_IMPORTED_MODULE_0__.getCartItemCount)();
    var viewBtnHtml = "<button class=\"button-cart\">View Cart <span>(".concat(itemCount, ")</span></button>");
    document.querySelector('.view-cart').innerHTML = viewBtnHtml;
  } else {
    document.querySelector('.view-cart').innerHTML = "";
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
  var addCartEl = document.querySelector('.products');
  addCartEl.addEventListener('click', function (e) {
    if (e.target.classList.contains('add-cart')) {
      var productId = e.target.dataset.productid;
      (0,_cart__WEBPACK_IMPORTED_MODULE_0__.addToCart)(productId);
      render();
    }
  });
}

function viewCartEvents() {
  var viewCartEl = document.querySelector('.view-cart');
  viewCartEl.addEventListener('click', function (e) {
    viewCart = true;
    render();
  });
}

function renderCartLisitng() {
  var cartListHtml = "<div class=\"checkout\">";

  if ((0,_cart__WEBPACK_IMPORTED_MODULE_0__.getCartItemCount)() > 0) {
    for (var productId in _cart__WEBPACK_IMPORTED_MODULE_0__.cartItems) {
      var product = (0,_products__WEBPACK_IMPORTED_MODULE_1__.getProductDetails)(productId);
      var cartItem = (0,_cart__WEBPACK_IMPORTED_MODULE_0__.getCartItemDetails)(productId);
      cartListHtml = cartListHtml + "<div class=\"bag-product\">\n                    <div class=\"image-checkout\">\n                        <img src=\"https://placekitten.com/200/200?image=".concat(productId, "\" class=\"product-image\">\n                    </div>\n                    <div class=\"description\">\n                        <h1>").concat(product.name, "</h1>\n                        <h2>$").concat(Number.parseFloat(cartItem.price).toFixed(2), "</h2>\n                        <h3>$").concat(Number.parseFloat(cartItem.unitPrice).toFixed(2), " per unit</h3>\n                        <div class=\"quantity-wrapper\">\n                            <div>\n                                <label style=\"margin-right: 0.5rem;\">Quantity:</label>\n                                <button class=\"decrease\" data-productid=").concat(productId, ">-</button><input type=\"text\" value=\"").concat(cartItem.quantity, "\" class=\"quantity\" disabled> <button class=\"increase\" data-productid=").concat(productId, ">+</button>\n                            </div>\n                            <button class=\"btn-remove button-cart remove\" data-productid=").concat(productId, ">Remove</button>\n                        </div>\n                    </div>\n                </div>\n                <hr/>");
    }

    cartListHtml = cartListHtml + "<div class=\"bag-total\">\n                                            <div class=\"total\">\n                                                <h3>Total:  <span>$".concat((0,_cart__WEBPACK_IMPORTED_MODULE_0__.totalPrice)(), "</span></h3>\n                                                <button class=\"btn-remove button-cart chk\">Checkout</button>\n                                                <button class=\"btn-remove button-cart close\">Hide Cart</button>\n                                            </div>\n                                        </div>");
  } else {
    cartListHtml = "<div class=\"bag-product\">\n                            <h2>Nothing in the cart!</h2>\n                        </div>";
  }

  cartListHtml = cartListHtml + "</div>";
  document.querySelector('.checkout-section').innerHTML = cartListHtml;
}

function updateQuantityEvents() {
  var updateFormEl = document.querySelector('.checkout-section');
  updateFormEl.addEventListener('click', function (e) {
    if (e.target.classList.contains('increase')) {
      var productId = e.target.dataset.productid;
      var quantity = _cart__WEBPACK_IMPORTED_MODULE_0__.cartItems[productId].quantity + 1;
      (0,_cart__WEBPACK_IMPORTED_MODULE_0__.addToCart)(productId, quantity, true);
      render();
    }

    if (e.target.classList.contains('decrease')) {
      var _productId = e.target.dataset.productid;

      var _quantity = _cart__WEBPACK_IMPORTED_MODULE_0__.cartItems[_productId].quantity - 1;

      (0,_cart__WEBPACK_IMPORTED_MODULE_0__.addToCart)(_productId, _quantity, true);
      console.log(_cart__WEBPACK_IMPORTED_MODULE_0__.cartItems);
      render();
    }
  });
}

function deleteCartItemEvents() {
  var checkoutEl = document.querySelector('.checkout-section');
  checkoutEl.addEventListener('click', function (e) {
    if (e.target.classList.contains('remove')) {
      var productId = e.target.dataset.productid;
      (0,_cart__WEBPACK_IMPORTED_MODULE_0__.deleteFromCart)(productId);
      render();
    }
  });
}

function checkoutEvents() {
  var checkoutEl = document.querySelector('.checkout-section');
  checkoutEl.addEventListener('click', function (e) {
    if (e.target.classList.contains('chk')) {
      (0,_cart__WEBPACK_IMPORTED_MODULE_0__.clearCart)();
      viewCart = false;
      document.querySelector('.checkout-section').innerHTML = "";
      render();
    }
  });
}

function closeCartEvents() {
  var checkoutEl = document.querySelector('.checkout-section');
  checkoutEl.addEventListener('click', function (e) {
    if (e.target.classList.contains('close')) {
      viewCart = false;
      document.querySelector('.checkout-section').innerHTML = "";
      render();
    }
  });
}
})();

/******/ })()
;
//# sourceMappingURL=shop.js.map