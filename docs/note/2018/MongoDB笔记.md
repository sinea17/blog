---
title: MongoDB笔记
date: 2018-01-06
---

# MongoDB 笔记

参考文章

- [用 Node 和 Express 打造 restful API](https://cnodejs.org/topic/5829631dd3abab717d8b4c2c)
- [Mongoose 学习参考文档——基础篇](http://blog.csdn.net/u011368551/article/details/52149921)

笔记

- bodyParser 是 HTTP 请求体解析中间件
  - 配置使用 `app.use(bodyParser.json());`
- router 路由
  - 配置使用 `app.use('/', router);`
- mongoose MongoDB 对象建模工具

  - Schema 定义数据表及表内字段，生成数据模型，可以称之为数据库模型骨架，不具备数据库的操作能力。Schema 支持的数据类型有`String Number Date Buffer Boolean Mixed Objectid Array`具体实现如下:

    ```js
    var mongoose = require("mongoose");
    var Schema = mongoose.Schema;
    // 开始定义Schema
    var phoneSchema = new Schema({
      device: String, //设备名称
      isSmart: Boolean, //是否为智能手机
      releaseTime: Date, //发布时间
      price: Number, //售价
      apps: [{ name: String }], //手机中安装的App名称,是数组
      manufacturer: {
        //手机厂商
        name: String, //厂商名称
        country: String, //厂商国籍
      },
    });
    ```

  - Model 是由 Schema 发布生成的模型，具有抽象属性和行为的数据库操作，将该 Schema 发布为 Model：

    ```js
    var phoneModel = mongoose.model("phone", phoneSchema);
    //如果该Model已经发布，则可以直接通过名字索引到，如下：
    var phoneModel = mongoose.model("phone");
    //如果没有发布，上一段代码将会异常
    ```

  - Entity 是由 Model 创建的实体，他的操作也会影响数据库，用 Model 创建 Entity：

    ```js
    var phoneEntity = new phoneModel({ device: "iphoneⅩ" });
    //打印这个实体的名字看看
    console.log(phoneEntity.device); //iphoneⅩ
    ```

  - Tips: 以上三者关系，Schema 生成 Model，Model 创造 Entity，Model 和 Entity 都可对数据库操作造成影响，但 Model 比 Entity 更具操作性。

启动 mongodb 数据库（在`MongoDB\bin`目录下操作）

1. 启动`mongod --dbpath d:/MongoDB/data/db`
2. 连接`mongo`
