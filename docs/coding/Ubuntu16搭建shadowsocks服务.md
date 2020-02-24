---
title: Ubuntu16搭建shadowsocks服务
date: 2018-9-1 10:16
tags: [linux]
---

<CreateTime/>
<TagLinks />

## 安装 pip

因 Python 3 对应的包管理器 pip3 并未预装，首先安装 pip3：

```bash
sudo apt install python3-pip
```

## 安装 Shadowsocks

因 Shadowsocks 作者不再维护 pip 中的 Shadowsocks（定格在了 2.8.2），我们使用下面的命令来安装最新版的 Shadowsocks：

```bash
pip3 install https://github.com/shadowsocks/shadowsocks/archive/master.zip
```

安装完成后可以使用下面这个命令查看 Shadowsocks 版本：

```bash
sudo ssserver --version
```

## 创建配置文件

创建 Shadowsocks 配置文件所在文件夹：

```bash
sudo mkdir /etc/shadowsocks
```

然后创建配置文件：

```bash
sudo nano /etc/shadowsocks/config.json
```

复制粘贴如下内容（注意修改密码“password”）：

```json
{
  "server": "::",
  "server_port": 8388,
  "local_address": "127.0.0.1",
  "local_port": 1080,
  "password": "mypassword",
  "timeout": 300,
  "method": "aes-256-cfb",
  "fast_open": false
}
```

然后按 Ctrl + O 保存文件，Ctrl + X 退出。
