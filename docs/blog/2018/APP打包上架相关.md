---
title: APP打包上架相关
date: 2018-07-18
---

# APP 打包上架相关

## iOS

### 申请 App ID

iOS Identifiers -> App IDs -> 创建

### 生成证书请求文件(.certSigningRequest)(同一个开发者可忽略)

> 用于申请开发(Development)证书和发布(Production)证书

Keychain Access（MAC 钥匙串） -> Certificate Assistant（证书助理） -> Request a Certificate From a Certificate Authority（从证书颁发机构请求证书）

### 申请开发(Development)证书

Certificates -> 点击右上角的加号可创建新证书 -> 选择 iOS App Development -> Choose File 选择生成证书请求文件(.certSigningRequest) -> 生成证书(.cer)并下载 -> 双击文件(.cer)导入到 Keychain Access（MAC 钥匙串）-> 选中导入的证书，右键选择 Export "Developer“ -> 设置密码 -> 保存私钥证书(.p12)

### 申请开发(Development)描述文件

Provisioning Profiles -> 点击右上角的加号创建新描述文件 -> 选择 iOS App Development -> 生成描述文件并下载(.mobileprovision)

### 商店上架

- HBuilder 打包取消 ipad 选项
- AppStoreConnect 新建 App -> 打开 Xcode Application Loader 进行构建
- 启动图片 png 尺寸 750*1334 + 640*1136(针对 ip5 适配，防止审核被拒绝)
- 图标 1024\*1024(直角)

## Android

### 生成 keystore 证书

找到电脑 keytool.exe 文件路径

> 公司电脑 keytool.exe 位于 D:\WebStorm 2016.3.3\jre\jre\bin

- Windows 生成指令：keytool -genkey -alias test.keystore -keyalg RSA -validity 20000 -keystore test.keystore
- MAC 生成指令：keytool -genkey -v -keystore test.keystore -alias test -keyalg RSA -validity 20000 -keystore /Users/你的用户名/bingjiang.keystore

### 获取证书指纹

keytool -list -v -keystore test.keystore

> MAC 中 test.keystore 为文件路径，如：/Users/你的用户名/bingjiang.keystore
