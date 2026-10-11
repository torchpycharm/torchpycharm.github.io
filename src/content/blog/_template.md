---
title: "文章标题"
description: "一两句话的摘要，会显示在博客列表、搜索和分享预览里。"
pubDate: 2026-01-01
tags: ["标签一", "标签二"]
draft: true
# 可选字段，需要时去掉行首的 # ：
# updatedDate: 2026-01-02
# cover: "/blog-assets/文章所在目录/cover.jpg"
---

这是写作模板，`draft: true` 的文章不会出现在网站上。写新文章时复制这个文件、改文件名，把 `draft` 改成 `false`，再删掉用不到的部分。完整说明见 `docs/WRITING.md`。

下面的示例都放在代码块里，照着写到正文中即可。

## 双链

```md
[[另一篇文章的文件名]]
[[另一篇文章的文件名|显示成这段文字]]
[[目录/文件名#某个小标题]]
```

## 图片和附件

图片、PDF 和文章放在同一个目录里。

```md
![[figure.png]]
![图片说明](./figure.png)
[[slides.pdf|下载讲义]]
```

## 视频

B站或 YouTube：把视频页面的链接单独放一行，上下各空一行，会自动变成播放器。

```md
https://www.bilibili.com/video/BV1xx411c7mD

https://www.youtube.com/watch?v=xxxxxxxxxxx
```

本地视频：把 `.mp4` 或 `.webm` 和文章放在同一个目录里，两种写法都可以。

```md
![[demo.mp4]]
![视频说明](./demo.mp4)
```

## 数学公式

```md
行内公式 $e^{i\pi} + 1 = 0$。

$$
\hat{x}_k = \hat{x}_{k-1} + K_k (z_k - H \hat{x}_{k-1})
$$
```

## 提示框

```md
> [!note] 标题
> 内容。可用类型：note、tip、warning、danger。
```
