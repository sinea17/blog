---
title: JavaScript开发注意事项
date: 2018-01-07
---

# JavaScript 开发注意事项

参考文章 [JavaScript 的常见注意点](https://segmentfault.com/a/1190000012730162)

- 立即执行函数
  - 常见写法：
  ```js
  (function () {
    // code
  })();
  ```
  - 前置`void`写法：
  ```js
  void (function () {
    // code
  })();
  ```
  - 前置`!`写法：
  ```js
  !(function () {
    // code
  })();
  ```
- 判断变量是否为对象，先判断其值是否为`null`，因为：
  ```js
  typeof null === "object"; // true
  ```
  所以判断对象的写法：
  ```js
  if (someVal !== null && typeof someVal === "object") {
    // someVal 是一个对象
  }
  ```
- 判断小数是否相等，请使用相减取绝对值的方式（表示两数相差在一定范围内即认为他们相等），因为：
  ```js
  0.1 + 0.2 === 0.3; // false
  ```
  相减取绝对值比较方法：
  ```js
  Math.abs(0.1 + 0.2 - 0.3) <= 1e-10; // true 1e-10表示1*10^-10
  ```
- 字符转换为整数
  - `parseInt(parm1, parm2)`,`parm1`为字符串（如果不是字符串则会首先转换为字符串），`parm2`为进制数，如果不传第二个参数，则进制由第一个参数决定。比如以 0x 开头的字符串，会被解析为 16 进制数，IE8 和一批老 Android 浏览器：
    ```js
    parseInt("011"); // 9
    ```
    ==不要使用 parseInt 给小数取整== 假如第一个参数不是字符串，可能导致以下情况：
    ```js
    parseInt(0.0000008); // 8
    //0.0000008会先被转为字符串
    String(0.0000008); //'8e-7'
    parseInt("8e-7"); //8
    ```
