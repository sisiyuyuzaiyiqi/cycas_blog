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

此时Filebeat会尝试去连接端口5044，也就是Logstash。但在Logstash启用有效的Filebeat插件之前，5044是不会有响应的，所以此时报错很正常。

接下来我们配置Logstash。

一个管道配置文件的框架如下：

```shell
# The # character at the beginning of a line indicates a comment. Use
# comments to describe your configuration.
input {
}
# The filter part of this file is commented out to indicate that it is
# optional.
# filter {
#
# }
output {
}
```

在Logstash的根目录新建一个配置文件`first-pipeline.conf`，把以上的框架复制进去。

在`input`中添加：

```shell
beats {
        port => "5044"
    }
```

然后，我们再配置输出，我们暂时先不往ES里写，先配置成在命令行打印。在`output`中添加：

```shell
stdout { codec => rubydebug }
```

最终，`first-pipeline.conf`配置文件长这样：

```json
input {
    beats {
        port => "5044"
    }
}
# The filter part of this file is commented out to indicate that it is
# optional.
# filter {
#
# }
output {
    stdout { codec => rubydebug }
}
```

我们来校验一下这个配置文件：

```shell
bin/logstash -f first-pipeline.conf --config.test_and_exit
```

`--config.test_and_exit`选项会解析你的配置文件，并报告错误。

接下来，我们启动Logstash：

```shell
bin/logstash -f first-pipeline.conf --config.reload.automatic
```

`--config.reload.automatic`选项可以开启配置热更新，这样当每次修改配置文件后，不必重启Logstash。

若管道正确工作，可以看到如下的一系列事务：

```json
{
    "@timestamp" => 2017-11-09T01:44:20.071Z,
        "offset" => 325,
      "@version" => "1",
          "beat" => {
            "name" => "My-MacBook-Pro.local",
        "hostname" => "My-MacBook-Pro.local",
         "version" => "6.0.0"
    },
          "host" => "My-MacBook-Pro.local",
    "prospector" => {
        "type" => "log"
    },
    "input" => {
        "type" => "log"
    },
        "source" => "/path/to/file/logstash-tutorial.log",
       "message" => "83.149.9.216 - - [04/Jan/2015:05:13:42 +0000] \"GET /presentations/logstash-monitorama-2013/images/kibana-search.png HTTP/1.1\" 200 203023 \"http://semicomplete.com/presentations/logstash-monitorama-2013/\" \"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/32.0.1700.77 Safari/537.36\"",
          "tags" => [
        [0] "beats_input_codec_plain_applied"
    ]
}
...
```

ok，接下来我们准备一批json格式的数据，重新配置Filebeat和Logstash，来导入josn数据。

准备的json数据格式如下即可：

```json
{k1: v1, k2: v2, k3: v3, ...}
{k1: v1, k2: v2, k3: v3, ...}
{k1: v1, k2: v2, k3: v3, ...}
{k1: v1, k2: v2, k3: v3, ...}
{k1: v1, k2: v2, k3: v3, ...}
...
```

比如我用的数据如下：

```josn
{"timestamp":"1591078608","name":"_mta-sts.0-3.duckdns.org","type":"txt","value":"5f1swcMtN6tEOnhAyKjklcCr5p21gxzyhePaxbqAmMU"}
{"timestamp":"1591079217","name":"_mta-sts.0-games.com","type":"txt","value":"v=spf1 -all"}
{"timestamp":"1591079184","name":"_mta-sts.0-ml.com","type":"txt","value":"v=spf1 a ?all"}
...
```

重新配置filebeat.yml：

```yaml
filebeat.inputs:
- type: log
  paths:
    - /home/jack/Desktop/es-work/2020-06-02-1591078479-fdns_txt_mx_mta-sts.json
  json.keys_under_root: true
  json.add_error_key: true
output.logstash:
  hosts: ["localhost:5044"]
```

以上，其中的paths填写你要导入的json数据文件的绝对路径。

重新配置你的logstash配置文件，我的是之前新建的first-pipeline.conf：

```josn
# The # character at the beginning of a line indicates a comment. Use
# comments to describe your configuration.
input {
    beats {
        port => "5044"
    }
}
# The filter part of this file is commented out to indicate that it is
# optional.
filter {
}
output {
    elasticsearch {
        hosts => [ "localhost:9200" ]
    }
}
```

可以看到，我们更改了一下输出，将打印到标准输出（控制台）改成了输出给ES。

当然，如果不放心的话，可以先用以前的，打印到控制台看一下，没问题的话再进ES。

配置完成后，我们按上文说过的，执行：

```bash
bin/logstash -f first-pipeline.conf --config.reload.automatic
./filebeat -e -c filebeat.yml -d "publish"
```

如果不出问题，数据已经规整并进入ES了。我们输入以下命令查看：

```bash
curl 'localhost:9200/_cat/indices?v'
```

找到该数据的索引名称，再试着用一下普通检索：

```bash
curl -XGET 'localhost:9200/logstash-$DATE/_search?pretty&q=name=_mta-sts.0.ciwra.com'
```

以上语句，logstash-$DATE要替换成你自己的索引名称，`q=`后面的内容是你的查询条件。

若成功，则会返回符合你的查询条件的所有数据。
