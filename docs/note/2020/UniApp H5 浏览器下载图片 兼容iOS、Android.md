---
title: UniApp H5 浏览器下载图片 兼容iOS、Android
date: 2020-09-04
---

# UniApp H5 浏览器下载图片 兼容 iOS、Android

- 文章发布：[SegmentFault](https://segmentfault.com/a/1190000023890043)
- 文章发布：[DCloud](https://ask.dcloud.net.cn/article/37734)

> 由于官方的 api 下载事件`uni.downloadFile`下载的是临时文件，需要配合`uni.saveFile`使用，但是`uni.saveFile`不支持 H5，另外`uni.saveImageToPhotosAlbum`保存图片到系统相册也不支持 H5，所以采用以下方式解决。

安装依赖，这里使用 FileSaver，并且支持自定义文件名称

```javascript
npm i file-saver -S
```

页面代码

```javascript
import FileSaver from 'file-saver'
···
download(){
  let imgUrl = 'http://www.test.com/img/xxxx.jpg' //网络图片地址
  FileSaver.saveAs(imgUrl, '图片名称.jpg');
}
```

如果图片不同源产生跨域，需要配置代理`proxy`

项目根目录新建`vue.config.js`代码如下：

```javascript
module.exports = {
  devServer: {
    proxy: {
      "/file_url": {
        //将www.exaple.com印射为/apis
        target: "http://www.test.com", // 接口域名
        secure: false, // 如果是https接口，需要配置这个参数
        changeOrigin: true, //是否跨域
        pathRewrite: {
          "^/file_url": "", //需要rewrite的,
        },
      },
    },
  },
};
```

配置代理后，`'/file_url' = 'http://www.test.com'`，需要替换图片地址前缀，页面代码：

```javascript
import FileSaver from 'file-saver'
···
download(){
  let imgUrl = 'http://www.test.com/img/xxxx.jpg' //网络图片地址
  FileSaver.saveAs('/file_url'+'/img/xxxx.jpg', '图片名称.jpg');
}
```

效果如下：

### Android 效果

![image](https://img.sinea.cn/blog/2020-09-04_img_01.jpg)

![image](https://img.sinea.cn/blog/2020-09-04_img_02.jpg)

### iOS 效果

![image](https://img.sinea.cn/blog/2020-09-04_img_03.jpg)

![image](https://img.sinea.cn/blog/2020-09-04_img_04.jpg)
