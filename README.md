# torchpycharm.github.io

张方宇（Fangyu Zhang）的个人网站：<https://torchpycharm.github.io>

放嵌入式软件、端侧机器学习、RTOS、机器人与电机控制方向的项目、笔记和简历。中文在 `/`，英文在 `/en/`。

## 本地运行

需要 Node.js ≥ 22.12。

```sh
npm install
npm run dev      # 开发预览：http://localhost:4321
npm run build    # 构建到 dist/
npm run preview  # 预览构建结果
```

## 内容在哪里

| 想改什么 | 位置 |
| --- | --- |
| 站点文案、导航、简历、联系方式 | `src/config/site.ts` |
| 博客文章 | `src/content/blog/` |
| 项目 | `src/content/projects/` |
| 头像、图标、项目图片和视频、简历 PDF | `public/` |

怎么写文章、加项目、放视频、改简历，见 [docs/WRITING.md](./docs/WRITING.md)。

## 部署

推送到 `main` 分支后，GitHub Actions（`.github/workflows/deploy.yml`）会自动构建并发布到 GitHub Pages。

## 致谢与许可

本站基于 [Atlas](https://github.com/luckykevvv/Atlas)（作者 luckykevvv）修改而来，沿用其 [GNU General Public License v3.0](./LICENSE) 许可。
