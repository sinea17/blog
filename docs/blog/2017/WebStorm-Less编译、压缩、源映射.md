---
title: WebStorm-Less编译&压缩&源映射
date: 2017-03-03
tags:
  - Less
category: CSS
---

# WebStorm-Less 编译&压缩&源映射

现在的网页很多使用 SCSS、Less 编译后的 CSS 文件，对于维护调试来说都有一定影响(浏览器上看到的是.css，开发者调整的是.less、.scss)，这时候我们就需要用到源映射(Source Map)

<!--more-->

安装 less

```base
npm install -g less
```

安装 less-plugin-clean-css(压缩插件，注意路径与 less 在同个 node_modules 下，一般全局安装都是在一起的)

```base
npm install -g less-plugin-clean-css
```

配置 WebStorm(2016.3.3)

> - WebStorm 2016.3.3
> - Build #WS-163.12024.17, built on January 31, 2017
> - Licensed to lan yu
> - Subscription is active until November 23, 2017
> - JRE: 1.8.0_112-release-408-b6 x86
> - JVM: OpenJDK Server VM by JetBrains s.r.o

- 打开 WebStorm：File(文件)->Settings (设置)->Tools(工具集)->File Watchers
  ->'+'(添加)
- Program 里设置的是 lessc 的路径(自动查找，我的是 C:\Users\Administrator\AppData\Roaming\npm\lessc.cmd)

- Arguments 参数：

  - (生成.map 文件和.css 文件)

  ```
  --no-color $FileName$ $FileNameWithoutExtension$.css --source-map=$FileNameWithoutExtension$.css.map
  ```

  - (生成.map 文件和压缩后的.css 文件)

  ```
  --no-color --plugin=less-plugin-clean-css $FileName$ $FileNameWithoutExtension$.css --source-map=$FileNameWithoutExtension$.css.map
  ```

- Output paths to refresh 为空

最终配置如下图：

![image-01](https://img.sinea.cn/20170303-01.png)

在 WebStorm 中编辑.less 文件后

![image-02](https://img.sinea.cn/20170303-02.png)

生成的.css（less-plugin-clean-css 压缩）

![image-05](https://img.sinea.cn/20170303-05.png)

浏览器中看到的标签样式

![image-03](https://img.sinea.cn/20170303-03.png)

点击它们看到的是.less 源文件

![image-04](https://img.sinea.cn/20170303-04.png)

> tips：浏览器开发者工具(F12)勾选"Enable Source Maps" 选项来设置是否需要加载源映射
