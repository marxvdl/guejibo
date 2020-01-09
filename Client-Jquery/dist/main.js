var client =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/jwt-decode/lib/atob.js":
/*!*********************************************!*\
  !*** ./node_modules/jwt-decode/lib/atob.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * The code was extracted from:\n * https://github.com/davidchambers/Base64.js\n */\n\nvar chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';\n\nfunction InvalidCharacterError(message) {\n  this.message = message;\n}\n\nInvalidCharacterError.prototype = new Error();\nInvalidCharacterError.prototype.name = 'InvalidCharacterError';\n\nfunction polyfill (input) {\n  var str = String(input).replace(/=+$/, '');\n  if (str.length % 4 == 1) {\n    throw new InvalidCharacterError(\"'atob' failed: The string to be decoded is not correctly encoded.\");\n  }\n  for (\n    // initialize result and counters\n    var bc = 0, bs, buffer, idx = 0, output = '';\n    // get next character\n    buffer = str.charAt(idx++);\n    // character found in table? initialize bit storage and add its ascii value;\n    ~buffer && (bs = bc % 4 ? bs * 64 + buffer : buffer,\n      // and if not first of each 4 characters,\n      // convert the first 8 bits to one ascii character\n      bc++ % 4) ? output += String.fromCharCode(255 & bs >> (-2 * bc & 6)) : 0\n  ) {\n    // try to find character in table (0-63, not found => -1)\n    buffer = chars.indexOf(buffer);\n  }\n  return output;\n}\n\n\nmodule.exports = typeof window !== 'undefined' && window.atob && window.atob.bind(window) || polyfill;\n\n\n//# sourceURL=webpack://client/./node_modules/jwt-decode/lib/atob.js?");

/***/ }),

/***/ "./node_modules/jwt-decode/lib/base64_url_decode.js":
/*!**********************************************************!*\
  !*** ./node_modules/jwt-decode/lib/base64_url_decode.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var atob = __webpack_require__(/*! ./atob */ \"./node_modules/jwt-decode/lib/atob.js\");\n\nfunction b64DecodeUnicode(str) {\n  return decodeURIComponent(atob(str).replace(/(.)/g, function (m, p) {\n    var code = p.charCodeAt(0).toString(16).toUpperCase();\n    if (code.length < 2) {\n      code = '0' + code;\n    }\n    return '%' + code;\n  }));\n}\n\nmodule.exports = function(str) {\n  var output = str.replace(/-/g, \"+\").replace(/_/g, \"/\");\n  switch (output.length % 4) {\n    case 0:\n      break;\n    case 2:\n      output += \"==\";\n      break;\n    case 3:\n      output += \"=\";\n      break;\n    default:\n      throw \"Illegal base64url string!\";\n  }\n\n  try{\n    return b64DecodeUnicode(output);\n  } catch (err) {\n    return atob(output);\n  }\n};\n\n\n//# sourceURL=webpack://client/./node_modules/jwt-decode/lib/base64_url_decode.js?");

/***/ }),

/***/ "./node_modules/jwt-decode/lib/index.js":
/*!**********************************************!*\
  !*** ./node_modules/jwt-decode/lib/index.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar base64_url_decode = __webpack_require__(/*! ./base64_url_decode */ \"./node_modules/jwt-decode/lib/base64_url_decode.js\");\n\nfunction InvalidTokenError(message) {\n  this.message = message;\n}\n\nInvalidTokenError.prototype = new Error();\nInvalidTokenError.prototype.name = 'InvalidTokenError';\n\nmodule.exports = function (token,options) {\n  if (typeof token !== 'string') {\n    throw new InvalidTokenError('Invalid token specified');\n  }\n\n  options = options || {};\n  var pos = options.header === true ? 0 : 1;\n  try {\n    return JSON.parse(base64_url_decode(token.split('.')[pos]));\n  } catch (e) {\n    throw new InvalidTokenError('Invalid token specified: ' + e.message);\n  }\n};\n\nmodule.exports.InvalidTokenError = InvalidTokenError;\n\n\n//# sourceURL=webpack://client/./node_modules/jwt-decode/lib/index.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! exports provided: login */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"login\", function() { return login; });\nconst jwtDecode = __webpack_require__(/*! jwt-decode */ \"./node_modules/jwt-decode/lib/index.js\");\n\nconst BASEURL = 'http://localhost:3000/';\n\nfunction login() {\n\n    $.ajax({\n        type: 'POST',\n        url: BASEURL + 'auth/login',\n        contentType: 'application/json',\n        data: JSON.stringify({\n            email: $('#login-email').val(),\n            password: $('#login-password').val()\n        }),\n        success: data => {\n\n            if (data.success === true) {\n                console.log(\"Logged in\");\n                let jwt = jwtDecode(data.token);\n\n                $(\"#top-email\").text(jwt.email);\n                $(\"#top-email\").css('color', '#3aff3a');\n                $(\"#login-panel\").slideUp();\n            }\n            else {\n                console.log(\"Could not log in: \" + data.error);\n            }\n        }\n    });\n\n};\n\n\n\n//# sourceURL=webpack://client/./src/index.js?");

/***/ })

/******/ });