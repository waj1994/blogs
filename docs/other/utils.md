---
groups: 记录
title: 工具库
description: 记录一些前端相关的工具库
outline: [2, 4]
date: 2024-05-20 10:29:00
---

### 前端 ocr 识别

前端 orc 识别使用`tesseract.js`库。

[npm 地址](https://www.npmjs.com/package/tesseract.js)

emmmmmm...计算耗时较长

```typescript
function recognize(
  image: ImageLike,
  langs?: string,
  options?: Partial<WorkerOptions>
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
import tesseract from "tesseract.js";

const handleOcr = async (e: Event) => {
  const [file] = (e.target as HTMLInputElement).files!;
  const res = await tesseract.recognize(file, "eng+chi_sim", {
    logger: (m) => {
      console.log(m);
    },
  });
  console.log(res);
};
```

返回结果包含了识别的文字，字体大小，加粗，位置，我没看到有颜色返回。