---
title: go+mysql+elasticsearch学习
date: 2019-6-6 3:33
tags: [Go]
---

<CreateTime/>
<TagLinks />

## Go 环境配置

基础环境：ubuntu 18.04 desktop

1. 官网下载 go1.14.1.linux-amd64.tar.gz

```bash
wget https://dl.google.com/go/go1.14.1.linux-amd64.tar.gz
```

2. 解压安装包到`/user/local`

```bash
tar zxvf go1.14.1.linux-amd64.tar.gz -C /usr/local/
```

3. 新建`GOPATH`目录`/root/project`

4. 编辑环境变量`/etc/profile/golang.sh`并`source`

```bash
vi /etc/profile.d/golang.sh

export GOROOT=/usr/local/go
export GOPATH=/root/project
export PATH=$PATH:$GOROOT/bin

:wq

source /etc/profile.d/golang.sh

```

5.验证安装是否成功

```bash
go version
```

## mysql 安装

### 在 unbuntu 上安装

首先，输入下列命令确保你的仓库已经被更新：

```bash
sudo apt update
```

安装 MySQL 5.7:

```bash
sudo apt install mysql-server -y
```

验证安装：

```bash
sudo systemctl status mysql.service
```

看到 `Active: active (running)`说明安装成功。

若没有看到：

```bash
sudo systemctl start mysql.service
```

### 配置/保护 MySQL

对于刚安装的 MySQL，你应该运行它提供的安全相关的更新命令。就是：

```bash
sudo mysql_secure_installation
```

这样做首先会询问你是否想使用 “ _密码有效强度(validate password component)_”。

其他选项（依序）是：“ _移除匿名用户(remove anonymous user)_”，“ _禁止 root 远程登录(disallow root login remotely)_”，“ _移除测试数据库及其访问(remove test database and access to it)_”。“ _重新载入权限表(reload privilege tables now)_”。

但此时使用 root 账户在本地登录，依然会报错`ERROR 1698(28000)`，需要执行以下操作：

### 修改 root 账户配置

使用 cat 命令查看默认密码：

```bash
sudo cat /etc/mysql/debian.cnf
```

使用默认用户密码登录。

修改密码：

```sql
UPDATE mysql.user SET authentication_string=PASSWORD('root'), PLUGIN='mysql_native_password' WHERE USER='root';
```

重启 mysql 服务：

```bash
sudo systemctl restart mysql.service
```
