"use strict";
self["webpackHotUpdatesun"]("main",{

/***/ "./src/lib/dom.ts":
/*!************************!*\
  !*** ./src/lib/dom.ts ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "commitAppendChild": () => (/* binding */ commitAppendChild),
/* harmony export */   "commitDeleteChild": () => (/* binding */ commitDeleteChild),
/* harmony export */   "createDOM": () => (/* binding */ createDOM),
/* harmony export */   "updateDOM": () => (/* binding */ updateDOM)
/* harmony export */ });
/* harmony import */ var _config_config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../config/config */ "./src/config/config.ts");
/* harmony import */ var _utils_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/utils */ "./src/utils/utils.ts");


function commitAppendChild(childDom, parentDom) {
  parentDom.appendChild(childDom);
}
function commitDeleteChild(fiber, parentDom) {
  if (fiber.stateNode) {
    parentDom.removeChild(fiber.stateNode);
  } else {
  }
}
function createDOM(fiber) {
  const dom = fiber.type === _config_config__WEBPACK_IMPORTED_MODULE_0__.NODE_TYPE.TEXT_NODE ? document.createTextNode(``) : document.createElement(fiber.type);
  updateDOM(dom, {}, fiber.props);
  return dom;
}
function updateDOM(dom, oldProps, newProps) {
  const systemEventOfOldProps = Object.keys(oldProps).filter(_utils_utils__WEBPACK_IMPORTED_MODULE_1__.isSystemEvent);
  const systemEventOfNewProps = Object.keys(newProps).filter(_utils_utils__WEBPACK_IMPORTED_MODULE_1__.isSystemEvent);
  const commPropsOfOldProps = Object.keys(oldProps).filter(_utils_utils__WEBPACK_IMPORTED_MODULE_1__.isProperty);
  const commPropsOfNewProps = Object.keys(newProps).filter(_utils_utils__WEBPACK_IMPORTED_MODULE_1__.isProperty);
  for (let i = 0; i < systemEventOfOldProps.length; i++) {
    const item = systemEventOfOldProps[i];
    if (!(item in newProps) || (0,_utils_utils__WEBPACK_IMPORTED_MODULE_1__.isNewly)(oldProps, newProps)(item)) {
      const eventType = item.toLowerCase().substring(2);
      dom.removeEventListener(eventType, oldProps[item]);
    }
  }
  for (let i = 0; i < commPropsOfOldProps.length; i++) {
    const item = commPropsOfOldProps[i];
    if ((0,_utils_utils__WEBPACK_IMPORTED_MODULE_1__.isOld)(oldProps, newProps)(item)) {
      dom[item] = void 0;
      if (dom.removeAttribute) {
        dom.removeAttribute(item);
      }
    }
  }
  for (let i = 0; i < commPropsOfNewProps.length; i++) {
    const item = commPropsOfNewProps[i];
    if ((0,_utils_utils__WEBPACK_IMPORTED_MODULE_1__.isNewly)(oldProps, newProps)(item)) {
      switch (item) {
        case "style": {
          if (Object.prototype.toString.call(newProps[item]).toLowerCase() === "[object object]") {
            for (let attr in newProps[item]) {
              dom.style[attr] = newProps[item][attr];
            }
            break;
          }
          dom[item] = newProps[item];
          break;
        }
        case "className": {
          dom[item] = newProps[item];
          break;
        }
        default: {
          dom[item] = newProps[item];
          if (dom.setAttribute && typeof newProps[item] != "undefined") {
            dom.setAttribute(item, newProps[item]);
          }
        }
      }
    }
  }
  for (let i = 0; i < systemEventOfNewProps.length; i++) {
    const item = systemEventOfNewProps[i];
    if ((0,_utils_utils__WEBPACK_IMPORTED_MODULE_1__.isNewly)(oldProps, newProps)(item)) {
      const eventType = item.toLowerCase().substring(2);
      dom.addEventListener(eventType, newProps[item]);
    }
  }
}


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createElement": () => (/* binding */ createElement),
/* harmony export */   "createTextElement": () => (/* binding */ createTextElement),
/* harmony export */   "render": () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var _config_config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./config/config */ "./src/config/config.ts");
/* harmony import */ var _runtime_runtime_profile__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./runtime/runtime.profile */ "./src/runtime/runtime.profile.ts");
/* harmony import */ var _lib_scheduler__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./lib/scheduler */ "./src/lib/scheduler.ts");
/* harmony import */ var _utils_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utils/utils */ "./src/utils/utils.ts");
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __require = undefined;




_runtime_runtime_profile__WEBPACK_IMPORTED_MODULE_1__.__RUNTIME_PROFILE___.fiberRoot = (0,_utils_utils__WEBPACK_IMPORTED_MODULE_3__.generateStructFiberRoot)({
  current: null
});
function createElement(type, props, ...children) {
  const flatChildren = children.flat(Infinity);
  return (0,_utils_utils__WEBPACK_IMPORTED_MODULE_3__.generateStructVDOM)(type, __spreadProps(__spreadValues({}, props), {
    children: flatChildren.map((child) => {
      return typeof child === "object" ? child : createTextElement(child);
    })
  }));
}
function createTextElement(text) {
  return (0,_utils_utils__WEBPACK_IMPORTED_MODULE_3__.generateStructVDOM)(_config_config__WEBPACK_IMPORTED_MODULE_0__.NODE_TYPE.TEXT_NODE, {
    nodeValue: text,
    children: []
  });
}
let renderIndex = -1;
function render(element, container) {
  const rootFiber = (0,_utils_utils__WEBPACK_IMPORTED_MODULE_3__.generateStructFiber)({
    stateNode: container,
    type: container.nodeName.toLowerCase(),
    props: { children: [element] },
    alternate: null,
    dirty: true
  }, {
    index: ++renderIndex,
    root: true
  });
  _runtime_runtime_profile__WEBPACK_IMPORTED_MODULE_1__.__RUNTIME_PROFILE___.rootFiberList.push(rootFiber);
  if (!_runtime_runtime_profile__WEBPACK_IMPORTED_MODULE_1__.__RUNTIME_PROFILE___.fiberRoot.current) {
    _runtime_runtime_profile__WEBPACK_IMPORTED_MODULE_1__.__RUNTIME_PROFILE___.fiberRoot.current = rootFiber;
    _runtime_runtime_profile__WEBPACK_IMPORTED_MODULE_1__.__RUNTIME_PROFILE___.nextWorkUnitFiber = rootFiber;
    console.log(`Root.Fiber ===>>>`, rootFiber);
    window.requestIdleCallback((0,_lib_scheduler__WEBPACK_IMPORTED_MODULE_2__.initWorkLoop)());
  }
}


/***/ }),

/***/ "./src/utils/utils.ts":
/*!****************************!*\
  !*** ./src/utils/utils.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "generateStructVDOM": () => (/* binding */ generateStructVDOM),
/* harmony export */   "generateStructFiber": () => (/* binding */ generateStructFiber),
/* harmony export */   "generateStructFiberRoot": () => (/* binding */ generateStructFiberRoot),
/* harmony export */   "getRootFiber": () => (/* binding */ getRootFiber),
/* harmony export */   "isNewly": () => (/* binding */ isNewly),
/* harmony export */   "isOld": () => (/* binding */ isOld),
/* harmony export */   "isProperty": () => (/* binding */ isProperty),
/* harmony export */   "isSystemEvent": () => (/* binding */ isSystemEvent),
/* harmony export */   "isApprovedComponent": () => (/* binding */ isApprovedComponent),
/* harmony export */   "isFunctionComponent": () => (/* binding */ isFunctionComponent),
/* harmony export */   "syncBlock": () => (/* binding */ syncBlock)
/* harmony export */ });
/* harmony import */ var _config_config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../config/config */ "./src/config/config.ts");
var __defProp = Object.defineProperty;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __require = undefined;

function generateStructVDOM(type, props) {
  return {
    type,
    props
  };
}
function generateStructFiber(args = {}, root = {}) {
  const defaults = {
    type: null,
    elementType: null,
    stateNode: null,
    props: null,
    child: null,
    parent: null,
    sibling: null,
    alternate: null,
    effectTag: _config_config__WEBPACK_IMPORTED_MODULE_0__.RECONCILE_EFFECT_TYPE.NO_EFFECT,
    key: null,
    dirty: false,
    hooks: []
  };
  return __spreadValues(__spreadValues(__spreadValues({}, defaults), args), root);
}
function generateStructFiberRoot(args = {}) {
  const defaults = {
    current: null
  };
  return __spreadValues(__spreadValues({}, defaults), args);
}
function getRootFiber(fiber) {
  let rootFiber = fiber;
  while (!rootFiber.root) {
    rootFiber = rootFiber.parent;
  }
  return rootFiber;
}
function isNewly(oldObj, newObj) {
  return (key) => {
    return oldObj[key] !== newObj[key];
  };
}
function isOld(oldObj, newObj) {
  return (key) => {
    return !(key in newObj);
  };
}
function isProperty(key) {
  return !["children"].includes(key) && !(key[0] === "o" && key[1] === "n");
}
function isSystemEvent(key) {
  return key[0] === "o" && key[1] === "n";
}
function isApprovedComponent(fiber) {
  return fiber.type != null || typeof fiber.type != "undefined";
}
function isFunctionComponent(fiber) {
  return fiber && fiber.type && fiber.type instanceof Function;
}
function syncBlock(delay = 1e3) {
  const end = new Date().getTime() + delay;
  while (new Date().getTime() < end) {
  }
}


/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("99dd50b8ccb8f9e9162a")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=main.a8912545a3e3ceb26763.hot-update.js.map