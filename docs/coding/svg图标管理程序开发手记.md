---
title: svg图标管理程序开发手记
date: 2019-7-11 19:33:00
tags: [Electron, Web]
---

记录一下最近自己做一个小项目的过程。

该程序基于 electron-vue-admin，开发出来主要用来管理我自己画的一批图标。大概功能如下：

1. 批量导入 svg 图标
2. 检索
3. 修改颜色、大小
4. 批量导出成 png

一期大概就做这四个功能。以下是遇到的坑：

### 插件 save-svg-as-png 类型检测局限性

我用的 save-svg-as-png 来将 svg 转成 png，使用过程中发现有局限性。对于 SVGSVGElement 类型的对象，其实和 HTMLElement 以及 SVGElement 一样也是可以转的，但是类型检测却报错了。需要修改源码`lib/saveSvgAsPng.js`：

```js
var isElement = function isElement(obj) {
	if (obj instanceof HTMLElement || obj instanceof SVGElement) {
		return true;
	} else {
		if (Object.prototype.toString.call(obj) == '[object SVGSVGElement]') {
			return true;
		} else {
			return false;
		}
	}
};
```

改成以上即可。

### electron-vue-admin 打包后静态资源路径问题

不知为何我的`static`文件夹在打包时没有复制到`dist`目录下，导致在打包时没有将静态资源打进去。

需要修改`.electron-vue/build.js`，将下面这行注释掉：

```js
del.sync(['dist/electron/*', '!.gitkeep']);
```

再手动把`static`文件夹复制到`dist/electron`目录下，即可解决了此问题。

但感觉此解法太笨，对 webpack 的原理还需进一步理解才能更好修正此问题。

### fs.copyFile 报‘is not a function’ 错误

这是因为默认安装的electron包版本过低，`fs.copyFile`是node8.5以后新增的API。单独卸载后指定安装此版本：

```shell
npm install electron@3.1.12 --save-dev
```

不要直接安装latest的版本，再往后的版本就不兼容了。