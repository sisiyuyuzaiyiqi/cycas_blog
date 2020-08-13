---
title: Ubuntu 18.04 创建Python 虚拟环境
date: 2020-8-4 10:23
tags: [Python]
---

<CreateTime/>
<TagLinks />

## Ubuntu 18.04 创建Python 虚拟环境

本文使用Python3。

确认Python3的安装：

```bash
python3 -V
```

创建虚拟环境的推荐方式是通过`venv`组件。

`venv`组件由`python3-venv`提供：

```bash
sudo apt install python3-venv
```

切换到想要创建虚拟环境的目录，执行：

```bash
python3 -m venv my-project-env
```

以上创建了一个`my-project-env`的路径，包含了二进制Python、Pip包管理、标准Python库等支持文件的拷贝。

要开始使用这个虚拟环境，通过`activate`脚本来激活：

```bash
source my-project-env/bin/activate
```

激活后，虚拟环境的`bin`路径将会添加到`$PATH`环境变量的开头。同时终端的提示也会变为正在使用的虚拟环境名称。本文中会显示如下：

```bash
$ source my-project-env/bin/activate
(my-project-env) $
```

现在可以通过Pip来安装、升级、删除包。

> 在虚拟环境中时，可以使用`pip`命令代替`pip3`，使用`python`代替`pyhton3`

我们使用[Requests](https://requests.readthedocs.io/en/master/)来做个测试

首先安装组件：

```bash
pip install requests
```

可以通过如下命令测试安装：

```bash
python -c "import request"
```

如果导入组件执行无错误，说明安装成功。

本文我们使用网站[https://httpbin.org/](https://httpbin.org/)来提供简单的HTTP请求&响应服务，并打印消息头的所有内容。

创建一个py文件，我用的VScode：

```bash
code testing.py
```

编写如下代码：

```python
import requests

r = requests.get('http://httpbin.org/get')
print(r.headers)
```

运行该脚本：

```bash
python testing.py
```

返回如下：

```json
{'Connection': 'keep-alive', 'Server': 'gunicorn/19.9.0', 'Date': 'Tue, 18 Sep 2018 16:50:03 GMT', 'Content-Type': 'application/json', 'Content-Length': '266', 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Credentials': 'true', 'Via': '1.1 vegur'}
```

但需要停用虚拟环境时，如下即可：

```bash
deactivate
```

