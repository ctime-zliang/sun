"use strict";
self["webpackHotUpdatesun"]("main",{

/***/ "./test-app/src/index.jsx":
/*!********************************!*\
  !*** ./test-app/src/index.jsx ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _dist_sun__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../dist/sun */ "./dist/sun.js");
/* harmony import */ var _dist_sun__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_dist_sun__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _component_click_add_li__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./component/click-add-li */ "./test-app/src/component/click-add-li.jsx");
/* harmony import */ var _component_traverse_fiber_tree__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./component/traverse-fiber-tree */ "./test-app/src/component/traverse-fiber-tree.jsx");
/* harmony import */ var _component_usestate_test__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./component/usestate-test */ "./test-app/src/component/usestate-test.jsx");
/* harmony import */ var _component_props_test__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./component/props-test */ "./test-app/src/component/props-test.jsx");





const App = () => {
  console.log(`Component: App`);
  const [count1, setCount1] = (0,_dist_sun__WEBPACK_IMPORTED_MODULE_0__.useState)(0);
  const [status, setStatus] = (0,_dist_sun__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const setCountAction1 = () => {
    setCount1((state) => {
      return state + 1;
    });
    setStatus(!status);
  };
  return /* @__PURE__ */ _dist_sun__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "row-index",
    style: { border: "1px solid red" }
  }, /* @__PURE__ */ _dist_sun__WEBPACK_IMPORTED_MODULE_0___default().createElement("article", {
    onClick: setCountAction1,
    style: "border: 1px solid green"
  }, count1, " - ", status), status ? /* @__PURE__ */ _dist_sun__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    tag: "true"
  }, "True 1") : /* @__PURE__ */ _dist_sun__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    tag: "false"
  }, "False 1"), status ? /* @__PURE__ */ _dist_sun__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    tag: "true"
  }, "True 2") : null);
};
_dist_sun__WEBPACK_IMPORTED_MODULE_0___default().render(/* @__PURE__ */ _dist_sun__WEBPACK_IMPORTED_MODULE_0___default().createElement(App, null), document.querySelector(`#app2`));


/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("7e5b8c689c79c7b39b0b")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=main.99dd50b8ccb8f9e9162a.hot-update.js.map