---
title: 如何使用CSS网格Grid制作简历
date: 2020-2-24 16:53
tags: [翻译, CSS, Web]
---

<CreateTime/>
<TagLinks />

原文链接：
[New Year, New Job? Let’s Make a Grid-Powered Resume!](https://css-tricks.com/new-year-new-job-lets-make-a-grid-powered-resume/)

许多流行的简历设计通过将各个部分布置为网格状来充分利用可用的页面空间。让我们使用 CSS Grid 来创建一个打印和在不同屏幕尺寸下都看起不错的布局。这样，我们可以在线或离线地使用，在新的一年里以备无患。

![An Image](../illustrations/css_grid_resume0.png)

首先，我们创建一个简历容器，以及简历的内容划分。

```html
<article class="resume">
  <section class="name"></section>
  <section class="photo"></section>
  <section class="about"></section>
  <section class="work"></section>
  <section class="education"></section>
  <section class="community"></section>
  <section class="skills"></section>
</article>
```

要想使用`Grid`（网格），我们需要将`display: grid`添加到简历的外层元素。接下来，我们讲解内容是如何放置到`grid`网格中去的。本例子中，我们指定两列四行。

我们使用`CSS Grid`中的`fr`单位来指定分配可用空间的比例。在这里我们给每行分配相等空间（每个`1fr`），给第一列分配第二列两倍的空间（`2fr`）。

```css
.resume {
  display: grid;
  grid-template-columns: 2fr 1fr;
  grid-template-rows: 1fr 1fr 1fr 1fr;
}
```

接着我们通过`grid-template-area`属性来描述各内容元素如何布局到`grid`网格中的。首先我们需要为每一个版块定义命名的`grid-area`。该属性可以定义任何名称，但在这里我们将其命名为和版块一样的名称，如下例所示：

```css
.name {
  grid-area: name;
}

.photo {
  grid-area: photo;
}
```

接下来到了有意思的地方了，它使得设计变更轻而易举。将网格区域按你希望的布局方式放置到`grid-template-area`属性中。例如，我们将`name`版块添加到`grid-template-area`的左上方，以使其位于简历的左上位置。我们的`work`版块内容很多，所以我们将其添加两次以使其延伸两个网格单元。

```css
.resume {
  grid-template-areas:
    "name photo"
    "work about"
    "work education"
    "community skills";
}
```

以下是目前我们得到的样子：

<iframe name="cp_embed_1" src="https://codepen.io/alichur/embed/xxbKdKZ?height=367&amp;theme-id=1&amp;default-tab=result&amp;user=alichur&amp;slug-hash=xxbKdKZ&amp;pen-title=grid%20resume%20%20lines&amp;name=cp_embed_1" scrolling="no" frameborder="0" height="367" allowtransparency="true" allowfullscreen="true" allowpaymentrequest="true" title="grid resume  lines" style="width: 100%; overflow: hidden; display: block; height: 363px;" id="cp_embed_xxbKdKZ"></iframe>

::: tip
CSS 的网格规范提供了许多有用的属性来调整网格的大小和布局，也包括一些简写属性。本例子中我们为了确保简洁，只采用了一种方法。请务必查看一些优秀的[资源](https://gridbyexample.com/learn/)，来学习如何最好地将 CSS 网格在你的项目中运用 。
:::

## 调整布局

_TODO_
