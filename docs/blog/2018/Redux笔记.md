---
title: Redux笔记
date: 2018-01-26
---

# Redux 笔记

### React.js 小书

[React.js 小书](http://huziketang.com/books/react/lesson30)

Redux，一种新型的前端“架构模式”（Flux 架构的一种变种），它不关注你到底用什么库，你可以把它应用到 React 和 Vue，甚至跟 jQuery 结合都没有问题。

Redux 和 React-redux 并不是同一个东西，React-redux 就是把 Redux 这种架构模式和 React.js 结合起来的一个库，就是 Redux 架构在 React.js 中的体现。

reducer 文件编写格式参考：

1. 定义 action types
2. 编写 reducer
3. 跟这个 reducer 相关的 action creators

```js
// action types
const INIT_COMMENTS = "INIT_COMMENTS";
const ADD_COMMENT = "ADD_COMMENT";
const DELETE_COMMENT = "DELETE_COMMENT";

// reducer
export default function (state, action) {
  if (!state) {
    state = { comments: [] };
  }
  switch (action.type) {
    case INIT_COMMENTS:
      // 初始化评论
      return { comments: action.comments };
    case ADD_COMMENT:
      // 新增评论
      return {
        comments: [...state.comments, action.comment],
      };
    case DELETE_COMMENT:
      // 删除评论
      return {
        comments: [
          ...state.comments.slice(0, action.commentIndex),
          ...state.comments.slice(action.commentIndex + 1),
        ],
      };
    default:
      return state;
  }
}

// action creators
export const initComments = (comments) => {
  return { type: INIT_COMMENTS, comments };
};

export const addComment = (comment) => {
  return { type: ADD_COMMENT, comment };
};

export const deleteComment = (commentIndex) => {
  return { type: DELETE_COMMENT, commentIndex };
};
```

### Redux 莞式教程

[Redux 莞式教程](https://github.com/kenberkeley/redux-simple-tutorial) 本教程深入浅出，配套入门、进阶源码解读以及文档注释丰满的 Demo 等一条龙服务

- state 是应用的状态，一般本质上是一个普通对象
- store 是应用状态 state 的管理者，包含下列四个函数
  - getState() # 获取整个 state
  - dispatch(action) # ※ 触发 state 改变的【唯一途径】※
  - subscribe(listener) # 您可以理解成是 DOM 中的 addEventListener
  - replaceReducer(nextReducer) # 一般在 Webpack Code-Splitting 按需加载的时候用

二者的关系是：state = store.getState()

Redux 规定，一个应用只应有一个单一的 store，其管理着唯一的应用状态 state
Redux 还规定，不能直接修改应用的状态 state，也就是说，下面的行为是不允许的：

```js
var state = store.getState();
state.counter = state.counter + 1; // 禁止在业务逻辑中直接修改 state
```

**若要改变 state，必须 dispatch 一个 action，这是修改应用状态的不二法门**

> 现在您只需要记住 action 只是一个包含 type 属性的普通对象即可
> 例如 { type: 'INCREMENT' }

想生成一个 store，我们需要调用 Redux 的 createStore：

```js
import { createStore } from 'redux'
...
const store = createStore(reducer, initialState) // store 是靠传入 reducer 生成的哦！
```

> 现在您只需要记住 reducer 是一个 函数，负责更新并返回一个新的 state
> 而 initialState 主要用于前后端同构的数据同步（详情请关注 React 服务端渲染）
