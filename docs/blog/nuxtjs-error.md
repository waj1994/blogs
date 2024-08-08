---
groups: js
title: nuxtjs3安装失败解决方案
description: 记录下nuxtjs3安装失败的解决方案
---

# {{$frontmatter.title}}

今天心血来潮想体验下 nuxtjs3，结果 emmmmmmm，装都装不了，起初我以为是网络问题，结果我蹲在墙上安装都一样的失败，报错如下:

```shell
[16:15:21]  ERROR  Error: Failed to download template from registry: Failed to download https://raw.githubusercontent.com/nuxt/starter/templates/templates/v3.json: TypeError: fetch failed
```

搜了一下，网上各种解决方案，换源，改 hosts 都不行，一样的报错。然后想到既然是在 github 上的模板拉不下来我自己去下载不就好了吗？直接上链接：[https://github.com/nuxt/starter/tree/v3](https://github.com/nuxt/starter/tree/v3)，然后 download zip 下来，然后解压，然后 cd 到解压后的文件夹，然后执行`npm install`，然后执行`npm run dev`，然后就 ok 了。
