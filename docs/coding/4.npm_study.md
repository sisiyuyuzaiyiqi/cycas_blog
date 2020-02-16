---
title: npm学习
date: 2019-3-21 13:33:33
tags: [Web]
---

### 初始化

```shell
npm init
```

```shell
npm init -y
```

-y 的含义：yes 的意思，在 init 的时候省去了敲回车的步骤，生成的默认的 package.json

### 几种不同的包安装方式

```shell
npm install <package_name> -g
```

全局安装

```shell
npm install <package_name>
```

最普通本地安装

```shell
npm install <package_name> --save
```

本地安装，并将该依赖写入 package.json 的 dependencies 中

```shell
npm install <package_name> --save-dev
```

本地安装，并将该依赖写入 package.json 的 devDependencies 中

```shell
npm install <package_name>@x.x.x --save-dev
```

指定版本安装

### 卸载

```shell
npm uninstall <package_name>
npm uninstall <package_name> --save
npm uninstall <package_name> --save-dev
```

### 查看包信息

首先 cd 到包目录。查看本地安装的 cd 到项目根目录即可。查看全局安装的 cd 到 nodejs\node_modules 目录。然后

```shell
npm ls <package_name>
```

### 切换阿里源

```shell
npm config set registry https://registry.npm.taobao.org/
```

执行以下命令，确认是否安装好

```shell
npm config get registry
```
