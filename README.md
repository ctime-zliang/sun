# sun

一个用 JavaScript（TypeScript 版）写的类 React 视图库

> 它只是一个玩具、一个试验性的脚本库，一些 JavaScript 代码
>
> 它没什么别的意义……



#### Features

目前已**模拟实现**如下功能：

> 仅尝试在视图、行为上仿 React 同 API 的表现，具体的实现方式自然会与 React 不同，不做价值评价

> **目前仅支持函数组件**

| 功能点         | 支持 | 备注                                                         | 计划     |
| -------------- | ---- | ------------------------------------------------------------ | -------- |
| render         | √    | 视图渲染，支持同时 render 多个 <App />                       | -        |
| useState       | √    |                                                              | -        |
| useEffect      | √    | 在父-子-孙组件树结构中，各级 useEffect 回调的执行顺序、useEffect 回调的返回函数的执行顺序还是与 React 存在差异 | -        |
| useMemo        | √    |                                                              | -        |
| useCallback    | √    |                                                              | -        |
| useRef         | √    |                                                              | -        |
| createRoot     | ×    |                                                              | 预期实现 |
| memo           | ×    | 性能优化，防止属性未变更的情况下，子组件跟随执行             | 预期实现 |
| renderToString | ×    | 直接生成 html 字符串                                         | 预期实现 |



