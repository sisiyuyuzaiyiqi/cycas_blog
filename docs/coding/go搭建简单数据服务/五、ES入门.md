---
title: 五、ES入门
date: 2020-4-20 14:59
tags: [Go]
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
vim /etc/profile/java.sh

export JAVA_HOME=/usr/local/jdk-14.0.1
export JRE_HOME=/usr/local/jdk-14.0.1/jre
export CLASSPATH=.:$CLASSPATH:$JAVA_HOME/lib:$JRE_HOME/lib
export PATH=$PATH:$JAVA_HOME/bin:$JRE_HOME/bin

source /etc/profile
```

验证 java 环境

```bash
java -version
```

### 命令行启动 ES

```bash
./bin/elasticsearch
```

ES 默认在后台运行，打印日志到标准输出（`stout`），按下`Ctrl - C`停止

_TODO_
