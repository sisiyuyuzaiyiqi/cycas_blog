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

## 优化

这部分属于进阶操作，在使用 Shadowsocks 时感觉到延迟较大，或吞吐量较低时，可以考虑对服务器端进行优化。

### 开启 BBR

BBR 系 Google 最新开发的 TCP 拥塞控制算法，目前有着较好的带宽提升效果，甚至不比老牌的锐速差。

### 升级 Linux 内核

BBR 在 Linux kernel 4.9 引入。首先检查服务器 kernel 版本：

```bash
uname -r
```

如果其显示版本在 4.9.0 之下，则需要升级 Linux 内核，否则请忽略下文。

更新包管理器：

```bash
sudo apt update
```

查看可用的 Linux 内核版本：

```bash
sudo apt-cache showpkg linux-image
```

找一个想要升级的 Linux 内核版本，如“linux-image-4.10.0-22-generic”：

```bash
sudo apt install linux-image-4.10.0-22-generic
```

等待安装完成后重启服务器：

```bash
sudo reboot
```

删除老的 Linux 内核：

```bash
sudo purge-old-kernels
```

### 开启 BBR

运行`lsmod | grep bbr`，如果结果中没有`tcp_bbr`，则先运行：

```bash
modprobe tcp_bbr
echo "tcp_bbr" >> /etc/modules-load.d/modules.conf
```

运行：

```bash
echo "net.core.default_qdisc=fq" >> /etc/sysctl.conf
echo "net.ipv4.tcp_congestion_control=bbr" >> /etc/sysctl.conf
```

运行：

```bash
sysctl -p
```

保存生效。运行：

```bash
sysctl net.ipv4.tcp_available_congestion_control
sysctl net.ipv4.tcp_congestion_control
```

若均有`bbr`，则开启 BBR 成功。

### 优化吞吐量

新建配置文件：

```bash
sudo nano /etc/sysctl.d/local.conf
```

复制粘贴：

```
# max open files
fs.file-max = 51200
# max read buffer
net.core.rmem_max = 67108864
# max write buffer
net.core.wmem_max = 67108864
# default read buffer
net.core.rmem_default = 65536
# default write buffer
net.core.wmem_default = 65536
# max processor input queue
net.core.netdev_max_backlog = 4096
# max backlog
net.core.somaxconn = 4096

# resist SYN flood attacks
net.ipv4.tcp_syncookies = 1
# reuse timewait sockets when safe
net.ipv4.tcp_tw_reuse = 1
# turn off fast timewait sockets recycling
net.ipv4.tcp_tw_recycle = 0
# short FIN timeout
net.ipv4.tcp_fin_timeout = 30
# short keepalive time
net.ipv4.tcp_keepalive_time = 1200
# outbound port range
net.ipv4.ip_local_port_range = 10000 65000
# max SYN backlog
net.ipv4.tcp_max_syn_backlog = 4096
# max timewait sockets held by system simultaneously
net.ipv4.tcp_max_tw_buckets = 5000
# turn on TCP Fast Open on both client and server side
net.ipv4.tcp_fastopen = 3
# TCP receive buffer
net.ipv4.tcp_rmem = 4096 87380 67108864
# TCP write buffer
net.ipv4.tcp_wmem = 4096 65536 67108864
# turn on path MTU discovery
net.ipv4.tcp_mtu_probing = 1

net.ipv4.tcp_congestion_control = bbr
```

运行：

```bash
sysctl --system
```

编辑之前的 shadowsocks-server.service 文件：

```bash
sudo nano /etc/systemd/system/shadowsocks-server.service
```

在`ExecStart`前插入一行，内容为：

```
ExecStartPre=/bin/sh -c 'ulimit -n 51200'
```

即修改后的 shadowsocks-server.service 内容为：

```
[Unit]
Description=Shadowsocks Server
After=network.target

[Service]
ExecStartPre=/bin/sh -c 'ulimit -n 51200'
ExecStart=/usr/local/bin/ssserver -c /etc/shadowsocks/config.json
Restart=on-abort

[Install]
WantedBy=multi-user.target
```

`Ctrl + O`保存文件，`Ctrl + X`退出。

重载 shadowsocks-server.service：

```bash
sudo systemctl daemon-reload
```

重启 Shadowsocks：

```bash
sudo systemctl restart shadowsocks-server
```

### 开启 TCP Fast Open

TCP Fast Open 可以降低 Shadowsocks 服务器和客户端的延迟。实际上在上一步已经开启了 TCP Fast Open，现在只需要在 Shadowsocks 配置中启用 TCP Fast Open。

编辑 config.json：

```bash
sudo nano /etc/shadowsocks/config.json
```

将`fast_open`的值由`false`修改为`true`。`Ctrl + O`保存文件，`Ctrl + X`退出。

重启 Shadowsocks：

```bash
sudo systemctl restart shadowsocks-server
```

至此，Shadowsock 服务器端的优化已经全部完成。

全文引用自：[Ubuntu 16.04 下 Shadowsocks 服务器端安装及优化](https://www.polarxiong.com/archives/Ubuntu-16-04%E4%B8%8BShadowsocks%E6%9C%8D%E5%8A%A1%E5%99%A8%E7%AB%AF%E5%AE%89%E8%A3%85%E5%8F%8A%E4%BC%98%E5%8C%96.html)
