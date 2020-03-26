---
title: Ubuntu常用操作及命令
date: 2018-6-6 13:33
tags: [Linux]
---

<CreateTime/>
<TagLinks />

## Ubuntu 切换国内源

- 备份原来的源

```shell
sudo cp /etc/apt/sources.list /etc/apt/sources_init.list
```

- 更换源

新建/etc/apt/sources.list 文件并添加以下内容

```
deb http://mirrors.aliyun.com/ubuntu/ bionic main restricted universe multiverse
deb http://mirrors.aliyun.com/ubuntu/ bionic-security main restricted universe multiverse
deb http://mirrors.aliyun.com/ubuntu/ bionic-updates main restricted universe multiverse
deb http://mirrors.aliyun.com/ubuntu/ bionic-proposed main restricted universe multiverse
deb http://mirrors.aliyun.com/ubuntu/ bionic-backports main restricted universe multiverse
deb-src http://mirrors.aliyun.com/ubuntu/ bionic main restricted universe multiverse
deb-src http://mirrors.aliyun.com/ubuntu/ bionic-security main restricted universe multiverse
deb-src http://mirrors.aliyun.com/ubuntu/ bionic-updates main restricted universe multiverse
deb-src http://mirrors.aliyun.com/ubuntu/ bionic-proposed main restricted universe multiverse
deb-src http://mirrors.aliyun.com/ubuntu/ bionic-backports main restricted universe multiverse
```

- 执行以下命令

```shell
apt update
apt upgrade
```

- 界面直接修改

  在`Software Update`中直接修改 server

## 常用命令

### 系统重启

```shell
shutdown -r now
```

### 进入、退出 root 模式

```shell
sudo su
```

```shell
exit
```

### 赋予文件读写权限

```shell
chmod 777 filename
```

### 查看、杀死进程

```shell
ps -aux | grep 进程服务名
```

```shell
sudo kill 进程号（PID）
```
