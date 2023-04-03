---
title: PDA终端扫描实现
date: 2018-09-20
---

# PDA 终端扫描实现

- 文章发布：[DCloud](https://ask.dcloud.net.cn/article/35044)

> 以下方法都是非原生方式实现

#### Javascript 获取扫码结果实现

```js
document.onkeydown = function (e) {
  //webview不需要兼容ie
  console.log(e.keyCode);
};
```

该方法需要判断按键和间隔输入情况，用户可能在扫码的时候有其他按键等误操作，所以不建议用来进行获取扫码结果。

#### Native.js 监听广播消息实现

参考 DCloud 论坛 [回答](http://ask.dcloud.net.cn/question/45679)

```js
function plusReady() {
  var main = plus.android.runtimeMainActivity(); //获取activity
  var context = plus.android.importClass("android.content.Context"); //上下文
  var receiver = plus.android.implements(
    "io.dcloud.feature.internal.reflect.BroadcastReceiver",
    {
      onReceive: doReceive,
    }
  );
  var IntentFilter = plus.android.importClass("android.content.IntentFilter");
  var Intent = plus.android.importClass("android.content.Intent");
  var filter = new IntentFilter();
  filter.addAction("com.zkc.scancode"); //监听扫描
  main.registerReceiver(receiver, filter); //注册监听

  function doReceive(context, intent) {
    plus.android.importClass(intent); //通过intent实例引入intent类，方便以后的‘.’操作
    var Number = intent.getStringExtra("code");
    console.log(Number);
    main.unregisterReceiver(receiver); //取消监听
  }
}
```

我这里使用的是销邦科技 X8 扫描设备，由于设备不一样导致文章中的代码不能直接使用，需要配置监听的数据才能连接。搜索销邦官网获取对应开发包[下载](http://www.supoin.com/ProductDetail.aspx?SID=18&PID=23&ID=84#pj)

![开发包截图](https://img.sinea.cn/%E9%94%80%E9%82%A6x8-pdf%E5%BC%80%E5%8F%91%E8%AF%B4%E6%98%8E.png)

注意设置内勾选开启扫描，选择输入模式 API：

![PDA设置](https://img.sinea.cn/%E9%94%80%E9%82%A6x8-%E8%AE%BE%E5%A4%87%E8%AE%BE%E7%BD%AE%E7%95%8C%E9%9D%A2.png)

打开开发说明查看参数：

![pdf截图](https://img.sinea.cn/%E9%94%80%E9%82%A6x8-%E5%BC%80%E5%8F%91%E5%8C%85%E6%96%87%E4%BB%B6%E5%A4%B9%E6%88%AA%E5%9B%BE.png)

代码对应修改如下：

```js
···

filter.addAction("com.android.server.scannerservice.broadcast");//监听扫描

···

intent.getStringExtra("scannerdata");//返回结果

···
```

原代码实现的是扫码完成就取消监听这样不符合实际业务（多次扫描），但是不取消监听用同时有打开新的页面，这时会发现之前的页面还在监听扫描，当然在打开新页面的时候进行取消监听，但是当用户从新页面返回之前的页面时又需要重启监听，各种条件判断写出了比较麻烦。

这里采用的是接受扫描结果时判断是否是当前显示页面，页面关闭后监听的实例也就自动销毁了。首先在打开页面时把页面 id 存储到本地，并且重写 back：

```js
function pageInit() {
  var _self = plus.webview.currentWebview();
  localStorage.setItem("WEBVIEW_ID", _self.id);
  mui.back = function () {
    localStorage.setItem("WEBVIEW_ID", _self.opener().id);
    _self.close();
  };
}
```

然后判断页面 id：

```js
function scan(callback) {
  var main = plus.android.runtimeMainActivity(); //获取activity
  var receiver = plus.android.implements(
    "io.dcloud.feature.internal.reflect.BroadcastReceiver",
    {
      onReceive: function (context, intent) {
        //实现onReceiver回调函数
        if (
          plus.webview.currentWebview().id !=
          localStorage.getItem(util.config.WEBVIEW_ID)
        )
          return;
        callback(intent.getStringExtra("scannerdata"));
      },
    }
  );
  var IntentFilter = plus.android.importClass("android.content.IntentFilter"); //引入过滤器
  var Intent = plus.android.importClass("android.content.Intent");
  var filter = new IntentFilter();
  filter.addAction("com.android.server.scannerservice.broadcast"); //监听扫码广播
  main.registerReceiver(receiver, filter); //注册监听
}
```

页面使用：

```js
mui.plusReady(function () {
  pageInit();
  setTimeout(function () {
    scan(function (code) {
      console.log("扫描结果：" + code);
    });
  }, 300);
});
```

> 注意：在 HBuilder 控制台没有调试信息，需要在 webview 调试窗口中才能看到打印信息。另外建议在 plusReady 中延迟执行 scan()。

### 适配霍尼韦尔扫描枪

首先需要在设备上去设置监听的对象名（我这里设置成和销邦设备一样的 com.android.server.scannerservice.broadcast），接受参数的时候再判断一下设备 plus.device.model 进行切换接受返回结果的对象名：

```js
scan: function(callback){
	var main = plus.android.runtimeMainActivity(); //获取activity
	var context = plus.android.importClass('android.content.Context'); //上下文
	var receiver = plus.android.implements('io.dcloud.feature.internal.reflect.BroadcastReceiver', {
		onReceive: function(context, intent){//实现onReceiver回调函数
		if(plus.webview.currentWebview().id != localStorage.getItem(util.config.WEBVIEW_ID)) return
			var _key = plus.device.model == 'EDA50K' ? 'data' : 'scannerdata';
			callback(intent.getStringExtra(_key))
		}
	});
	var IntentFilter = plus.android.importClass('android.content.IntentFilter');//引入过滤器
	var Intent = plus.android.importClass('android.content.Intent');
	var filter = new IntentFilter();
	filter.addAction('com.android.server.scannerservice.broadcast'); //监听扫码广播
	main.registerReceiver(receiver, filter); //注册监听
}
```
