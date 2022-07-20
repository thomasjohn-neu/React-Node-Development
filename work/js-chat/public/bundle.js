/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/constants.js":
/*!**************************!*\
  !*** ./src/constants.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "API_VERSION": () => (/* binding */ API_VERSION),
/* harmony export */   "MESSAGES": () => (/* binding */ MESSAGES)
/* harmony export */ });
var MESSAGES = {
  networkError: 'Trouble connecting to the network.  Please try again',
  "default": 'Something went wrong.  Please try again',
  "auth-insufficient": "Invalid username dog",
  "required-username": "Invalid username"
};
var API_VERSION = 'v1';

/***/ }),

/***/ "./src/render.js":
/*!***********************!*\
  !*** ./src/render.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render),
/* harmony export */   "renderStatus": () => (/* binding */ renderStatus)
/* harmony export */ });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants */ "./src/constants.js");

function render() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      state = _ref.state,
      add = _ref.add;

  var html = Object.values(state.messages).map(function (message) {
    return "\n      <li class=\"todo\">\n      <div class=\"message\">\n        <div class=\"sender-info\">\n          <span>".concat(message.username, "</span>\n        </div>\n        <p class=\"message-text\"> ").concat(message.message, " </p> \n      </div>\n      </li>\n      ");
  }).join('') || "<p>No messages yet, start a new chat!</p>";
  var chatEl = document.querySelector('.todos');
  chatEl.innerHTML = html;
  var userHtml = Object.values(state.users).map(function (user) {
    return "\n      <li class=\"todo\"><label>".concat(user, "</label> </li>");
  }).join('') || "<p>No User online now!</p>";
  var userEl = document.querySelector('.users');
  userEl.innerHTML = "<h2>Active Users</h2>" + userHtml;
}
function renderStatus(message) {
  var statusEl = document.querySelector('.status');

  if (!message) {
    statusEl.innerText = '';
    return;
  }

  var key = message !== null && message !== void 0 && message.error ? message.error : 'default';
  statusEl.innerText = _constants__WEBPACK_IMPORTED_MODULE_0__.MESSAGES[key] || _constants__WEBPACK_IMPORTED_MODULE_0__.MESSAGES["default"];
}

/***/ }),

/***/ "./src/services.js":
/*!*************************!*\
  !*** ./src/services.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "fetchAddMessage": () => (/* binding */ fetchAddMessage),
/* harmony export */   "fetchLogin": () => (/* binding */ fetchLogin),
/* harmony export */   "fetchLogout": () => (/* binding */ fetchLogout),
/* harmony export */   "fetchMessages": () => (/* binding */ fetchMessages),
/* harmony export */   "fetchSession": () => (/* binding */ fetchSession),
/* harmony export */   "fetchUsers": () => (/* binding */ fetchUsers)
/* harmony export */ });
function fetchAddMessage(task) {
  return fetch('/api/v1/messages', {
    method: 'POST',
    headers: new Headers({
      'content-type': 'application/json'
    }),
    body: JSON.stringify({
      task: task
    })
  })["catch"](function () {
    return Promise.reject({
      error: 'networkError'
    });
  }).then(function (response) {
    if (response.ok) {
      return response.json();
    }

    return response.json()["catch"](function (error) {
      return Promise.reject({
        error: error
      });
    }).then(function (err) {
      return Promise.reject(err);
    });
  });
}
function fetchMessages() {
  return fetch('/api/v1/messages')["catch"](function () {
    return Promise.reject({
      error: 'networkError'
    });
  }).then(function (response) {
    if (response.ok) {
      return response.json();
    }

    return response.json()["catch"](function (error) {
      return Promise.reject({
        error: error
      });
    }).then(function (err) {
      return Promise.reject(err);
    });
  });
}
function fetchUsers() {
  return fetch('/api/v1/users')["catch"](function () {
    return Promise.reject({
      error: 'networkError'
    });
  }).then(function (response) {
    if (response.ok) {
      return response.json();
    }

    return response.json()["catch"](function (error) {
      return Promise.reject({
        error: error
      });
    }).then(function (err) {
      return Promise.reject(err);
    });
  });
}
function fetchSession() {
  return fetch('/api/v1/session', {
    method: 'GET'
  })["catch"](function () {
    return Promise.reject({
      error: 'networkError'
    });
  }).then(function (response) {
    if (response.ok) {
      return response.json();
    }

    return response.json()["catch"](function (error) {
      return Promise.reject({
        error: error
      });
    }).then(function (err) {
      return Promise.reject(err);
    });
  });
}
function fetchLogout() {
  return fetch('/api/v1/session', {
    method: 'DELETE'
  })["catch"](function () {
    return Promise.reject({
      error: 'networkError'
    });
  }).then(function (response) {
    if (response.ok) {
      return response.json();
    }

    return response.json()["catch"](function (error) {
      return Promise.reject({
        error: error
      });
    }).then(function (err) {
      return Promise.reject(err);
    });
  });
}
function fetchLogin(username) {
  return fetch('/api/v1/session', {
    method: 'POST',
    headers: new Headers({
      'content-type': 'application/json'
    }),
    body: JSON.stringify({
      username: username
    })
  })["catch"](function () {
    return Promise.reject({
      error: 'networkError'
    });
  }).then(function (response) {
    if (response.ok) {
      return response.json();
    }

    return response.json()["catch"](function (error) {
      return Promise.reject({
        error: error
      });
    }).then(function (err) {
      return Promise.reject(err);
    });
  });
}

/***/ }),

/***/ "./src/stateMessages.js":
/*!******************************!*\
  !*** ./src/stateMessages.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var messages = {};
var users = {};
var loader = false;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  messages: messages,
  users: users,
  loader: loader
});

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
/*!*************************!*\
  !*** ./src/messages.js ***!
  \*************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _stateMessages__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./stateMessages */ "./src/stateMessages.js");
/* harmony import */ var _services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./services */ "./src/services.js");
/* harmony import */ var _render__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./render */ "./src/render.js");



checkForSession();
addAbilityToLogin();
addAbilityToLogout();
addAbilityToRefresh();
addAbilityToAddMessage();

function setLoggedIn(isLoggedIn) {
  var loginEl = document.querySelector('main');

  if (isLoggedIn) {
    loginEl.classList.remove('not-logged-in');
    loginEl.classList.add('logged-in');
  } else {
    loginEl.classList.add('not-logged-in');
    loginEl.classList.remove('logged-in');
  }

  (0,_render__WEBPACK_IMPORTED_MODULE_2__.render)({
    state: _stateMessages__WEBPACK_IMPORTED_MODULE_0__["default"]
  });
  (0,_render__WEBPACK_IMPORTED_MODULE_2__.renderStatus)('');
}

function renderOnLogin(messages) {
  _stateMessages__WEBPACK_IMPORTED_MODULE_0__["default"].messages = messages;
  setLoggedIn(true);
  enableAutoRefresh();
}

function enableAutoRefresh() {
  var refreshData = setInterval(function () {
    populateMessages();
    populateActiveUsers();
  }, 5000);
}

function checkForSession() {
  (0,_services__WEBPACK_IMPORTED_MODULE_1__.fetchSession)().then(populateMessages)["catch"](function () {
    return setLoggedIn(false);
  });
}

function addAbilityToLogin() {
  var buttonEl = document.querySelector('.login button');
  var usernameEl = document.querySelector('.login__username');
  buttonEl.addEventListener('click', function (e) {
    var username = usernameEl.value;
    (0,_services__WEBPACK_IMPORTED_MODULE_1__.fetchLogin)(username).then(renderOnLogin).then(populateActiveUsers)["catch"](function (error) {
      return (0,_render__WEBPACK_IMPORTED_MODULE_2__.renderStatus)(error);
    });
  });
}

function addAbilityToLogout() {
  var buttonEl = document.querySelector('.logout');
  buttonEl.addEventListener('click', function (e) {
    _stateMessages__WEBPACK_IMPORTED_MODULE_0__["default"].messages = {};
    _stateMessages__WEBPACK_IMPORTED_MODULE_0__["default"].users = {};
    (0,_services__WEBPACK_IMPORTED_MODULE_1__.fetchLogout)().then(function () {
      return setLoggedIn(false);
    })["catch"](function (error) {
      return (0,_render__WEBPACK_IMPORTED_MODULE_2__.renderStatus)(error);
    });
  });
}

function populateMessages() {
  (0,_services__WEBPACK_IMPORTED_MODULE_1__.fetchMessages)().then(function (rawMessages) {
    _stateMessages__WEBPACK_IMPORTED_MODULE_0__["default"].messages = rawMessages;
    setLoggedIn(true);
    (0,_render__WEBPACK_IMPORTED_MODULE_2__.renderStatus)('');
  })["catch"](function (error) {
    (0,_render__WEBPACK_IMPORTED_MODULE_2__.renderStatus)(error);
  });
}

function populateActiveUsers() {
  (0,_services__WEBPACK_IMPORTED_MODULE_1__.fetchUsers)().then(function (rawUsers) {
    _stateMessages__WEBPACK_IMPORTED_MODULE_0__["default"].users = rawUsers;
    (0,_render__WEBPACK_IMPORTED_MODULE_2__.render)({
      state: _stateMessages__WEBPACK_IMPORTED_MODULE_0__["default"]
    });
  })["catch"](function (error) {
    (0,_render__WEBPACK_IMPORTED_MODULE_2__.renderStatus)(error);
  });
}

function addAbilityToAddMessage() {
  var buttonEl = document.querySelector('.add');
  var inputEl = document.querySelector('.to-add');
  buttonEl.addEventListener('click', function (e) {
    e.preventDefault();
    var messageInput = inputEl.value;
    (0,_services__WEBPACK_IMPORTED_MODULE_1__.fetchAddMessage)(messageInput).then(function (messages) {
      inputEl.value = '';
      _stateMessages__WEBPACK_IMPORTED_MODULE_0__["default"].messages = messages;
      (0,_render__WEBPACK_IMPORTED_MODULE_2__.render)({
        state: _stateMessages__WEBPACK_IMPORTED_MODULE_0__["default"]
      });
      (0,_render__WEBPACK_IMPORTED_MODULE_2__.renderStatus)('');
    })["catch"](function (err) {
      (0,_render__WEBPACK_IMPORTED_MODULE_2__.renderStatus)(err || 'error');
    });
  });
}

function addAbilityToRefresh() {
  var buttonEl = document.querySelector('.refresh');
  buttonEl.addEventListener('click', function () {
    populateMessages();
  });
}
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map