module.exports = {
  title: "铁树的博客",
  description: "这是铁树的新博客，使用VuePress搭建。前端技术博客。",
  // base: "/cycas_blog/",
  locales: {
    "/": {
      lang: "zh-CN"
    }
  },
  themeConfig: {
    lastUpdated: "上次更新",
    repo: "sisiyuyuzaiyiqi/cycas_blog",
    repoLabel: "查看源码",
    sidebar: "auto",
    nav: [
      { text: "主页", link: "/" },
      { text: "coding心得", link: "/coding/" },
      { text: "文摘", link: "/digest/" }
    ]
  }
};
