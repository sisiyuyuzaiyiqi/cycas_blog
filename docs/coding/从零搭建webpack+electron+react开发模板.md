---
title: 从零搭建webpack+electron+react开发模板
date: 2020-3-5 21:03
tags: ["Electron", "react"]
---

<CreateTime/>
<TagLinks />

::: tip

学习了`Electron`官方推荐的`React`模板[`electron-react-boilerplate`](https://github.com/electron-react-boilerplate/electron-react-boilerplate)一周时间之后，由于以下两点原因，我决定自己从头撸一个：

1. `electron-react-boilerplate`太好太强大了，集成的各种模块我都不知道原理，如果单纯学怎么基于它构建应用和我之前掌握一遍`electron-vue-template`有什么区别呢。味道相似只是蛋糕更大，并没有本质上的知识提升。不如自己动手撸一个，可以加强对`Webpack`、`Electron`、`React`三者原理层面的理解。

2. `electron-react-boilerplate`没有中文文档，中文社区好像也没有不错的类似模板，比如像[`vue-admin-template`](https://github.com/PanJiaChen/electron-vue-admin)这样的。所以这个事可以做一下，那就搞起来。

:::

下面开撸。

## 进度（不定期更新）：

- ~~初始化 webpack，集成`Babel`语法编译器，集成常用`Loader`~~
- ~~集成`TypeScript`，集成`React`~~
- ~~集成`Electron`~~
- 完成开发模式
  - ~~开发模式下的运行脚本~~
  - 完成热更新
- 完成产品模式
- 集成`Redux`
- 集成`React Router`
- 集成`Material UI`

## 初始化项目

这部分比较简单，就是跟着 webpack 官网初始化一个项目，集成常用`loader`。以后再填。
_TODO_

## 集成`React`、`TypeScript`、`Electron`

_TODO_

## 构建开发模式

开发模式是在进行基于 webpack 的 electron 应用开发时必须的，其运行环境和产品模式区别很大，必须将 Webpack 的配置文件进行分离。

在开发模式中，我们还要集成多个方便调试的子模块，比如热更新。

这里说一下`Electron`和`Webpack`集成的原理，简单说就是使用 electron 代替浏览器打开 webpack 编译集成后的入口文件。但是在开发模式和产品模式下其具体运作是不一样的。在开发模式下，我采取的方式使用`webpackDevServer`在本地起一个 Web 服务，然后使用 nodeAPI 启动 electron 的子进程并打开 Web 服务发布的 Url。而在产品模式下，我们使用 electron 打开编译后的静态资源就可以了。

### 编写开发模式 Webpack 脚本

首先我们把目录更改成如下形式：

```shell
.
├── README.md
├── config
│   ├── dev.js
│   └── webpack.renderer.config.js
├── default_index.ejs
├── package-lock.json
├── package.json
├── src
│   ├── index.tsx
│   └── main.js
└── tsconfig.json
```

由于我们要将 webpack 的配置文件切分成开发模式和产品模式，并编写相应的启动脚本，所以新建一个`config`文件夹存放它们。

首先将原来的`webpack.config.js`文件重命名为`webpack.renderer.config.js`，然后将配置内容主体显式模块化：

```js
- module.exports = {
+ let rendererConfig = {
  ...
};

+ module.exports = rendererConfig;
```

新文件`dev.js`中编写开发模式的启动脚本。

启动分为两部分，首先启动 renderer 层（也就是 React 页面发布），然后启动 electron。

_TODO_
