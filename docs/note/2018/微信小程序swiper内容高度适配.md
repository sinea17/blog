---
title: 微信小程序swiper内容高度适配
date: 2018-05-23
---

# 微信小程序 swiper 内容高度适配

- 文章发布：[微信开放社区](https://developers.weixin.qq.com/community/develop/doc/00008aaf4a473056d1c69a8b253c04?highline=%E5%BE%AE%E4%BF%A1%E5%B0%8F%E7%A8%8B%E5%BA%8Fswiper%E5%86%85%E5%AE%B9%E9%AB%98%E5%BA%A6%E9%80%82%E9%85%8D)
- 文章发布：[SegmentFault](https://segmentfault.com/a/1190000014985174)

> ps：没有在`swiper`中添加`scroll-view`是为了可以使用页面的下拉刷新，最终方法直接跳到方案四。（含代码片段）

## 初始方案

`swiper`高度固定，`swiper-item`默认绝对定位且宽高 100%，每个`swiper-item`中内容由固定高度的 child 组成，然后根据 child 数量动态计算`swiper`高度，初始方案（由于 rpx 针对屏幕宽度进行自适应，`child_height`使用`rpx`方便 child 正方形情况下自适应）：

```js
swiper_height = child_height * child_num;
```

屏幕效果仅在宽度 375 的设备（ip6、ipⅩ）完美契合，其他设备都底部会出现多余空隙，并且在上拉加载过程中，随着内容增加，底部空隙也逐渐变大。

![wx-sinea-swiper-01](https://img.sinea.cn/wx-sinea-swiper-auto-height-01.gif)

## 方案二

开始以为是`rpx`适配显示问题，后通过文档中描述的[WXSS 尺寸单位](https://developers.weixin.qq.com/miniprogram/dev/framework/view/wxss.html)转化 rpx 为 px（`child_height`使用`rpx`）：

```js
swiper_height = child_height * child_num * (window_width / 750);
```

然后并无变化，我们可以看到`child_height`在不同宽度屏幕下，显示的宽高尺寸是不一样的（`px`单位），那就尝试使用 box 在各个屏幕的实际高度进行计算`swiper`高度，box 的高度可以单独在页面中增加一个固定标签，该标签样式和 box 宽高保持一致并且隐藏起来，然后在`page`的`onload`中通过[wx.createSelectorQuery()](https://developers.weixin.qq.com/miniprogram/dev/api/wxml-nodes-info.html#wxcreateselectorquery)获取标签实际高度`baseItemHeight`（`px`单位）：

```js
swiper_height = baseItemHeight * child_num;
```

结果显示原本的 ip6、ipⅩ 没有问题，另外宽带小于 375 的 ip5 上也 ok，但是在大于 375 的设备上还是出现空隙，比如 ip 的 plus 系列。

## 方案三

之前的方案都无法计算出合适的`swiper`高度，那就换个思路，比如去计算空隙的高度。

`swiper`底部有一个 load 标签显示“加载更多”，该标签紧贴 box 其后，通过`wx.createSelectorQuery()`来获取`bottom`，然而你会发现`bottom`是标签的`height`加`top`的和。计算底部空隙（暂时忽略“加载更多”标签高度）：

```js
space_height = swiper_height - load_top;
```

刚计算完可以看到在静止状态下，计算出`space_height`拿去修改`swiper_height`显示空隙刚好被清掉了，但是接着就发现在动过程中获取到的`bottom`是不固定的，也就是说数值可能不准确导致`space_height`计算错误，显示效果达不到要求。

## 方案四

基于上述方案，`swiper`底部的 load 标签绝对定位`bottom:0`，同时在`swiper`底部添加一个高度为 0 并且尾随内容 box 其后的标签（mark），然后获取这两个标签的 top 值之差：

```js
space_height = load_top - mark_top;
```

![wx-sinea-swiper-01](https://img.sinea.cn/wx-sinea-swiper-auto-height-02.gif)

[代码片段](wechatide://minicode/adphcCm765Z8)

这次获取到的空隙高度用于再计算`swiper`高度完美契合，美滋滋！！！
