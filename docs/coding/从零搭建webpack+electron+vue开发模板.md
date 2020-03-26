---
title: 从零搭建webpack+electron+vue开发模板
date: 2020-3-23 16:36
tags: ["Electron", "Vue"]
---

<CreateTime/>
<TagLinks />

::: tip
本篇是[从零搭建 webpack+electron+react 开发模板](从零搭建webpack+electron+react开发模板.md)的姐妹篇，后发先至。
:::

## 初始化 npm 项目

首先通过命令行初始化一个 npm 项目。

```shell
npm init -y
```

## 安装并配置 webpack

由于electron分两个进程的代码，main和renderer。因此我们将webpack的配置文件分成：`webpack.renderer.config.js`和`webpack.main.config.js`

### webpack.renderer.config.js

1. module 配置项

   module主要配置各种文件类型的loader，没有对应的loader，webpack是无法正确识别并打包对应类型的文件的。比如`.css`文件需要`css-loader`

   一些loader还需要在plugins中实例化，比如`vue-loader`

2. resolve 配置项

  vue\$的别名配置

  [参考](https://blog.csdn.net/wxl1555/article/details/83187647)


3. 输出配置

   主要为了将打包后文件正确输出到dist目录，再由`electron-builder`打包成可执行程序及安装包

### webpack.main.config.js

1. externals 配置项

   减少不需要的打包

2. node 配置项

   此配置是将`__dirname`和`__filename`等环境变量注入electron的main进程，以正确读取资源路径

## electron 的安装

切换阿里源安装，参考[npm 学习](npm学习.md)

## 开发者模式

开发者模式主要用于开发时调试

### dev.js 文件

## 产品模式

产品模式主要用于产品打包发布

### build.js文件

build.js文件中分别将main的源码和renderer的源码打包到dist文件夹

### electron-builder的配置

参见package.json中`build`配置项

## Vue全家桶

### vue-router



### vue-store

