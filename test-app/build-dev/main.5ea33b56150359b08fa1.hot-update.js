self['webpackHotUpdatesun'](
	'main',
	{
		/***/ './dist/sun.js':
			/*!*********************!*\
  !*** ./dist/sun.js ***!
  \*********************/
			/***/ module => {
				!(function (e, t) {
					if (true) module.exports = t()
					else {
						var o, r
					}
				})(self, function () {
					return (() => {
						'use strict'
						var e = {
								d: (t2, r2) => {
									for (var o2 in r2) e.o(r2, o2) && !e.o(t2, o2) && Object.defineProperty(t2, o2, { enumerable: true, get: r2[o2] })
								},
								o: (e2, t2) => Object.prototype.hasOwnProperty.call(e2, t2),
							},
							t = {}
						e.d(t, { default: () => A })
						const r = 'TEXT_NODE',
							o = 'UPDATE',
							n = 'PLACEMENT',
							i = 'DELETION',
							l = { fiberRoot: null, rootFiber: null, rootFiberList: [], nextWorkUnitFiber: null },
							s = { workInProgressFiberOfNowCompt: null, hookIndexOfNowCompt: 0 }
						var c = Object.defineProperty,
							a = Object.getOwnPropertySymbols,
							u = Object.prototype.hasOwnProperty,
							f = Object.prototype.propertyIsEnumerable,
							p = (e2, t2, r2) =>
								t2 in e2 ? c(e2, t2, { enumerable: true, configurable: true, writable: true, value: r2 }) : (e2[t2] = r2),
							d = (e2, t2) => {
								for (var r2 in t2 || (t2 = {})) u.call(t2, r2) && p(e2, r2, t2[r2])
								if (a) for (var r2 of a(t2)) f.call(t2, r2) && p(e2, r2, t2[r2])
								return e2
							}
						function b(e2, t2) {
							return { type: e2, props: t2 }
						}
						function y(e2, t2 = {}) {
							return d(
								d(
									d(
										{},
										{
											type: null,
											elementType: null,
											stateNode: null,
											props: null,
											child: null,
											parent: null,
											sibling: null,
											alternate: null,
											effectTag: 'NO_EFFECT',
											key: null,
											dirty: false,
											hooks: [],
										}
									),
									e2
								),
								t2
							)
						}
						function h(e2, t2) {
							return r2 => e2[r2] !== t2[r2]
						}
						function g(e2, t2) {
							return e3 => !(e3 in t2)
						}
						function m(e2) {
							return !(['children'].includes(e2) || (e2[0] === 'o' && e2[1] === 'n'))
						}
						function O(e2) {
							return e2[0] === 'o' && e2[1] === 'n'
						}
						function N(e2, t2, r2) {
							const o2 = Object.keys(t2).filter(O),
								n2 = Object.keys(r2).filter(O),
								i2 = Object.keys(t2).filter(m),
								l2 = Object.keys(r2).filter(m)
							for (let n3 = 0; n3 < o2.length; n3++) {
								const i3 = o2[n3]
								if (!(i3 in r2) || h(t2, r2)(i3)) {
									const r3 = i3.toLowerCase().substring(2)
									e2.removeEventListener(r3, t2[i3])
								}
							}
							for (let t3 = 0; t3 < i2.length; t3++) {
								const o3 = i2[t3]
								g(0, r2)(o3) && ((e2[o3] = void 0), e2.removeAttribute && e2.removeAttribute(o3))
							}
							for (let o3 = 0; o3 < l2.length; o3++) {
								const n3 = l2[o3]
								if (h(t2, r2)(n3))
									switch (n3) {
										case 'style':
											if (Object.prototype.toString.call(r2[n3]).toLowerCase() === '[object object]') {
												for (let t3 in r2[n3]) e2.style[t3] = r2[n3][t3]
												break
											}
											e2[n3] = r2[n3]
											break
										case 'className':
											e2[n3] = r2[n3]
											break
										default:
											;(e2[n3] = r2[n3]), e2.setAttribute && r2[n3] !== void 0 && e2.setAttribute(n3, r2[n3])
									}
							}
							for (let o3 = 0; o3 < n2.length; o3++) {
								const i3 = n2[o3]
								if (h(t2, r2)(i3)) {
									const t3 = i3.toLowerCase().substring(2)
									e2.addEventListener(t3, r2[i3])
								}
							}
						}
						function k(e2) {
							if (!e2.stateNode) return
							let t2 = e2.parent
							for (; !t2.stateNode; ) t2 = t2.parent
							const r2 = t2.stateNode
							var l2
							e2.effectTag === n
								? ((l2 = e2.stateNode), r2.appendChild(l2))
								: e2.effectTag === i
								? (function (e3, t3) {
										e3.stateNode ? t3.removeChild(e3.stateNode) : commitDeletion(e3.child, t3)
								  })(e2, r2)
								: e2.effectTag === o && N(e2.stateNode, e2.alternate.props, e2.props)
						}
						function w(e2) {
							if (!e2) return
							let t2 = e2,
								r2 = e2
							for (; r2; )
								if ((r2.dirty && (k(r2), (r2.dirty = false)), r2.child && ((r2 = r2.child), r2)))
									r2.dirty && (k(r2), (r2.dirty = false))
								else {
									if (r2 === t2) return
									for (; !r2.sibling; ) {
										if (!r2.parent || r2.parent === t2) return
										r2.dirty && (k(r2), (r2.dirty = false)), (r2 = r2.parent)
									}
									r2 = r2.sibling
								}
						}
						function j(e2, t2) {
							const r2 = e2.props.children
							e2.alternate && e2.alternate.alternate && (e2.alternate.alternate = null)
							let l2 = e2.alternate && e2.alternate.child,
								s2 = null,
								c2 = 0
							for (; c2 < r2.length || l2 != null; c2++) {
								let a2 = null
								if (!r2[c2]) {
									l2 && ((l2.effectTag = i), (l2.dirty = true), t2.push(l2), (l2 = l2.sibling))
									continue
								}
								const u2 = r2[c2],
									f2 = !(!l2 || u2.type != l2.type)
								f2 &&
									(a2 = y({
										stateNode: l2.stateNode,
										type: u2.type,
										props: u2.props,
										parent: e2,
										dirty: true,
										alternate: l2,
										effectTag: o,
									})),
									f2 ||
										(a2 = y({
											stateNode: null,
											type: u2.type,
											props: u2.props,
											parent: e2,
											dirty: true,
											alternate: null,
											effectTag: n,
										})),
									!f2 && l2 && ((l2.effectTag = i), (l2.dirty = true), t2.push(l2)),
									l2 && (l2 = l2.sibling),
									c2 === 0 ? (e2.child = a2) : (s2.sibling = a2),
									(s2 = a2)
							}
							return e2
						}
						function v(e2, t2) {
							if (e2.type) {
								if (
									(function (e3) {
										return e3 && e3.type && e3.type instanceof Function
									})(e2)
								) {
									;(s.workInProgressFiberOfNowCompt = e2), (s.hookIndexOfNowCompt = 0)
									const r2 = [e2.type.call(void 0, e2.props)]
									;(e2.props.children = r2), j(e2, t2)
								} else
									e2.stateNode ||
										(e2.stateNode = (function (e3) {
											const t3 = e3.type === r ? document.createTextNode('') : document.createElement(e3.type)
											return N(t3, {}, e3.props), t3
										})(e2)),
										j(e2, t2)
								if (e2.child) return e2.child
								for (; e2; ) {
									if (e2.sibling) return e2.sibling
									e2 = e2.parent
								}
								return null
							}
						}
						var x,
							F = Object.defineProperty,
							C = Object.defineProperties,
							E = Object.getOwnPropertyDescriptors,
							T = Object.getOwnPropertySymbols,
							P = Object.prototype.hasOwnProperty,
							I = Object.prototype.propertyIsEnumerable,
							L = (e2, t2, r2) =>
								t2 in e2 ? F(e2, t2, { enumerable: true, configurable: true, writable: true, value: r2 }) : (e2[t2] = r2)
						function R(e2) {
							return b(r, { nodeValue: e2, children: [] })
						}
						l.fiberRoot = ((x = { current: null }), d(d({}, { current: null }), x))
						let U = -1
						const W = Object.create(null)
						;(W.createElement = function (e2, t2, ...r2) {
							const o2 = r2.flat(1 / 0)
							return b(
								e2,
								((n2 = ((e3, t3) => {
									for (var r3 in t3 || (t3 = {})) P.call(t3, r3) && L(e3, r3, t3[r3])
									if (T) for (var r3 of T(t3)) I.call(t3, r3) && L(e3, r3, t3[r3])
									return e3
								})({}, t2)),
								(i2 = { children: o2.map(e3 => (typeof e3 == 'object' ? e3 : R(e3))) }),
								C(n2, E(i2)))
							)
							var n2, i2
						}),
							(W.createTextElement = R),
							(W.render = function (e2, t2) {
								const r2 = y(
									{ stateNode: t2, type: t2.nodeName.toLowerCase(), props: { children: [e2] }, alternate: null, dirty: true },
									{ index: ++U, root: true }
								)
								l.rootFiberList.push(r2),
									l.fiberRoot.current ||
										((l.fiberRoot.current = r2),
										(l.nextWorkUnitFiber = r2),
										console.log('Root.Fiber ===>>>', r2),
										window.requestIdleCallback(
											(function () {
												let e3 = [],
													t3 = null
												return function r3(o2) {
													let n2 = false
													for (; l.nextWorkUnitFiber && !n2; )
														(l.nextWorkUnitFiber = v(l.nextWorkUnitFiber, e3)), (n2 = o2.timeRemaining() < 1)
													if (!l.nextWorkUnitFiber && l.fiberRoot.current) {
														;(t3 = l.fiberRoot.current),
															(l.fiberRoot.current = null),
															e3.forEach(e4 => {
																w(e4)
															}),
															w(t3.child),
															(t3.dirty = false),
															(e3.length = 0),
															console.log('Commit.Fiber ===>>>', t3)
														const r4 = l.rootFiberList[t3.index + 1] || null
														r4 && r4.dirty && ((l.nextWorkUnitFiber = r4), (l.fiberRoot.current = r4))
													}
													window.requestIdleCallback(r3)
												}
											})()
										))
							}),
							(W.useState = function (e2) {
								const t2 = s.workInProgressFiberOfNowCompt,
									r2 = (function (e3) {
										let t3 = e3
										for (; !t3.root; ) t3 = t3.parent
										return t3
									})(t2),
									o2 = (function () {
										const e3 = s.workInProgressFiberOfNowCompt.alternate
										return e3 && e3.hooks && e3.hooks[s.hookIndexOfNowCompt]
									})(),
									n2 = { state: o2 ? o2.state : e2, queue: [] }
								return (
									(o2 ? o2.queue : []).forEach((e3, t3) => {
										n2.state = typeof e3 != 'function' ? e3 : e3(n2.state)
									}),
									t2.hooks.push(n2),
									s.hookIndexOfNowCompt++,
									[
										n2.state,
										e3 => {
											n2.queue.push(e3)
											const t3 = y(
												{ stateNode: r2.stateNode, type: r2.type, props: r2.props, alternate: r2, dirty: true },
												{ index: r2.index, root: true }
											)
											l.rootFiberList.splice(r2.index, 1, t3), (l.fiberRoot.current = t3), (l.nextWorkUnitFiber = t3)
										},
									]
								)
							})
						const A = W
						return t.default
					})()
				})

				/***/
			},

		/***/ './test-app/src/index.jsx':
			/*!********************************!*\
  !*** ./test-app/src/index.jsx ***!
  \********************************/
			/***/ (__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
				'use strict'
				__webpack_require__.r(__webpack_exports__)
				/* harmony import */ var _dist_sun__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/../dist/sun */ './dist/sun.js')
				/* harmony import */ var _dist_sun__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/ __webpack_require__.n(
					_dist_sun__WEBPACK_IMPORTED_MODULE_0__
				)
				/* harmony import */ var _component_click_add_li__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
					/*! ./component/click-add-li */ './test-app/src/component/click-add-li.jsx'
				)
				/* harmony import */ var _component_traverse_fiber_tree__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
					/*! ./component/traverse-fiber-tree */ './test-app/src/component/traverse-fiber-tree.jsx'
				)
				/* harmony import */ var _component_usestate_test__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
					/*! ./component/usestate-test */ './test-app/src/component/usestate-test.jsx'
				)
				/* harmony import */ var _component_props_test__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
					/*! ./component/props-test */ './test-app/src/component/props-test.jsx'
				)

				const App = () => {
					console.log(`Component: App`)
					const [count1, setCount1] = (0, _dist_sun__WEBPACK_IMPORTED_MODULE_0__.useState)(0)
					const [status, setStatus] = (0, _dist_sun__WEBPACK_IMPORTED_MODULE_0__.useState)(false)
					const setCountAction1 = () => {
						setCount1(state => {
							return state + 1
						})
						setStatus(!status)
					}
					return /* @__PURE__ */ _dist_sun__WEBPACK_IMPORTED_MODULE_0___default().createElement(
						'div',
						{
							className: 'row-index',
							style: { border: '1px solid red' },
						},
						/* @__PURE__ */ _dist_sun__WEBPACK_IMPORTED_MODULE_0___default().createElement(
							'article',
							{
								onClick: setCountAction1,
								style: 'border: 1px solid green',
							},
							count1,
							' - ',
							status
						),
						status
							? /* @__PURE__ */ _dist_sun__WEBPACK_IMPORTED_MODULE_0___default().createElement(
									'div',
									{
										tag: 'true',
									},
									'True 1'
							  )
							: /* @__PURE__ */ _dist_sun__WEBPACK_IMPORTED_MODULE_0___default().createElement(
									'div',
									{
										tag: 'false',
									},
									'False 1'
							  ),
						status
							? /* @__PURE__ */ _dist_sun__WEBPACK_IMPORTED_MODULE_0___default().createElement(
									'div',
									{
										tag: 'true',
									},
									'True 2'
							  )
							: null
					)
				}
				_dist_sun__WEBPACK_IMPORTED_MODULE_0___default().render(
					/* @__PURE__ */ _dist_sun__WEBPACK_IMPORTED_MODULE_0___default().createElement(App, null),
					document.querySelector(`#app2`)
				)

				/***/
			},
	},
	/******/ function (__webpack_require__) {
		// webpackRuntimeModules
		/******/ /* webpack/runtime/compat get default export */
		/******/ ;(() => {
			/******/ // getDefaultExport function for compatibility with non-harmony modules
			/******/ __webpack_require__.n = module => {
				/******/ var getter = module && module.__esModule ? /******/ () => module['default'] : /******/ () => module
				/******/ __webpack_require__.d(getter, { a: getter })
				/******/ return getter
				/******/
			}
			/******/
		})()
		/******/
		/******/ /* webpack/runtime/getFullHash */
		/******/ ;(() => {
			/******/ __webpack_require__.h = () => 'af2ba0ce8d505e20759f'
			/******/
		})()
		/******/
		/******/
	}
)
//# sourceMappingURL=main.5ea33b56150359b08fa1.hot-update.js.map
