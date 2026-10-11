import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { extname, isAbsolute, join, relative, resolve } from 'node:path';

const blogDir = resolve('src/content/blog');
export const prerender = true;

const contentTypes: Record<string, string> = {
	'.avif': 'image/avif',
	'.gif': 'image/gif',
	'.jpeg': 'image/jpeg',
	'.jpg': 'image/jpeg',
	'.mp4': 'video/mp4',
	'.pdf': 'application/pdf',
	'.png': 'image/png',
	'.svg': 'image/svg+xml',
	'.webm': 'video/webm',
	'.webp': 'image/webp',
};

function getAssetFiles(dir: string): string[] {
	if (!existsSync(dir)) return [];

	return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
		const path = join(dir, entry.name);
		if (entry.isDirectory()) return getAssetFiles(path);
		return entry.isFile() && contentTypes[extname(entry.name).toLowerCase()] ? [path] : [];
	});
}

export function getStaticPaths() {
	return getAssetFiles(blogDir).map((file) => ({
		params: {
			path: relative(blogDir, file).replace(/\\/g, '/'),
		},
	}));
}

export async function GET({ params, request }: { params: { path: string }; request: Request }) {
	const requestedPath = params.path.replace(/\\/g, '/');
	const file = resolve(blogDir, requestedPath);
	const relativePath = relative(blogDir, file);

	if (relativePath.startsWith('..') || relativePath === '' || isAbsolute(relativePath) || !existsSync(file)) {
		return new Response('Not found', { status: 404 });
	}

	const extension = extname(file).toLowerCase();
	const body = readFileSync(file);
	const headers = {
		'Content-Type': contentTypes[extension] ?? 'application/octet-stream',
		'Cache-Control': 'public, max-age=31536000, immutable',
	};

	// Safari only plays video from servers that answer byte-range requests. The built
	// site is static files, so this matters for `astro dev` only.
	const range = import.meta.env.DEV ? request.headers.get('range')?.match(/^bytes=(\d*)-(\d*)$/) : null;
	if (range && (range[1] || range[2])) {
		const size = body.length;
		const start = range[1] ? Number(range[1]) : Math.max(size - Number(range[2]), 0);
		const end = range[1] && range[2] ? Math.min(Number(range[2]), size - 1) : size - 1;

		if (start > end || start >= size) {
			return new Response(null, { status: 416, headers: { 'Content-Range': `bytes */${size}` } });
		}

		return new Response(body.subarray(start, end + 1), {
			status: 206,
			headers: { ...headers, 'Accept-Ranges': 'bytes', 'Content-Range': `bytes ${start}-${end}/${size}` },
		});
	}

	return new Response(body, { headers });
}
