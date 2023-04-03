---
title: React学习之道
date: 2018-02-06
---

# React 学习之道

#### 模块热替换

模块热替换（HMR）可以让浏览器重新加载应用的工具，并且无需让浏览器刷新页面。在入口文件 index.js 配置：

```js
...

if(module.hot){
	module.hot.accept()
}
```

#### 箭头函数

1. 一个普通的函数表达式总会定义它自己的 this 对象。但是箭头函数表达式仍然会使用包含它的语境
   下的 this 对象。
2. 如果函数只有一个参数，你就可以移除掉参数的括号，但是如果有多个参数，你就必须保留这个括号。
3. 在 ES6 的箭头函数中，你可以用简洁函数体来替换块状函数体（用花括号包含的内容），简洁函数体的返回不用显示声明。这样你就可以移除掉函数的 return 表达式。（最后函数声明表达式、花括号和返回声明都被省略了）

```js
//块状函数体
{list.map(item => {
    return (
        <div key={item.objectID}>
            ...
        </div>
    );
})
//简洁函数体
{list.map(item =>
    <div key={item.objectID}>
        ...
    </div>
)
```

#### ES6 结构

在 JavaScript ES6 中有一种更方便的方法来访问对象和数组的属性，叫做解构

```js
const user = {
  firstname: "Robin",
  lastname: "Wieruch",
};
// ES5
var firstname = user.firstname;
var lastname = user.lastname;
console.log(firstname + " " + lastname);
// ES6
const { firstname, lastname } = user;
console.log(firstname + " " + lastname);
//ES6默认参数
//若没有指定 className 属性，它的值就是一个空字符串，而非 undefined
const { onClick, className = "", children } = this.props;
```

#### 组件内部状态

调用 super(props); ，它会在你的构造函数中设置 this.props 以供在构造函数中  
访问它们。否则当在构造函数中访问 this.props ，会得到 undefined 。

#### 内联样式(inline-style)

```js
//值为对象，所以双花括号{{}}
<span style={{ width: '10%' }}></span>
//or 元素之外定义一个 style 对象
const testWidth = {
    width: '10%'
}
<span style={testWidth}></span>
```

#### 条件渲染

[react 条件渲染的多种方法](https://www.robinwieruch.de/conditional-rendering-react/)

&& 逻辑运算符

```js
function LoadingIndicator({ isLoading }) {
  return <div>{isLoading && <p>Loading...</p>}</div>;
}
```

三元运算（多条件注意拆分）

```js
function Item({ item, mode }) {
  const isEditMode = mode === "EDIT";

  return (
    <div>
      {isEditMode ? <ItemEdit item={item} /> : <ItemView item={item} />}
    </div>
  );
}
//==========or
function LoadingIndicator({ isLoading }) {
  return <div>{isLoading ? <p>Loading...</p> : null}</div>;
}
```

switch...case

```js
function Notification({ text, state }) {
  switch (state) {
    case "info":
      return <Info text={text} />;
    case "warning":
      return <Warning text={text} />;
    case "error":
      return <Error text={text} />;
    default:
      return null;
  }
}
```

键值对

```js
function Notification({ text, state }) {
  return (
    <div>
      {
        {
          info: <Info text={text} />,
          warning: <Warning text={text} />,
          error: <Error text={text} />,
        }[state]
      }
    </div>
  );
}
```

#### ES6 模块：import Export

```js
const firstname = "robin";
const lastname = "wieruch";
export { firstname, lastname };
```

```js
import { firstname, lastname } from "./file1.js";
console.log(firstname); //robin
```

对象方式导入全部变量 同时使用别名

```js
import * as person from "./file1.js";
console.log(person.firstname); //robin
```

单个变量导入使用别名

```js
import { firstname as foo } from "./file1.js";
console.log(foo); //robin
```

default 语句

```js
const robin = {
  firstname: "robin",
  lastname: "wieruch",
};
export default robin;
```

```js
import developer from "./file1.js";
console.log(developer); //{ firstname: 'robin', lastname: 'wieruch' }
```

多重混合导出导入

```js
const firstname = "robin";
const lastname = "wieruch";
const person = {
  firstname,
  lastname,
};
export { firstname, lastname };
export default person;
```

```js
import developer, { firstname, lastname } from "./file1.js";
console.log(developer);
// output: { firstname: 'robin', lastname: 'wieruch' }
console.log(firstname, lastname);
// output: robin wieruch
```

直接导出变量

```js
export const firstname = "robin";
export const lastname = "wieruch";
```
