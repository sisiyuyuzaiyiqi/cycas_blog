---
title: 三、路由Router
date: 2020-3-31 15:47
tags: [Go]
---

<CreateTime/>
<TagLinks />

`路由Router`是一个非常重要的概念，所有的接口都要有路由来进行管理。

## 请求方法

`Gin`的路由支持`GET`、`POST`、`PUT`、`DELETE`、`PATCH`、`HEAD`、`OPTIONS`请求，同时还有一个 `Any` 函数，可以同时支持以上的所有请求。

将[上一章节](二、单元测试.md)的代码添加其他请求方式的路由，并编写单元测试。

```go
// 省略其他代码
// 添加 Get 请求路由
router.GET("/", func(context *gin.Context) {
    context.String(http.StatusOK, "hello gin get method")
})
// 添加 Post 请求路由
router.POST("/", func(context *gin.Context) {
    context.String(http.StatusOK, "hello gin post method")
})
// 添加 Put 请求路由 
router.PUT("/", func(context *gin.Context) {
    context.String(http.StatusOK, "hello gin put method")
})
// 添加 Delete 请求路由
router.DELETE("/", func(context *gin.Context) {
    context.String(http.StatusOK, "hello gin delete method")
})
// 添加 Patch 请求路由
router.PATCH("/", func(context *gin.Context) {
    context.String(http.StatusOK, "hello gin patch method")
})
// 添加 Head 请求路由
router.HEAD("/", func(context *gin.Context) {
    context.String(http.StatusOK, "hello gin head method")
})
// 添加 Options 请求路由
router.OPTIONS("/", func(context *gin.Context) {
    context.String(http.StatusOK, "hello gin options method")
})
// 省略其他代码
```

单元测试，只展示一个`POST`请求函数，基本与 `GET` 请求一致：

```go
// router("/") post 测试
func TestIndexPostRouter(t *testing.T) {
    router := initRouter.SetupRouter()
    w := httptest.NewRecorder()
    req, _ := http.NewRequest(http.MethodPost, "/", nil)
    router.ServeHTTP(w, req)
    assert.Equal(t, http.StatusOK, w.Code)
    assert.Equal(t, "hello gin post method", w.Body.String())
}
```

运行测试，全部通过。

此时有个问题，所有的请求对应的路由内函数基本一样，只是有细微的差别，但是我们却每个路由里都完完整整的写了一遍，所以我们要将公共逻辑抽取出来。

```go
func retHelloGinAndMethod(context *gin.Context) {
    context.String(http.StatusOK, "hello gin "+strings.ToLower(context.Request.Method)+" method")
}
```

抽取出来，并通过 `context.Request.Method` 将请求的方法提取出来 ，并将其转化为小写。此时就可以改造我们的路由了，将原有的路由中的函数去掉换成我们所编写的新的函数。

```go
// 添加 Get 请求路由
router.GET("/", retHelloGinAndMethod)
// 添加 Post 请求路由
router.POST("/", retHelloGinAndMethod)
// 添加 Put 请求路由
router.PUT("/", retHelloGinAndMethod)
// 添加 Delete 请求路由
router.DELETE("/", retHelloGinAndMethod)
// 添加 Patch 请求路由
router.PATCH("/", retHelloGinAndMethod)
// 添加 Head 请求路由
router.HEAD("/", retHelloGinAndMethod)
// 添加 Options 请求路由
router.OPTIONS("/", retHelloGinAndMethod)
```

再次运行单测，通过。

## Handler处理器

经过上面简单的例子的演示和操作，现在我们大概可以了解到路由需要传入两个参数，一个为路径，另一个为路由执行的方法，我们叫做它处理器 `Handler` ，而且，该参数是可变长参数。也就是说，可以传入多个 Handler，形成一条 Handler chain 。

同时，对 handler 函数有着一些要求：该函数需要传入一个 `gin.Context` **指针**，并通过该指针进行值的处理。

Handler函数可以对前端返回的字符串、Json、html等多种格式或形式文件，后面我们逐一介绍。

## 获取路由路径中参数

知道了路由支持的方法和对应的处理器，那么接下来就应该了解如何从路由中获取参数。

编写一个新的路由，在`initRouter.go`添加：

```go
//省略其他代码    
// 添加 user
router.GET("/user/:name",handler.UserSave)
// 省略其他代码
```

此时我们发现，在原来只有 `/` 分隔符的情况下出现了 `/:` 该符号就表示后面的字符串为一个占位符，用于将要进行的传值，此时我们的路由为 `/user/{name}`

我们没有必要把所有的 Handler 都写到一个文件夹中，那样会臃肿不堪，所以我们新建一个文件夹`handler`，在文件夹下建立 `userHandler.go` 文件，编写该文件。

```go
package handler

import (
    "github.com/gin-gonic/gin"
    "net/http"
)

func UserSave(context *gin.Context) {
    username := context.Param("name")
    context.String(http.StatusOK, "用户"+username+"已经保存")
}
```

这里，我们用`context.Param`获取了路由路径中的参数。

在`initRouter.go`添加引用：

```go
import (
	...
	"gin_mysql/handler"
)
```

接着，可以编写我们的单元测试。

在`test`目录新建立一个 `user_test.go` 文件：

```go
package test

import (
	"gin_mysql/initRouter"
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestUserSave(t *testing.T) {
	username := "铁树"
	router := initRouter.SetupRouter()
	w := httptest.NewRecorder()
	req, _ := http.NewRequest(http.MethodGet, "/user/"+username, nil)
	router.ServeHTTP(w, req)
	assert.Equal(t, http.StatusOK, w.Code)
	assert.Equal(t, "用户"+username+"已经保存", w.Body.String())
}
```

运行单测，通过。

运行项目，在浏览器中输入`localhost:9000/user/铁树`，可以在页面上看到：`用户铁树已经保存`

当然，获取参数的方法不止这一个。针对不同的路由，Gin 给出了不同的获取参数的方法，比如形如：`/user?name=铁树&age=18`

我们再次添加一个 `Handler`，做为处理。在 `userHandler` 中添加下面的方法：

```go
// 通过 query 方法进行获取参数
func UserSaveByQuery(context *gin.Context) {
    username := context.Query("name")
    age := context.Query("age")
    context.String(http.StatusOK, "用户:"+username+",年龄:"+age+"已经保存")
}
```

同时新增路由：

```go
router.GET("/user", handler.UserSaveByQuery)
```

新增单测：

```go
func TestUserSaveQuery(t *testing.T) {
    username := "铁树"
    age := 18
    router := initRouter.SetupRouter()
    w := httptest.NewRecorder()
    req, _ := http.NewRequest(http.MethodGet, "/user?name="+username+"&age="+strconv.Itoa(age), nil)
    router.ServeHTTP(w, req)
    assert.Equal(t, http.StatusOK, w.Code)
    assert.Equal(t, "用户:"+username+",年龄:"+strconv.Itoa(age)+"已经保存", w.Body.String())
}
```

运行单测，通过。

运行项目，通过浏览器访问`localhost:9000/user?name=铁树&age=18`，页面显示：`用户:铁树,年龄:18已经保存`

当然，还可以通过 `context.DefaultQuery` 方法，在获取时，如果没有该值则赋给一个默认值。

重新修改获取年龄的代码，将其改为以下代码：

```go
age := context.DefaultQuery("age", "20")
```

重新编写我们的单元测试：

```go
func TestUserSaveWithNotAge(t *testing.T) {
    username := "铁树"
    router := initRouter.SetupRouter()
    w := httptest.NewRecorder()
    req, _ := http.NewRequest(http.MethodGet, "/user?name="+username, nil)
    router.ServeHTTP(w, req)
    assert.Equal(t, http.StatusOK, w.Code)
    assert.Equal(t, "用户:"+username+",年龄:20已经保存", w.Body.String())
}
```

通过浏览器访问`/user?name=铁树`，显示：`用户:铁树,年龄:20已经保存`

此外还有其他参数获取方法，`QueryArray` 获取数组和 `QueryMap` 获取 map。

## 路由分组

此时我们再次看 `SetupRouter` 方法时，里面的路由基本可以分为两大类 `/` 和 `/user`，如果日后在进行功能的添加，那么势必会出现大量的路由，所以我们需要对路由进行一下管理，Gin 给我们提供了路由分组。