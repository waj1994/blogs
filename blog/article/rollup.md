---
title: rollup入门
date: 2021-03-23 10:00:00
tags:
  - js
  - rollup
summary: 随着vite的兴起，越来越多的项目使用了rollup来构建打包。rollup对比webpack的优势就是配置简单，打包产物体积更小，接下来给大家介绍rollup的基本使用。
---

官方地址： <https://rollupjs.org/guide/en/>

### 创建项目

```javascript
mkdir project-app // 创建项目目录
cd project-app // 进入项目目录
npm init -y // 初始化项目生成package.json文件
```

### 安装 rollup

```javascript
npm i -D rollup
```

### 打包初体验

项目根目录创建 src 文件夹存放项目源代码，在 src 新建 index.js 源码入口。

```javascript
// /src/index.js
console.log('hello rollup!');
```

创建 config 文件夹存放项目配置文件，新建 rollup 基础配置文件 rollup.config.js

```javascript
// /config/rollup.config.js
export default {
  input: 'src/index.js',
  output: {
    file: 'dist/main.js',
    format: 'umd', // 输出产物格式 'amd/es6/iife/umd/cjs'
    name: 'test', // 当format为iife和umd时必须提供，会挂在在window下：window.test=...
    sourcemap: true, // 生成sourceMap文件
  },
};
```

基本配置完了来打包试试，命令行输入命令。

```javascript
rollup -c config/rollup.config.js
```

命令中-c 的意思是设置配置文件地址，--config 同样。还有其他命令如-w 开启监听等等。

每次打包这样输入命令肯定不方便，可以在 package.json 文件中配置 scripts 脚本。

```json
"scripts": {
    "build": "rollup -c config/rollup.config.js"
}
```

输入`npm run build`试试吧，方便很多吧。

### 配置 babel

js 高阶语法转换成浏览器识别的低阶语法。

    npm i -D rollup-plugin-babel @babel/core @babel/preset-env

改造`rollup.config.js`:

```javascript
// /config/rollup.config.js
import babel from 'rollup-plugin-babel';

export default {
  ...
  plugins: [
    babel({
      exclude: 'node_modules/**', // 排除node_modules文件夹
    }),
  ],
};
```

项目根目录创建`.babelrc`

```json
{
  "presets": [
    [
      "@babel/preset-env",
      {
        "modules": false
      }
    ]
  ],
  "plugins": []
}
```

`"modules": false`，不然 Babel 会在 Rollup 处理之前将模块转成 CommonJS，导致 Rollup 处理失败。

### 配置 typescript

现在 ts 这么火，我们当然也要支持 ts 才行啊。

```javascript
npm i -D typescript tslib @rollup/plugin-typescript
```

然后去改造 rollup.config.js，把入口文件改为 ts。

```javascript
// /config/rollup.config.js
...
import ts from '@rollup/plugin-typescript';
...

export default {
  input: './src/index.ts',
  ...
  plugins: [
    ...
    ts(),
    ...
  ],
};
```

在根目录创建 ts 的配置文件 tsconfig.json 文件，我这里全局安装了 typescript 就使用`tsc --init`创建配置。具体配置项可参照[typescript 中文网](https://www.tslang.cn/)。

### eslint

一个好的代码习惯是程序员必备的技能。

```javascript
npm i -D eslint
```

命令行输入命令`npx eslint --init`根据自己的代码习惯配置 eslint。更多配置，规则见[eslint 中文网](https://eslint.bootcss.com/)。

### 第三方依赖包

如果项目中需要依赖到第三方包，rollup 不像 webapck 直接引入就能使用，需要告诉 rollup 怎么处理。

    因为rollup默认使用es6的import/export，而大部分npm模块是使用的commonjs模块导出的，所以需要@rollup/plugin-commonjs处理。

```javascript
npm i -D @rollup/plugin-commonjs @rollup/plugin-node-resolve
```

修改 rollup 配置文件

```javascript
// /config/rollup.config.js
...
import nodeResolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
...

export default {
  ...
  plugins: [
    ...
    nodeResolve(),
    commonjs(),
    ...
  ],
};
```

### 环境区分

不同环境有不同的配置，比如说生产环境需要压缩代码，开发环境需要开启 sourceMap 便于调试等等。

```javascript
npm i -D rollup-merge-config
```

在 config 目录新建`rollup.config.dev.js`和`rollup.config.prod.js`，改变 package.json 文件 scripts 角本指向的配置文件。

```javascript
// /config/rollup.config.dev.js   rollup.config.prod.js类似
import merge from 'rollup-merge-config';
import baseConfig from './rollup.config.js';

export default merge(baseConfig, {
  // TODO 个环境不同的配置文件
});
```

```json
// package.json
"scripts": {
    "dev": "rollup -w -c config/rollup.config.dev.js",
    "build": "rollup -c config/rollup.config.prod.js"
}
```

### 压缩代码

推荐使用`rollup-plugin-terser`插件。

```javascript
npm i -D rollup-plugin-terser
```

修改配置文件，开发环境不用压缩代码，我们修改`rollup.config.prod.js`就好。

```javascript
...
import { terser } from 'rollup-plugin-terser';

export default merge(baseConfig, {
    plugins: [
        terser()
    ]
});
```

### 本地服务及热更新

```javascript
npm i -D rollup-plugin-serve rollup-plugin-livereload
```

启动本地服务只是开发时需要，使用我们只需要修改开发环境配置文件。

```javascript
...
import serve from 'rollup-plugin-serve';
import livereload from 'rollup-plugin-livereload';

export default merge(baseConfig, {
    plugins: [
        serve({
            port: 3001, // 端口号
            open: true, // 自动打开浏览器
        }),
        livereload(), // 热跟新
    ]
});
```

在项目根目录新建 index.html 同时引入输入的 js 文件

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>project-app</title>
  </head>
  <body>
    <script src="dist/main.js"></script>
  </body>
</html>
```

### 结束

嗯，就这样，后续再添加。
