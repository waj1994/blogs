---
title: 面试常见手写题
---

# {{$doc.title}}

## call、apply

改变 this 执行并执行函数。

区别：

- call 参数为一个一个的，apply 为数组。

思路：利用 js 执行上下文，谁调用一个函数，函数内部 this 就指向谁。

代码：

```javascript
// apply 参数就为content，arg = []
Function.prototype.myCall = function (content, ...arg) {
  // content不存在就默认指向全局。
  content = content || globalThis;
  content.fn = this;
  const res = content.fn(...arg);
  delete content.fn;
  return res;
};
```

## bind

改变 this 返回函数。

特点：

- 返回函数不会立即执行，需要手动调用，永久绑定 this
- 参数柯里化
- 返回函数可做构造函数，作为构造函数时传入的 this 失效

代码：

```javascript
Function.prototype.bind = function (context, ...arg) {
  /**
   * globalThis 全局对象 自动区分环境
   * 即node中的global，浏览器中的window，WebWorker中的self
   */
  context = context || globalThis;
  const fn = this;
  function Fn(...arguments) {
    return fn.apply(this instanceof Fn ? this : context, [
      ...arg,
      ...arguments,
    ]);
  }
  Fn.prototype = Object.create(this.prototype);
  return Fn;
};

const obj = {
  name: "sam",
};

function f1(sex, age) {
  this.say = "说话";
  console.log(this);
  console.log(this.name, sex, age);
}
f1.prototype.type = "动物";

const f = f1.bind(obj, "男");
f(28);
const o = new f(28);
console.log(o.type);
```

## 深拷贝

思路：

- 使用 WeakMap 对象存拷贝的 map 对象。
- 先判断值类型，如果是 string，number，null，undefined，function 直接返回；
- 如果是 RegExp，Date 就是使用构造函数重新创建一个新的对象再返回；
- 判断 map 对象中是否存在该值，存在直接返回（解决循环引用）;
- 循环对象执行递归深拷贝。

代码：

```javascript
// 使用map是为了解决循环引用，WeakMap是map的弱引用，利于垃圾回收。
function deepClone(target, map = new WeakMap()) {
  // null == undefined，ull和undefined直接返回
  if (target == null) {
    return target;
  }
  // 正则
  if (target instanceof RegExp) {
    return new RegExp(target);
  }
  // 对象
  if (target instanceof Date) {
    return new Date(target);
  }
  // 函数直接返回
  if (typeof target === "function") {
    return target;
  }
  // 如果不是对象直接返回
  if (typeof target !== "object") {
    return target;
  }

  // [] || {}
  const obj = new target.constructor();

  // 解决循环引用
  if (map.has(target)) {
    return map.get(target);
  }
  map.set(target, obj);

  for (let key in target) {
    // 如果是实例本身的属性
    if (target.hasOwnProperty(key)) {
      obj[key] = deepClone(target[key], map);
    }
  }
  return obj;
}
```

## 柯里化

柯里化：接受多个参数的函数变换成接受一个单一参数（最初函数的第一个参数）的函数，
并且返回接受余下的参数而且返回结果的新函数，参数传递完成后函数执行。

思路：判断当前参数是否等于原函数参数，如果相等就执行原函数，如果不相等就返回一个
新函数，新函数内部执行递归柯里化函数。

代码：

```javascript
function currying(callback, ...arg) {
  if (typeof callback !== "function") {
    throw "callback is not a function";
  }
  // callbacl.length 可以获取到函数的参数个数
  return callback.length === arg.length
    ? callback(...arg)
    : function (...newArg) {
        return currying(callback, ...arg, ...newArg);
      };
}
```

## 防抖

防抖：在某一高频触发事件时，直到某个时间段不触发才执行事件。

思路：利用闭包和定时器，在外层函数记录定时器 timer，内层函数首先清除定时器
timer，再设置定时器在一定时间内不触发事件则定时器执行。

代码：

```javascript
function debounce(fn, wait) {
  let timer = null;
  return function () {
    clearTimeout(timer);
    timer = window.setTimeout(() => {
      fn.call(this, ...arguments);
    }, wait);
  };
}
```

## 节流-thorttle

节流：事件在某一时间段内只执行一次。

### 方法一：定时器

思路：利用闭包和定时器，在外层函数记录定时器 timer，内层函数判断是否定时器 timer
的值是否存在，不存在设置定时器设置延后执行并清楚定时器。

代码：

```typescript
function thorttle(fn, wait) {
  let timer = null;
  return function () {
    if (!timer) {
      timer = setTimeout(() => {
        fn.call(this, ...arguments);
        timer = null;
      }, wait);
    }
  };
}
```

### 方法二：时间戳

思路：利用时间差和闭包，外层函数记录上一次执行的时间，内存函数判断当前时间减去上
一次的时间是否大于定义的时间，如果大于就执行函数并重新记录上一次的时间。

代码：

```javascript
function thorttle(fn, wait) {
  let oldTime: number = 0;
  return function () {
    const newTime = +new Date(); // 时间戳
    if (newTime - oldTime >= wait) {
      fn.call(this, ...arguments);
      oldTime = newTime;
    }
  };
}
```

## 扁平化-flat

扁平化：多维数组打散为一维数组。

### 第一种方法--flat

flat 方法参数为可选，表示需要递归的层级，即需要打散的数组层级，默认为 1，在不确
定需要递归的层级时传入 Infinity 可递归全部。

```javascript
[1, [2, [3]]].flat(Infinity); // [1, 2, 3]
```

### 第二种方法--转为字符串

利用数组 api(toString、join)将多维数组转为字符串。再讲字符串转为一维数组。注意使
用场景，使用该方案如果是数值需要转换。

```javascript
[1, [2, [3]]]
  .toString()
  .split(",")
  .map((item) => Number(item)); // [1, 2, 3]
```

### 第三种方法--遍历递归

遍历数组判断数组每一个元素是否是数组，如果是数组递归执行，如果不是数组放入返回结
果中。常见的是使用 reduce 遍历。

```javascript
function flat(arr) {
  return arr.reduce((prev, next) => {
    return prev.concat(Array.isArray(next) ? flat(next) : next);
  }, []);
}
```

## instanceof

instanceof：用于检测构造函数的 prototype 属性是否出现在某个实例对象的原型链上。

思路：循环判断实例的**proto**是否等于类的 prototype。

代码：

```javascript
function myInstanceof(instance, parent) {
  // Object.getPrototypeOf获取的是instance的__proto__，ie没有__proto__！！！
  let obj = Object.getPrototypeOf(instance);
  while (obj) {
    if (obj === parent.prototype) {
      return true;
    }
    obj = Object.getPrototypeOf(obj);
  }
  return false;
}
```

## new

思路：

- 创建一个空对象
- 执行原链操作
- 执行构造函数（改变 this）
- 返回结果(构造函数结果如果为对象或者函数就返回构造函数结果，否则返回创建的对象)

代码：

```javascript
function myNew(parent, ...arg) {
  const obj = Object.create(parent.prototype);
  const res = parent.call(obj, ...arg);
  if (res !== null && ["object", "function"].includes(typeof res)) {
    return res;
  }
  return obj;
}
```

## a == 1 && a == 2 && a == 3

#### 隐式类型转换

    array/object在进行==判断时会进行类型转换，转换成基本类型比较。

思路：

- object 转换时会有依次调用方法 Symbol.toPrimitive，valueOf，toString。如果返回
  的是基本类型就停止调用。

代码：

```javascript
const a = {
  i: 1,
  // Symbol.toPrimitive
  /* [Symbol.toPrimitive]() {
        return this.i++
    } */

  // valueOf
  /* valueOf() {
        return this.i++
    } */

  // toString
  toString() {
    return this.i++;
  },
};

console.log(a == 1 && a == 2 && a == 3);
```

- array 转换和 object 类同，不过 toString 会调用数组的 join 方法。  
  代码：

```javascript
const a = [1];

// Symbol.toPrimitive
/* a[Symbol.toPrimitive] = function () {
    return this[0]++
} */

// valueOf
/* a.valueOf = function () {
    return this[0]++
} */

// toString
/* a.toString = function () {
    return this[0]++
} */

// join array本身的toString方法会调array的join方法
a.join = function () {
  return this[0]++;
};

console.log(a == 1 && a == 2 && a == 3);
```

#### 劫持代理

思路：使用 Object.defineProperty 或者 Object.proxy。

代码:

```javascript
/* let _a = 1
Object.defineProperty(window, 'a', {
    get() {
        return _a++
    }
}); */

const a = new Proxy(
  { _a: 1 },
  {
    get(a) {
      return () => a._a++;
    },
  }
);

console.log(a == 1 && a == 2 && a == 3);
```

#### with

    注意： 实际开发中不要用with！！！

代码：

```javascript
let _a = 1;
with ({
  get a() {
    return _a++;
  },
}) {
  console.log(a == 1 && a == 2 && a == 3);
}
```
