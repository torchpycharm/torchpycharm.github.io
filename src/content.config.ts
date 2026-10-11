import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
	loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
	schema: z.object({
		title: z.string().default(''),
		description: z.string().default(''),
		pubDate: z.date().default(new Date('1970-01-01')),
		updatedDate: z.date().optional(),
		tags: z.array(z.string()).default([]),
		cover: z.string().optional(),
		draft: z.boolean().default(false),
	}),
});

const projectVideo = z.discriminatedUnion('type', [
	z.object({ type: z.literal('bilibili'), id: z.string(), title: z.string().optional() }),
	z.object({ type: z.literal('youtube'), id: z.string(), title: z.string().optional() }),
	z.object({ type: z.literal('file'), src: z.string(), poster: z.string().optional(), title: z.string().optional() }),
]);

const projects = defineCollection({
	loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
	schema: z.object({
		lang: z.enum(['zh', 'en']).default('zh'),
		title: z.string(),
		description: z.string(),
		date: z.date(),
		endDate: z.date().optional(),
		tags: z.array(z.string()).default([]),
		role: z.string(),
		url: z.string().url().optional(),
		repo: z.string().url().optional(),
		featured: z.boolean().default(false),
		cover: z.string().optional(),
		stack: z.array(z.string()).default([]),
		metrics: z.array(z.object({ label: z.string(), value: z.string() })).default([]),
		videos: z.array(projectVideo).default([]),
		gallery: z.array(z.object({ src: z.string(), alt: z.string() })).default([]),
	}),
});

export const collections = { blog, projects };
