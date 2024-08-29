---
title: 你不知道的vue
---


## 模板语法

同名属性绑定：

```vue
<script setup lang="ts">
const id = "123";
</script>

<template>
  <div :id></div>
  <!-- or -->
  <div v-bind:id></div>
</template>
```

多个属性绑定：

```vue
<script setup lang="ts">
const atts = {
  class: 'active',
  style: { color: 'red' }
  id: 'id'
}
</script>

<template>
  <div v-bind="atts"></div>
</template>
```

动态参数：

```html
<a v-bind:[attributeName]="url"> ... </a>

<!-- 简写 -->
<a :[attributeName]="url"> ... </a>
```

    属性如果值是 null，会被强制移除
    
    attributeName 会被浏览器强制转换成全小写 attributename，如果变量声明是 attributeName 不会生效

## 响应式基础

### Ref

Ref 的实现还是依靠 vue2 使用的`Object.defineProperty`来劫持 value 属性的 get 和 set 来实现的，所以在 script 中使用 ref 需要`.value`，而在 template 中不需要是 vue 做了语法糖处理

### 深层响应性

Ref 持有[非原始值](https://developer.mozilla.org/zh-CN/docs/Glossary/Primitive)时，会通过`reactive()`方法转换为响应式代理

### reactive()

reactive 是通过`Proxy`来代理对象的

`reactive()`返回的是一个原始对象的 Proxy（响应式对象），跟原始对象不相等，修改原始对象不会触发更新

对同一个原始对象多次调用`reactive()`，返回的是同一个响应式对象

对代理对象调用`reactive()`，返回的是本身

```vue
<script setup lang="ts">
const row = reactive({
  name: "waj",
  age: 18,
});

const proxy = reactive(row);
const proxy1 = reactive(row);
const proxy2 = reactive(proxy);

console.log(row === proxy); // false
console.log(proxy === proxy1); // true
console.log(proxy === proxy2); // true
</script>
```

局限性：

- 只能代理引用类型（对象，数组，map，set 等），不能代理原始类型
- 不能替换整个对象
- 解构或者将某个值传递给函数时会失去响应式

### Ref 解包问题

解包直白点说就是不需要`.value`

- 在`reactive()深层响应式对象`内会解包，浅层响应式对象内不会解包

```js
const count = ref(0);
const count1 = ref(0);
const state = reactive({
  data: {
    count,
  },
});
// 被解包，不需要.value
state.count++;
console.log(state.count);
// -------分割线--------
const state1 = shallowReactive({
  count1,
  data: {
    count,
  },
});
// 浅层响应式对象  不会被解包  但是顶层会被解包
state1.data.count.value++;
console.log(state1.data.count.value);
```

- 在`reactive()`数组或原生集合内不会解包

```js
const data = reactive([ref(1)]);
// 不会被解包
data[0].value++;
console.log(data[0].value);
```

- 在 template 中，直接使用使用都会被解包，在表达式中只有顶层的会被解包

```vue
<template>
  <!-- 会被解包 -->
  <span>{{ count }}</span>
  <span>{{ state.id }}</span>
  <span>{{ count + 1 }}</span>
  <!-- 不会被解包 -->
  <span>{{ state.id + 1 }}</span>
  <!-- [object Object]1 -->
  <span>{{ state.id.value + 1 }}</span>
</template>

<script setup>
// count state是顶层   state.id不是
const count = ref(0);
const state = reactive({ id: 1 });
</script>
```

## 计算属性

计算属性和方法：

- 计算属性会被缓存，依赖的响应式属性不变的情况下直接返回之前的计算结果
- 方法在模板每次被渲染都会重复调用

计算属性默认是可读的，但也支持可写，即支持 get、set 方法

## 列表渲染

v-if 和 v-for 不能同时使用，因为在 vue3 中 v-if 的优先级比 v-for 高，在 v-if 中无法访问到 v-for 作用域内的属性

### key

vue 默认采用`就地更新`的策略，即在未添加 key 的时候，数据改变时，dom 元素使用原来的 dom，只更新内容，如果要强制改变 dom，需要加唯一 key

```html
<ul>
  <!-- 旧 -->
  <!-- 新 -->
  <li class="a">A</li>
  <!-- <li class="a">C</li> -->
  <li class="b">B</li>
  <!-- <li class="b">A</li> -->
  <li class="c">C</li>
  <!-- <li class="c">B</li> -->
</ul>
```

## 事件处理

修饰符需要遵循 kebab-case 形式

## 表单输入绑定

    对于需要使用 IME 的语言 (中文，日文和韩文等)，你会发现 v-model 不会在 IME 输入还在拼字阶段时触发更新。如果你的确想在拼字阶段也触发更新，请直接使用自己的 input 事件监听器和 value 绑定而不要使用 v-model。

`true-value` 和 `false-value`是 vue 特有的属性，配合`v-model`使用，顾名思义就是值为 true 和 false 时转换成的值

## 侦听器

如果想在侦听器中访问到 vue 更新后的 dom，需要指明`flush: 'post'`属性，也可以使用别名`watchPostEffect()`

同步侦听器，会在 vue 所有更新前触发，需要指明`flush: 'sync'`属性，也可以使用别名`watchSyncEffect()`

    同步侦听器不会批处理，即有数据更新就会触发，慎重使用

## 模板引用

通过 ref 访问 dom

与`v-for`配合使用时得到的是 dom 数组，且顺序和源数组顺序不一定相同

### ​​ 函数模板引用

```html
<!-- el 是dom对象 -->
<div :ref="el => {...}"></div>
```

### 组件上的 ref

如果子组件使用的是选项式 api 或没有使用`<script setup>`得到的就是子组件的 this

使用了 `<script setup>` 的组件是默认私有的，访问不到任何东西，除非子组件通过`defineExpose`暴露

## 组件 v-model

语法糖，实际上是`modelValue`的 props 和`update:modelValue`的 emit

### 自定义 v-model 修饰符

```html
<!-- 父组件 -->
<Child v-model.custom="value" />
```

```vue
<!-- 子组件 -->
<script>
// 解构可以拿到修饰符
const [model, modifiers] = defineModel({
  // 支持get/set操作
  set(value) {
    if (modifiers.custom) {
      // 这里做自定义处理
      return value.toUpperCase()
    }
    return value
  }
})
</script>

<template>
  </input v-model="model" />
</template>
```

## 属性透传

前提：子组件未在`defineProps/defineEmits`中声明

- 子组件是单根节点，父组件传递的 props/emits 会被绑定到单根节点上
- 如果是多根节点，可以使用`v-bind="$attrs"`绑定属性，`$attrs`没有被显示绑定则会发出警告，此时 vue 不知道应该把参数绑定给谁
- 如果传递的是原生事件，并且子组件内也绑定了该事件，则子组件和父组件内的事件都会触发
- 如果子组件是另一个组件，则会继续透传
- 如果在`defineProps/defineEmits`中声明，则该参数不存在透传，在`$attrs`中无法访问
- `$attrs`不是响应式的，如果需要响应式使用 props
- 可以在`defineOptions`中声明`inheritAttrs: false`禁止属性透传
- 在`setup`中可以使用`useAttrs()`获取透传属性

## 插槽

### 默认内容

在父组件未传递 slot 时，slot 会显示默认内容

```html
<div>
  <slot>这里是默认内容</slot>
</div>
```

### 具名插槽

顾名思义就是插槽有自己的名字，传递的内容对应名字渲染

```html
<!-- 子组件 -->
<div>
  <slot name="header"></slot>
  <slot></slot>
  <slot name="footer"></slot>
</div>
```

```html
<!-- 父组件 -->
<Child>
  <header v-slot:header>header</header>
  <main>这是默认的</main>
  <footer v-slot:footer>footer</footer>
</Child>
```

`v-slot`简写`#`，`<header v-slot:header>header</header>`可以简写成`<header #:header>header</header>`

没有名字的插槽会隐式地命名为`default`，如果子组件同时存在具名插槽和默认插槽，则父组件中顶级未命名的内容全部渲染到默认插槽中

### 条件插槽

子组件模板中可以通过`$slots`来获取到传递过来的插槽，然后使用`v-if`做条件判断

### 作用域插槽

即子组件传递参数给`<slot>`，父组件可接收参数

```html
<!-- 父组件 -->
<Child>
  <template #header="{ age }">
    具名插槽--子组件传递过来的参数：{{ age }}
  </template>
  <template #default="{ fullName }">
    默认插槽--子组件传递过来的参数：{{ fullName }}
  </template>
</Child>
```

```html
<!-- 子组件 -->
<div>
  <slot name="header" :age="18"></slot>
  <slot fullName="waj"></slot>
</div>
```

### 无渲染组件

子组件没有任何 ui 渲染，只有数据处理，将数据通过 slot 传递出来

## 依赖注入

### provide

```js
// vue组件内提供
import { provide, ref } from "vue";

const count = ref(0);

// 键值对的形式
provide("key", count);

// 如果想要提供修改方式
provide("count", {
  count,
  updateCount(value) {
    count.value = value;
  },
});
```

除了可以在 vue 组件内提供还可以在应用层面提供

```js
// main.js
import { createApp } from "vue";

const app = createApp({});

app.provide(/* 注入名 */ "message", /* 值 */ "hello!");
```

### inject

提供的值是 ref 时，注入不会解包

```js
import { inject } from "vue";
const key = inject("count");
console.log(key.value);

// 修改
const { count, updateCount } = inject("count");
updateCount(count.value + 1);
console.log(count.value);
```

### inject 默认值

在未提供数据时，可以设置默认值

```js
// 如果没有祖先组件提供 "message"
// `value` 会是 "这是默认值"
const value = inject("message", "这是默认值");
```

也可以使用工厂函数来提供默认值，inject 第 3 个参数设置为 true

```js
const value = inject("key", () => new ExpensiveClass(), true);
```

## 异步加载组件

`defineAsyncComponent`函数，参数函数需要返回一个`Promise`

```js
import { defineAsyncComponent } from "vue";

const AsyncComp = defineAsyncComponent(() =>
  import("./components/MyComponent.vue")
);
```

同时参数也支持传递一个对象，进行错误处理，加载处理等：

```js
const AsyncComp = defineAsyncComponent({
  // 加载函数
  loader: () => import("./Foo.vue"),

  // 加载异步组件时使用的组件
  loadingComponent: LoadingComponent,
  // 展示加载组件前的延迟时间，默认为 200ms
  delay: 200,
  // 加载失败后展示的组件
  errorComponent: ErrorComponent,
  // 如果提供了一个 timeout 时间限制，并超时了
  // 也会显示这里配置的报错组件，默认值是：Infinity
  timeout: 3000,
});
```

## 自定义指令

通过`app.directive()`注册自定义组件

```js
app.directive("custom-directive", {
  // 钩子函数
  mounted(el, binding, vnode, prevVnode) {
    console.log(el, binding, vnode, prevVnode);
    // 自定义操作
  },
});
```

### 钩子函数

```js
const myDirective = {
  // 在绑定元素的 attribute 前
  // 或事件监听器应用前调用
  created(el, binding, vnode) {
    // 下面会介绍各个参数的细节
  },
  // 在元素被插入到 DOM 前调用
  beforeMount(el, binding, vnode) {},
  // 在绑定元素的父组件
  // 及他自己的所有子节点都挂载完成后调用
  mounted(el, binding, vnode) {},
  // 绑定元素的父组件更新前调用
  beforeUpdate(el, binding, vnode, prevVnode) {},
  // 在绑定元素的父组件
  // 及他自己的所有子节点都更新后调用
  updated(el, binding, vnode, prevVnode) {},
  // 绑定元素的父组件卸载前调用
  beforeUnmount(el, binding, vnode) {},
  // 绑定元素的父组件卸载后调用
  unmounted(el, binding, vnode) {},
};
```

### 钩子函数参数说明

- `el`：指令绑定到的元素。这可以用于直接操作 DOM。

- `binding`：一个对象，包含以下属性。

  - `value`：传递给指令的值。例如在 `v-my-directive="1 + 1"` 中，值是 2。
  - `oldValue`：之前的值，仅在 `beforeUpdate` 和 `updated` 中可用。无论值是否更改，它都可用。
  - `arg`：传递给指令的参数 (如果有的话)。例如在 `v-my-directive:foo` 中，参数是 "foo"。
  - `modifiers`：一个包含修饰符的对象 (如果有的话)。例如在 `v-my-directive.foo.bar` 中，修饰符对象是 `{ foo: true, bar: true }`。
  - `instance`：使用该指令的组件实例。
  - `dir`：指令的定义对象。

- `vnode`：代表绑定元素的底层 VNode。
- `prevVnode`：代表之前的渲染中指令所绑定元素的 VNode。仅在 `beforeUpdate` 和 `updated` 钩子中可用。

### 简化

在`mounted` 和 `updated` 时都调用

```js
app.directive("color", (el, binding) => {
  // 这会在 `mounted` 和 `updated` 时都调用
  el.style.color = binding.value;
});
```

## 插件

插件是一个包含`install`方法的对象或者函数本身

```js
export default {
  /**
   * app 是当前的 Vue 应用实例
   * options 是插件安装时传入的参数
   */
  install(app, options) {
    // 自定义操作
    // app.component("MyComponent", MyComponent);
  },
};
```

一般用于全局注册组件、指令、`provide`注入数据，或者通过`app.config.globalProperties`添加全局实例属性或方法

通过`app.use()`注册插件

## 内置组件

### Transition

![Transition示意图](/image/vue/vue-unaware/transition-classes.png)

- `v-enter-from`：进入动画的初始状态
- `v-enter-active`：整个进入动画的生效状态，定义动画延迟，速度曲线，持续时间等等
- `v-enter-to`：进入状态的结束状态
- v-leave-\*：离开动画类似进入动画

可以在`<Transition>`标签上申明`name`属性，自定义名称，这时候 class 不在是`v-`，而是`custom-`

```vue
<template>
  <Transition name="custom">
    <!-- ... -->
  </Transition>
</template>

<style>
.custom-enter-from {
  opacity: 0;
}
.custom-enter-active {
  transition: opacity 1s ease;
}
.custom-enter-to {
  opacity: 1;
}
</style>
```

可以自定义动画 class，这在使用第三方动画库是很有用：

```html
<!-- 假设你已经在页面中引入了 Animate.css -->
<Transition
  name="custom-classes"
  enter-active-class="animate__animated animate__tada"
  leave-active-class="animate__animated animate__bounceOutRight"
>
  <p v-if="show">hello</p>
</Transition>
```

如果 css 动画中同时使用了`transition`和`animation`，需要显示的告诉`Transition`哪种动画效果优先

```html
<Transition type="animation">...</Transition>
```

js 钩子函数：

```vue
<template>
  <Transition
    @before-enter="onBeforeEnter"
    @enter="onEnter"
    @after-enter="onAfterEnter"
    @enter-cancelled="onEnterCancelled"
    @before-leave="onBeforeLeave"
    @leave="onLeave"
    @after-leave="onAfterLeave"
    @leave-cancelled="onLeaveCancelled"
  >
    <!-- ... -->
  </Transition>
</template>

<script setup>
// 在元素被插入到 DOM 之前被调用
// 用这个来设置元素的 "enter-from" 状态
function onBeforeEnter(el) {}

// 在元素被插入到 DOM 之后的下一帧被调用
// 用这个来开始进入动画
function onEnter(el, done) {
  // 调用回调函数 done 表示过渡结束
  // 如果与 CSS 结合使用，则这个回调是可选参数
  done();
}

// 当进入过渡完成时调用。
function onAfterEnter(el) {}

// 当进入过渡在完成之前被取消时调用
function onEnterCancelled(el) {}

// 在 leave 钩子之前调用
// 大多数时候，你应该只会用到 leave 钩子
function onBeforeLeave(el) {}

// 在离开过渡开始时调用
// 用这个来开始离开动画
function onLeave(el, done) {
  // 调用回调函数 done 表示过渡结束
  // 如果与 CSS 结合使用，则这个回调是可选参数
  done();
}

// 在离开过渡完成、
// 且元素已从 DOM 中移除时调用
function onAfterLeave(el) {}

// 仅在 v-show 过渡中可用
function onLeaveCancelled(el) {}
</script>
```

设置`appear`属性可以在 dom 初始化时加载动画：

```html
<Transition appear> ... </Transition>
```

设置`mode`属性设置过度模式：

```html
<Transition mode="out-in"> ... </Transition>
```

- `out-in`：先离开后进入
- `in-out`：先进入后离开

### TransitionGroup

可以理解为动画元素的列表，属性和`Transition`<i>基本相同</i>:

- 设置`tag`属性可以渲染 dom
- `mode`不可用
- 子元素必须有唯一的`key`
- 过渡动画 class 不是作用容器，而是在子元素上

## KeepAlive

- `include`/`exclude`：包含或排除某组件，用组件名称进行匹配，可以是逗号隔开的字符串、正则、数组
- `max`：最大缓存数量，超过限制最久没有被访问的销毁
- `onActivated()`：作用于被缓存的实例及后代实例，初始加载和后续每次加载的时候激活
- `onDeactivated()`：作用于被缓存的实例及后代实例，组件销毁和失活的时候激活

## Teleport

`传送门`，将组件内部的某部分 dom 传送到组件结构外

`to`属性可以申明传送到某个地方，可以是 class 选择器，可以是 dom 元素对象（如：`body`）

`disabled`禁用`Teleport`

## Suspense

处理异步依赖组件：

- 异步组件
- 带有异步`setup()`的组件，包含`<script setup>` 时有顶层 await 表达式的组件

异步组件也可以通过在选项中指定`suspensible: false`表明不用`Suspense`控制，并让组件始终自己控制其加载状态

组件可以嵌套使用，注意顺序很重要，可以自行删除不需要的

事件：

- `pending`：进入挂起状态触发
- `resolve`：在`默认插槽`组件加载完成触发
- `fallback`：`fallback` 插槽的内容显示时触发

```html
<RouterView v-slot="{ Component }">
  <template v-if="Component">
    <Transition mode="out-in">
      <KeepAlive>
        <Suspense @pending="" @resolve="" @fallback="">
          <!-- 主要内容 -->
          <component :is="Component"></component>

          <!-- 加载中状态 -->
          <template #fallback> 正在加载... </template>
        </Suspense>
      </KeepAlive>
    </Transition>
  </template>
</RouterView>
```
