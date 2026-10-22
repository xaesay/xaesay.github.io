# 下午俩点半的海德公园（Hyde' Park）

- **域名**：<https://hyde.live>
- **框架**：[Astro 5](https://astro.build/) —— 构建纯静态 HTML，速度极快
- **托管**：[Cloudflare Pages](https://pages.cloudflare.com/) —— 免费、全球 CDN、自动 HTTPS
- **费用**：¥0（Cloudflare Pages 免费额度：每月 500 次构建、静态流量不限量）

- **框架**：[Astro 5](https://astro.build/) —— 构建纯静态 HTML，速度极快
- **托管**：[Cloudflare Pages](https://pages.cloudflare.com/) —— 免费、全球 CDN、自动 HTTPS
- **费用**：¥0（Cloudflare Pages 免费额度：每月 500 次构建、静态流量不限量）

## 目录结构

```
src/
├── consts.ts            # ★ 站点配置（标题、简介、社交链接），先改这里
│                        #   SITE_TITLE = 下午俩点半的海德公园 / SITE_SHORT = Hyde' Park
├── content.config.ts    # 文章 frontmatter 字段定义
├── content/blog/        # ★ 文章目录，一个 .md 文件就是一篇文章
├── pages/               # 页面路由（首页 / 文章 / 标签 / 关于 / 404 / RSS）
├── components/          # 页头、页脚、文章卡片等组件
├── layouts/             # 文章详情页布局
├── styles/global.css    # 全局样式（含深色模式）
└── assets/              # 图片素材
public/                  # 原样复制的文件（robots.txt、_headers 等）
astro.config.mjs         # Astro 配置（★ site 字段改成你的域名）
```

## 本地开发

```bash
npm install       # 首次
npm run dev       # 本地预览 http://localhost:4321
npm run build     # 构建到 dist/ 目录
```

## 怎么写文章

在 `src/content/blog/` 新建一个 Markdown 文件（文件名即文章 URL，建议英文）：

```markdown
---
title: '文章标题'
description: '一句话摘要'
pubDate: '2026-10-22'
tags: ['随笔']
heroImage: '../../assets/blog-placeholder-1.jpg'  # 可选
draft: true   # 草稿模式：本地可见，发布时自动排除（正式发布删掉这行）
---

正文支持标题、列表、表格、代码块、引用、图片等一切 Markdown 语法。
```

## 部署到 Cloudflare Pages（约 10 分钟）

### 第 1 步：推送到 GitHub

#### 1-A. 先在 GitHub 网页上创建仓库

1. 登录 <https://github.com/new>
2. 仓库名随便起，例如 `hyde-park-blog`
3. 公开（Public）或私有（Private）都可以
4. ⚠️ **不要勾选**任何初始化选项（README / .gitignore / License 全都别勾）—— 因为本地已经有内容了，勾了会导致两边历史不一致，推送会失败
5. 点「Create repository」

创建完成后，页面上会显示一个 `https://github.com/xxx/yyy.git` 的地址，**复制它**，下一步要用。

#### 1-B. 在本地终端执行命令

在 `my-blog` 文件夹里打开终端（文件夹空白处右键 →「在终端中打开」或「Git Bash Here」），然后逐行执行：

**① 配置你的身份**（只需做一次，之后所有 Git 项目通用）

```bash
git config --global user.name "你的名字"
git config --global user.email "你的GitHub邮箱"
```

> 邮箱要和 GitHub 账号一致，否则贡献记录无法关联。

**② 提交**

```bash
git commit -m "init: my blog"
```

**③ 把分支名改成 main**

```bash
git branch -M main
```

> Git 默认可能创建 `master` 分支，这条命令统一改成 `main`，和 GitHub 默认保持一致。

**④ 关联远端仓库并推送**

把下面命令里的地址换成 1-A 复制的那个（注意保留结尾的 `.git`）：

```bash
git remote add origin https://github.com/<你的用户名>/<仓库名>.git
git push -u origin main
```

#### 1-C. 如果 push 时要求登录

你电脑上已安装 **Git Credential Manager（2.9.0）**，执行 `git push` 时会自动弹出浏览器窗口让你登录 GitHub 授权，正常点确认即可。

万一没弹窗、命令行提示输入用户名密码，注意：

- **用户名**：填 GitHub 用户名
- **密码**：**不能填登录密码**。需要去 GitHub → Settings → Developer settings →
  Personal access tokens → Tokens (classic) → Generate new token，勾选 `repo` 权限，
  生成后把那串 token 当密码粘贴进去。

> 提示：粘贴密码时终端不会显示任何字符（连 `***` 都没有），这是正常的，直接回车即可。

#### 1-D. 常见报错速查

| 报错 | 原因 | 解决 |
| ---- | ---- | ---- |
| `Please tell me who you are` | 没配身份 | 执行上面的 ① |
| `src refspec main does not match` | 分支名不对 | 执行 `git branch -M main` 后再 push |
| `remote origin already exists` | 已关联过 | 改用 `git remote set-url origin <地址>` |
| `Updates were rejected` | 远端有 README 等文件 | 先执行 `git pull origin main --allow-unrelated-histories` 再 push |
| `Authentication failed` | 用了登录密码当密码 | 改用 Personal Access Token（见 1-C） |

推送成功后刷新 GitHub 页面，能看到文件就说明成功了，接着去 Cloudflare Pages 连接这个仓库。

### 第 2 步：连接 Cloudflare Pages

1. 打开 <https://dash.cloudflare.com/> → **Workers 和 Pages** → **创建** → **Pages** → **连接到 Git**
2. 授权并选中刚才的仓库，配置：
   - 构建命令：`npm run build`
   - 构建输出目录：`dist`
3. 点击「保存并部署」，等待 1–2 分钟，会得到一个 `xxx.pages.dev` 的临时域名

之后每次 `git push`，Cloudflare 会自动重新构建发布，无需任何手动操作。

### 第 3 步：绑定你的域名

1. Cloudflare Pages 项目 → **自定义域** → **设置自定义域**，输入你的域名（如 `blog.yourdomain.com` 或裸域 `yourdomain.com`）
2. **如果域名的 DNS 就在 Cloudflare**：它会在你的账号下自动添加 CNAME 记录，无需任何操作
3. **如果域名 DNS 在别处**（阿里云、腾讯云等）：去 DNS 管理处添加一条 CNAME 记录：
   - 主机记录：`blog`（或 `@` 表示裸域，裸域需先删除可能冲突的 A 记录）
   - 记录类型：`CNAME`
   - 记录值：`<项目名>.pages.dev`
4. 等 DNS 生效（几分钟到几小时），Cloudflare 自动签发 HTTPS 证书

### 第 4 步：DNS 解析设置

域名 `hyde.live` 想要指向博客，在域名 DNS 管理处添加记录。两种方式二选一：

**方式 A：只用子域名（推荐，最简单）**

| 主机记录 | 类型 | 记录值 |
| -------- | ---- | ------ |
| `blog` | CNAME | `<项目名>.pages.dev` |

之后访问 `https://blog.hyde.live`。

**方式 B：用裸域 hyde.live**

Cloudflare Pages 支持裸域绑定：先确认 DNS 里没有指向别处的 `@` 记录（A / AAAA / CNAME，
有就删掉），然后添加：

| 主机记录 | 类型 | 记录值 |
| -------- | ---- | ------ |
| `@` | CNAME | `<项目名>.pages.dev` |

> 补充说明：如果以后想让 `hyde.live` 和 `www.hyde.live` 都能访问，再加一条
> `www` 的 CNAME 即可。若你的 DNS 服务商不支持裸域 CNAME（如部分国内服务商），
> 可以把域名 DNS 托管到 Cloudflare，或在 Cloudflare Pages 绑定后使用其提供的解析方案。

DNS 生效需要几分钟到几小时，生效后 Cloudflare 会自动签发 HTTPS 证书。

### 已完成的配置

站点信息与域名已经写入项目，无需再改：

- `astro.config.mjs` → `site: 'https://hyde.live'`（影响 sitemap / RSS 的绝对链接）
- `public/robots.txt` → `Sitemap: https://hyde.live/sitemap-index.xml`
- `src/consts.ts` → 站名、简介、邮箱

**还需要你补充**：`src/consts.ts` 里的 `SITE_AUTHOR`（你的署名）和 `GITHUB_URL`。

## 想要更快的国内访问？

Cloudflare Pages 对国内直连可用但速度一般。如果以后域名完成 ICP 备案，可以零成本迁移到
腾讯云 EdgeOne Pages（国内节点）：因为本站是纯静态 HTML，把 `dist/` 内容原样上传即可。
