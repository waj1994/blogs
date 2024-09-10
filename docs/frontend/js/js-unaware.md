---
title: 你不知道的js
---

# {{$frontmatter.title}}

## localStorage 监听

在做博客主题切换的适合，遇到一个问题，在新打开一个标签的文章详情页面上修改主题，在原页面上并没有变化。最开始想到的解决方案是用 SharedWorker 来实现，后面查了下资料可以用 Broadcast Channel API 或者 Storage API 来实现，因为我博客主题本身有存在 localStorage，所以用 Storage API 来实现。

```js
// 添加监听
window.addEventListener("storage", ({ key, newValue }) => {
  key === storageKey && changeBtn(newValue);
});
```

    注意：该监听方法只有在其他标签修改才会触发

详细查看[mdn](https://developer.mozilla.org/zh-CN/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API#%E7%A4%BA%E4%BE%8B)

## querySelector/getElementById

先看一个错误：

```
Uncaught SyntaxError: Failed to execute 'querySelector' on 'Document': '#1_ul' is not a valid selector.
```

意思是在使用`querySelector`的时候`#1_ul`不是一个有效的选择器。

what？

这不就是一个 id 选择器吗？然后我换成`getElementById`就没问题

然后查了[MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/querySelector)，说是要有效的 css，否则会报错

明白了，`1_ul`符合 h5 的规范，但是不符合 css 的规范，在作为 css 选择器时是无法生效的

```html
<ul id="1_ul">
  <li>1</li>
  <li>2</li>
  <li>3</li>
</ul>
```

```css
/* 无效 */
#1_ul {
  color: red;
}
```

解决方法就是根据其`Unicode`代码点对其进行转义

    基本上，要转义任何数字字符为Unicode，只需在其前面加上 \3 并在后面附加一个空格字符 ( )

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <style>
      #\31_ul {
        color: red;
      }
    </style>
  </head>
  <body>
    <ul id="1_ul">
      <li>1</li>
      <li>2</li>
      <li>3</li>
    </ul>
    <script>
      const ul = document.querySelector("#\\31_ul ");
      console.log(ul);
    </script>
  </body>
</html>
```

而`getElementById`并没有该限制，所以日常开发还是建议使用`getElementById`

### getElementsByXXXX 和 querySelectorAll 的区别

`getElementByXXXX`的结果是`动态的`，`querySelectorAll`的结果是静态的

```html
<ul id="1_ul">
  <li>1</li>
  <li>2</li>
  <li>3</li>
</ul>
<script>
  const ul = document.querySelector("#\\31_ul ");

  const lis1 = document.getElementsByTagName("li");
  const lis2 = document.querySelectorAll("li");

  console.log("lis1", lis1);
  console.log("lis2", lis2);

  for (let index = 0; index < 3; index++) {
    const li = document.createElement("li");
    li.innerHTML = index + 4;
    ul.appendChild(li);
  }

  console.log("lis1", lis1);
  console.log("lis2", lis2);
</script>
```

输出结果：
![输出结果](/image/js/js-unaware/result.png)

可以看到，`querySelectorAll`获取的值在新增`li`之后是没有变化的，而`getElementsByTagName`的结果会随着新增`li`而变化

## 桌面通知

桌面通知使用[`Notification`](https://developer.mozilla.org/zh-CN/docs/Web/API/Notification) API 实现

移动端就别用了，兼容性感人

基本语法：

```js
const note = new Notification("标题");
// or
const note = new Notification("标题", {
  body: "内容",
  // ...
});
```

使用该语法需要用户授权浏览器通知权限，可以使用`Notification.permission()`判断权限，如果权限是拒绝可使用`Notification.requestPermission()`再次询问用户

```js
/**
 * 检查是否已授予通知权限；如果是的话，创建一个通知
 * granted：允许通知
 * denie：拒绝通知
 * default：询问，浏览器弹窗询问用户
 */
if (Notification.permission === "granted") {
  const notification = new Notification("你好！", {
    body: "这是一条测试信息",
  });
} else if (Notification.permission !== "denied") {
  // 我们需要征求用户的许可
  Notification.requestPermission().then((permission) => {
    // 如果用户接受，我们就创建一个通知
    if (permission === "granted") {
      const notification = new Notification("你好！", {
        body: "这是一条测试信息",
      });
    }
  });
}
```

该 api 需要授权浏览器通知权限并且`pc系统需要打开通知`，否则无效
