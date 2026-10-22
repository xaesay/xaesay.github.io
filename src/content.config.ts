import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
	// 读取 `src/content/blog/` 下的所有 Markdown / MDX 文章
	loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
	// frontmatter 类型校验
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string(),
			// 字符串自动转为 Date 对象
			pubDate: z.coerce.date(),
			updatedDate: z.coerce.date().optional(),
			heroImage: z.optional(image()),
			// 标签，用于 /tags 归档
			tags: z.array(z.string()).default([]),
			// 草稿：生产构建时不会发布
			draft: z.boolean().default(false),
		}),
});

export const collections = { blog };
