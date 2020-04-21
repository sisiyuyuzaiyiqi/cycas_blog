---
title: 五、ES入门
date: 2020-4-20 14:59
tags: [Go, ES]
---

<CreateTime/>
<TagLinks />

## ES 全家桶

当你使用 ES 时，要保证全家桶的版本一致。比如当你使用 `Elasticsearch 7.6.2`, 你应当安装 `Beats 7.6.2, APM Server 7.6.2, Elasticsearch Hadoop 7.6.2, Kibana 7.6.2, and Logstash 7.6.2`。

安装顺序：

1. Elasticsearch
2. Kibana
3. Logstash
4. Beats
5. APM Server
6. Elasticsearch Hadoop

### 安装 Elasticsearch

环境：Linux18.04

下载存档文件

```bash
wget https://artifacts.elastic.co/downloads/elasticsearch/elasticsearch-7.6.2-linux-x86_64.tar.gz
```

下载 sha512 校验文件

```bash
wget https://artifacts.elastic.co/downloads/elasticsearch/elasticsearch-7.6.2-linux-x86_64.tar.gz.sha512
```

比较校验文件

```bash
shasum -a 512 -c elasticsearch-7.6.2-linux-x86_64.tar.gz.sha512
```

若成功会返回：

```bash
elasticsearch-7.6.2-linux-x86_64.tar.gz: OK
```

安装 ES

```bash
tar -xzf elasticsearch-7.6.2-linux-x86_64.tar.gz
cd elasticsearch-7.6.2/
```

上面的路径就是`$ES_HOME`

安装 Java 环境

注意 ES7.6.2 需要 jdk11 以上，去 orcale 官网下载

```bash
mv openjdk-14.0.1_linux-x64_bin.tar.gz /usr/local/
```

解压

```bash
tar -zxvf openjdk-14.0.1_linux-x64_bin.tar.gz
```

配置 JAVA_HOME

```bash
vim /etc/profile.d/java.sh

export JAVA_HOME=/usr/local/jdk-14.0.1
export JRE_HOME=/usr/local/jdk-14.0.1/jre
export CLASSPATH=.:$CLASSPATH:$JAVA_HOME/lib:$JRE_HOME/lib
export PATH=$PATH:$JAVA_HOME/bin:$JRE_HOME/bin

source /etc/profile.d
```

验证 java 环境

```bash
java -version
```

### 命令行启动 ES

```bash
./bin/elasticsearch
```

::: tip
如果执行启动命令后无报错，之间显示 killed，可能是虚拟机内存不够，关闭虚拟机，分配内存至 4g 或以上，再启动
:::

ES 默认在后台运行，打印日志到标准输出（`stout`），按下`Ctrl - C`停止

验证启动成功：

向 localhost:9200 发送 http 请求`GET /`

若成功启动，会返回：

```json
  "name" : "Cp8oag6",
  "cluster_name" : "elasticsearch",
  "cluster_uuid" : "AT69_T_DTp-1qgIJlatQqA",
  "version" : {
    "number" : "7.6.2",
    "build_flavor" : "default",
    "build_type" : "tar",
    "build_hash" : "f27399d",
    "build_date" : "2016-03-30T09:51:41.449Z",
    "build_snapshot" : false,
    "lucene_version" : "8.4.0",
    "minimum_wire_compatibility_version" : "1.2.3",
    "minimum_index_compatibility_version" : "1.2.3"
  },
  "tagline" : "You Know, for Search"
```

### 以守护进程启动

当以守护进程启动时，在命令行声明`-d`，并使用`-p`选项将进程 id 记录到文件 pid

```bash
./bin/elasticsearch -d -p pid
```

关闭：

```bash
pkill -F pid
```

_TODO_
