---
title: 'Markdown 写作速查：写一篇文章需要知道的一切'
description: 'frontmatter 字段说明、Markdown 常用语法，以及本站的草稿机制。'
pubDate: '2026-10-21'
heroImage: '../../assets/blog-placeholder-2.jpg'
tags: ['Markdown', '建站']
---

这篇文章介绍在本站写文章需要用到的一切知识。

## 文章头部（frontmatter）

每篇文章都是一个 `.md` 文件，放在 `src/content/blog/` 目录下。文件开头需要一段
YAML 元数据：

```yaml
---
title: '文章标题'
description: '一句话摘要，会显示在列表和搜索引擎里'
pubDate: '2026-10-21'
tags: ['标签1', '标签2']
heroImage: '../../assets/blog-placeholder-3.jpg' # 可选，头图
draft: true # 可选，草稿模式，正式发布前记得删掉
---
```

- 文件名就是文章的 URL（例如 `hello-world.md` → `/blog/hello-world/`），建议用英文
- `draft: true` 的草稿只在本地开发时可见，生产构建会自动排除，可以放心写一半
- `updatedDate` 可选，文章大改之后可以加上

## 常用语法

### 标题与强调

用 `#`、`##`、`###` 表示标题层级，`**加粗**`、`*斜体*`、`~~删除线~~`。

### 代码

行内代码用反引号包裹：`npm run dev`。

代码块用三个反引号：

```js
// 代码块可以指定语言，会自动高亮
export function greet(name) {
	return `你好，${name}！`;
}
```

### 引用与列表

> 引用文字会显示成这样，适合放金句或补充说明。

无序列表：

- 苹果
- 香蕉
- 橘子

有序列表：

1. 第一步
2. 第二步
3. 第三步

### 表格

| 平台 | 免费额度 | 需要备案 |
| ---- | -------- | -------- |
| Cloudflare Pages | 无限站点 | 否 |
| Vercel | 个人免费 | 否 |
| GitHub Pages | 公开仓库免费 | 否 |

### 图片与链接

```markdown
[链接文字](https://example.com)
![图片描述](../../assets/blog-placeholder-4.jpg)
```

图片放在 `src/assets/` 下，Astro 会自动压缩并转成现代格式。

## 发布流程

```bash
# 1. 本地预览
npm run dev

# 2. 确认无误后构建检查
npm run build

# 3. 提交推送，Cloudflare Pages 自动发布
git add . && git commit -m "新文章：xxx" && git push
```

就这么多，开始写吧！
