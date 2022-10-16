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
| render         | √    | 视图渲染，支持同时 render 多个应用                           | -        |
| useState       | √    |                                                              | -        |
| useEffect      | √    | 在父-子-孙组件树结构中，各级 useEffect 回调的执行顺序、useEffect 回调的返回函数的执行顺序还是与 React 存在差异 | -        |
| useMemo        | √    |                                                              | -        |
| useCallback    | √    |                                                              | -        |
| useRef         | √    |                                                              | -        |
| createRoot     | √    |                                                              | -        |
| memo           | √    | 性能优化，防止属性未变更的情况下，子组件跟随执行             | -        |
| renderToString | ×    | 直接生成 html 字符串                                         | 预期实现 |

> 使用异步 reconciliation 模式下, 对于多应用并存的情况下，当存在密集型 setState 操作时(例如 window.setInterval)，某些应用的更新可能会存在不及时的情况
>
> 目前原因不详，可能和 rIC 执行优先级有关 
>
> 暂时只能通过设置 Reconciliation 过程为同步模式来解决此问题，在所有应用的渲染前执行 Sun.setSyncMode() 即可 

