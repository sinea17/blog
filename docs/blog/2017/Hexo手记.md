---
title: Hexo手记
date: 2017-01-03
tags:
  - Hexo
  - NexT主题
  - 博客搭建
category: 博客搭建
---

# Hexo 手记

之前经过`Jekyll`一系列踩坑部署了,想换个主题出各种问题,主要是最开始装环境出的错(改包路径到`/usr/local/bin`),导致有时候`jekyll`命令报错,就放弃了

<!--more-->

以下都是基于`OS X`系统操作的

版本说明（时间为 2017-1-3）：

```
hexo_blog git:(master) ✗ hexo -v
hexo: 3.2.2
hexo-cli: 1.0.2
os: Darwin 16.3.0 darwin x64
http_parser: 2.5.2
node: 4.4.4
v8: 4.5.103.35
uv: 1.8.0
zlib: 1.2.8
ares: 1.10.1-DEV
icu: 56.1
modules: 46
openssl: 1.0.2h
```

## 安装 Hexo

```
npm install -g hexo
```

## 本地创建博客

初始化

```
// 在目标文件夹下进行
hexo init
npm install
```

开启本地博客预览

```
// 构建站点文件
hexo g  // 全拼是：hexo generate，可以简写成 hexo g

//启动本地服务器，默认地址为 localhost:4000
hexo s  // 全拼是：hexo server，可以简写成 hexo s
```

## 发布到 Coding（github）

之前的`Jekyll`是通过`Git`一步步手动上传的，这里的`Hexo`已经拥有'一键'部署组件，其安装如下：

```
npm install hexo-deployer-git --save
```

然后打开`_config.ym`文件进行编辑

```
//[github] => git@github.com:yourusername/youusername.github.io.git
//[coding] => git@git.coding.net:yourusername/yourusername.coding.me.git
deploy:
  type: git
  repo: //填写参考注释，如：git@git.coding.net:sinea17/sinea17.coding.me.git
  branch: master
```

发布（这里只有`hexo d`，是因为前面已经执行了`hexo g`生产）

```
hexo d      // 发布命令
```

## 更改博客主题

1. 克隆/下载（Ps:克隆慢，可能断掉，建议下载）
2. 配置\_config.yml，`theme`值改为主题名
3. 验证主题`hexo s --debug`（debug 调试模式）

附:[NexT 主题配置说明](http://theme-next.iissnan.com/getting-started.html)

## 日常命令：

- 创建普通文章
  ```
  hexo new "文章标题"
  ```
- 给文章添加标签和分类

  在文章（后缀`.md`）文件中加入 tag 和 categor 即可指定标签和分类。例子如下：

  ```
  ---
  title: blog title
  date: 2016-07-20 10:59:31
  tag: 我是标签
  category: 我是分类
  description: #本页描述 可省略
  ---
  ```

  上面是单个标签或者分类,如果需要多个标签或分类可以两种写法(通用)

  ```
  ---
  title: blog title
  date: 2016-07-20 10:59:31
  tag: [ 我是标签一, 我是标签二 ]
  category:
      - 我是分类一
      - 我是分类二
  description: #本页描述 可省略
  ---
  ```

- 创建照片文章

  1. 修改`\scaffolds\photo.md`文件

  ```
  layout: { { layout } }
  title: { { title } }
  date: { { date } }
  tags:
  photos:
  - <photo url>
  ---
  ```

  2. 新建照片文章

  ```
  hexo new photo "photoPostName"
  ```

  hexo 默认会处理全部 markdown 和 html 文件，如果不想让 hexo 解析，可以在文件头中加入 layout: false。

  ```
  ---
  layout: photo
  title: TestPhoto212
  photos:
    - http://bruce.u.qiniudn.com/2013/11/27/reading/photos-1.jpg
  date: 2017-01-04 13:44:34
  tags:
  ---
  ```

- 文章摘要

  用于显示在首页的文章短描述

  ```
  //文章中插入以下代码即可，其上文字为摘要，在首页中就会出现“阅读更多”，点击则显示全文。
  <!--more-->
  ```

- 删除文章

  1. 删除`/source/_posts`目录下的文章文件
  2. 重新生成站点静态网页，即：`hexo g`

- 创建页面
  页面文件在博客根目录/source 下对应名称文件夹下的`index.md`文件

  ```
  //添加标签页
  hexo new page tags

  //添加分类页
  hexo new page categories

  //添加关于页
  hexo new page about

  //编辑关于页
    ---
    title: 关于
    date: 2017-01-04 11:31:06
    type: "about"
    comments: false
    ---
    姓名: 章凯
    所在地: 成都
    职业: WEB前端开发
    邮箱: sinea17@qq.com
  ```

- 代码高亮
  需要在代码块第一个'点点点'后添加代码语言,但是测试后命令行 bash 没有效果,暂时不知道原因.写法如下:

  ````
    ```css
  ````

  效果如下:

  ```css
  body {
    color: red;
  }
  .a:visited {
    color: blue;
  }
  ```

- 正常发布

  ```
  hexo clean  // clean本地项目，防止缓存
  hexo g      // 生成静态网页
  hexo d      // 发布
  ```

- Hexo 指令：[点这里](http://note.youdao.com/https://hexo.io/zh-cn/docs/commands.html)
