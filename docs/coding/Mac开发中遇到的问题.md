---
title: Mac开发中遇到的问题
date: 2020-1-31 00:33
tags: [Mac, Web, 开发环境]
---

<CreateTime/>
<TagLinks />

新入了一台 Mac，记录一下使用 Mac 做开发过程中遇到的问题。

## CLT 的问题

npm install 的时候，若包 fsevent 安装报错，显示找不到 CLT，去苹果官网开发者下载页面[更多下载](https://developer.apple.com/download/more/)下载最新的 Command line Tools for Xcode

## 常用命令记录

### 查看隐藏文件

```bash
ls -a
```

访达中显示，快捷键：`cmd`+`shift`+`.`

### homebrew 的使用

安装软件，例：

```bash
brew install wget
```

查看 homebrew 已安装软件列表

```bash
brew list
```

## Chrome 禁止读取本地文件的策略

打开一些 demo 项目时（比如 d3），有些项目会读取本地的模拟数据以展示界面及功能，这时如果直接用 Chrome 打开入口 html 文件会报错：

Access to XMLHttpRequest at 'file:///...' from origin 'null' has been blocked by CORS policy: Cross origin requests are only supported for protocol schemes: http, data, chrome, chrome-extension, https.

这是由于 Chrome 的安全策略导致的。

解决，通过 terminal 启动：

```shell
open /Applications/Google\ Chrome.app/ --args --allow-file-access-from-files
```
