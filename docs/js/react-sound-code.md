---
groups: js
title: 《React技术揭秘》笔记
description: 学习卡颂大佬的《React技术揭秘》的笔记
outline: [2, 4]
---

## React 理念

构建快速响应的大型应用

需要解决两个瓶颈

- cpu 瓶颈  
  大型计算或者计算机性能差引起的掉帧卡顿

  主流浏览器刷新率为 60Hz，即 1 秒刷新 60 次，一次 16.6ms（1000ms / 60），在 16.6ms 中需要完成`js执行、样式布局、样式绘制`，如果 js 执行时间超过 16.6ms，就没有时间进行渲染了

  为了解决该问题，react 在每帧预留了 5ms 时间用于 js 执行，其他时间用于渲染，当预留时间不够时，react 会把线程控制权交还给浏览器渲染 ui，react 等待下一帧继续处理被终端的 js

  `将长任务分拆到每一帧，叫时间切片`  
  `ReactDOM.unstable_createRoot(rootEl).render(<App />);`开启时间切片  
  时间切片的关键时将`同步更新`变成`可中断的异步更新`

- io 瓶颈  
  网络请求慢，等待数据返回引起的卡顿

  示例：ios 设置界面，点击"通用"和"面板中的“Siri 与搜索"，的不同，前者时同步更新，点击就直接进入界面，后者需要进行网络请求等待数据返回。这里用户感知微乎其微，窍门就是，点击后在原页面停留一段时间，这段时间用来请求网络请求，如果超过这个时间限制就展示 loading。

  为此 react 实现了`Suspense`即配套的 hook`useDeferredValue`

  为了支持这些特性，同样需要将`同步的更新`变为`可中断的异步更新`

## React15 架构（老架构）

react15 架构分为两层

- reconciler(协调器) -- 负责找出变化的组件
- renderer(渲染器) -- 将变化的组件渲染到页面

#### Reconciler

[官网描述](https://zh-hans.legacy.reactjs.org/docs/codebase-overview.html#reconcilers)

setState、forceUpdate、render 等 api 会触发 react 更新，每当有更新时，reconciler 会做如下工作：

- 调用组件 render 方法，将 jsx 转为虚拟 dom
- 将虚拟 dom 和上次更新时的虚拟 dom 进行对比
- 对比找出本次更新变化的虚拟 dom
- 通知 Renderer 将变化的虚拟 dom 渲染到页面

### Renderer

- web 端：ReactDom
- native 端：ReactNative

每次更新时，Renderer 接到 Reconciler 的通知，将变化的组件渲染到页面上

### react15 的缺点

在 Reconciler 中，mount 和 update 都需要递归遍历子组件，而递归遍历子组件一旦开始就没办法中断，当超过 16.6ms 时，页面就会变得卡顿  
因为 Reconciler 和 Renderer 交替执行，如果假设增加了一个中断机制，在一次更新中断后页面已经渲染了，而实际计算并没有完成，就会出现更新不完全的问题（[详情见卡松大佬举的示例](https://react.iamkasong.com/preparation/oldConstructure.html#react15-%E6%9E%B6%E6%9E%84%E7%9A%84%E7%BC%BA%E7%82%B9)）

## React16 架构（新架构）

新架构分 3 层：

- Scheduler -- 调度器，负责调度更新任务
- Reconciler -- 协调器，负责找出变化的组件
- Renderer -- 渲染器，将变化的组件渲染到页面

### Scheduler

requestIdleCallback -- 浏览器空闲时执行回调

react 不使用该 api 的原因：

- 兼容性
- 触发频率不稳定（切换 tab 后，注册的 requestIdleCallback 触发频率很低）

所以 react 自己实现了一个调度器 Scheduler，除了在浏览器空闲时间触发回调外，还提供了多种调度优先级供任务设置

### Reconciler

更新从不可中断的递归遍历子组件变成了可中断的循环过程，每次循环都会调用`shouldYield`判断当前是否有剩余时间

```js
/** @noinline */
function workLoopConcurrent() {
  // Perform work until Scheduler asks us to yield
  while (workInProgress !== null && !shouldYield()) {
    workInProgress = performUnitOfWork(workInProgress);
  }
}
```

Reconciler 和 Renderer 不再是交替工作，当 Scheduler 将任务交给 Reconciler 后，Reconciler 会为变化的虚拟 dom 打上增/删/更新的标记，类似：

```js
export const Placement = /*             */ 0b0000000000010;
export const Update = /*                */ 0b0000000000100;
export const PlacementAndUpdate = /*    */ 0b0000000000110;
export const Deletion = /*              */ 0b0000000001000;
```

> [全部标记](https://github.com/facebook/react/blob/1fb18e22ae66fdb1dc127347e169e73948778e5a/packages/react-reconciler/src/ReactSideEffectTags.js)

当整个 Reconciler 工作完成后，Renderer 才会将变化渲染到页面，所以就不会存在中断更新时 DOM 渲染不完全的问题

### Renderer

根据 Reconciler 为虚拟 DOM 打的标记，同步执行对应的 DOM 操作

## Fiber 架构

Reconciler 内部采用了 Fiber 的架构
