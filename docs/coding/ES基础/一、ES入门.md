---
title: 一、ES入门
date: 2020-4-20 14:59
tags: [ES]
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
sudo mv openjdk-14.0.1_linux-x64_bin.tar.gz /usr/local/
```

解压

```bash
sudo tar -zxvf openjdk-14.0.1_linux-x64_bin.tar.gz
```

配置 JAVA_HOME

```bash
sudo vim /etc/profile.d/java.sh

export JAVA_HOME=/usr/local/jdk-14.0.1
export JRE_HOME=/usr/local/jdk-14.0.1/jre
export CLASSPATH=.:$CLASSPATH:$JAVA_HOME/lib:$JRE_HOME/lib
export PATH=$PATH:$JAVA_HOME/bin:$JRE_HOME/bin

source /etc/profile.d/java.sh
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

### 外部连接虚拟机内的 ES

::: tip
修改 ES 配置文件
:::

cd 到 ES 根目录的 config 文件夹，修改`elasticsearch.yml`：

Memory 下添加：

```bash
bootstrap.memory_lock: false
bootstrap.system_call_filter: false
```

Network 下添加：

```bash
network.bind_host: 0.0.0.0
http.port: 9200
```

Discovery 下添加：

```bash
cluster.initial_master_nodes: ["node-1"]
```

Node 下添加：

```bash
node.name: node-1
```

此时还要针对以下问题做些调整：

::: tip
max virtual memory areas vm.max_map_count [65530] is too low, increase to at least [262144]
:::

问题翻译过来就是：elasticsearch 用户拥有的内存权限太小，至少需要 262144

解决：

切换到 root 用户

执行命令：

```bash
sysctl -w vm.max_map_count=262144
```

查看结果：

```bash
sysctl -a|grep vm.max_map_count
```

显示：

```bash
vm.max_map_count = 262144
```

上述方法修改之后，如果重启虚拟机将失效，所以：

解决办法：

在 /etc/sysctl.conf 文件最后添加一行

```bash
vm.max_map_count=262144
```

即可永久修改

::: tip
[1]: max file descriptors [4096] for elasticsearch process is too low, increase to at least [65536]

[2]: max number of threads [3818] for user [es] is too low, increase to at least [4096]
:::

`sudo vim /etc/security/limits.conf`，添加配置：

```bash
* soft nofile 65535
* hard nofile 65535
* soft nproc 65535
* hard nproc 65535
```

登出再重进，`ulimit -n`查看是否生效

然而以上方法在带界面的 ubuntu 上无效，请用以下方法：

```bash
/etc/systemd/system.conf   #modify hard limit
/etc/systemd/user.conf   #modify soft limit
```

修改以上两个文件，分别添加配置：

```bash
DefaultLimitNOFILE=65535
DefaultLimitNPROC=65535
```

以上全部改完后，重启虚拟机，在外部访问 `虚拟机地址:9200`，检查是否成功

_全文结束_
