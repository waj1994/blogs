---
title: 工具库
date: 2023-04-06
keywords: 工具库,开发,前端
description: 记录日常开发，学习中遇到的好用的工具库的一些用法，方便后续遇到相同的需求有个参考
---

### 前端 ocr 识别

前端 orc 识别使用`tesseract.js`库。

[npm 地址](https://www.npmjs.com/package/tesseract.js)

emmmmmm...计算耗时较长

```typescript
function recognize(
  image: ImageLike,
  langs?: string,
  options?: Partial<WorkerOptions>,
): Promise<RecognizeResult>;
```

参数说明：

- image：图片地址或 file 对象
- langs：识别的语言，默认为英文
  - eng：英文
  - chi_sim：中文
  - eng+chi_sim：中英文
  - ...
- options：配置参数

```typescript
import tesseract from 'tesseract.js';

const handleOcr = async (e: Event) => {
  const [file] = (e.target as HTMLInputElement).files!;
  const res = await tesseract.recognize(file, 'eng+chi_sim', {
    logger: (m) => {
      console.log(m);
    },
  });
  console.log(res);
};
```

返回结果包含了识别的文字，字体大小，加粗，位置，我没看到有颜色返回。
