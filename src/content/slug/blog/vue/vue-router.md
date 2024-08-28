---
title: 你不知道的vue-router
---


## 动态路由及匹配规则

### 动态路由

在配置规则的时候，需要使用`:`来表示动态路由

在组件中使用`$route.params.id`来获取动态路由的值，支持多个动态参数

支持正则表达式：

- `?`：可选参数，`/user`和`/user/1`都会命中
- `+`：匹配一个或以上字符，`/user/1`和`/user/1/2`都会命中
- `*`：匹配 0 个或者多个，`/user`和`/user/1/2`都会命中
- `(\\d+)`：匹配数字

```js
import User from "./User.vue";

// 这些都会传递给 `createRouter`
const routes = [
  // 常规的动态路由，不会区分参数类型，/user/1 /user/waj 都会命中
  { path: "/users/:name", component: User },
  // 可选路由
  { path: "/users/:id?", component: User },
  // 重复路由 一个或多个参数  /user/1 /user/1/2 /user/1/2/3 都会命中
  { path: "/users/:id+", component: User },
  // 重复路由 0个或多个参数  /user /user/1 /user/1/2 都会命中
  { path: "/users/:id*", component: User },
  // /:id -> 仅匹配数字
  { path: "/users/:id(\\d+)" },
  // /:id -> 仅匹配数字 并且参数可重复 一个或多个 /user/1 /user/1/2 都会命中
  { path: "/users/:id(\\d+)+" },
];
```

在使用重复路由的时候，参数传递的是数组：

```js
// 给定 { path: '/user/:id*', name: 'user' },
router.resolve({ name: "user", params: { id: [] } }).href;
// 产生 /
router.resolve({ name: "user", params: { id: ["a", "b"] } }).href;
// 产生 /a/b

// 给定 { path: '/user/:id+', name: 'user' },
router.resolve({ name: "user", params: { id: [] } }).href;
// 抛出错误，因为 `id` 为空
```

### 组件复用

在`/user/1`导航到`/user/2`时，组件不会销毁重新创建，而是复用组件减小开销，这样的话组件生命周期就不会触发，如果需要改变数据可以使用`watch`来监听路由变化，或者使用`beforeRouteUpdate`来监听路由变化

```vue
<script setup lang="ts">
import { watch } from "vue";
import { onBeforeRouteUpdate } from "vue-router";
watch(
  () => $route.params.id,
  (id) => {
    // ...
  }
);
// or
onBeforeRouteUpdate((to, from) => {
  // ... 该路由守卫允许你取消导航
});
</script>
```

### strict

`strict: true`设置路由严格匹配

```js
const routes = [
  {
    path: "/user",
    component: User,
    strict: true,
  },
];
```

也可以在`createRouter()`中全局设置该参数

### 404

使用`自定义正则表达式`可以匹配任意路径，即在为精准匹配到路由规则时会命中该规则

```js
const routes = [
  // 将匹配所有内容并将其放在 `route.params.pathMatch` 下
  { path: "/:pathMatch(.*)*", name: "NotFound", component: NotFound },
  // 将匹配以 `/user-` 开头的所有内容，并将其放在 `route.params.afterUser` 下
  { path: "/user-:afterUser(.*)", component: UserGeneric },
];
```

## 嵌套路由

在父组件未设置`name`和`component`属性时仅做添加路由前缀处理

## 路由命名

在路由信息添加`name`属性给路由命名

```js
const routes = [
  {
    path: "/user",
    name: "user",
    component: User,
  },
];
```

所有路由的命名都必须是唯一的，如果有重复的，只保留最后一条

在路由跳转的时候可以使用`name`进行跳转，而不需要写完整的`path`

```js
router.push({ name: "user", params: { id: 123 } });
```

## 编程式导航

### push

`<router-link />`组件内部是调用`router.push()`实现路由跳转的

`push`可以直接传入路径字符串，也可以传对象

会在 history 栈添加一个新的记录，所以可以回退

如果参数提供了`path`，`params`属性会被忽略，可以使用`name`属性来跳转

```js
// 跳转到 /user， params会被忽略
router.push({ path: "/user", params: { id: 1 } });
// 跳转到 /user/1
router.push({ name: "user", params: { id: 1 } });
```

### replace

`replace`和`push`类似，但是不会添加新的记录到 history 栈，直接替换该页面

也可以直接在`push`中添加`replace: true`属性

```js
router.replace({ path: "/user", params: { id: 1 } });
//
router.push({ name: "user", replace: true });
```

### go

`router.go`方法可以跳转到历史记录中指定位置，如`router.go(-1)`表示返回上一页，`router.go(3)`表示前进 3 页

## 命名视图

在某些情况下需要用到多个视图在进行布局

`<router-view />`组件可以用`name`命名，未命名默认为`default`

```html
<router-view name="leftMenu" />
<router-view />
<router-view name="rightToc" />
```

在使用多视图的时候，路由配置不能用`component`属性，而是使用`components`属性`

```js
const routes = [
  {
    path: "/detail/:id",
    name: "detail",
    components: {
      default: Detail,
      // 它们与 `<router-view>` 上的 `name` 属性匹配
      LeftMenu,
      RightToc,
    },
  },
];
```

也可以和嵌套路由一起使用

## 重定向

在路由配置中可以设置`redirect`属性来重定向

属性可以是路劲字符串，对象，或者函数

```js
const routes = [
  // { path: "/", redirect: "/home" },
  // { path: "/", redirect: { name: 'home' } }
  { path: "/", redirect: to => {
    // 自定义一些操作
    return { name: 'home', query: { name: to.params.name } }
  } }
  { path: "/home", name: 'home', component: Home },
]
```

:::tip
`beforeEnter`不会应用到重定向路由上，而是应用在目标路由上，即`home`组件上
:::

## 别名

在路由配置中可以设置`alias`属性来设置别名

```js
const routes = [{ path: "/", component: Homepage, alias: "/home" }];
```

上述路由配置，访问`/`和`/home`都会跳转到`Homepage`组件，但是路由不会改变

`alias`可以设置为数组，数组中的路径会全部被设置为别名

如果路由有参数，别名也要设置参数

## 路由 props

在路由配置中可以设置`props`属性来传递参数给组件，解耦`routes`和路由，在组件作为页面使用时非常有用

`props`可以设置 boolean，对象，函数：

- boolean: 如果为`true`，`route.params`将会被设置为组件的`props`
- 对象: 原样设置为组件 props
- 函数: 返回对象

```js
// User.vue
<script setup lang="ts">
  const props = defineProps<{
    id: number
  }>()

  console.log(props.id)
</ script>

```

```js
// routes.js
const routes = [
  {
    path: "/user/:id",
    component: User,
    // props: true,
    // props: { id: 123 },
    props: (route) => {
      // 可以进行一些转换
      return { id: route.params.id };
    },
  },
];
```

如果有多个视图，需要给每个视图单独设置

```js
const routes = [
  {
    path: "/user/:id",
    components: { default: User, sidebar: Sidebar },
    props: { default: true, sidebar: false },
  },
];
```

## `<router-link />`样式

`<router-link />`组件默认没有样式，但是在激活时会添加两个`class`: `router-link-active`、`router-link-exact-active`

`<router-link />`有两个属性可以修改默认的`class`，也可以在`createRouter()`设置`linkActiveClass`和`linkExactActiveClass`属性修改默认的`class`

```html
<router-link
  activeClass="active-router"
  exactActiveClass="exact-active-router"
/>
```

### 命中规则

配置路由和当前路由相同，并且`params`相同就认为处于活动状态

如果是嵌套路由，任何指向祖先的路由都认为是活动状态，都会添加`router-link-active`，但匹配最精准的那个`<router-link />`才会被设置`router-link-exact-active`

别名一样适用

## `history`模式

- `createWebHashHistory`：`Hash 模式`，路径带`#`，
- `createMemoryHistory`：`Memory 模式`，假定不会处于浏览器环境，不会与 URL 交互，也不会自动触发初始化导航，适用于`Node`和`SSR`，需要在<i>`app.use(router)` 之后手动 push 到初始导航</i>
- `createWebHistory`：`HTML5 模式`，刷新页面会 404，需要在服务器做一个回退路由处理（例如：nginx 设置 `try_files $uri $uri/ /index.html`）

## 导航守卫

- `beforeEach`：
  - 全局前置守卫
  - 参数：`to`--即将进入的目标、`form`--正要离开的路由，第三个可选参数`next`(不建议，兼容旧版本)
  - 返回`false`或者抛出`Error`中断导航
- `beforeResolve`：
  - 全局解析守卫
  - 获取数据或执行任何其他操作的理想位置
- `afterEach`：
  - 全局后置守卫
  - 路由
  - 参数：`to`--进入的目标、`form`--离开的路由，`failure`--失败的导航信息
- `beforeEnter`：
  - 路由独享的守卫
  - 只在进入路由时触发
  - 可以是函数数组
  - 嵌套路由时，父路由设置`beforeEnter`，路由在具有相同父级的子路由之间移动时不会触发
- `beforeRouteEnter`：
  - 路由组件内的守卫
  - 参数：`to`--即将进入的目标、`form`--正要离开的路由，第三个可选参数`next`
  - 在组件创建之前触发，因此`this` 不可用，可以通过`next`回调解决
  - 组合 api 中没有提供该方法
- `beforeRouteUpdate`：
  - 路由组件内的守卫
  - 路由改变，组件复用时触发
- `beforeRouteLeave`：
  - 路由组件内的守卫
  - 导航离开当前组件时触发

### 流程

copy[官网](https://router.vuejs.org/zh/guide/advanced/navigation-guards.html#%E5%AE%8C%E6%95%B4%E7%9A%84%E5%AF%BC%E8%88%AA%E8%A7%A3%E6%9E%90%E6%B5%81%E7%A8%8B)的

1. 导航被触发
2. 在失活的组件里调用 `beforeRouteLeave` 守卫
3. 调用全局的 `beforeEach` 守卫
4. 在重用的组件里调用 `beforeRouteUpdate` 守卫(2.2+)
5. 在路由配置里调用 `beforeEnter ` 6.解析异步路由组件
6. 在被激活的组件里调用 `beforeRouteEnter  ` 8.调用全局的 `beforeResolve` 守卫(2.5+)
7. 导航被确认
8. 调用全局的`afterEach` 钩子
9. 触发 `DOM` 更新
10. 调用 `beforeRouteEnter` 守卫中传给 `next` 的回调函数，创建好的组件实例会作为回调函数的参数传入

### `script setup`中使用`beforeRouteEnter`的方法

```vue
<script lang="ts">
export default {
  beforeRouteEnter(to, form, next) {
    console.log("beforeRouteEnter", to, form);
    next((e) => {
      // @ts-ignore 这里ts识别不到。。
      e.beforeRouteEnter("一些数据");
    });
  },
};
</script>

<script setup lang="ts">
const beforeRouteEnter = (data: string) => {
  console.log(data);
};

defineExpose({
  beforeRouteEnter,
});
</script>
```

## 滚动行为

在创建路由的适合，可以设置`scrollBehavior`属性，设置滚动行为，默认行为是滚动到页面顶部

```js
const router = createRouter({
  history: createWebHashHistory(),
  routes: [...],
  /**
   * savedPosition 该值在浏览器前进/后退才有用
   * 如果要设置延迟，可以return Promise，在Promise中使用定时器实现
   */
  scrollBehavior (to, from, savedPosition) {
    // 在按下 后退/前进 按钮时，就会像浏览器的原生表现
    // return savedPosition

    // return 期望滚动到哪个的位置
    // return { top: 0 }

    // 也可以return一个dom元素
    return {
      // 也可以这么写
      // el: document.getElementById('main'),
      el: '#main',
      // 在元素上 10 像素
      top: 10,
      // 滚动行为  默认是 'auto'，没有滚动行为，直接跳转
      behavior: 'smooth',
    }
  }
})
```

## 动态路由

### 新增路由

使用`addRoute()`新增路由，这在后台管理系统中做权限管理经常见到

```js
router.addRoute({
  path: "/test-add-router",
  name: "testAddRouter",
  component: () => import("../TestAddRouter.vue"),
});
```

如果新增的路由和当前的 url 匹配的话，需要手动调用`router.push()`或者`router.replace()`来刷新路由

如果你需要等待新的路由显示，可以使用`await router.replace()`

在导航路由中新增了路由，应该直接返回新的`path`位置来重定向来显示新的路由

### 嵌套路由新增路由

在`addRoute()`第一个参数传入父路由的`name`，在第二个参数中传入路由对象可以添加嵌套路由

```js
router.addRoute({ name: "article", path: "/article", component: Article });

router.addRoute("article", {
  path: "list",
  name: "articleList",
  component: () => import("../ArticleList.vue"),
});
```

等效于：

```js
router.addRoute({
  name: "article",
  path: "/article",
  component: Article,
  children: [{ path: "list", name: "articleList", component: ArticleList }],
});
```

### 删除路由

- 通过添加一个名称冲突删除路由，这种方法会产生一个新的路由，可以在通过回调删除，下面第二种办法
- 调用`addRoute()`返回的回调可以删除添加的路由
- 调用`router.removeRoute()`删除路由，参数是路由的`name`

当路由被删除时，所有的别名和子路由也会被同时删除
