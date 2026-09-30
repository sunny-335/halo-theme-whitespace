# Whitespace 留白

一个移植自 Typecho 主题 [whitespace 留白](https://kehua.me) 的 [Halo](https://www.halo.run/) 主题，主打极简留白风格与清晰的排版。

> 主题名 `whitespace`，显示名 **Whitespace 留白**，版本 `0.1.0`，作者 **暖心向阳335**。
> 要求 Halo ≥ 2.26.0。源码在 `src/`，构建产物在 `templates/`。
> 源码仓库：https://git.nxxy335.top/nxxy335/halo-theme-whitespace

## 特性

- 极简留白风格，自带浅色 / 深色双主题（跟随系统或手动切换，记忆访客选择）
- 首页可选展示最新一篇置顶文章（`featured` 设置）
- 文章 / 页面 / 归档 / 分类 / 标签 / 作者 / 关于 等完整页面
- 文章页结构化数据（Schema.org `BlogPosting` JSON-LD）与社交分享标签（canonical / Open Graph / Twitter Card），均可在主题设置中关闭
- 内置搜索按钮（依赖官方 `PluginSearchWidget` 插件，未安装则不显示）
- 阅读进度条、代码块复制、相对时间、回到顶部、移动端菜单等交互
- **二级导航**：菜单项的子项自动渲染为下拉菜单（桌面端 hover/focus 展开，移动端嵌套缩进展开）
- **页脚可关闭的主题署名**：默认「Theme by WhiteSpace」并链接到主题仓库，可在设置中修改名称 / 链接或整体关闭
- **页脚全站数据统计**：文章 / 分类 / 标签 / 评论 / 访问量 / 字数，可按项开关，整体可关闭
- **文章卡片字数 + 阅读时长**：可在设置中关闭（需 `halo-plugin-extra-api` 提供数据）
- **全站 lightgallery.js 灯箱**：文章、页面、瞬间、图库等页面的图片点击放大预览（按需懒加载，可在设置中整体关闭）
- 多语言：`i18n/default.properties`（回退）+ `i18n/zh_CN.properties`
- 提供 `layout.html` 布局契约，供使用布局契约的插件页面复用主题导航 / 页脚 / 暗色样式

## 插件适配

主题已为以下插件提供适配页面（在 `src/` 下以同名模板提供，构建后进入 `templates/`）：

- **plugin-moments**：`/moments` 瞬间列表页 + `/moments/{name}` 瞬间详情页（完整内容、媒体、标签、作者信息与评论区）；列表页发布人与发布时间同行对齐
- **plugin-photos**：`/photos` 图库页 —— 首屏按相册分组展示（封面默认自动取相册内第一张图，可在主题设置「图库」中为每个相册手动配置封面）；点击相册进入 `?group=photo-group-*` 瀑布流视图（一行三张、页面加宽），支持**预览模式**（lightgallery 点击放大，默认值可在设置中配置，访客可在前台自行切换）
- **plugin-important-dates**：`/important-dates` 重要日子页（即将到来提醒、全部日期倒计时、重要标记、人员生日）
- **plugin-links**：`/links` 友链页 —— 「全部」视图按分组展示并显示分组标题，卡片简介最多两行、卡片高度统一；友链申请表单已**直接内嵌**在友链页底部（点击「申请友链」展开，调用插件公共 REST API，含图形验证码）；并额外提供
  - `links-subscribe.html`：RSS 订阅动态聚合页（使用 `linkFeedFinder`）；每条仅显示作者与发布时间，作者名链接到来源博客，摘要默认折叠为 5 行
- **halo-weread-plugin**：`weread.html` 微信读书书架页（前端拉取插件 `/shelf-html` 并注入）
- **plugin-douban**：`douban.html` 豆瓣收藏页（按「读过 / 在读 / 看过 / 在追」分栏展示书影音，使用 `doubanFinder.getMovies(...)`；未安装插件时显示提示）。在控制台新建单页并选择「豆瓣页面」模板即可启用
- **留言板**：`page_guestbook.html` 以评论区作为留言板的单页模板
- **plugin-extra-api**：API 扩展包（无独立页面），主题已适配其 shiki 代码高亮与暗色样式；并在文章卡片 / 详情页展示**字数 + 阅读时长**、归档页展示**全站总字数**、瞬间页展示**单条字数**（通过 `extraApiStatsFinder`，插件未安装时自动隐藏）

> `weread` / `留言板` / `链接订阅` 均为「自定义页面模板」，在控制台新建单页并选择对应模板即可启用。`/links` 友链页与内嵌的友链申请无需单独建单页。

## 目录结构

```
src/                      源码目录（在此编辑）
├── partials/
│   ├── layout.html       公共布局（导航 / 页脚 / 主题切换 / 脚本入口）
│   └── seo.html          SEO 片段（canonical / OG / Twitter，受开关控制）
├── modules/
│   ├── post-card.html    文章列表卡片
│   ├── post-meta.html    文章元信息（时间 / 分类 / 浏览量）
│   └── pagination.html   分页导航
├── error/                错误页（404 / 通用错误）
│   ├── 404.html
│   └── error.html
├── css/main.css          全部样式（含双主题变量、响应式、打印）
├── js/main.ts            全站脚本
├── js/post.ts            文章页脚本（代码复制 / 阅读进度）
├── index.html  post.html  page.html  page_about.html
├── archives.html  category.html  tag.html  categories.html  tags.html  author.html
├── weread.html  douban.html  links-subscribe.html  page_guestbook.html
└── i18n/                 多语言消息
theme.yaml                主题元数据（必填）
settings.yaml             控制台主题设置表单
templates/                构建产物（Halo 实际读取，勿手动编辑）
```

> `src/` 与 `templates/` 的关系：`src/` 经 Vite 构建生成 `templates/`。开发或发版前务必执行构建，使 `templates/` 与源码一致。**不要**手动修改 `templates/`。

## 开发与构建

```bash
pnpm install        # 安装依赖
pnpm dev            # 监听模式构建（开发时用）
pnpm build-only     # 仅构建（tsc + vp build），生成 templates/
pnpm build          # 构建并打包为可上传的 ZIP（theme-package-cli）
pnpm check          # 格式化 + Lint 修复
```

构建输出：

- 页面与片段 → `templates/*.html`、`templates/modules/*.html`、`templates/error/*.html`
- 静态资源 → `templates/assets/*`（文件名带内容哈希，运行时以 `/themes/whitespace/assets/...` 提供）

## 主题设置

在 Halo 控制台「主题 → 设置」中可配置：

| 分组    | 字段               | 说明                                         |
| ------- | ------------------ | -------------------------------------------- |
| basic   | color_scheme       | 默认配色：跟随系统 / 浅色 / 深色             |
| basic   | footer_copyright   | 页脚自定义版权（支持 HTML，留空不显示）     |
| basic   | show_theme_credit  | 页脚是否显示「Theme by」署名（默认开）       |
| basic   | theme_credit_text  | 署名名称（默认「WhiteSpace」，可改）         |
| basic   | theme_credit_url   | 署名跳转链接（默认主题仓库地址）             |
| basic   | show_word_count    | 文章卡片是否显示字数与阅读时长（需 extra-api）|
| basic   | enable_lightbox    | 全站 lightgallery 图片灯箱（默认开）         |
| featured| enable             | 首页是否展示置顶文章                         |
| about   | avatar / bio / github_url / twitter_url / contact_email | 关于页（自定义模板 `page_about.html`）内容 |
| seo     | enable_metadata    | 输出 canonical / Open Graph / Twitter Card  |
| seo     | enable_structured_data | 输出文章页 BlogPosting JSON-LD            |
| footer  | icp_number / icp_url | ICP 备案号与查询链接（默认工信部备案管理系统） |
| footer  | police_number / police_url | 公网安备号与查询链接（默认全国互联网安全管理服务平台） |
| stats   | enable             | 页脚是否显示全站数据统计（默认关）            |
| stats   | show_posts / show_categories / show_tags / show_comments / show_visits | 各项统计的显隐开关 |
| stats   | show_words         | 全站总字数（需 extra-api 插件，默认开）       |
| photos  | preview_default    | 相册瀑布流是否默认开启预览模式（默认开）      |
| photos  | album_covers       | 各相册手动封面（「相册名称 + 封面图」列表，留空自动取第一张） |

## 约定与说明

- Logo / favicon / SEO description·keywords / 代码注入优先使用 Halo 系统设置；主题仅输出 canonical、OG、Twitter 与结构化数据（可在 `seo` 分组关闭，避免与插件重复）。
- 社交分享 / 结构化数据中用 `status.permalink` 与 `site.routes.*` 拼出地址，不写死可配置路由。
- 搜索由官方 `PluginSearchWidget` 插件提供，按钮仅在插件可用时出现。
- 浏览量来自 Halo 原生统计（`post.stats.visit`），无需主题自行计数。
- 字数 / 阅读时长来自 `halo-plugin-extra-api` 的 `extraApiStatsFinder`（插件未安装时相关展示自动隐藏），全站字数为缓存计算结果。

## 致谢

- 原主题：[whitespace 留白](https://kehua.me) by kehua
- 基于 Halo 官方 [theme-vite-starter](https://github.com/halo-dev/theme-vite-starter) 脚手架移植
