# TypeScript

## 什么是 TypeScript？

TypeScript 是一种由微软开发的自由和开源的编程语言。它是 JavaScript 的一个超集，而且本质上向这个语言添加了可选的静态类型和基于类的面向对象编程。

### TypeScript 与 JavaScript 的区别

| JavaScript                                 | TypeScript                                     |
| ------------------------------------------ | ---------------------------------------------- |
| 一种脚本语言，用于创建动态网页             | JavaScript 的超集用于解决大型项目的代码复杂性  |
| 作为一种解释型语言，只能在运行时发现错误   | 可以在编译期间发现并纠正错误                   |
| 弱类型，没有静态类型选项                   | 强类型，支持静态和动态类型                     |
| 可以直接在浏览器中使用                     | 最终被编译成 JavaScript 代码，使浏览器可以理解 |
| 不支持模块，泛型或接口                     | 支持模块、泛型和接口                           |
| 不支持编译其他 ES3，ES4，ES5 或 ES6 功能   | 支持 ES3，ES4，ES5 和 ES6 等                   |
| 大量的社区支持以及大量文档和解决问题的支持 | 社区的支持仍在增长，而且还不是很大             |

线上体验测试语法： [ TypeScript Playground](www.typescriptlang.org/play/)

## 基础类型

### Boolean

```ts
let isDone: boolean = false;
// ES5：var isDone = false;
```

### String

```ts
let name: string = "Semliker";
// ES5：var name = 'Semlinker';
```

### Array

```ts
let list: number[] = [1, 2, 3];
// ES5：var list = [1,2,3];

let list: Array<number> = [1, 2, 3]; // Array<number>泛型语法
// ES5：var list = [1,2,3];
```

### Enum

#### 数字枚举

默认情况，初始值为 0，后续成员自动增长

```ts
enum Direction {
  NORTH,
  SOUTH,
  EAST,
  WEST,
}

let dir: Direction = Direction.NORTH;

// ES5：

var Direction;
(function (Direction) {
  Direction[(Direction["NORTH"] = 0)] = "NORTH";
  Direction[(Direction["SOUTH"] = 1)] = "SOUTH";
  Direction[(Direction["EAST"] = 2)] = "EAST";
  Direction[(Direction["WEST"] = 3)] = "WEST";
})(Direction || (Direction = {}));
let dir = Direction.NORTH;
```

#### 字符串枚举

```ts
enum Direction {
  NORTH = "NORTH",
  SOUTH = "SOUTH",
  EAST = "EAST",
  WEST = "WEST",
}

// ES5：

var Direction;
(function (Direction) {
  Direction["NORTH"] = "NORTH";
  Direction["SOUTH"] = "SOUTH";
  Direction["EAST"] = "EAST";
  Direction["WEST"] = "WEST";
})(Direction || (Direction = {}));
```

#### 异构枚举

异构枚举的成员值是数字和字符串的混合

```ts
enum Enum {
  A,
  B,
  C = "C",
  D = "D",
  E = 8,
  F,
}

// ES5：

var Enum;
(function (Enum) {
  Enum[(Enum["A"] = 0)] = "A";
  Enum[(Enum["B"] = 1)] = "B";
  Enum["C"] = "C";
  Enum["D"] = "D";
  Enum[(Enum["E"] = 8)] = "E";
  Enum[(Enum["F"] = 9)] = "F";
})(Enum || (Enum = {}));

//"反向映射"
onsole.log(Enum.A); //输出：0
console.log(Enum[0]); // 输出：A
```

### Any

在 TypeScript 中，任何类型都可以被归为`any`类型。这让`any`类型成为了类型系统的顶级类型（也被称作全局超级类型）。

同时允许对`any`类型的值执行任何操作：

```ts
let value: any;

value.foo.bar; // OK
value.trim(); // OK
value(); // OK
new value(); // OK
value[0][1]; // OK
```

使用`any`类型，可以很容易地编写类型正确但在运行时有问题的代码，为了解决`any`带来的问题，TypeScript 3.0 引入了`unknown`类型。

### Unknown

用于描述类型不确定的变量，类似`any`，所有类型也都可以赋值给`unknown`，使得`unknown`成为 TypeScript 类型系统的另一种顶级类型。

将类型为`unknown`的值赋值给其他类型的变量时，除了`any`类型和`unknown`类型本身，其他类型都会报错。

```ts
let value: unknown;

let value1: unknown = value; // OK
let value2: any = value; // OK
let value3: boolean = value; // Error
let value4: number = value; // Error
let value5: string = value; // Error
let value6: object = value; // Error
let value7: any[] = value; // Error
let value8: Function = value; // Error
```

如果对`unknown`类型的值执行任何操作：

```ts
let value: unknown;

value.foo.bar; // Error
value.trim(); // Error
value(); // Error
new value(); // Error
value[0][1]; // Error
```

### Tuple

元组工作方式类似数组，单组可以单个变量中存储不同类型的值。元组可用于定义具有有限数量的未命名属性的类型。使用元组时，必须提供每个属性的值。

```ts
let tupleType: [string, boolean];
tupleType = ["Semlinker", true];

// ES5：

let tupleType;
tupleType = ["Semlinker", true];
```

### Void

某种程度上来说，`void`类型像是与`any`类型相反，它表示没有任何类型。

当一个函数没有返回值时，你通常会见到其返回值类型是`void`：

```ts
// 声明函数返回值为void
function warnUser(): void {
  console.log("This is my warning message");
}

// ES5：

function warnUser() {
  console.log("This is my warning message");
}
```

声明一个`void`类型的变量没有什么作用，因为它的值只能为`undefined`或`null`：

```ts
let unusable: void = undefined;
```

### Null、Undefined

默认情况下`null`和`undefined`是所有类型的子类型，如果配置了`strictNullChecks`，`null`和`undefined`只能赋值给`void`和它们各自的类型。

### Never

`never`类型表示的是那些永不存在的值的类型。比如总是会抛出异常的函数表达式，还有从来不会有返回值的函数（死循环）。

```ts
//抛出异常的函数
function error(message: string): never {
  throw new Error(message);
}
//死循环
function infiniteLoop(): never {
  while (true) {}
}
```

使用`never`避免出现新增了联合类型没有对应的实现。

`void`表示没有任何类型，`never`表示永远不存在的值的类型。当一个函数返回空值时，它的返回值为`void`类型，但是，当一个函数永不返回时（或者总是抛出错误），它的返回值为`never`类型。`void`类型可以被赋值（在 strictNullChecking 为 false 时），但是除了`never`本身以外，其他任何类型不能赋值给`never`。
