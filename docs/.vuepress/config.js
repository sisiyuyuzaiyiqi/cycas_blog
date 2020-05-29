module.exports = {
  title: '铁树的博客',
  head: [
    // ...
    [
      'link',
      {
        rel: 'stylesheet',
        href:
          'https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.7.1/katex.min.css',
      },
    ],
    [
      'link',
      {
        rel: 'stylesheet',
        href:
          'https://cdnjs.cloudflare.com/ajax/libs/github-markdown-css/2.10.0/github-markdown.min.css',
      },
    ],
  ],
  description: '这是铁树的新博客，使用VuePress搭建。前端技术博客。',
  // base: "/cycas_blog/",
  locales: {
    '/': {
      lang: 'zh-CN',
    },
  },
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    ['link', { rel: 'manifest', href: '/manifest.json' }],
  ],
  plugins: [
    [
      '@vuepress/pwa',
      {
        serviceWorker: true,
        //指向自定义组件
        popupComponent: 'MySWUpdatePopup',
        updatePopup: {
          message: '发现新的内容',
          buttonText: '刷新～',
        },
      },
    ],
  ],
  themeConfig: {
    lastUpdated: '上次更新',
    repo: 'sisiyuyuzaiyiqi/cycas_blog',
    repoLabel: '查看源码',
    docsDir: 'docs',
    sidebar: 'auto',
    nav: [
      { text: '主页', link: '/' },
      { text: '笔记', link: '/coding/' },
      { text: '翻译', link: '/translation/' },
      { text: '文摘', link: '/digest/' },
      { text: '标签', link: '/tags' },
    ],
  },
  markdown: {
    config: (md) => {
      md.set({ html: true })
      md.use(require('markdown-it-katex'))
    },
  },
}
