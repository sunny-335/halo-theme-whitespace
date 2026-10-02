# Whitespace 留白

一个移植自 Typecho 主题 [whitespace 留白](https://kehua.me) 的 [Halo](https://www.halo.run/) 主题，主打极简留白风格与清晰的排版，并为多款常用插件提供开箱即用的适配页面。

> 本项目由 AI 开发完成，人工仅进行部分功能测试及问题找寻。

## 环境要求

- Halo **2.26.0 及以上**
- 构建依赖 Node.js + pnpm（`src/` 经 Vite 构建生成 `templates/`，Halo 实际只读 `templates/`）

## 特点

1. **极简留白风格** — 浅色 / 深色双主题（跟随系统或手动切换，记忆访客选择），专注内容本身的清晰排版
2. **二级导航** — 菜单子项自动渲染为下拉菜单（桌面端 hover/focus 展开，移动端嵌套缩进）
3. **插件兼容性** — 适配 8 款常用 Halo 插件，安装即用；提供页面布局契约，插件前台页面自动复用主题外观
4. **全站灯箱** — 主题内置 lightgallery.js 灯箱，文章、页面、瞬间、图库等图片点击放大预览（按需懒加载，可在设置中整体关闭）
5. **可配置性** — 署名、全站统计、字数显示、相册封面、预览模式等均可在后台开关
6. **性能优化** — 服务端字数统计（API 扩展包）、图片懒加载、CSS/HTML 压缩、静态资源带内容哈希

## 已适配插件

| 插件名称                                                        | 插件标识                     | 适配页面路由             | 说明                                                   |
| ----------------------------------------------------------- | ------------------------ | ------------------ | ---------------------------------------------------- |
| [瞬间](https://github.com/halo-sigs/plugin-moments)           | `plugin-moments`         | `/moments`         | 瞬间动态列表页，含 `/moments/{name}` 详情页（完整内容、媒体、标签、作者信息、评论区） |
| [图库](https://github.com/halo-sigs/plugin-photos)            | `plugin-photos`          | `/photos`          | 图片展示页面，按相册分组、封面自动选取、瀑布流 + 预览模式                       |
| [重要日子](https://github.com/yyliucha/plugin-important-dates)  | `plugin-important-dates` | `/important-dates` | 即将到来提醒、全部日期倒计时、重要标记、人员生日                             |
| [友情链接](https://github.com/halo-sigs/plugin-links)           | `plugin-links`           | `/links`           | 友链展示页，按分组显示标题、卡片统一高度；内嵌申请表单                          |
| [链接订阅](https://github.com/halo-sigs/plugin-links)           | `plugin-links`           | `/subscriptions`   | RSS 订阅动态聚合，作者链接来源博客、摘要折叠 5 行                         |
| [豆瓣](https://github.com/chengzhongxue/plugin-douban)        | `plugin-douban`          | `/douban`          | 豆瓣记录页，按「读过 / 在读 / 看过 / 在追」分栏展示书影音                    |
| [微信读书](https://github.com/yeora26/halo-weread-plugin)       | `halo-weread-plugin`     | 自定义页面              | 微信读书书架展示，访客免登录查看                                     |
| [API 扩展包](https://github.com/HowieHz/halo-plugin-extra-api) | `extra-api`              | 全站                 | 服务端字数统计、代码高亮、全站/单条字数展示                               |

> **注意**：插件需单独安装，安装后主题自动适配对应页面。若未安装某插件，对应页面或功能自动隐藏 / 降级，不会报错。  
> 豆瓣插件建议 **v1.2.6+**（SQLite 数据结构）。

## 自定义页面模板

在 Halo 后台「页面 → 新建 → 自定义模板」中选择使用：

| 模板名  | 模板文件                  | 说明                |
| ---- | --------------------- | ----------------- |
| 留言板  | `page_guestbook.html` | 以评论区作为留言板的单页      |
| 微信读书 | `weread.html`         | 微信读书书架展示，依赖微信读书插件 |
| 豆瓣页面 | `douban.html`         | 豆瓣记录页，依赖豆瓣插件      |

## 主要功能

### 首页

- 可选展示最新一篇置顶文章（`featured` 设置）
- 文章卡片：可配置显示字数 + 阅读时长（依赖 API 扩展包）、分类、标签、摘要
- 文章卡片分类之间带间距，避免拥挤

### 文章

- 结构化数据（Schema.org `BlogPosting` JSON-LD）与社交分享标签（canonical / Open Graph / Twitter Card），均可在设置中关闭
- 阅读进度条、代码块复制、相对时间、回到顶部
- 正文排版：列表（ul/ol/li）、嵌套列表、表格、分隔线、列表标记配色
- 图片点击放大（内置 lightgallery 灯箱）

### 全局

- 二级导航：菜单子项渲染为下拉菜单，hover 桥接避免鼠标下移时收起
- 页脚可关闭署名：默认「Theme by WhiteSpace」并链接到主题仓库，名称 / 链接可改
- 页脚全站统计：文章、分类、标签、评论、访问量、字数，支持开关与统计项选择
- 备案信息：ICP 与公网安备号，公网安备自动带徽标
- 暗色模式评论区可见性已适配

### 图库

- 首屏按相册网格展示，封面 4:3 自适应填满，默认自动取相册内第一张图（分组无图时回退取首图）
- 后台可为每个相册手动指定封面：「相册」直接从图库插件**已存在的分组中下拉选择**，无需手输名称
- 点击相册进入 `?group=photo-group-*` 瀑布流视图（一行三张、页面加宽）
- 相册切换由前端按 URL 上的 `group` 参数完成，不依赖服务端变量，因此**不受页面静态缓存影响**
- 预览模式：默认值可在设置中配置（默认开），访客可在前台自行切换（开 → 点击图片灯箱放大；关 → 点击进入图片详情）

### 瞬间

- 列表页发布人与发布时间同行对齐，每条展示标签
- 详情页：完整内容、图片 / 视频 / 音频、标签、作者信息、发布时间与评论区

### 灯箱集成

主题内置 lightgallery.js 灯箱，为图片提供放大预览。覆盖文章、自定义页面、瞬间（正文 + 媒体）、图库瀑布流；设置「基础 → 全站图片灯箱」可整体关闭。

## 安装

1. 下载主题最新 Release 的 ZIP 包
2. 进入 Halo 后台 → 主题管理 → 安装主题 → 上传 ZIP 包
3. 安装完成后点击「启用」

> **升级后如果整站没了样式或部分页面不生效**：Halo 页面缓存或前置反向代理可能还留着上一版本的 HTML，它引用的 CSS 文件名带内容哈希，升级后已被删除，请求会直接 500 或样式错乱。先在 Halo 后台执行一次「**清理缓存**」（并刷新 CDN / Nginx 缓存）；若安装了「页面静态缓存」插件，还需手动点一次「刷新页面缓存」。

或从源码构建：

```bash
git clone https://git.nxxy335.top/nxxy335/halo-theme-whitespace.git
cd halo-theme-whitespace
pnpm install
pnpm build
```

构建产物在 `templates/` 目录下，同时会生成 `dist/` 内的安装包 `whitespace-<version>.zip`。

## 开发

```bash
# 安装依赖
pnpm install

# 开发模式（监听文件变化，自动构建到 templates/）
pnpm dev

# 构建（输出到 templates/，并打包 dist/whitespace-<version>.zip）
pnpm build

# 格式化 + Lint 修复
pnpm check
```

## 目录结构

```text
├── src/
│   ├── partials/        # 公共布局（layout.html 布局契约、seo.html 片段）
│   ├── modules/         # 文章卡片 / 元信息 / 分页等可复用片段
│   ├── error/           # 404 与通用错误页
│   ├── css/main.css     # 全部样式（双主题变量、响应式、正文排版）
│   ├── js/              # main.ts 全站脚本 / post.ts 文章脚本 / lightbox.ts 灯箱
│   ├── index.html post.html page.html
│   ├── archives.html category.html tag.html categories.html tags.html author.html
│   ├── moments.html moment.html photos.html important-dates.html
│   ├── weread.html douban.html links.html links-subscribe.html page_guestbook.html
│   └── i18n/            # 多语言消息
├── templates/           # 构建产物，Halo 实际加载的模板（勿手动编辑）
├── dist/                # 打包安装包 whitespace-<version>.zip
├── settings.yaml        # 后台设置项定义
└── theme.yaml           # 主题清单与自定义页面模板注册
```

## 主题开发注意事项

- **Thymeleaf 字符串字面量必须加单引号**：`th:text="'文本'"`，裸中文遇到逗号 / 空格 / emoji 会导致页面 500
- **`th:attr` 只用简单表达式**（取属性、Elvis 默认值、三元、拼接、等值比较），表达式对象方法调用会被受限求值器拒绝
- **凡是后台开关绑定的模板表达式都要给默认值**：`?: '默认值'`，配置未落库时属性会被整体移除，功能会静默失效
- **内联脚本统一加 `th:inline="none"`**：避免 Thymeleaf 解析脚本中的 `[[` / `[(` / `${}`
- **BEM 双下划线 `__` 不要跨引号边界**：出现在 `th:*` 表达式里会被当作预处理分隔符导致 500
- **禁止静态类调用**：`java.math.BigInteger.valueOf(...)` 等被 Halo 受限 SpEL 禁止，整数运算改用 `longValue()` / 整数除法
- **`SinglePage` 描述在 `status.excerpt`**，不是 `spec.description`
- **升级主题务必清理 Halo 页面缓存**，否则旧 HTML 引用已删除的哈希资源会 500

## 技术栈

- [Halo](https://halo.run) 2.26+
- [Vite](https://vitejs.dev/) + [@halo-dev/vite-plugin-halo-theme](https://github.com/halo-sigs/vite-plugin-halo-theme)
- [Thymeleaf](https://www.thymeleaf.org) 模板引擎
- [lightgallery.js](https://www.lightgalleryjs.com/) 灯箱
- TypeScript

## 许可

[GPL-3.0](https://www.gnu.org/licenses/gpl-3.0.en.html)

## 致谢

- 原主题：[whitespace 留白](https://github.com/kehuame/whitespace) by kehua
