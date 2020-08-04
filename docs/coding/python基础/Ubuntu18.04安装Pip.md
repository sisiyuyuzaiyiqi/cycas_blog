---
title: Ubuntu 18.04 安装Pip
date: 2020-8-4 10:23
tags: [Python]
---

<CreateTime/>
<TagLinks />

## Ubuntu 18.04 安装Pip（Python3）

Pip是一个用于简化Python包安装操作的包管理器。在18.04上Pip默认是没有安装的，但想装的话并不麻烦。

### 先决

开始安装之前，先保证拥有sudo权限的登录。

### 安装Python3的Pip

Ubuntu18.04自带Python3，作为默认使用的Python。通过一下步骤完成Pip3的安装：

1. 更新包列表：

   ```bash
   sudo apt update
   ```

2. 安装Pip3：

   ```bash
   sudo apt install python3-pip
   ```

   以上命令会同时安装构建python组件的所有依赖。

3. 完成安装后，确认是否正确：

   ```bash
   pip3 --version
   ```

### 如何使用Pip

当全局安装python组件时，推荐使用`apt`包管理器安装发行版提供的版本，因为这些已经在Ubuntu系统上经过测试，使用良好。只有当apt没有资源的时候，才需要使用Pip全局安装。

大部分情况下，只在虚拟环境（virtual environment）下使用Pip。Python的`Virtual Environment`允许为指定项目创建独立的组件安装路径，而无需全局安装。这样就不会影响到其他的项目。

通过Pip，我们可以从PyPI（Python Package Index），版本控制，本地项目以及发行文件中安装包。大多数情况下，我们通过PyPI。

查看Pip的命令和选项列表：

```bash
pip3 --help
```

使用`pip <command> --help`可以获取到指定命令的详细信息。比如获取`install`命令的更多信息：

```bash
pip3 install --help
```

#### 通过Pip安装包

假设我们安装一个叫`scrapy`的包，该包用于从网站爬取数据。

安装最新版本：

```bash
pip3 install scrapy
```

安装指定版本：

```bash
pip3 install scrapy==1.5
```

#### 使用依赖文件安装

`requirement.txt`是一个包含运行指定项目所需求的包及版本的列表的txt文件。

使用如下命令安装：

```bash
pip3 install -r requirements.txt
```

#### 列出已安装的包

```bash
pip3 list
```

#### 升级包

```bash
pip3 install --upgrade package_name
```

#### 删除包

```bash
pip3 uninstall package_name
```

### 总结

本文介绍了Ubuntu下如何安装Pip，以及管理包的基础用法。更多信息，可查看[pip用户手册](https://pip.pypa.io/en/stable/user_guide/)