---
title: nuxtjs3安装失败解决方案
---

# {{$frontmatter.title}}

今天心血来潮想体验下 nuxtjs3，结果 emmmmmmm，装都装不了，起初我以为是网络问题，结果我蹲在墙上安装都一样的失败，报错如下:

```shell
[16:15:21]  ERROR  Error: Failed to download template from registry: Failed to download https://raw.githubusercontent.com/nuxt/starter/templates/templates/v3.json: TypeError: fetch failed
```

搜了一下，网上各种解决方案，换源，改 hosts 都不行，一样的报错。然后想到既然是在 github 上的模板拉不下来我自己去下载不就好了吗？

1、直接使用浏览器访问报错中的链接：[https://raw.githubusercontent.com/nuxt/starter/templates/templates/v3.json](https://raw.githubusercontent.com/nuxt/starter/templates/templates/v3.json)，如果你访问不了那你可以试试换个网络环境（懂？），访问成功回返回一个 json：

```json
{
  "name": "v3",
  "defaultDir": "nuxt-app",
  "url": "https://nuxt.com",
  "tar": "https://codeload.github.com/nuxt/starter/tar.gz/refs/heads/v3"
}
```

2、然后访问 tar 链接下载模板就好了，是不是很简单
