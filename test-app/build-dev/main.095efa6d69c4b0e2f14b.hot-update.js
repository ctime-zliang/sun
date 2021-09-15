"use strict";
self["webpackHotUpdatesun"]("main",{

/***/ "./test-app/src/index.jsx":
/*!********************************!*\
  !*** ./test-app/src/index.jsx ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
Object(function webpackMissingModule() { var e = new Error("Cannot find module '../../dist/sun'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());
/* harmony import */ var _component_click_add_li__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./component/click-add-li */ "./test-app/src/component/click-add-li.jsx");
/* harmony import */ var _component_traverse_fiber_tree__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./component/traverse-fiber-tree */ "./test-app/src/component/traverse-fiber-tree.jsx");
/* harmony import */ var _component_usestate_test__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./component/usestate-test */ "./test-app/src/component/usestate-test.jsx");
/* harmony import */ var _component_props_test__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./component/props-test */ "./test-app/src/component/props-test.jsx");





const App = () => {
  console.log(`Component: App`);
  const [count1, setCount1] = Object(function webpackMissingModule() { var e = new Error("Cannot find module '../../dist/sun'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())(0);
  const [status, setStatus] = Object(function webpackMissingModule() { var e = new Error("Cannot find module '../../dist/sun'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())(false);
  const setCountAction1 = () => {
    setCount1((state) => {
      return state + 1;
    });
    setStatus(!status);
  };
  return /* @__PURE__ */ Object(function webpackMissingModule() { var e = new Error("Cannot find module '../../dist/sun'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())("div", {
    className: "row-index",
    style: { border: "1px solid red" }
  }, /* @__PURE__ */ Object(function webpackMissingModule() { var e = new Error("Cannot find module '../../dist/sun'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())("article", {
    onClick: setCountAction1,
    style: "border: 1px solid green"
  }, count1, " - ", status), status ? /* @__PURE__ */ Object(function webpackMissingModule() { var e = new Error("Cannot find module '../../dist/sun'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())("div", {
    tag: "true"
  }, "True 1") : /* @__PURE__ */ Object(function webpackMissingModule() { var e = new Error("Cannot find module '../../dist/sun'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())("div", {
    tag: "false"
  }, "False 1"), status ? /* @__PURE__ */ Object(function webpackMissingModule() { var e = new Error("Cannot find module '../../dist/sun'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())("div", {
    tag: "true"
  }, "True 2") : null);
};
Object(function webpackMissingModule() { var e = new Error("Cannot find module '../../dist/sun'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())(/* @__PURE__ */ Object(function webpackMissingModule() { var e = new Error("Cannot find module '../../dist/sun'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())(App, null), document.querySelector(`#app2`));


/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("4a6bcdcfc9ba5f3de6a7")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=main.095efa6d69c4b0e2f14b.hot-update.js.map