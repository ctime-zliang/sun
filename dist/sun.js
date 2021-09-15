(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function() {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 528:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RECONCILE_EFFECT_TYPE = exports.NODE_TYPE = void 0;
exports.NODE_TYPE = {
    TEXT_NODE: 'TEXT_NODE',
};
exports.RECONCILE_EFFECT_TYPE = {
    NO_EFFECT: 'NO_EFFECT',
    UPDATE: 'UPDATE',
    PLACEMENT: 'PLACEMENT',
    DELETION: 'DELETION',
};


/***/ }),

/***/ 146:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getHook = void 0;
var runtime_profile_1 = __webpack_require__(429);
function getHook() {
    var alternate = runtime_profile_1.__RUNTIME_COMPT_PROFILE___.workInProgressFiberOfNowCompt.alternate;
    return alternate && alternate.hooks && alternate.hooks[runtime_profile_1.__RUNTIME_COMPT_PROFILE___.hookIndexOfNowCompt];
}
exports.getHook = getHook;


/***/ }),

/***/ 128:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.useState = void 0;
var runtime_profile_1 = __webpack_require__(429);
var utils_1 = __webpack_require__(974);
var hook_1 = __webpack_require__(146);
function useState(initValue) {
    var componentFiber = runtime_profile_1.__RUNTIME_COMPT_PROFILE___.workInProgressFiberOfNowCompt;
    var rootFiber = (0, utils_1.getRootFiber)(componentFiber);
    var oldHookOfCompt = (0, hook_1.getHook)();
    var hook = { state: oldHookOfCompt ? oldHookOfCompt.state : initValue, queue: [] };
    var actions = oldHookOfCompt ? oldHookOfCompt.queue : [];
    actions.forEach(function (item, index) {
        if (typeof item === 'function') {
            hook.state = item(hook.state);
            return;
        }
        hook.state = item;
    });
    var setState = function (action) {
        //@ts-ignore
        hook.queue.push(action);
        var newRootFiber = (0, utils_1.generateStructFiber)({
            stateNode: rootFiber.stateNode,
            type: rootFiber.type,
            props: rootFiber.props,
            alternate: rootFiber,
            dirty: true,
        }, {
            /*
                保留索引值
             */
            index: rootFiber.index,
            root: true,
        });
        runtime_profile_1.__RUNTIME_PROFILE___.rootFiberList.splice(rootFiber.index, 1, newRootFiber);
        runtime_profile_1.__RUNTIME_PROFILE___.fiberRoot.current = newRootFiber;
        runtime_profile_1.__RUNTIME_PROFILE___.nextWorkUnitFiber = newRootFiber;
    };
    componentFiber.hooks.push(hook);
    runtime_profile_1.__RUNTIME_COMPT_PROFILE___.hookIndexOfNowCompt++;
    return [hook.state, setState];
}
exports.useState = useState;


/***/ }),

/***/ 272:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.commitWork = void 0;
var config_1 = __webpack_require__(528);
var dom_1 = __webpack_require__(245);
function commitDom(fiber) {
    if (!fiber.stateNode) {
        return;
    }
    /*
        查找当前 fiber 对应的 DOM 或距离最近且存在 DOM 的 fiber 并返回该 fiber 的 DOM
     */
    var parentFiber = fiber.parent;
    while (!parentFiber.stateNode) {
        parentFiber = parentFiber.parent;
    }
    var referenceDom = parentFiber.stateNode;
    if (fiber.effectTag === config_1.RECONCILE_EFFECT_TYPE.PLACEMENT) {
        (0, dom_1.commitAppendChild)(fiber.stateNode, referenceDom);
    }
    else if (fiber.effectTag === config_1.RECONCILE_EFFECT_TYPE.DELETION) {
        (0, dom_1.commitDeleteChild)(fiber, referenceDom);
    }
    else if (fiber.effectTag === config_1.RECONCILE_EFFECT_TYPE.UPDATE) {
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
        /*
            深度遍历子节点
            如果该节点没有子节点, 则跳过
         */
        if (current.child && ((current = current.child), current)) {
            if (current.dirty) {
                commitDom(current);
                current.dirty = false;
            }
            continue;
        }
        if (current === root) {
            return;
        }
        /*
            对于外循环来讲, 会先检查当前节点是否存在兄弟节点
            如果存在兄弟节点, 则跳过
         */
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
        /*
            将指针跳转到下一个兄弟节点
            重新执行循环
         */
        current = current.sibling;
    }
}
exports.commitWork = commitWork;


/***/ }),

/***/ 245:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.updateDOM = exports.createDOM = exports.commitDeleteChild = exports.commitAppendChild = void 0;
var config_1 = __webpack_require__(528);
var utils_1 = __webpack_require__(974);
/**
 * 追加 DOM
 * @param {object} childDom 被追加的子节点
 * @param {object} parentDom 目标父节点
 * @return {htmlelement} 元素 HTMLElement 对象
 */
function commitAppendChild(childDom, parentDom) {
    parentDom.appendChild(childDom);
}
exports.commitAppendChild = commitAppendChild;
/**
 * 移除 DOM
 * @param {object} fiber fiber 节点对象
 * @param {object} parentDom 目标父节点
 * @return {htmlelement} 元素 HTMLElement 对象
 */
function commitDeleteChild(fiber, parentDom) {
    if (fiber.stateNode) {
        parentDom.removeChild(fiber.stateNode);
    }
    else {
        // commitDeletion(fiber.child, parentDom)
    }
}
exports.commitDeleteChild = commitDeleteChild;
/**
 * 创建 标准 DOM 对象
 * @param {object} fiber fiber 节点对象
 * @return {htmlelement} 元素 HTMLElement 对象
 */
function createDOM(fiber) {
    var dom = fiber.type === config_1.NODE_TYPE.TEXT_NODE ? document.createTextNode("") : document.createElement(fiber.type);
    updateDOM(dom, {}, fiber.props);
    return dom;
}
exports.createDOM = createDOM;
/**
 * 更新 DOM
 * @param {object} dom HTMLElement 节点对象
 * @param {object} oldProps Props 属性对象
 * @param {object} newProps Props 属性对象
 * @return {htmlelement} 元素 DOM 对象
 */
function updateDOM(dom, oldProps, newProps) {
    var systemEventOfOldProps = Object.keys(oldProps).filter(utils_1.isSystemEvent);
    var systemEventOfNewProps = Object.keys(newProps).filter(utils_1.isSystemEvent);
    var commPropsOfOldProps = Object.keys(oldProps).filter(utils_1.isProperty);
    var commPropsOfNewProps = Object.keys(newProps).filter(utils_1.isProperty);
    /*
        系统事件处理 - 移除
     */
    for (var i = 0; i < systemEventOfOldProps.length; i++) {
        var item = systemEventOfOldProps[i];
        if (!(item in newProps) || (0, utils_1.isNewly)(oldProps, newProps)(item)) {
            var eventType = item.toLowerCase().substring(2);
            dom.removeEventListener(eventType, oldProps[item]);
        }
    }
    /*
        删除旧属性
     */
    for (var i = 0; i < commPropsOfOldProps.length; i++) {
        var item = commPropsOfOldProps[i];
        if ((0, utils_1.isOld)(oldProps, newProps)(item)) {
            //@ts-ignore
            dom[item] = undefined;
            if (dom.removeAttribute) {
                dom.removeAttribute(item);
            }
        }
    }
    /*
        更新或写入新属性
     */
    for (var i = 0; i < commPropsOfNewProps.length; i++) {
        var item = commPropsOfNewProps[i];
        if ((0, utils_1.isNewly)(oldProps, newProps)(item)) {
            switch (item) {
                case 'style': {
                    if (Object.prototype.toString.call(newProps[item]).toLowerCase() === '[object object]') {
                        for (var attr in newProps[item]) {
                            //@ts-ignore
                            dom.style[attr] = newProps[item][attr];
                        }
                        break;
                    }
                    //@ts-ignore
                    dom[item] = newProps[item];
                    break;
                }
                case 'className': {
                    dom[item] = newProps[item];
                    break;
                }
                default: {
                    //@ts-ignore
                    dom[item] = newProps[item];
                    if (dom.setAttribute && typeof newProps[item] != 'undefined') {
                        dom.setAttribute(item, newProps[item]);
                    }
                }
            }
        }
    }
    /*
        系统事件处理 - 设置
     */
    for (var i = 0; i < systemEventOfNewProps.length; i++) {
        var item = systemEventOfNewProps[i];
        if ((0, utils_1.isNewly)(oldProps, newProps)(item)) {
            var eventType = item.toLowerCase().substring(2);
            dom.addEventListener(eventType, newProps[item]);
        }
    }
}
exports.updateDOM = updateDOM;


/***/ }),

/***/ 986:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.reconcileChilren = void 0;
var config_1 = __webpack_require__(528);
var utils_1 = __webpack_require__(974);
function reconcileChilren(wipFiber, deletions) {
    var children = wipFiber.props.children;
    /*
        需要清除上一轮更新完毕时保存的上上一轮的当前层 fiber 节点的引用
     */
    if (wipFiber.alternate && wipFiber.alternate.alternate) {
        wipFiber.alternate.alternate = null;
    }
    /*
        需要循环遍历当前 vDom 下的所有子节点
        作为参照对比, 此处读取上一轮更新完毕后该层 fiber 节点的第一个子节点
     */
    var oldFiberOfNowWIPFiber = wipFiber.alternate && wipFiber.alternate.child;
    var prevSiblingFiber = null;
    var i = 0;
    for (; i < children.length || oldFiberOfNowWIPFiber != null; i++) {
        var newChildFiber = null;
        if (!children[i]) {
            /*
                当 oldFiber 无法找到对应的新 fiber 时, 即代表需要删除该节点
             */
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
            /*
                之前存在的节点, 需要更新
             */
            newChildFiber = (0, utils_1.generateStructFiber)({
                stateNode: oldFiberOfNowWIPFiber.stateNode,
                type: element.type,
                props: element.props,
                parent: wipFiber,
                dirty: true,
                alternate: oldFiberOfNowWIPFiber,
                effectTag: config_1.RECONCILE_EFFECT_TYPE.UPDATE,
            });
        }
        if (!sameType) {
            /*
                之前不存在的节点, 需要置入
             */
            newChildFiber = (0, utils_1.generateStructFiber)({
                stateNode: null,
                type: element.type,
                props: element.props,
                parent: wipFiber,
                dirty: true,
                alternate: null,
                effectTag: config_1.RECONCILE_EFFECT_TYPE.PLACEMENT,
            });
        }
        if (!sameType && oldFiberOfNowWIPFiber) {
            oldFiberOfNowWIPFiber.effectTag = config_1.RECONCILE_EFFECT_TYPE.DELETION;
            oldFiberOfNowWIPFiber.dirty = true;
            deletions.push(oldFiberOfNowWIPFiber);
        }
        /*
            oldFiberOfNowWIPFiber 作为当前 wipFiber 的上一轮更新完毕后的镜像存储节点
            每轮循环中需随着循环进行, 后移到下一个兄弟节点
         */
        if (oldFiberOfNowWIPFiber) {
            oldFiberOfNowWIPFiber = oldFiberOfNowWIPFiber.sibling;
        }
        /*
            将第一个 child fiber 节点作为本次执行 reconcile 时传入的 fiber 节点的子节点
            
                    now-fiber
                    /
                   /
            newChildFiber -- nextNewChildFiber --

            且后续的 child fiber 节点将作为第一个 child fiber 节点的兄弟节点依次串联
        */
        if (i === 0) {
            wipFiber.child = newChildFiber;
        }
        else {
            //@ts-ignore
            prevSiblingFiber.sibling = newChildFiber;
        }
        //@ts-ignore
        prevSiblingFiber = newChildFiber;
    }
    return wipFiber;
}
exports.reconcileChilren = reconcileChilren;


/***/ }),

/***/ 816:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.performUnitWork = exports.initWorkLoop = void 0;
var runtime_profile_1 = __webpack_require__(429);
var commit_1 = __webpack_require__(272);
var reconcile_1 = __webpack_require__(986);
var dom_1 = __webpack_require__(245);
var utils_1 = __webpack_require__(974);
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
            /*
                暂存当前活动的应用的顶层 fiber(rootFiber)
                清除全局 fiberRoot 对该活动应用的 rootFiber 的引用
             */
            currentRootFiber = runtime_profile_1.__RUNTIME_PROFILE___.fiberRoot.current;
            runtime_profile_1.__RUNTIME_PROFILE___.fiberRoot.current = null;
            /*
                提交 DOM 操作
             */
            deletions.forEach(function (item) {
                (0, commit_1.commitWork)(item);
            });
            (0, commit_1.commitWork)(currentRootFiber.child);
            currentRootFiber.dirty = false;
            deletions.length = 0;
            console.log("Commit.Fiber ===>>>", currentRootFiber);
            /*
                检查并尝试执行下一个实例
             */
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
exports.initWorkLoop = initWorkLoop;
function performUnitWork(fiber, deletions) {
    if (!fiber.type) {
        return;
    }
    /*
        在首次 render 时, fiber 为当前应用所在的容器节点对应的 fiber, 视作非函数节点并处理
     */
    if ((0, utils_1.isFunctionComponent)(fiber)) {
        runtime_profile_1.__RUNTIME_COMPT_PROFILE___.workInProgressFiberOfNowCompt = fiber;
        runtime_profile_1.__RUNTIME_COMPT_PROFILE___.hookIndexOfNowCompt = 0;
        var children = [fiber.type.call(undefined, fiber.props)];
        fiber.props.children = children;
        (0, reconcile_1.reconcileChilren)(fiber, deletions);
    }
    else {
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
exports.performUnitWork = performUnitWork;


/***/ }),

/***/ 519:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.render = exports.createTextElement = exports.createElement = void 0;
var config_1 = __webpack_require__(528);
var runtime_profile_1 = __webpack_require__(429);
var scheduler_1 = __webpack_require__(816);
var utils_1 = __webpack_require__(974);
/*
    创建一个全局的 fiberRoot
    并设置其 current 指针指向当前活动(即 处于 mount 或 update 时)的应用的顶层 fiber
 */
runtime_profile_1.__RUNTIME_PROFILE___.fiberRoot = (0, utils_1.generateStructFiberRoot)({
    current: null,
});
/**
 * 创建 元素 VDOM
 * @param {string} type 元素标签名
 * @param {object} props 属性对象
 * @param {any} children 子节点列表
 * @return {htmlelement} 元素 VDOM
 */
function createElement(type, props) {
    var children = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        children[_i - 2] = arguments[_i];
    }
    //@ts-ignore
    var flatChildren = children.flat(Infinity); // or children.flat(1)
    return (0, utils_1.generateStructVDOM)(type, __assign(__assign({}, props), { children: flatChildren.map(function (child) {
            return typeof child === 'object' ? child : createTextElement(child);
        }) }));
}
exports.createElement = createElement;
/**
 * 创建 文本 VDOM
 * @param {string} text 文本内容
 * @return {htmlelement} 文本 VDOM
 */
function createTextElement(text) {
    return (0, utils_1.generateStructVDOM)(config_1.NODE_TYPE.TEXT_NODE, {
        nodeValue: text,
        children: [],
    });
}
exports.createTextElement = createTextElement;
var renderIndex = -1;
function render(element, container) {
    var rootFiber = (0, utils_1.generateStructFiber)({
        stateNode: container,
        type: container.nodeName.toLowerCase(),
        props: { children: [element] },
        alternate: null,
        dirty: true,
    }, {
        /*
            当前 fiber 的索引编号, 保证值与该 fiber 在 fiber-list 中的位置索引一致
         */
        index: ++renderIndex,
        root: true,
    });
    runtime_profile_1.__RUNTIME_PROFILE___.rootFiberList.push(rootFiber);
    if (!runtime_profile_1.__RUNTIME_PROFILE___.fiberRoot.current) {
        runtime_profile_1.__RUNTIME_PROFILE___.fiberRoot.current = rootFiber;
        runtime_profile_1.__RUNTIME_PROFILE___.nextWorkUnitFiber = rootFiber;
        console.log("Root.Fiber ===>>>", rootFiber);
        window.requestIdleCallback((0, scheduler_1.initWorkLoop)());
    }
}
exports.render = render;


/***/ }),

/***/ 429:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.__RUNTIME_COMPT_PROFILE___ = exports.__RUNTIME_PROFILE___ = void 0;
exports.__RUNTIME_PROFILE___ = {
    fiberRoot: null,
    rootFiber: null,
    rootFiberList: [],
    nextWorkUnitFiber: null,
};
exports.__RUNTIME_COMPT_PROFILE___ = {
    workInProgressFiberOfNowCompt: null,
    hookIndexOfNowCompt: 0,
};


/***/ }),

/***/ 974:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.syncBlock = exports.isFunctionComponent = exports.isApprovedComponent = exports.isSystemEvent = exports.isProperty = exports.isOld = exports.isNewly = exports.getRootFiber = exports.generateStructFiberRoot = exports.generateStructFiber = exports.generateStructVDOM = void 0;
var config_1 = __webpack_require__(528);
function generateStructVDOM(type, props) {
    return {
        type: type,
        props: props,
    };
}
exports.generateStructVDOM = generateStructVDOM;
/*
    root = {
        root: boolean
    }
 */
function generateStructFiber(args, root) {
    if (args === void 0) { args = {}; }
    if (root === void 0) { root = {}; }
    var defaults = {
        /*
            VDOM 属性/fiber 链表节点属性
        */
        /*
            FunctionComponent = 函数本身
            ClassComponent = class
            HostComponent = DOM节点 tagName
        */
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
        /*
            hooks
        */
        hooks: [],
    };
    return __assign(__assign(__assign({}, defaults), args), root);
}
exports.generateStructFiber = generateStructFiber;
function generateStructFiberRoot(args) {
    if (args === void 0) { args = {}; }
    var defaults = {
        current: null,
    };
    return __assign(__assign({}, defaults), args);
}
exports.generateStructFiberRoot = generateStructFiberRoot;
function getRootFiber(fiber) {
    var rootFiber = fiber;
    while (!rootFiber.root) {
        rootFiber = rootFiber.parent;
    }
    return rootFiber;
}
exports.getRootFiber = getRootFiber;
function isNewly(oldObj, newObj) {
    return function (key) {
        return oldObj[key] !== newObj[key];
    };
}
exports.isNewly = isNewly;
function isOld(oldObj, newObj) {
    return function (key) {
        return !(key in newObj);
    };
}
exports.isOld = isOld;
function isProperty(key) {
    return !['children'].includes(key) && !(key[0] === 'o' && key[1] === 'n');
}
exports.isProperty = isProperty;
function isSystemEvent(key) {
    return key[0] === 'o' && key[1] === 'n';
}
exports.isSystemEvent = isSystemEvent;
function isApprovedComponent(fiber) {
    return fiber.type != null || typeof fiber.type != 'undefined';
}
exports.isApprovedComponent = isApprovedComponent;
function isFunctionComponent(fiber) {
    return fiber && fiber.type && fiber.type instanceof Function;
}
exports.isFunctionComponent = isFunctionComponent;
function syncBlock(delay) {
    if (delay === void 0) { delay = 1000; }
    var end = new Date().getTime() + delay;
    while (new Date().getTime() < end) { }
}
exports.syncBlock = syncBlock;


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
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;
var __webpack_unused_export__;

__webpack_unused_export__ = ({ value: true });
__webpack_unused_export__ = __webpack_unused_export__ = void 0;
var main_1 = __webpack_require__(519);
var use_state_1 = __webpack_require__(128);
var Sun = Object.create(null);
Sun.createElement = main_1.createElement;
Sun.createTextElement = main_1.createTextElement;
Sun.render = main_1.render;
Sun.useState = use_state_1.useState;
__webpack_unused_export__ = main_1.render;
__webpack_unused_export__ = use_state_1.useState;
exports["default"] = Sun;

})();

__webpack_exports__ = __webpack_exports__["default"];
/******/ 	return __webpack_exports__;
/******/ })()
;
});