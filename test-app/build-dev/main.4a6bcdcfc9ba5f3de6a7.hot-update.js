self["webpackHotUpdatesun"]("main",{

/***/ "./dist/sun.js":
/*!*********************!*\
  !*** ./dist/sun.js ***!
  \*********************/
/***/ (function(module) {

(function webpackUniversalModuleDefinition(root, factory) {
  if (true)
    module.exports = factory();
  else { var i, a; }
})(this, function() {
  return (() => {
    "use strict";
    var __webpack_modules__ = {
      528: (__unused_webpack_module, exports2) => {
        Object.defineProperty(exports2, "__esModule", { value: true });
        exports2.RECONCILE_EFFECT_TYPE = exports2.NODE_TYPE = void 0;
        exports2.NODE_TYPE = {
          TEXT_NODE: "TEXT_NODE"
        };
        exports2.RECONCILE_EFFECT_TYPE = {
          NO_EFFECT: "NO_EFFECT",
          UPDATE: "UPDATE",
          PLACEMENT: "PLACEMENT",
          DELETION: "DELETION"
        };
      },
      146: (__unused_webpack_module, exports2, __webpack_require__2) => {
        Object.defineProperty(exports2, "__esModule", { value: true });
        exports2.getHook = void 0;
        var runtime_profile_1 = __webpack_require__2(429);
        function getHook() {
          var alternate = runtime_profile_1.__RUNTIME_COMPT_PROFILE___.workInProgressFiberOfNowCompt.alternate;
          return alternate && alternate.hooks && alternate.hooks[runtime_profile_1.__RUNTIME_COMPT_PROFILE___.hookIndexOfNowCompt];
        }
        exports2.getHook = getHook;
      },
      128: (__unused_webpack_module, exports2, __webpack_require__2) => {
        Object.defineProperty(exports2, "__esModule", { value: true });
        exports2.useState = void 0;
        var runtime_profile_1 = __webpack_require__2(429);
        var utils_1 = __webpack_require__2(974);
        var hook_1 = __webpack_require__2(146);
        function useState(initValue) {
          var componentFiber = runtime_profile_1.__RUNTIME_COMPT_PROFILE___.workInProgressFiberOfNowCompt;
          var rootFiber = (0, utils_1.getRootFiber)(componentFiber);
          var oldHookOfCompt = (0, hook_1.getHook)();
          var hook = { state: oldHookOfCompt ? oldHookOfCompt.state : initValue, queue: [] };
          var actions = oldHookOfCompt ? oldHookOfCompt.queue : [];
          actions.forEach(function(item, index) {
            if (typeof item === "function") {
              hook.state = item(hook.state);
              return;
            }
            hook.state = item;
          });
          var setState = function(action) {
            hook.queue.push(action);
            var newRootFiber = (0, utils_1.generateStructFiber)({
              stateNode: rootFiber.stateNode,
              type: rootFiber.type,
              props: rootFiber.props,
              alternate: rootFiber,
              dirty: true
            }, {
              index: rootFiber.index,
              root: true
            });
            runtime_profile_1.__RUNTIME_PROFILE___.rootFiberList.splice(rootFiber.index, 1, newRootFiber);
            runtime_profile_1.__RUNTIME_PROFILE___.fiberRoot.current = newRootFiber;
            runtime_profile_1.__RUNTIME_PROFILE___.nextWorkUnitFiber = newRootFiber;
          };
          componentFiber.hooks.push(hook);
          runtime_profile_1.__RUNTIME_COMPT_PROFILE___.hookIndexOfNowCompt++;
          return [hook.state, setState];
        }
        exports2.useState = useState;
      },
      272: (__unused_webpack_module, exports2, __webpack_require__2) => {
        Object.defineProperty(exports2, "__esModule", { value: true });
        exports2.commitWork = void 0;
        var config_1 = __webpack_require__2(528);
        var dom_1 = __webpack_require__2(245);
        function commitDom(fiber) {
          if (!fiber.stateNode) {
            return;
          }
          var parentFiber = fiber.parent;
          while (!parentFiber.stateNode) {
            parentFiber = parentFiber.parent;
          }
          var referenceDom = parentFiber.stateNode;
          if (fiber.effectTag === config_1.RECONCILE_EFFECT_TYPE.PLACEMENT) {
            (0, dom_1.commitAppendChild)(fiber.stateNode, referenceDom);
          } else if (fiber.effectTag === config_1.RECONCILE_EFFECT_TYPE.DELETION) {
            (0, dom_1.commitDeleteChild)(fiber, referenceDom);
          } else if (fiber.effectTag === config_1.RECONCILE_EFFECT_TYPE.UPDATE) {
            (0, dom_1.updateDOM)(fiber.stateNode, fiber.alternate.props, fiber.props);
          }
        }
        function commitWork(fiber) {
          if (!fiber) {
            return;
          }
          var root = fiber;
          var current = fiber;
          while (current) {
            if (current.dirty) {
              commitDom(current);
              current.dirty = false;
            }
            if (current.child && (current = current.child, current)) {
              if (current.dirty) {
                commitDom(current);
                current.dirty = false;
              }
              continue;
            }
            if (current === root) {
              return;
            }
            while (!current.sibling) {
              if (!current.parent || current.parent === root) {
                return;
              }
              if (current.dirty) {
                commitDom(current);
                current.dirty = false;
              }
              current = current.parent;
            }
            current = current.sibling;
          }
        }
        exports2.commitWork = commitWork;
      },
      245: (__unused_webpack_module, exports2, __webpack_require__2) => {
        Object.defineProperty(exports2, "__esModule", { value: true });
        exports2.updateDOM = exports2.createDOM = exports2.commitDeleteChild = exports2.commitAppendChild = void 0;
        var config_1 = __webpack_require__2(528);
        var utils_1 = __webpack_require__2(974);
        function commitAppendChild(childDom, parentDom) {
          parentDom.appendChild(childDom);
        }
        exports2.commitAppendChild = commitAppendChild;
        function commitDeleteChild(fiber, parentDom) {
          if (fiber.stateNode) {
            parentDom.removeChild(fiber.stateNode);
          } else {
          }
        }
        exports2.commitDeleteChild = commitDeleteChild;
        function createDOM(fiber) {
          var dom = fiber.type === config_1.NODE_TYPE.TEXT_NODE ? document.createTextNode("") : document.createElement(fiber.type);
          updateDOM(dom, {}, fiber.props);
          return dom;
        }
        exports2.createDOM = createDOM;
        function updateDOM(dom, oldProps, newProps) {
          var systemEventOfOldProps = Object.keys(oldProps).filter(utils_1.isSystemEvent);
          var systemEventOfNewProps = Object.keys(newProps).filter(utils_1.isSystemEvent);
          var commPropsOfOldProps = Object.keys(oldProps).filter(utils_1.isProperty);
          var commPropsOfNewProps = Object.keys(newProps).filter(utils_1.isProperty);
          for (var i = 0; i < systemEventOfOldProps.length; i++) {
            var item = systemEventOfOldProps[i];
            if (!(item in newProps) || (0, utils_1.isNewly)(oldProps, newProps)(item)) {
              var eventType = item.toLowerCase().substring(2);
              dom.removeEventListener(eventType, oldProps[item]);
            }
          }
          for (var i = 0; i < commPropsOfOldProps.length; i++) {
            var item = commPropsOfOldProps[i];
            if ((0, utils_1.isOld)(oldProps, newProps)(item)) {
              dom[item] = void 0;
              if (dom.removeAttribute) {
                dom.removeAttribute(item);
              }
            }
          }
          for (var i = 0; i < commPropsOfNewProps.length; i++) {
            var item = commPropsOfNewProps[i];
            if ((0, utils_1.isNewly)(oldProps, newProps)(item)) {
              switch (item) {
                case "style": {
                  if (Object.prototype.toString.call(newProps[item]).toLowerCase() === "[object object]") {
                    for (var attr in newProps[item]) {
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
          for (var i = 0; i < systemEventOfNewProps.length; i++) {
            var item = systemEventOfNewProps[i];
            if ((0, utils_1.isNewly)(oldProps, newProps)(item)) {
              var eventType = item.toLowerCase().substring(2);
              dom.addEventListener(eventType, newProps[item]);
            }
          }
        }
        exports2.updateDOM = updateDOM;
      },
      986: (__unused_webpack_module, exports2, __webpack_require__2) => {
        Object.defineProperty(exports2, "__esModule", { value: true });
        exports2.reconcileChilren = void 0;
        var config_1 = __webpack_require__2(528);
        var utils_1 = __webpack_require__2(974);
        function reconcileChilren(wipFiber, deletions) {
          var children = wipFiber.props.children;
          if (wipFiber.alternate && wipFiber.alternate.alternate) {
            wipFiber.alternate.alternate = null;
          }
          var oldFiberOfNowWIPFiber = wipFiber.alternate && wipFiber.alternate.child;
          var prevSiblingFiber = null;
          var i = 0;
          for (; i < children.length || oldFiberOfNowWIPFiber != null; i++) {
            var newChildFiber = null;
            if (!children[i]) {
              if (oldFiberOfNowWIPFiber) {
                oldFiberOfNowWIPFiber.effectTag = config_1.RECONCILE_EFFECT_TYPE.DELETION;
                oldFiberOfNowWIPFiber.dirty = true;
                deletions.push(oldFiberOfNowWIPFiber);
                oldFiberOfNowWIPFiber = oldFiberOfNowWIPFiber.sibling;
              }
              continue;
            }
            var element = children[i];
            var sameType = !!(oldFiberOfNowWIPFiber && element.type == oldFiberOfNowWIPFiber.type);
            if (sameType) {
              newChildFiber = (0, utils_1.generateStructFiber)({
                stateNode: oldFiberOfNowWIPFiber.stateNode,
                type: element.type,
                props: element.props,
                parent: wipFiber,
                dirty: true,
                alternate: oldFiberOfNowWIPFiber,
                effectTag: config_1.RECONCILE_EFFECT_TYPE.UPDATE
              });
            }
            if (!sameType) {
              newChildFiber = (0, utils_1.generateStructFiber)({
                stateNode: null,
                type: element.type,
                props: element.props,
                parent: wipFiber,
                dirty: true,
                alternate: null,
                effectTag: config_1.RECONCILE_EFFECT_TYPE.PLACEMENT
              });
            }
            if (!sameType && oldFiberOfNowWIPFiber) {
              oldFiberOfNowWIPFiber.effectTag = config_1.RECONCILE_EFFECT_TYPE.DELETION;
              oldFiberOfNowWIPFiber.dirty = true;
              deletions.push(oldFiberOfNowWIPFiber);
            }
            if (oldFiberOfNowWIPFiber) {
              oldFiberOfNowWIPFiber = oldFiberOfNowWIPFiber.sibling;
            }
            if (i === 0) {
              wipFiber.child = newChildFiber;
            } else {
              prevSiblingFiber.sibling = newChildFiber;
            }
            prevSiblingFiber = newChildFiber;
          }
          return wipFiber;
        }
        exports2.reconcileChilren = reconcileChilren;
      },
      816: (__unused_webpack_module, exports2, __webpack_require__2) => {
        Object.defineProperty(exports2, "__esModule", { value: true });
        exports2.performUnitWork = exports2.initWorkLoop = void 0;
        var runtime_profile_1 = __webpack_require__2(429);
        var commit_1 = __webpack_require__2(272);
        var reconcile_1 = __webpack_require__2(986);
        var dom_1 = __webpack_require__2(245);
        var utils_1 = __webpack_require__2(974);
        function initWorkLoop() {
          var deletions = [];
          var currentRootFiber = null;
          function workLoop(deadline) {
            var shouldYield = false;
            while (runtime_profile_1.__RUNTIME_PROFILE___.nextWorkUnitFiber && !shouldYield) {
              runtime_profile_1.__RUNTIME_PROFILE___.nextWorkUnitFiber = performUnitWork(runtime_profile_1.__RUNTIME_PROFILE___.nextWorkUnitFiber, deletions);
              shouldYield = deadline.timeRemaining() < 1;
            }
            if (!runtime_profile_1.__RUNTIME_PROFILE___.nextWorkUnitFiber && runtime_profile_1.__RUNTIME_PROFILE___.fiberRoot.current) {
              currentRootFiber = runtime_profile_1.__RUNTIME_PROFILE___.fiberRoot.current;
              runtime_profile_1.__RUNTIME_PROFILE___.fiberRoot.current = null;
              deletions.forEach(function(item) {
                (0, commit_1.commitWork)(item);
              });
              (0, commit_1.commitWork)(currentRootFiber.child);
              currentRootFiber.dirty = false;
              deletions.length = 0;
              console.log("Commit.Fiber ===>>>", currentRootFiber);
              var nextRootFiber = runtime_profile_1.__RUNTIME_PROFILE___.rootFiberList[currentRootFiber.index + 1] || null;
              if (nextRootFiber && nextRootFiber.dirty) {
                runtime_profile_1.__RUNTIME_PROFILE___.nextWorkUnitFiber = nextRootFiber;
                runtime_profile_1.__RUNTIME_PROFILE___.fiberRoot.current = nextRootFiber;
              }
            }
            window.requestIdleCallback(workLoop);
          }
          return workLoop;
        }
        exports2.initWorkLoop = initWorkLoop;
        function performUnitWork(fiber, deletions) {
          if (!fiber.type) {
            return;
          }
          if ((0, utils_1.isFunctionComponent)(fiber)) {
            runtime_profile_1.__RUNTIME_COMPT_PROFILE___.workInProgressFiberOfNowCompt = fiber;
            runtime_profile_1.__RUNTIME_COMPT_PROFILE___.hookIndexOfNowCompt = 0;
            var children = [fiber.type.call(void 0, fiber.props)];
            fiber.props.children = children;
            (0, reconcile_1.reconcileChilren)(fiber, deletions);
          } else {
            if (!fiber.stateNode) {
              fiber.stateNode = (0, dom_1.createDOM)(fiber);
            }
            (0, reconcile_1.reconcileChilren)(fiber, deletions);
          }
          if (fiber.child) {
            return fiber.child;
          }
          while (fiber) {
            if (fiber.sibling) {
              return fiber.sibling;
            }
            fiber = fiber.parent;
          }
          return null;
        }
        exports2.performUnitWork = performUnitWork;
      },
      519: function(__unused_webpack_module, exports2, __webpack_require__2) {
        var __assign = this && this.__assign || function() {
          __assign = Object.assign || function(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
              s = arguments[i];
              for (var p in s)
                if (Object.prototype.hasOwnProperty.call(s, p))
                  t[p] = s[p];
            }
            return t;
          };
          return __assign.apply(this, arguments);
        };
        Object.defineProperty(exports2, "__esModule", { value: true });
        exports2.render = exports2.createTextElement = exports2.createElement = void 0;
        var config_1 = __webpack_require__2(528);
        var runtime_profile_1 = __webpack_require__2(429);
        var scheduler_1 = __webpack_require__2(816);
        var utils_1 = __webpack_require__2(974);
        runtime_profile_1.__RUNTIME_PROFILE___.fiberRoot = (0, utils_1.generateStructFiberRoot)({
          current: null
        });
        function createElement(type, props) {
          var children = [];
          for (var _i = 2; _i < arguments.length; _i++) {
            children[_i - 2] = arguments[_i];
          }
          var flatChildren = children.flat(Infinity);
          return (0, utils_1.generateStructVDOM)(type, __assign(__assign({}, props), { children: flatChildren.map(function(child) {
            return typeof child === "object" ? child : createTextElement(child);
          }) }));
        }
        exports2.createElement = createElement;
        function createTextElement(text) {
          return (0, utils_1.generateStructVDOM)(config_1.NODE_TYPE.TEXT_NODE, {
            nodeValue: text,
            children: []
          });
        }
        exports2.createTextElement = createTextElement;
        var renderIndex = -1;
        function render(element, container) {
          var rootFiber = (0, utils_1.generateStructFiber)({
            stateNode: container,
            type: container.nodeName.toLowerCase(),
            props: { children: [element] },
            alternate: null,
            dirty: true
          }, {
            index: ++renderIndex,
            root: true
          });
          runtime_profile_1.__RUNTIME_PROFILE___.rootFiberList.push(rootFiber);
          if (!runtime_profile_1.__RUNTIME_PROFILE___.fiberRoot.current) {
            runtime_profile_1.__RUNTIME_PROFILE___.fiberRoot.current = rootFiber;
            runtime_profile_1.__RUNTIME_PROFILE___.nextWorkUnitFiber = rootFiber;
            console.log("Root.Fiber ===>>>", rootFiber);
            window.requestIdleCallback((0, scheduler_1.initWorkLoop)());
          }
        }
        exports2.render = render;
      },
      429: (__unused_webpack_module, exports2) => {
        Object.defineProperty(exports2, "__esModule", { value: true });
        exports2.__RUNTIME_COMPT_PROFILE___ = exports2.__RUNTIME_PROFILE___ = void 0;
        exports2.__RUNTIME_PROFILE___ = {
          fiberRoot: null,
          rootFiber: null,
          rootFiberList: [],
          nextWorkUnitFiber: null
        };
        exports2.__RUNTIME_COMPT_PROFILE___ = {
          workInProgressFiberOfNowCompt: null,
          hookIndexOfNowCompt: 0
        };
      },
      974: function(__unused_webpack_module, exports2, __webpack_require__2) {
        var __assign = this && this.__assign || function() {
          __assign = Object.assign || function(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
              s = arguments[i];
              for (var p in s)
                if (Object.prototype.hasOwnProperty.call(s, p))
                  t[p] = s[p];
            }
            return t;
          };
          return __assign.apply(this, arguments);
        };
        Object.defineProperty(exports2, "__esModule", { value: true });
        exports2.syncBlock = exports2.isFunctionComponent = exports2.isApprovedComponent = exports2.isSystemEvent = exports2.isProperty = exports2.isOld = exports2.isNewly = exports2.getRootFiber = exports2.generateStructFiberRoot = exports2.generateStructFiber = exports2.generateStructVDOM = void 0;
        var config_1 = __webpack_require__2(528);
        function generateStructVDOM(type, props) {
          return {
            type,
            props
          };
        }
        exports2.generateStructVDOM = generateStructVDOM;
        function generateStructFiber(args, root) {
          if (args === void 0) {
            args = {};
          }
          if (root === void 0) {
            root = {};
          }
          var defaults = {
            type: null,
            elementType: null,
            stateNode: null,
            props: null,
            child: null,
            parent: null,
            sibling: null,
            alternate: null,
            effectTag: config_1.RECONCILE_EFFECT_TYPE.NO_EFFECT,
            key: null,
            dirty: false,
            hooks: []
          };
          return __assign(__assign(__assign({}, defaults), args), root);
        }
        exports2.generateStructFiber = generateStructFiber;
        function generateStructFiberRoot(args) {
          if (args === void 0) {
            args = {};
          }
          var defaults = {
            current: null
          };
          return __assign(__assign({}, defaults), args);
        }
        exports2.generateStructFiberRoot = generateStructFiberRoot;
        function getRootFiber(fiber) {
          var rootFiber = fiber;
          while (!rootFiber.root) {
            rootFiber = rootFiber.parent;
          }
          return rootFiber;
        }
        exports2.getRootFiber = getRootFiber;
        function isNewly(oldObj, newObj) {
          return function(key) {
            return oldObj[key] !== newObj[key];
          };
        }
        exports2.isNewly = isNewly;
        function isOld(oldObj, newObj) {
          return function(key) {
            return !(key in newObj);
          };
        }
        exports2.isOld = isOld;
        function isProperty(key) {
          return !["children"].includes(key) && !(key[0] === "o" && key[1] === "n");
        }
        exports2.isProperty = isProperty;
        function isSystemEvent(key) {
          return key[0] === "o" && key[1] === "n";
        }
        exports2.isSystemEvent = isSystemEvent;
        function isApprovedComponent(fiber) {
          return fiber.type != null || typeof fiber.type != "undefined";
        }
        exports2.isApprovedComponent = isApprovedComponent;
        function isFunctionComponent(fiber) {
          return fiber && fiber.type && fiber.type instanceof Function;
        }
        exports2.isFunctionComponent = isFunctionComponent;
        function syncBlock(delay) {
          if (delay === void 0) {
            delay = 1e3;
          }
          var end = new Date().getTime() + delay;
          while (new Date().getTime() < end) {
          }
        }
        exports2.syncBlock = syncBlock;
      }
    };
    var __webpack_module_cache__ = {};
    function __nested_webpack_require_22229__(moduleId) {
      var cachedModule = __webpack_module_cache__[moduleId];
      if (cachedModule !== void 0) {
        return cachedModule.exports;
      }
      var module2 = __webpack_module_cache__[moduleId] = {
        exports: {}
      };
      __webpack_modules__[moduleId].call(module2.exports, module2, module2.exports, __nested_webpack_require_22229__);
      return module2.exports;
    }
    var __webpack_exports__ = {};
    (() => {
      var exports2 = __webpack_exports__;
      var __webpack_unused_export__;
      __webpack_unused_export__ = { value: true };
      __webpack_unused_export__ = __webpack_unused_export__ = void 0;
      var main_1 = __nested_webpack_require_22229__(519);
      var use_state_1 = __nested_webpack_require_22229__(128);
      var Sun = Object.create(null);
      Sun.createElement = main_1.createElement;
      Sun.createTextElement = main_1.createTextElement;
      Sun.render = main_1.render;
      Sun.useState = use_state_1.useState;
      __webpack_unused_export__ = main_1.render;
      __webpack_unused_export__ = use_state_1.useState;
      exports2["default"] = Sun;
    })();
    __webpack_exports__ = __webpack_exports__["default"];
    return __webpack_exports__;
  })();
});


/***/ }),

/***/ "./test-app/src/index.jsx":
/*!********************************!*\
  !*** ./test-app/src/index.jsx ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
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
/******/ /* webpack/runtime/compat get default export */
/******/ (() => {
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = (module) => {
/******/ 		var getter = module && module.__esModule ?
/******/ 			() => (module['default']) :
/******/ 			() => (module);
/******/ 		__webpack_require__.d(getter, { a: getter });
/******/ 		return getter;
/******/ 	};
/******/ })();
/******/ 
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("6d7e4fd706413d828eee")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=main.4a6bcdcfc9ba5f3de6a7.hot-update.js.map