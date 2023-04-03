---
title: 纯CSS横向菜单
date: 2017-02-28
tags:
  - CSS菜单
category: CSS
---

# 纯 CSS 横向菜单

> 纯 CSS 实现的横向菜单，宽度固定，高度模拟撑开父级效果，兼容 IE8

<!--more-->

[在线演示](http://runjs.cn/detail/nzblzwwx)

通过`+`[选择器](http://www.w3school.com.cn/cssref/selector_element_plus.asp)控制显示一级菜单

```css
//'全部商品':hover
.all-product:hover + .nav {
  display: block;
}
```

使用`position: absolute;`绝对定位使二级菜单与一级菜单顶部对齐，二级菜单添加`padding-left`为一级菜单留下显示空间

```css
// 二级菜单
.nav ul ul {
  display: none;
  position: absolute;
  left: -5px;
  top: 0;
  width: 440px;
  padding-left: 90px;
  background: #fff;
  z-index: 1;
  border-left: 5px solid #000;
}
```

同时为它们添加层级（一级菜单`position`定位），一级菜单选项`z-index:2`，二级菜单`z-index:1`

```css
//一级菜单-选项a
.nav > ul > li > a {
  position: relative;
  z-index: 2;
}
```
