import { getCollection, type CollectionEntry } from 'astro:content';

export type Post = CollectionEntry<'blog'>;

/**
 * 获取全部已发布文章，按发布时间倒序。
 * draft: true 的文章只在本地开发时可见，生产构建会自动排除。
 */
export async function getPosts(): Promise<Post[]> {
	const posts = await getCollection('blog', ({ data }) =>
		import.meta.env.PROD ? !data.draft : true,
	);
	return posts.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}

/** 汇总所有标签及其文章数，按文章数倒序 */
export function getTags(posts: Post[]): { tag: string; count: number }[] {
	const counts = new Map<string, number>();
	for (const post of posts) {
		for (const tag of post.data.tags ?? []) {
			counts.set(tag, (counts.get(tag) ?? 0) + 1);
		}
	}
	return [...counts.entries()]
		.map(([tag, count]) => ({ tag, count }))
		.sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag));
}

/** 计算中英文混排下的阅读时长（按每分钟 300 字估算） */
export function readingTime(body: string): number {
	if (!body) return 1;
	const cjk = (body.match(/[\u4e00-\u9fa5]/g) ?? []).length;
	const words = body.replace(/[\u4e00-\u9fa5]/g, ' ').split(/\s+/).filter(Boolean).length;
	return Math.max(1, Math.round(cjk / 300 + words / 200));
}
