---
title: ES安装（docker）
date: 2020-8-8 13:06
tags: [ES]

---

<CreateTime/>
<TagLinks />

ES同样可以作为docker映像使用。该映像基于cenetOS 7。

在[www.docker.elastic.co](https://www.docker.elastic.co/)查阅所有已发布的Docker映像和标签的列表。源文件在[Github](https://github.com/elastic/elasticsearch/tree/7.8/distribution/docker)。

这些映像可以在ES许可证范畴内免费使用。它们包含开源、免费的商业功能以及对付费商业功能的访问。

### 拉取映像

```bash
docker pull docker.elastic.co/elasticsearch/elasticsearch:7.8.1
```

### 启动单节点集群

须声明单节点发现已绕过引导检查。

```bash
docker run -p 9200:9200 -p 9300:9300 -e "discovery.type=single-node" docker.elastic.co/elasticsearch/elasticsearch:7.8.1
```
