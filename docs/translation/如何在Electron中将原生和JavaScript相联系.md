---
title: 翻译：如何在Electron中将原生和JavaScript相联系
date: 2019-6-22 16:53
tags: [翻译, Electron]
---

<CreateTime/>
<TagLinks />

[原文地址](https://electronjs.org/blog/from-native-to-js)

使用 c++或者 Objective-C 编写的 electron 的特性，是如何关联到 JavaScript，使得终端用户能够顺利调用呢？

## 背景

Electron 是一个 JavaScript 平台，其主要目的是降低构建健壮的桌面应用程序的门槛，并解决跨平台的问题。然而在 Electron 核心部分，仍然需要使用给定的语言编写特定平台的功能。

实际上，Electron 为前端工程师处理指定平台的功能实现，而他们只需要专注于 JavaScript 接口就可以了。

那么，这个过程是如何实现的呢？

要想了解这个过程，我们先从 [`app` module](https://electronjs.org/docs/api/app) 开始。

打开目录 `lib/`中的文件 [`app.ts`](https://github.com/electron/electron/blob/0431997c8d64c9ed437b293e8fa15a96fc73a2a7/lib/browser/api/app.ts)，你可以在顶部看到以下代码：

```js
const binding = process.electronBinding("app");
```

这行代码直指 Electron 供开发人员将 c++ /Objective-C 模块绑定到 JavaScript 的机制。该函数是由类`ElectronBindings`的头文件和实现文件创建的。

## `process.electronBinding`

这些文件添加了函数`process.electronBinding`，该函数类似 Node.js 的`process.binding`。`process.binding`是 Node.js 的[`require()`](https://nodejs.org/api/modules.html#modules_require_id)方法的一个底层实现，它允许用户去`require`原生代码，而不仅仅是 JS 代码。这个自定义函数`process.electronBinding`提供了通过 Electron 加载原生代码的能力。

当一个高层的 JavaScript 模块（比如`app`）requires 原生代码时，如何确定和设置原生代码的状态？在哪儿给 JavaScript 暴露方法？属性是什么？

## `native_mate`

目前，可以在`native_mate`（Chromium 的[`gin` library](https://chromium.googlesource.com/chromium/src.git/+/lkgr/gin/)的一个 fork）中找到。这使得在 C++和 JavaScript 之间封送类型更简单了。

在`native_mate/native_mate`中有`object_template_builder`的头文件和实现文件。它允许我们将原生代码模块变成 JavaScript 开发人员期望的样子。

### `mate::ObjectTemplateBuilder`

如果我们把每个 Electron 模块看做一个`object`，就容易理解为什么我们要使用`object_template_builder`去构建它们。这个类构建在 V8——谷歌的开源高性能 JavaScript 和 WebAssembly 引擎——暴露的类之上，用 C++编写。V8 实现了 JavaScript (ECMAScript)规范，因此它的原生功能实现可以直接与 JavaScript 中的实现相关联。举例来说，[`v8::ObjectTemplate`](https://v8docs.nodesource.com/node-0.8/db/d5f/classv8_1_1_object_template.html)给了我们一个没有指定构造函数和原型的 JavaScript 对象。它使用`Object[.prototype]`，在 JavaScript 中这等同于[`Object.create()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create)。

来看看它是如何运作的。找到 app 模块的实现文件[`atom_api_app.cc`](https://github.com/electron/electron/blob/0431997c8d64c9ed437b293e8fa15a96fc73a2a7/atom/browser/api/atom_api_app.cc)，在它的底部有如下代码：

```cpp
mate::ObjectTemplateBuilder(isolate, prototype->PrototypeTemplate())
    .SetMethod("getGPUInfo", &App::GetGPUInfo)
```

`mate::ObjectTemplateBuilder`调用了`.SetMethod`。`.SetMethod`可以被任何`ObjectTemplateBuilder`类的实例调用，用来在 JavaScript 中设置[Object prototype](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/prototype)上的方法，语法如下：

```cpp
.SetMethod("method_name", &function_to_bind)
```

相当于 JavaScript：

```js
function App{}
App.prototype.getGPUInfo = function () {
  // implementation here
}
```

这个类也包含在模块中设置属性的函数：

```cpp
.SetProperty("property_name", &getter_function_to_bind)
```

或者

```cpp
.SetProperty("property_name", &getter_function_to_bind, &setter_function_to_bind)
```

这些依次都是 JavaScript 中[Object.defineProperty](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty)的实现：

```js
function App {}
Object.defineProperty(App.prototype, 'myProperty', {
  get() {
    return _myProperty
  }
})
```

和

```js
function App {}
Object.defineProperty(App.prototype, 'myProperty', {
  get() {
    return _myProperty
  }
  set(newPropertyValue) {
    _myProperty = newPropertyValue
  }
})
```

通过原型和属性，像开发者期望的那样去构建 JavaScript 对象是可行的，并更清晰地解释了在更底层的操作系统级别上如何去实现函数和属性！

在何处实现任何给定的模块的方法本身就是一个复杂且常常不确定的问题，我们将在以后的文章中讨论它。
