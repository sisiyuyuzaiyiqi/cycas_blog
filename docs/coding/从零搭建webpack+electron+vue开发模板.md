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

```bash
npm i -D webpack webpack-cli
```

由于electron分两个进程的代码，main和renderer。因此我们将webpack的配置文件分成：`webpack.renderer.config.js`和`webpack.main.config.js`

可以把

### webpack.renderer.config.js

1. module 配置项

   module主要配置各种文件类型的loader，没有对应的loader，webpack是无法正确识别并打包对应类型的文件的。比如`.css`文件需要`css-loader`

   一些loader还需要在plugins中实例化，比如`vue-loader`

2. resolve 配置项

   vue\$的别名配置（[参考](https://blog.csdn.net/wxl1555/article/details/83187647)）


3. 输出配置

   主要为了将打包后文件正确输出到dist目录，再由`electron-builder`打包成可执行程序及安装包
   
4. 关于文件输出目录的自动清理

   webpack提供了一个插件，叫做`CleanWebpackPlugin`，具体使用方法见[清理`/dist`文件夹]([https://www.webpackjs.com/guides/output-management/#%E6%B8%85%E7%90%86-dist-%E6%96%87%E4%BB%B6%E5%A4%B9](https://www.webpackjs.com/guides/output-management/#清理-dist-文件夹))。

   但是在本项目中不必用这个，因为我们后面在build的时候会起两个build进程，一个`renderer`和一个`main`的。如果在任意一个webpack配置文件中使用了它，后完成的进程会把快的进程生成的编译文件删掉...（此问题纠结了好久才发现，一度怀疑人生）

   那么这个功能点的实现我们在下文的打包脚本文件`build.js`中讲。

5. `HtmlWebpackPlugin`插件

   用来使用一个模板文件，在产品模式生成`index.html`。模板文件见`renderer/index.ejs`

   此处使用了`.ejs`文件，其实直接用`.html`也可以

### webpack.main.config.js

1. externals 配置项

   减少不需要的打包

2. node 配置项

   此配置是将`__dirname`和`__filename`等环境变量注入electron的main进程，以正确读取资源路径

## electron 的安装

切换阿里源安装，参考另一篇博文[npm 学习](npm学习.md)

## 开发者模式

开发者模式主要用于开发时调试

### dev.js 文件

本文件为开发模式的启动脚本

## 产品模式

产品模式主要用于产品打包发布

### build.js文件

build.js文件中分别将main的源码和renderer的源码打包到dist文件夹。

1. `/dist`文件夹预清理，每次执行打包前，最好将dist文件夹先自动清理以下。上文提过我们由于分了两个打包进程，所以不宜使用`CleanWebpackPlugin`。这里我们采用npm包`del`

   ```js
   const del = require("del");
   
   del.sync(["dist/electron/*", "!.gitkeep"]);
   ```

2. 打包模式要设置为`production`

   ```js
   rendererConfig.mode = "production";
   mainConfig.mode = "production";
   ```

### electron-builder的配置

参见package.json中`build`配置项

另外，当运行builder打包时，由于一个大家都懂的原因，在某些网络环境会始终失败。这是可以手动下载需要的几个包，然后放入相应目录，分别是：

## Vue全家桶

### vue-router

vue提供的路由组件

大家都会，以后补充，相关代码主要在`renderer/router`目录

_TODO_

### vuex

vue提供的全局数据管理

大家都会，以后补充，相关代码主要在`renderer/store`目录

_TODO_

## axios

axiost为前端提供restful风格的接口调用能力。

大家都会，以后补充，相关代码主要在`renderer/utils/request`和`renderer/api`

_TODO_

## Vuetify组件库

本项目的重点是引入了Vuetify

引入形式是vue插件的形式，具体见`renderer/plugins/vuetify.js`

Vuetify提供了一套Material Design的Vue实现

开发查询用：

[vuetify组件查询及使用文档](https://vuetifyjs.com/zh-Hans/components/api-explorer/)

[vuetify配色表](https://vuetifyjs.com/zh-Hans/styles/colors/)

[md图标库-图标名称查询](https://cdn.materialdesignicons.com/5.0.45/)（需要科学上网）

## 项目实战 - DeepPcap离线分析工具

::: tip
以下内容供开发时参考，并统一代码书写。
:::

### 代码目录及简介

- 首页`/home`
- 历史分析列表页`/task_list`
- 新建分析任务页`/new`
- 统计分析页`/statistical`
- 协议分析页`/protocol`
- 路由`renderer/router/index.js`

- 全局数据及操作`renderer/store`

- 工具函数`renderer/utils`

  - `/index.js`

    `parseTime`时间戳转时间文本

  - `/request.js`

    axios请求的封装，包含拦截器

  - `/dic_fields.js`

    返回协议字段字典表

  - `/dic_layers.js`

    返回协议字典表

  - `/geojson.js`

    返回全球国家级矢量图json格式数据，供echarts使用

- 数据请求接口`renderer/api`

  - `/task.js`

    历史分析列表、新建分析等页面相关接口

  - `/statistical`

    统计分析页面相关接口

  - `/protocol`

    协议分析页面相关接口