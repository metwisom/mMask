/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   mMask: () => (/* binding */ mMask)\n/* harmony export */ });\n/* harmony import */ var _isMobile__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./isMobile */ \"./src/isMobile.js\");\n/* harmony import */ var _regionMap__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./regionMap */ \"./src/regionMap.js\");\n\n\n\nconst mMask = (function () {\n\n    const makeMasked = function (str, region) {\n        if (!region) {\n            return str\n        }\n        let tmp = _regionMap__WEBPACK_IMPORTED_MODULE_1__.regionMap.mask[region]\n        for (let i = 0; i < str.length; i++) {\n            tmp = tmp.replace(\"_\", str[i])\n        }\n        return tmp\n    }\n\n    const onclick = ({target}) => {\n        if (target.value === \"+\") {\n            target.selectionStart = 1\n        }\n    }\n\n    const onkeypress = function (e) {\n        if ((e.keyCode < 48 || e.keyCode > 57) && e.keyCode !== 8) {\n            e.preventDefault()\n        }\n    }\n\n    const onkeydown = function ({target, keyCode}) {\n        const str = target.value\n        if (str === \"+\") target.selectionStart = 1\n\n        if (keyCode === 8) {\n            let start = target.selectionStart\n            const end = target.selectionEnd\n            if (start - end === 0) {\n                while ((str.charAt(start - 1) < \"0\" || str.charAt(start - 1) > \"9\") && start > 0) {\n                    start--\n                }\n                target.selectionStart = start\n                target.selectionEnd = start\n            }\n        }\n    }\n\n    const oninput = function (e) {\n        let str = e.target.value\n        let start = e.target.selectionStart\n\n        str = str.replace(/\\+/g, \"\")\n        str = str.replace(/\\D+/g, \"\")\n        let reg = _regionMap__WEBPACK_IMPORTED_MODULE_1__.regionMap.getRegion(str)\n\n        str = makeMasked(str, reg)\n\n        if (str.includes(\"_\") !== -1) {\n            str = str.substring(0, str.indexOf(\"_\"))\n        }\n\n        if(start === 1){\n            start = str.length\n        }else{\n            for (let i = 0; i < str.length; i++){\n                if (str.charAt(start) > \"9\" || str.charAt(start) < \"0\") {\n                    start++\n                }\n            }\n        }\n\n        e.target.value = str\n\n        if (_isMobile__WEBPACK_IMPORTED_MODULE_0__.isMobile.any()) {\n            setTimeout(function () {\n                e.target.selectionStart = start\n                e.target.selectionEnd = start\n            }, 1)\n        } else {\n            e.target.selectionStart = start\n            e.target.selectionEnd = start\n        }\n    }\n\n    return Object.freeze({\n        init: function (element) {\n            element.type = \"tel\"\n            element.addEventListener(\"input\", oninput)\n            element.addEventListener(\"keydown\", onkeydown)\n            element.addEventListener(\"keypress\", onkeypress)\n            element.addEventListener(\"click\", onclick)\n            element.addEventListener(\"onfocus\", onclick)\n            // element.dispatchEvent(new Event(\"input\"))\n        },\n    })\n})()\n\nwindow.mMask = mMask\n\n\ndocument.addEventListener(\"DOMContentLoaded\", () => {\n    const items = document.getElementsByClassName(\"mMask\")\n    for (let item of items) {\n        mMask.init(item)\n    }\n})\n\n\n\n\n//# sourceURL=webpack://mmask/./src/index.js?");

/***/ }),

/***/ "./src/isMobile.js":
/*!*************************!*\
  !*** ./src/isMobile.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   isMobile: () => (/* binding */ isMobile)\n/* harmony export */ });\nconst isMobile = {\r\n    Android: function () {\r\n        return navigator.userAgent.match(/Android/i)\r\n    }, BlackBerry: function () {\r\n        return navigator.userAgent.match(/BlackBerry/i)\r\n    }, iOS: function () {\r\n        return navigator.userAgent.match(/iPhone|iPad|iPod/i)\r\n    }, Opera: function () {\r\n        return navigator.userAgent.match(/Opera Mini/i)\r\n    }, Windows: function () {\r\n        return navigator.userAgent.match(/IEMobile/i)\r\n    }, any: function () {\r\n        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows())\r\n    },\r\n}\r\n\r\n\n\n//# sourceURL=webpack://mmask/./src/isMobile.js?");

/***/ }),

/***/ "./src/regionMap.js":
/*!**************************!*\
  !*** ./src/regionMap.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   regionMap: () => (/* binding */ regionMap)\n/* harmony export */ });\nconst regionMap = (function () {\r\n    const list = {}\r\n    const mask = {}\r\n\r\n    const functions = {\r\n        get mask() {\r\n            return mask\r\n        }, getRegion: function (str) {\r\n            return Object.entries(list).reduce((prev, cur) => {\r\n                const [region, code] = cur;\r\n                return (`+${str}`.includes(`+${code}`)) ? region : prev;\r\n            }, \"undef\");\r\n        }, add: function (region, code, map) {\r\n            if (list.hasOwnProperty(region)) {\r\n                console.error(`Region '${region}' already exists. Please choose a unique region.`);\r\n                return;\r\n            }\r\n            list[region] = code\r\n            mask[region] = map\r\n        },\r\n    }\r\n    functions.add(\"undef\", -1, \"_____________\")\r\n    functions.add(\"RU\", 7, \"+_ (___) ___-__-__\")\r\n    functions.add(\"BY\", 375, \"+___ (__) ___-__-__\")\r\n    functions.add(\"UA\", 380, \"+___ (__) ___-__-__\")\r\n    functions.add(\"LT\", 370, \"+___ (___) _____\")\r\n    functions.add(\"LV\", 371, \"+___ ________\")\r\n\r\n    return Object.freeze(functions)\r\n\r\n})()\r\n\r\n\n\n//# sourceURL=webpack://mmask/./src/regionMap.js?");

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
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;