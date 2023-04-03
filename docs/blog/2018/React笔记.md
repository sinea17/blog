---
title: React笔记
date: 2018-01-16
---

# React 笔记

### 绑定事件

- constructor 中绑定 this
  ```js
  this.handleClick = this.handleClick.bind(this);
  ```
- 函数使用 ES6 箭头函数
  ```js
  handleClick = () => {
    //do somesthing
  };
  ```
- render 中事件使用 ES6 箭头函数
  ```js
  //before
  <button onClick={this.handleClick}>按钮</button>
  //after
  <button onClick={()=>{this.handleClick()}}>按钮</button>
  //or
  <button onClick={e=>{this.handleClick()}}>按钮</button>
  ```

### 组件状态 state

React.js 提供的 setState 方法接受一个对象或者函数作为参数

当你调用 setState 的时候，React.js 并不会马上修改 state

```js
handleClickOnLikeButton () {
    this.setState({ count: 0 }) // => this.state.count 还是 undefined
    this.setState({ count: this.state.count + 1}) // => undefined + 1 = NaN
    this.setState({ count: this.state.count + 2}) // => NaN + 2 = NaN
}
```

这并不是什么 bug，只是 React.js 的 setState 把你的传进来的状态缓存起来，稍后才会帮你更新到 state 上，所以你获取到的还是原来的数据

```js
handleClickOnLikeButton () {
    this.setState((prevState) => {
      return { count: 0 }
    })
    this.setState((prevState) => {
      return { count: prevState.count + 1 } // 上一个 setState 的返回是 count 为 0，当前返回 1
    })
    this.setState((prevState) => {
      return { count: prevState.count + 2 } // 上一个 setState 的返回是 count 为 1，当前返回 3
    })
    // 最后的结果是 this.state.count 为 3
  }
```

进行了三次 setState，但是实际上组件只会重新渲染一次，而不是三次。这是因为在 React.js 内部会把 JavaScript 事件循环中的消息队列的同一个消息中的 setState 都进行合并以后再重新渲染组件

- state 是让组件控制自己的状态，props 是让外部对组件自己进行配置
- 尽量少地用 state，尽量多地用 props，降低代码维护的难度，也会在一定程度上增强组件的可复用性

> React.js 将组件渲染，并且构造 DOM 元素然后塞入页面的过程称为组件的挂载

### 插入文本、样式`dangerouslySetHTML` `style`

- dangerouslySetHTML

```js
this.state = {
  testHtml: '<h1>React.js</h1>'
}

...

<div dangerouslySetInnerHTML={{__html: this.state.testHtml}} />
```

- style 用法和 DOM 里面的 style 不大一样

```js
//普通的 HTML 中
<h1 style='font-size: 12px; color: red;'></h1>
//React 中 需要把 CSS 属性变成一个对象再传给元素
<h1 style={{fontSize: '12px', color: 'red'}}></h1>
```

### 默认 props

```js
static defaultProps = {
	comments: []
}
```

### PropTypes 类型验证及是否必传参数

```js
import PropTypes from 'prop-types';

...
//仅类型验证
static propTypes = {
    comment: PropTypes.object
}
//要求必须传入参数
static propTypes = {
    comment: PropTypes.object.isRequired//
}
```

### '全局变量'context，==不建议使用==

当前组件及其所包含的组件都能提取使用的状态

```js
class Index extends Component {
  //验证 getChildContext 返回的对象
  static childContextTypes = {
    themeColor: PropTypes.string
  }

  constructor () {
    super()
    this.state = { themeColor: 'red' }
  }

  //设置 context 的过程，它返回的对象就是 context（也就是上图中处于中间的方块）
  //所有的子组件都可以访问到这个对象
  getChildContext () {
    return { themeColor: this.state.themeColor }
  }

  render () {
    return (
      <div>
        <Header />
        <Main />
      </div>
    )
  }
}

...
  //调整一下conetext
  componentWillMount () {
    this.setState({ themeColor: 'green' })
  }

```

子组件或孙子组件获取 context

```js
class Title extends Component {
  //contextTypes 来声明和验证你需要获取的状态的类型,必写
  static contextTypes = {
    themeColor: PropTypes.string,
  };

  render() {
    return <h1 style={{ color: this.context.themeColor }}>React.js</h1>;
  }
}
```

### Tips

##### 函数命名

组件的私有方法都用 `_` 开头，所有事件监听的方法都用 `handle` 开头。把事件监听方法传给组件的时候，属性名用 `on` 开头。例如：

```js
<CommentInput onSubmit={this.handleSubmitComment.bind(this)} />
```

这样统一规范处理事件命名会给我们带来语义化组件的好处，监听（`on`）`CommentInput` 的 `Submit` 事件，并且交给 `this` 去处理（`handle`）。这种规范在多人协作的时候也会非常方便。

##### 组件的内容编写顺序如下：

1. static 开头的类属性，如 defaultProps、propTypes。
2. 构造函数，constructor。
3. getter/setter（还不了解的同学可以暂时忽略）。
4. 组件生命周期。
5. \_ 开头的私有方法。
6. 事件监听方法，handle\*。
7. render*开头的方法，有时候 render()方法里面的内容会分开到不同函数里面进行，这些函数都以 render* 开头。
8. render() 方法。
