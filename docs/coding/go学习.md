---
title: go学习笔记
date: 2019-6-6 3:33
tags: [Go]
---

<CreateTime/>
<TagLinks />

## 搭建开发环境

基础环境：ubuntu 18.04 desktop

1. 官网下载 go1.14.1.linux-amd64.tar.gz

```bash
$ wget https://dl.google.com/go/go1.14.1.linux-amd64.tar.gz
```

2. 解压安装包到`/user/local`

```bash
$ tar zxvf go1.14.1.linux-amd64.tar.gz -C /usr/local/
```

3. 新建`GOPATH`目录`/root/project`

4. 编辑环境变量`/etc/profile/golang.sh`并`source`

```bash
$ vi /etc/profile.d/golang.sh

export GOROOT=/usr/local/go
export GOPATH=/root/project
export PATH=$PATH:$GOROOT/bin

:wq

$ source /etc/profile.d/golang.sh

```

5.验证安装是否成功

```bash
$ go version
```
