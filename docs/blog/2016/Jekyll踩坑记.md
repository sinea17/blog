---
title: Jekyll踩坑记
date: 2016-12-30
tags: Jekyll 博客搭建
---

# Jekyll 踩坑记

以下都是基于 OS X 系统操作的

### 安装`jekyll`

```
gem install jekyll
```

<!--more-->

可能提示:

```
While executing gem ... (Gem::FilePermissionError)
    You don't have write permissions for the /Library/Ruby/Gems/2.0.0 directory.
```

原因

> Apparently with OSX el Capitan, there is a new security function that prevents you from modifying system files called Rootless.

解决办法一：使用 [RVM](https://ruby-china.org/wiki/rvm-guide) 安装 ruby
[HOW TO INSTALL RUBY ON MAC OS X WITH RVM](http://usabilityetc.com/articles/ruby-on-mac-os-x-with-rvm/)
安装完成后，再执行命令

```
gem install jekyll
```

解决方法二：

```
sudo gem install jekyll
```

安装依赖包 错误提示 ``/usr/bin/***`目录没有权限

```
ERROR:  While executing gem ... (Errno::EPERM)
    Operation not permitted - /usr/bin/***
```

- 方法 1：可以通过修改目录权限解决，安装完毕后将`/usr/bin`权限设置回操作前的权限，否则下次终端启动时可能报错，请使用 Mac 磁盘工具修复

```
sudo chmod -R 777 /usr/bin
```

- 方法 2：可以安装放在`/usr/local/bin`目录下，这样会优先调用新程序。因为环境变量的`PTAH`中是`PATH=/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin` (Ps：治标不治本，下一次还会再出现)

- 方法 3：[参考方法](http://www.jianshu.com/p/935484cc2d40) 更新 ruby

```
brew install ruby

//再安装jekyll
gem install jekyll
```

```
sudo gem install -n /usr/local/bin jekyll
```

利用已有的开源 Jekyll 项目

```
git clone https://github.com/barryclark/jekyll-now
cd jekyll-now
jekyll build
jekyll serve
```

上面的主题地址亲测无问题，克隆有的主题会出现一些问题，主要是`Gemfile`导致的，比如这款[chalk](https://github.com/nielsenramon/chalk)。

提交修改：

```
git add .
git commit -m "describe"
git push

//克隆的与原仓库地址文件冲突可采用强制push，原仓库文件会被完全覆盖
git push -u origin master -f
```
