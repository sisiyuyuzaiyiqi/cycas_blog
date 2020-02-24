---
title: Ubuntu16搭建shadowsocks服务
date: 2018-9-1 10:16
tags: [Linux]
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

然后按 `Ctrl + O` 保存文件，`Ctrl + X` 退出。

## 测试 Shadowsocks 配置

首先记录下服务器的 IP 地址

```bash
ifconfig
```

找到 IPv4 地址记下。

测试下 Shadowsocks 能不能正常工作：

```bash
ssserver -c /etc/shadowsocks/config.json
```

在 Shadowsocks 客户端添加服务器，地址填写 `IPv4` 地址，端口号为 `8388`，加密方法为 `aes-256-cfb`，密码为设置的密码。然后设置客户端使用全局模式，浏览器登录 Google 试试应该能直接打开了。

这时浏览器登录`http://ip138.com/`就会显示 Shadowsocks 服务器的 IP 啦！

测试完毕，按 `Ctrl + C` 关闭 Shadowsocks。

## 配置 Systemd 管理 Shadowsocks

新建 Shadowsocks 管理文件:

```bash
sudo nano /etc/systemd/system/shadowsocks-server.service
```

```
[Unit]
Description=Shadowsocks Server
After=network.target

[Service]
ExecStart=/usr/local/bin/ssserver -c /etc/shadowsocks/config.json
Restart=on-abort

[Install]
WantedBy=multi-user.target
```

`Ctrl + O`保存文件，`Ctrl + X`退出。

启动 Shadowsocks：

```bash
sudo systemctl start shadowsocks-server
```

设置开机启动 Shadowsocks：

```bash
sudo systemctl enable shadowsocks-server
```

至此，Shadowsock 服务器端的基本配置已经全部完成了。
