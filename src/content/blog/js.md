---
title: js相关的一些知识点
pubDate: 2024-07-29
description: 日常遇到的一些关于js不怎么注意的小的细的知识点，记录下来，温故而知新。
---

### 监听localStorage

在做博客主题切换的适合，遇到一个问题，在新打开一个标签的文章详情页面上修改主题，在原页面上并没有变化。最开始想到的解决方案是用SharedWorker来实现，后面查了下资料可以用Broadcast Channel API或者Storage API来实现，因为我博客主题本身有存在localStorage，所以用Storage API来实现。

```js
// 添加监听
window.addEventListener("storage", ({ key, newValue }) => {
  key === storageKey && changeBtn(newValue);
});
```

    注意：该监听方法只有在其他标签修改才会触发

详细查看[mdn](https://developer.mozilla.org/zh-CN/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API#%E7%A4%BA%E4%BE%8B)
