---
title: 使用 Express+MongoDB 搭建多人博客
date: 2018-07-17
---

# 使用 Express+MongoDB 搭建多人博客

> 参考[一起学 Node.js](https://github.com/nswbmw/N-blog)，使用 Express + MongoDB 搭建多人博客

### Node.js 知识点讲解

- require
  - require 可加载 .js、.json 和 .node 后缀的文件
  - require 的过程是同步的
  - require 目录的机制:package.json(含 main 字段)->index.js/index.node
  - require 过的文件会加载到缓存，所以多次 require 同一个文件（模块）不会重复加载
  - 判断是否是程序的入口文件有两种方式:
    - require.main === module（推荐）
    - module.parent === null
  - 循环引用：循环引用并不会报错，引用的对象未初始化好，只能拿到初始值空对象 `{}`，解决办法：
    - 分离共用的代码
    - 不在最外层 require，在用到的地方 require，通常在函数的内部
- exports 和 module.exports
  - module.exports 初始值为一个空对象 {}
  - exports 是指向的 module.exports 的引用
  - require() 返回的是 module.exports 而不是 exports
- [Promise](https://github.com/nswbmw/N-blog/blob/master/book/2.3%20Promise.md)
- npm（第三种方式将固定版本号写入，建议线上的 Node.js 应用都采取这种锁定版本号的方式，但只针对最外层依赖）
  - `npm i express --save`/`npm i express -S` (安装 express，同时将 "express": "^4.14.0" 写入 dependencies )
  - `npm i express --save-dev`/`npm i express -D` (安装 express，同时将 "express": "^4.14.0" 写入 devDependencies )
  - `npm i express --save --save-exact` (安装 express，同时将 "express": "4.14.0" 写入 dependencies )
  - `npm shrinkwrap`（产生一个 npm-shrinkwrap.json，里面包含了通过 node_modules 计算出的模块的依赖树及版本，应用在任何机器上安装的都是同样版本的模块（不管嵌套多少层））

### Hello, Express

- 初始化一个 Express 项目
  - 安装`npm i express@4.14.0 --save`
  - 新建`index.js`，生成一个 express 实例 app，挂载了一个根路由控制器，然后监听 3000 端口并启动程序。运行 node index，打开浏览器访问 localhost:3000 时，页面应显示 hello, express。
    ```js
    const express = require("express");
    const app = express();
    app.get("/", function (req, res) {
      res.send("hello, express");
    });
    app.listen(3000);
    ```
- supervisor（监听 node 和 js 后缀的文件每次修改代码保存后，自动重启程序）
  - 安装`npm i -g supervisor`
  - 运行`supervisor index`启动程序
- 路由（express 使用了`path-to-regexp`模块实现的路由匹配）

  - `req.params`解析 url 中的占位符，如`/users/123`，挂载路径写作`/users/:name`
  - `req.query`解析后的 url 中的 querystring，如`/users?name=Tom`，挂载路径写作`/users`
  - `req.body`解析后请求体，需使用相关的模块，如`body-parser`，请求体为 `{"name": "haha"}`
  - `express.Router()` 我们将 / 和 /users/:name 的路由分别放到了 routes/index.js 和 routes/users.js 中，每个路由文件通过生成一个 express.Router 实例 router 并导出，通过 app.use 挂载到不同的路径。这两种代码实现了相同的功能，但在实际开发中推荐使用 express.Router 将不同的路由分离到不同的路由文件中。

    ```js
    // index.js
    const userRouter = require('./routes/user')

    app.use('/user', userRouter)
    ...

    // routes/user.js
    const express = require('express')
    const router = express.Router()
    router.get('/:name', function (req, res) {
        res.send('hello, ' + req.params.name)
    })
    module.exports = router
    ```

- 模板引擎
  - [ejs](https://www.npmjs.com/package/ejs)
    - 通过 app.set 设置模板引擎为 ejs 和存放模板的目录
      ```js
      const path = require('path')
      ···
      app.set('views', path.join(__dirname, 'views'))// 设置存放模板文件的目录
      app.set('view engine', 'ejs')// 设置模板引擎为 ejs
      ···
      ```
    - 新建 views/user.ejs 模板文件
      ```js
      <!DOCTYPE html>
      <html>
        <head>
          <style type="text/css">
            body {padding: 50px;font: 14px "Lucida Grande", Helvetica, Arial, sans-serif;}
          </style>
        </head>
        <body>
          <h1><%= name.toUpperCase() %></h1>
          <p>hello, <%= name %></p>
        </body>
      </html>
      ```
    - 修改路由 routes/user.js 通过调用 res.render 函数渲染 ejs 模板，res.render 第一个参数是模板的名字，这里是 users 则会匹配 views/user.ejs，第二个参数是传给模板的数据，这里传入 name，则在 ejs 模板中可使用 name。res.render 的作用就是将模板和数据结合生成 html，同时设置响应头中的 Content-Type: text/html，告诉浏览器我返回的是 html，不是纯文本，要按 html 展示。
      ```js
      router.get('/:name', function (req, res) {
        <!--res.send('user:'+req.params.name)-->
        res.render('users', {
          name: req.params.name
        })
      })
      ```
    - `<% code %>`：运行 JavaScript 代码，不输出；`<%= code %>`：显示转义后的 HTML 内容；`<%- code %>`：显示原始 HTML 内容
      ```js
      <h1><%= name.toUpperCase() %></h1>
      <p>hello, <%= name %></p>
      <%= '<h1>hello</h1>' %>
      <%- '<h1>hello</h1>' %>
      <% var aaa = [1,2,3]; %>
      <% for (var i = aaa.length - 1; i >= 0; i--) { %>
      	<span><%= aaa[i] %></span>
      <% } %>
      ```
      显示效果
      ```js
      HAHA123
      hello, haha123
      <h1>hello</h1>
      hello
      3 2 1
      ```
  - includes 我们将原来的 users.ejs 拆成出了 header.ejs 和 footer.ejs，并在 users.ejs 通过 ejs 内置的 include 方法引入，从而实现了跟以前一个模板文件相同的功能。
    - views/header.ejs
      ```js
      <!DOCTYPE html>
      <html>
        <head>
          <style type="text/css">
            body {padding: 50px;font: 14px "Lucida Grande", Helvetica, Arial, sans-serif;}
          </style>
        </head>
        <body>
      ```
    - views/footer.ejs
      ```js
        </body>
      </html>
      ```
    - views/users.ejs
      ```js
      <%- include('header') %>
        <h1><%= name.toUpperCase() %></h1>
        <p>hello, <%= name %></p>
      <%- include('footer') %>
      ```
- Express 浅析

  - 中间件与 next（中间件的加载顺序很重要！）

    > express@4 之前的版本基于 connect 这个模块实现的中间件的架构，express@4 及以上的版本则移除了对 connect 的依赖自己实现了，理论上基于 connect 的中间件（通常以 connect- 开头，如 connect-mongo）仍可结合 express 使用。

    - express 中的中间件（middleware）就是用来处理请求的，当一个中间件处理完，可以通过调用 next() 传递给下一个中间件，如果没有调用 next()，则请求不会往下传递

      ```js
      app.use(function (req, res, next) {
        console.log("1");
        next();
      });

      app.use(function (req, res, next) {
        console.log("2");
        res.status(200).end();
      });
      ```

    - 通过 app.use 加载中间件，在中间件中通过 next 将请求传递到下一个中间件，next 可接受一个参数接收错误信息，如果使用了 next(error)，则会返回错误而不会传递到下一个中间件
      ```js
      app.use(function (req, res, next) {
        console.log('1')
        <!--next()-->
        next(new Error('haha'))
      })
      ```

  - 错误处理 [官方文档](http://expressjs.com/en/guide/error-handling.html)
    ```js
    //错误处理
    app.use(function (err, req, res, next) {
      console.error(err.stack);
      res.status(500).send("Something broke!");
    });
    ```

### 一个简单的博客

- 开发环境
  - Node.js: 8.9.1
  - MongoDB: 3.4.10
  - Express: 4.16.2
- 准备工作
  - 目录结构
    - models: 存放操作数据库的文件
    - public: 存放静态文件，如样式、图片等
    - routes: 存放路由文件
    - views: 存放模板文件
    - index.js: 程序主文件
    - package.json: 存储项目名、描述、作者、依赖等等信息
  - 安装依赖模块
    - 运行以下命令安装所需模块：
      ```base
      npm i config-lite connect-flash connect-mongo ejs express express-formidable express-session marked moment mongolass objectid-to-timestamp sha1 winston express-winston --save
      ```
      - express: web 框架
      - express-session: session 中间件
      - connect-mongo: 将 session 存储于 mongodb，结合 express-session 使用
      - connect-flash: 页面通知的中间件，基于 session 实现
        ejs: 模板
      - express-formidable: 接收表单及文件上传的中间件
      - config-lite: 读取配置文件
      - marked: markdown 解析
      - moment: 时间格式化
      - mongolass: mongodb 驱动
      - objectid-to-timestamp: 根据 ObjectId 生成时间戳
      - sha1: sha1 加密，用于密码加密
      - winston: 日志
      - express-winston: express 的 winston 日志中间件
  - ESLint 是一个代码规范和语法错误检查工具。使用 ESLint 可以规范我们的代码书写，可以在编写代码期间就能发现一些低级错误。
    - ESLint 需要结合编辑器或 IDE 使用
      - Sublime Text 需要装两个插件：SublimeLinter + SublimeLinter-contrib-eslint
      - VS Code 需要装一个插件：ESLint
    - 全局安装 eslint `npm i eslint -g`
    - 运行 `eslint --init`初始化 eslint 配置，依次选择（注意：如果 Windows 用户使用其他命令行工具无法上下切换选项，切换回 cmd）：
      - Use a popular style guide
      - Standard
      - JSON
        eslint 会创建一个 .eslintrc.json 的配置文件，同时自动安装并添加相关的模块到 devDependencies。这里我们使用 Standard 规范，其主要特点是不加分号。
- 配置文件
  - [config-lite](config-lite) 是一个轻量的读取配置文件的模块，会根据环境变量（NODE_ENV）的不同加载 config 目录下不同的配置文件，支持 .js、.json、.node、.yml、.yaml 后缀的文件。
    - 在 myblog 下新建 config 目录，在该目录下新建 default.js
      ```js
      module.exports = {
        port: 3000, //程序启动要监听的端口号
        session: {
          //express-session 的配置信息
          secret: "myblog",
          key: "myblog",
          maxAge: 2592000000,
        },
        //mongodb 的地址，以 mongodb:// 协议开头，myblog 为 db 名
        mongodb: "mongodb://localhost:27017/myblog",
      };
      ```
- 功能设计

  - 功能与路由设计
    - 分为页面和接口，通过简单的`<a>(GET)`和`<form>(POST)`与后端进行交互，如：
      - 登录页：GET /signin
      - 登录：POST /signin
    - Restful 是一种 api 的设计风格，提出了一组 api 的设计原则和约束条件。
      - 如上面删除文章的路由设计
        ```js
        GET /posts/:postId/remove
        ```
      - Restful 风格的设计
        ```js
        DELETE /posts/:postId
        ```
  - 会话 由于 HTTP 协议是无状态的协议，所以服务端需要记录用户的状态时，就需要用某种机制来识别具体的用户，这个机制就是会话（Session）。
    - cookie 与 session 的区别
      - cookie 存储在浏览器（有大小限制），session 存储在服务端（没有大小限制）
      - 通常 session 的实现是基于 cookie 的，session id 存储于 cookie 中
      - session 更安全，cookie 可以直接在浏览器查看甚至编辑
    - 通过引入 express-session 中间件实现对会话的支持：
      ```js
      app.use(session(options));
      ```
      session 中间件会在 req 上添加 session 对象，即 req.session 初始值为 {}，当我们登录后设置 req.session.user = 用户信息，返回浏览器的头信息中会带上 set-cookie 将 session id 写到浏览器 cookie 中，那么该用户下次请求时，通过带上来的 cookie 中的 session id 我们就可以查找到该用户，并将用户信息保存到 req.session.user
  - 页面通知
    - [connect-flash](https://www.npmjs.com/package/connect-flash) 是基于 session 实现的，设置初始值 req.session.flash={}，通过 req.flash(name, value) 设置这个对象下的字段和值，通过 req.flash(name) 获取这个对象下的值，同时删除这个字段，实现了只显示一次刷新后消失的功能。
    - express-session、connect-mongo 和 connect-flash 的区别与联系
      - express-session: 会话（session）支持中间件
      - connect-mongo: 将 session 存储于 mongodb，需结合 express-session 使用，我们也可以将 session 存储于 redis，如 connect-redis
      - connect-flash: 基于 session 实现的用于通知功能的中间件，需结合 express-session 使用
  - 权限控制

    - 创建检查用户状态中间件，在 myblog 下新建 middlewares 目录，在该目录下新建 check.js

      ```js
      //middlewares/check.js
      module.exports = {
        checkLogin: function checkLogin(req, res, next) {
          if (!req.session.user) {
            req.flash("error", "未登录");
            return res.redirect("/signin");
          }
          next();
        },

        checkNotLogin: function checkNotLogin(req, res, next) {
          if (req.session.user) {
            req.flash("error", "已登录");
            return res.redirect("back"); // 返回之前的页面
          }
          next();
        },
      };
      ```

      - checkLogin: 当用户信息（req.session.user）不存在，即认为用户没有登录，则跳转到登录页，同时显示 未登录 的通知，用于需要用户登录才能操作的页面
      - checkNotLogin: 当用户信息（req.session.user）存在，即认为用户已经登录，则跳转到之前的页面，同时显示 已登录 的通知，如已登录用户就禁止访问登录、注册页面
