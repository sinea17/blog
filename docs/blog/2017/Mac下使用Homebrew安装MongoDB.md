---
title: Mac下使用Homebrew安装MongoDB
date: 2017-06-12
---

# Mac 下使用 Homebrew 安装 MongoDB

[MongoDB 官网](https://www.mongodb.com/)

[MongoDB 官方安装指南](https://docs.mongodb.com/manual/administration/install-community/)

打开终端更新 brew

```base
brew update
```

安装 MongoDB

```base
brew install mongodb
```

安装完成后会提示如何启动

```base
Then to load mongodb now:
launchctl load ~/Library/LaunchAgents/homebrew.mxcl.mongodb.plist
Or, if you don’t want/need launchctl, you can just run:
mongod —config /usr/local/etc/mongod.conf
```

配置 mongod.conf（默认），文件位置参考上方

```base
systemLog://操作记录打印目录
  destination: file
  path: /usr/local/var/log/mongodb/mongo.log
  logAppend: true
storage://存储数据目录
  dbPath: /usr/local/var/mongodb
net://网络地址
  bindIp: 127.0.0.1

```

启动 MongoDB

```base
mongod —config /usr/local/etc/mongod.conf
```

新建终端窗口输入`mongo`连接到`MongoDB service`，连接成功：

```base
MongoDB shell version v3.4.4
connecting to: mongodb://127.0.0.1:27017
MongoDB server version: 3.4.4
Server has startup warnings:
2017-06-12T14:39:45.492+0800 I CONTROL  [initandlisten]
```

在该窗口下输入命令进行操作数据库

- 创建/切换数据库

```base
use baseTestName
```

若没有后续操作，空数据库将被系统删除

- 插入数据到表 tableName

```base
db.tableName.insert({name:'xxx'})
```

- 查看数据

```base
db.tableName.find()
```

返回：

```base
{ "_id" : ObjectId("55e407e120d5b7acf4301d3b"), "name" : "xxx" }
```

- 查看数据库

```base
show dbs
```

- 查看表

```base
show collections
```

### MongoDB 可视化工具

- [MongoBooster](https://mongobooster.com/) 有提供免费版
- [MongoVUE](http://www.mongovue.com) 挂掉了
- [Robomongo](https://robomongo.org/)
- [Studio 3T](https://studio3t.com/) 原名 MongoChef

更多 MongoDB 相关可以到[MongoDB Download Center](https://www.mongodb.com/download-center) 了解下载
