---
title: 二、使用filebeat导入json文件的数据
date: 2020-7-30 17:51
tags: [ES]
---

<CreateTime/>
<TagLinks />

## 使用filebeat导入json文件的数据

### 前置准备工作

安装`Elasticsearch`、`Logstash`

本文所使用的环境为`Ubuntu18.04.4 LTS`，ES产品栈的版本号为`7.8.0`

`Java`版本为：

```bash
openjdk 14.0.2 2020-07-14
OpenJDK Runtime Environment (build 14.0.2+12-46)
OpenJDK 64-Bit Server VM (build 14.0.2+12-46, mixed mode, sharing)
```

### 一、Logstash简介

Logstash是一个具有实时流水线功能的开源数据收集引擎。它可以动态地将来自不同来源的数据规整成你想要的样子。

Logstash最早只是为了日志收集使用，但现在它的能力已远不止这些。结合大量的输入输出及过滤插件，它可以丰富和转化任何类型的事务。

这里我们只介绍最简单的功能之一，导入没有按ES标准添加索引的json文件。

在此之前，我们先熟悉一下Logstash的使用。

一个Logstash有两个基本要素，`input`和`output`，和一个可选要素`filter`。`input`插件消费来自源的数据，`filter`插件按照你的设定来规整数据，`output`插件将数据存入你指定的位置。

首先我们测试下Logstash的安装，我们启动一个最基本的Logstash管道：

```bash
cd logstash-7.8.0
bin/logstash -e input { stdin { } } output { stdout {} }
```

`-e`标志允许直接从命令行声明配置，以便快速看到效果。上面这个例子中，管道从标准输入中获取输入（`stdin`）,然后以结构化格式传递到标准输出（`stdout`）。

等待Logstash启动，当看到"Pipeline main started"以后，在命令行输入`hello world`，你将看到类似下面的返回：

```bash
hello world
2013-11-21T01:22:14.405+0000 0.0.0.0 hello world
```

可以看到，Logstash在返回的消息中添加了时间戳、IP地址等信息。

### 二、安装Filebeat

各种版本的安装方式可以参阅ES官网，本文中采用：

```bash
curl -L -O https://artifacts.elastic.co/downloads/beats/filebeat/filebeat-7.8.0-linux-x86_64.tar.gz
tar xzvf filebeat-7.8.0-linux-x86_64.tar.gz
```

### 三、熟悉Logstash+Filebeat的基本操作

在使用Filebeat向ES导入json文件之前，我们先跟着官网的教程走一下，这个教程是使用Filebeat将示例日志文件导入ES。

下载[示例日志文件](https://download.elastic.co/demos/logstash/gettingstarted/logstash-tutorial.log.gz)。

接下来，在创建Logstash管道之前，我们要配置一下Filebeat，才能用它向Logstash发送日志行。

打开Filebeat目录下的`filebeat.yml`文件，将内容覆盖如下：

```shell
filebeat.inputs:
- type: log
  paths:
    - /path/to/file/logstash-tutorial.log 
output.logstash:
  hosts: ["localhost:5044"]
```

确保paths下填写的是之前下载的示例文件的绝对路径。

使用如下命令运行Filebeat：

```shell
./filebeat -e -c filebeat.yml -d "publish"
```
