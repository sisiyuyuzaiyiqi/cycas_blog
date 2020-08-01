---
title: 使用nginx搭建静态web服务
date: 2020-8-1 21:29
tags: ["nginx", "Web", "Linux"]
---


<CreateTime />
<TagLinks />

## Ubuntu16.04安装和配置nginx

进root模式

```bash
sudo su
```

查看Ubuntu版本信息

```bash
cat /etc/lsb-release
```

本文使用的nginx版本：1.18.0

### 1.安装nginx依赖库

#### 1.1 安装pcre依赖库

```bash
apt-get install libpcre3 libpcre3-dev
```

#### 1.2 安装zlib依赖库

```bash
apt-get install zlib1g-dev
```

#### 1.3 安装ssl依赖库

```bash
apt-get install openssl
```

### 2.安装nginx

#### 2.1 下载最新版本

```bash
cd /usr/local/soft
wget http://nginx.org/download/nginx-1.18.0.tar.gz
```

#### 2.2 解压

```bash
tar -zxvf nginx-1.18.0.tar.gz
```

#### 2.3 进入nginx目录配置，配置安装位置并创建

```bash
cd nginx-1.18.0/
./configure --prefix=/usr/local/nginx
cd /usr/local
mkdir nginx
```

可以通过`./configure --help`查看需要配置的参数。

#### 2.4 编译、安装

```bash
cd nginx-1.18.0/
make
make install
```

如果make的时候报错，提示“pcre.h No such file or directory”，需要安装 libpcre3-dev依赖。

#### 2.5 启动nginx

安装完后在/usr/local/nginx/sbin目录下有个nginx命令。

```bash
./nginx
```

后面可以加上-c 指定配置文件的位置，不加nginx会自动加载默认配置文件。

查看nginx进程

```bash
ps -ef|grep nginx
```

### 发布编译好的静态网站（博客）

在nginx安装的根目录我们找到`data`目录。

为防止传输文件失败，我们先执行：

```bash
chmod 777 data/
```

然后，将你编译好的静态文件上传，我的是名叫dist的文件夹。

```bash
scp -r dist ubuntu@140.143.128.85:/usr/local/nginx/data
```

打开nginx目录下`conf`中的配置文件`nginx.conf`，作如下修改：

```bash
server {
  location / {
    root data/dist;
    ...
  }
}
```

重新读取配置文件：

```bash
cd nginx/sbin/
./nginx -s reload
```

现在访问服务器的http地址，应该就能看到自己的博客啦。
