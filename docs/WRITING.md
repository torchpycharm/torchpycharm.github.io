# 写作与维护指南

这份文档按网站现在的实际行为写，照着做就行。

| 想做什么 | 改哪里 |
| --- | --- |
| 写博客 | `src/content/blog/` 下新建 `.md` |
| 加项目 | `src/content/projects/` 下新建中英文两个 `.md`，图片和视频放 `public/projects/<slug>/` |
| 改首页、关于、简历、联系方式的文字 | `src/config/site.ts`（中文、英文各一份） |
| 换头像 | 替换 `public/avatar.png` |
| 放简历 PDF | 放到 `public/resume/FangyuZhang-CV.pdf` |
| 发布 | 推送到 `main` 分支 |

## 1. 本地预览

需要 Node.js ≥ 22.12。

```sh
npm install        # 第一次，或 package.json 变了之后
npm run dev        # 开发预览，http://localhost:4321，改完自动刷新
npm run build      # 构建到 dist/，和线上的构建一样
npm run preview    # 预览 dist/ 里的构建结果
```

两点要知道：

- `npm run dev` 启动后**新增**的文章和图片，双链和 `![[图片]]` 可能找不到。停掉再启动一次就好。
- 删了或改名了文章、项目之后，本地如果还显示旧内容，删掉缓存再构建：

  ```sh
  rm -rf .astro node_modules/.astro dist
  ```

  线上每次都是全新构建，不受这个影响。

## 2. 写一篇博客

### 2.1 新建文章

复制 `src/content/blog/_template.md`，改个文件名，把 `draft: true` 改成 `false`。

文件路径就是网址，可以用多级目录按主题归类：

```text
src/content/blog/zephyr-workqueue.md        →  /blog/zephyr-workqueue/
src/content/blog/rtos/zephyr-workqueue.md   →  /blog/rtos/zephyr-workqueue/
```

文件名里的大写会变小写，空格会变成 `-`。建议直接用小写英文加连字符。

博客不分语言：同一篇文章同时出现在 `/blog/...` 和 `/en/blog/...`。

### 2.2 Frontmatter

```md
---
title: "Zephyr 工作队列踩坑记录"
description: "在中断里提交工作项时遇到的两个问题。"
pubDate: 2026-10-20
tags: ["Zephyr", "RTOS"]
draft: false
---
```

| 字段 | 必填 | 作用 |
| --- | --- | --- |
| `title` | 建议填 | 标题。不填会用文件名代替 |
| `description` | 建议填 | 摘要，显示在列表里，也用于搜索和页面的 meta 描述 |
| `pubDate` | 建议填 | 发布日期，写成 `2026-10-20`。列表按它从新到旧排序 |
| `tags` | 否 | 标签数组。博客页可以按标签筛选 |
| `cover` | 否 | 封面图的网址，显示在列表和文章顶部。见 2.5 |
| `updatedDate` | 否 | 更新日期。目前只做记录，页面上不显示 |
| `draft` | 否 | `true` 时不生成页面、不进列表和图谱。默认 `false` |

草稿虽然不发布，构建时还是会被解析，所以草稿里的语法错误同样会报出来。

### 2.3 双链

```md
[[zephyr-workqueue]]
[[zephyr-workqueue|工作队列那篇]]
[[rtos/zephyr-workqueue]]
[[zephyr-workqueue#提交时机]]
```

- 按文件名找文章，不用写目录和 `.md`。不同目录下有同名文件时，才需要写完整路径。
- `|` 后面是显示的文字，`#` 后面是文章里的小标题。
- 被别的文章用双链引用后，文章底部会出现「反向链接」；「图谱」页会把文章画成节点、双链画成连线。
- 指向不存在的文章不会报错，但会是一个打不开的链接。发布前可以用第 5 节的检查脚本扫一遍。

### 2.4 数学公式

```md
行内公式 $e^{i\pi} + 1 = 0$。

$$
\hat{x}_k = \hat{x}_{k-1} + K_k (z_k - H \hat{x}_{k-1})
$$
```

### 2.5 图片

图片和文章放在同一个目录最省事：

```text
src/content/blog/rtos/zephyr-workqueue.md
src/content/blog/rtos/timing.png
```

| 写法 | 说明 |
| --- | --- |
| `![[timing.png]]` | 按文件名找图，不用写路径。原图直接发布 |
| `![时序图](./timing.png)` | 标准写法，构建时自动压缩成 WebP。文件不存在会构建失败 |
| `![时序图](/images/timing.png)` | 图片放在 `public/images/` 时用这种绝对路径 |

`![[...]]` 支持 avif、gif、jpg、jpeg、png、svg、webp。PDF 用 `[[slides.pdf|讲义]]`，会生成一个指向该文件的链接。

封面图是一个网址，不是相对路径。和文章放一起的图这样写：

```yaml
cover: "/blog-assets/rtos/cover.jpg"   # 对应 src/content/blog/rtos/cover.jpg
```

### 2.6 视频

**B站和 YouTube：** 把视频页面的链接单独放一段，上下各空一行，会自动变成播放器，默认不自动播放。

```md
上面是正文。

https://www.bilibili.com/video/BV1xx411c7mD

下面是正文。
```

能识别的链接：

- `https://www.bilibili.com/video/BV...`，可以带 `?p=2` 指定分 P
- `https://www.youtube.com/watch?v=...`，可以带 `&t=90` 指定起始秒数
- `https://youtu.be/...`，以及 YouTube 的 `/shorts/`、`/live/` 链接

下面这些情况仍然是普通链接，不会变成播放器：

- 带文字的链接，例如 `[看演示](https://www.bilibili.com/video/BV...)`
- 写在一句话中间的链接，或者写在列表项里的链接
- `b23.tv` 短链接。请换成完整的视频页面地址

**本地视频：** 把 `.mp4` 或 `.webm` 和文章放在同一个目录，两种写法都可以：

```md
![[demo.mp4]]
![板上运行演示](./demo.mp4)
```

方括号里的文字会显示成视频下方的说明。视频放在 `public/` 里时用绝对路径：`![演示](/videos/demo.mp4)`。

**压缩视频：** 本地视频建议压到 25 MB 以内。GitHub 会拒绝超过 100 MB 的单个文件，而且视频进了 Git 历史就删不掉，仓库会越来越大。更长的视频建议传到 B站或 YouTube 再嵌入。

```sh
brew install ffmpeg   # 没装过的话

ffmpeg -i input.mov -vf scale=-2:1080 -c:v libx264 -crf 28 -preset slow \
  -pix_fmt yuv420p -c:a aac -b:a 128k -movflags +faststart output.mp4
```

- `-crf 28`：数字越大文件越小、画质越低。还是太大就试 30，或者把 `1080` 改成 `720`。
- `-pix_fmt yuv420p`：保证 Safari 和手机能播，手机录的 HDR 视频尤其需要。
- `-movflags +faststart`：让视频不用下载完就能开始播放。

给视频截一张封面（项目的 `poster` 用得上）：

```sh
ffmpeg -ss 1 -i demo.mp4 -frames:v 1 demo-poster.jpg
```

### 2.7 提示框

```md
> [!note] 标题
> 内容。类型可以是 note、tip、warning、danger。
```

## 3. 加一个项目

### 3.1 两个文件

每个项目写中英文两个文件，文件名只差一个 `-en` 后缀：

```text
src/content/projects/ecg-integrity.md      lang: "zh"  →  /projects/ecg-integrity/
src/content/projects/ecg-integrity-en.md   lang: "en"  →  /en/projects/ecg-integrity/
```

- `lang` 决定它出现在中文站还是英文站，`-en` 后缀让两个页面共用同一个网址名，右上角的语言切换才能对上。
- 只写了中文版的话，英文站看不到这个项目，在项目页切换语言会 404。所以两个都要写。
- 项目自己的名字不要以 `-en` 结尾。

可以直接复制 `ecg-integrity.md` 和 `ecg-integrity-en.md` 来改。

### 3.2 Frontmatter

```yaml
---
lang: "zh"
title: "项目标题"
description: "一两句话说清楚做了什么、结果如何。"
date: 2025-10-01
endDate: 2026-04-01
role: "本科毕业设计"
tags: ["nRF5340", "Zephyr"]
stack: ["nRF5340", "Zephyr / nRF Connect SDK", "C / C++"]
metrics:
  - { label: "板上单次推理", value: "约 1 ms" }
  - { label: "整体功耗降低", value: "13.7%" }
repo: "https://github.com/yourname/project"
url: "https://example.com"
cover: "/projects/my-project/cover.jpg"
featured: true
videos:
  - { type: "bilibili", id: "BV1xx411c7mD", title: "板上运行演示" }
  - { type: "youtube", id: "xxxxxxxxxxx", title: "Demo" }
  - { type: "file", src: "/projects/my-project/demo.mp4", poster: "/projects/my-project/demo-poster.jpg", title: "上位机界面" }
gallery:
  - { src: "/projects/my-project/board.jpg", alt: "开发板和接线" }
---
```

| 字段 | 必填 | 作用 |
| --- | --- | --- |
| `lang` | 是 | `"zh"` 或 `"en"` |
| `title` | 是 | 项目标题 |
| `description` | 是 | 摘要，显示在卡片和详情页标题下方 |
| `date` | 是 | 开始日期。项目按它从新到旧排序 |
| `endDate` | 否 | 结束日期。填了显示成 `2025.10 – 2026.04`，不填只显示 `2025.10` |
| `role` | 是 | 项目性质或你的角色，例如「本科毕业设计」 |
| `tags` | 否 | 卡片和详情页上的标签，三四个为宜 |
| `stack` | 否 | 技术栈和硬件，显示在详情页的「技术栈」一行 |
| `metrics` | 否 | 关键指标卡片。`value` 是大字，`label` 是说明。两到四个最好看 |
| `repo` | 否 | 代码仓库地址，生成「查看代码」按钮 |
| `url` | 否 | 在线演示地址，生成「访问项目」按钮 |
| `cover` | 否 | 封面图。文件还没放的话，卡片自动按无封面显示 |
| `featured` | 否 | `true` 时出现在首页的「精选项目」 |
| `videos` | 否 | 显示在正文上方的视频，三种类型见上面的例子 |
| `gallery` | 否 | 显示在正文下方的图集，`alt` 会作为图片说明 |

### 3.3 图片和视频放哪里

项目的封面、图集、视频、示意图都放在 `public/projects/<slug>/`，用以 `/` 开头的绝对路径引用：

```text
public/projects/ecg-integrity/cover.jpg        →  /projects/ecg-integrity/cover.jpg
public/projects/ecg-integrity/demo.mp4         →  /projects/ecg-integrity/demo.mp4
```

- 封面建议 16:9，例如 1280×720。
- 图集里的图片按 4:3 裁切显示，点击打开原图。
- 视频的体积建议同 2.6 节。

### 3.4 正文

正文是普通 Markdown，公式、提示框、单独一行的 B站或 YouTube 链接都能用。两点和博客不同：

- 图片和视频用绝对路径：`![说明](/projects/my-project/board.jpg)`、`![演示](/projects/my-project/demo.mp4)`。
- 不要写 `![演示](./demo.mp4)` 这种相对路径的视频，构建会失败并提示改成绝对路径。

详情页从上到下依次是：标题和摘要 → 指标卡片 → 技术栈 → 仓库和链接按钮 → 视频 → 正文 → 图集。

### 3.5 给手机单独准备一张图（可选）

很宽的示意图在手机上会缩得看不清。可以另画一张竖版，用 `<picture>` 让手机自动换图。ECG 项目的流水线图就是这么做的：

```html
<picture>
  <source media="(max-width: 520px)" srcset="/projects/my-project/diagram-narrow.svg" />
  <img src="/projects/my-project/diagram.svg" alt="图片说明" loading="lazy" decoding="async" />
</picture>
```

这段 HTML 要单独成段，上下各空一行。

## 4. 改站点内容

首页、关于、简历、联系页的文字都在 `src/config/site.ts`。文件里 `siteConfigs.zh` 是中文、`siteConfigs.en` 是英文，结构完全一样，**改内容时两处都要改**。邮箱、头像路径、社交链接在最上面的 `shared` 里，两种语言共用。

### 4.1 简历

`resume` 这一段的结构：

| 字段 | 显示位置 |
| --- | --- |
| `summary` | 左侧 Profile 卡片里的简介 |
| `details` | 简介下面的几行：硕士、本科、英语、所在地、方向。教育经历写在这里，不单独成段 |
| `links` | 左侧 Links 卡片 |
| `files` | 「下载简历 PDF」按钮 |
| `highlights` | 左侧 Highlights 卡片，放荣誉和职务 |
| `sections` | 右侧的经历、项目，每一段有若干 `items` |

`sections` 里的每个条目都要写全这七个字段，没有内容就留空字符串或空数组：

```ts
{
	period: "2025.01 – 2025.08",
	title: "嵌入式软件开发工程师",
	org: "华西医院–商汤科技联合实验室",
	description: "一句话概括，可以留空。",
	bullets: ["要点一", "要点二"],
	points: ["PID 控制", "CAN"],
	link: [
		{ name: "项目详情", href: "/projects/ecg-integrity" },
		{ name: "代码仓库", href: "https://github.com/yourname/project" },
	],
},
```

`bullets` 是带圆点的要点列表，`points` 是小标签，`link` 是按钮。站内链接写 `/projects/...` 就行，英文站会自动加上 `/en`。

技能在文件上方的 `skillsZh` 和 `skillsEn` 里，关于页的技能云和简历页共用。

### 4.2 简历 PDF

把 PDF 命名为 `FangyuZhang-CV.pdf`，放到 `public/resume/`。文件存在后，中英文简历页会自动出现下载按钮；文件不存在时按钮不显示。

放上去的 PDF 所有人都能下载，**放之前确认里面没有手机号**等不想公开的信息。

### 4.3 头像和图标

- 头像：替换 `public/avatar.png`，用正方形图片，边长不小于 416 px。
- 浏览器标签页图标：`public/favicon.svg` 和 `public/favicon.ico`。

### 4.4 首页

- **精选项目：** 项目的 frontmatter 里写 `featured: true`。首页最多显示 3 个，按 `date` 从新到旧。想改数量，改 `pages.home.modules` 里 `projectGrid` 的 `limit`。
- **最新笔记：** 自动显示最新的 3 篇已发布文章。一篇都没有时这一块不显示。
- **状态卡：** 首页左上角那张卡片，对应 `status` 字段。`title` 是标题，`current`、`next`、`note` 是三行状态，想到什么就改什么。`timeZone` 决定最后一行显示哪个时区的当前时间，留空字符串就不显示这一行。

  ```ts
  status: {
  	title: "当前状态",
  	current: "正在：在 NUS 读计算机工程硕士",
  	next: "接下来：补上外骨骼、四旋翼和导盲小车的项目页",
  	note: "最近完成：可穿戴 ECG 端侧数据完整性检测",
  	timeLabel: "我的当前时间",
  	timeZone: "Asia/Singapore",
  	dateLocale: "zh-CN",
  },
  ```

- **标题换行：** 首页那句标语（`home.headline`）和各处的中文标题只会在标点、空格和 `\u200B` 处换行。`\u200B` 是一个看不见的「可以在这里换行」标记，放在词组之间，避免窄屏上一个词被拆成两行。想强制换行用 `\n`。

  ```ts
  headline: "在资源受限的\u200B硬件上，\u200B把算法\u200B真正跑起来。",
  ```

- **快捷入口：** `quickLinks`。**方向条：** `pages.home.modules` 里 `linkGrid` 的 `items`。

### 4.5 社交链接

`shared.socials` 里加一行即可，页脚、联系页和底部联系区块都会出现：

```ts
socials: [
	{ label: "GitHub", href: githubUrl, icon: "GH" },
	{ label: "Bilibili", href: "https://space.bilibili.com/你的ID", icon: "B" },
],
```

`icon` 可以是一两个字符，也可以是图片地址。

## 5. 发布

推送到 `main` 分支，GitHub Actions 会自动构建并发布，通常一两分钟后生效：

```sh
git add -A
git commit -m "Add post about Zephyr work queues"
git push
```

进度和报错在仓库的 **Actions** 页面看。构建失败时线上保持上一个版本。

推送前建议在本地检查一遍，这样有问题能在本地先发现：

```sh
npm run build
node scripts/check-links.mjs
```

`check-links.mjs` 会扫描 `dist/` 里所有页面的站内链接和图片、视频路径，列出指向不存在文件的那些。

## 6. 常见问题

| 现象 | 处理 |
| --- | --- |
| 删掉的文章或项目本地还在 | `rm -rf .astro node_modules/.astro dist` 后重新构建 |
| 刚加的图片、文章，双链或 `![[...]]` 找不到 | 重启 `npm run dev` |
| 构建报 `Relative video path ... only works for posts under src/content/blog` | 项目正文里的视频改用 `/projects/<slug>/demo.mp4` 这种绝对路径 |
| 构建报找不到图片 | `![说明](./x.png)` 指向的文件不存在或文件名大小写不一致 |
| 视频在 Safari 或手机上播不了 | 用 2.6 节的 ffmpeg 命令重新转码 |
| 英文博客页里的双链跳到了中文页面 | 目前双链统一指向 `/blog/...`，文章内容相同，只是导航变成中文 |
| 简历页没有下载按钮 | `public/resume/FangyuZhang-CV.pdf` 还没放 |
