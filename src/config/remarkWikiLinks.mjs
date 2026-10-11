import { existsSync, readdirSync } from 'node:fs';
import { dirname, extname, join, relative, resolve } from 'node:path';
import { parseVideoUrl, videoEmbedSrc, videoFileExtensions, videoIframeAllow } from '../utils/video.mjs';

const wikiLinkPattern = /(!?)\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g;
const blogDir = resolve('src/content/blog');
const imageExtensions = new Set(['.avif', '.gif', '.jpeg', '.jpg', '.png', '.svg', '.webp']);
const videoExtensions = new Set(videoFileExtensions);
const assetExtensions = new Set([...imageExtensions, ...videoExtensions, '.pdf']);

function slugifyContentPath(value) {
	return value
		.replace(/\\/g, '/')
		.split('/')
		.map((segment) =>
			segment
				.trim()
				.toLowerCase()
				.replace(/[^\p{L}\p{N}\s_-]/gu, '')
				.replace(/\s/g, '-'),
		)
		.join('/');
}

function slugifyHeading(value) {
	return value
		.trim()
		.toLowerCase()
		.replace(/[^\p{L}\p{N}\s_-]/gu, '')
		.replace(/\s+/g, '-');
}

function readMarkdownFiles(dir) {
	if (!existsSync(dir)) return [];

	return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
		const path = join(dir, entry.name);
		if (entry.isDirectory()) return readMarkdownFiles(path);
		return entry.isFile() && entry.name.endsWith('.md') ? [path] : [];
	});
}

function readAssetFiles(dir) {
	if (!existsSync(dir)) return [];

	return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
		const path = join(dir, entry.name);
		if (entry.isDirectory()) return readAssetFiles(path);
		return entry.isFile() && assetExtensions.has(extname(entry.name).toLowerCase()) ? [path] : [];
	});
}

function getMarkdownIdFromFile(file) {
	const relativePath = relative(blogDir, file).replace(/\\/g, '/').replace(/\.md$/, '');
	return slugifyContentPath(relativePath);
}

function getAssetRawPathFromFile(file) {
	return relative(blogDir, file).replace(/\\/g, '/');
}

function createUniqueBasenameMap(values) {
	const map = new Map();

	values.forEach((value) => {
		const name = value.split('/').at(-1);
		if (!name) return;

		const key = name.toLowerCase();
		if (map.has(key)) {
			map.delete(key);
			return;
		}

		map.set(key, value);
	});

	return map;
}

function createWikiResolver() {
	const ids = readMarkdownFiles(blogDir).map(getMarkdownIdFromFile);
	const exactMap = new Map(ids.map((id) => [id.toLowerCase(), id]));
	const basenameMap = createUniqueBasenameMap(ids);

	return (target) => {
		const [pathTarget, heading] = target.replace(/^\/+|\/+$/g, '').split('#');
		const normalized = slugifyContentPath(pathTarget);
		const hash = heading ? `#${slugifyHeading(heading)}` : '';
		const exact = exactMap.get(normalized.toLowerCase());
		if (exact) return `${exact}${hash}`;

		if (!normalized.includes('/')) {
			const basename = basenameMap.get(normalized.toLowerCase());
			if (basename) return `${basename}${hash}`;
		}

		return `${normalized}${hash}`;
	};
}

function createAssetResolver() {
	const assets = readAssetFiles(blogDir).map(getAssetRawPathFromFile);
	const exactMap = new Map(assets.map((asset) => [asset.toLowerCase(), asset]));
	const basenameMap = createUniqueBasenameMap(assets);

	return (target) => {
		const normalized = target.replace(/^\/+|\/+$/g, '').replace(/\\/g, '/');
		const exact = exactMap.get(normalized.toLowerCase());
		if (exact) return exact;

		if (!normalized.includes('/')) {
			const basename = basenameMap.get(normalized.toLowerCase());
			if (basename) return basename;
		}

		return normalized;
	};
}

function createTextNode(value) {
	return { type: 'text', value };
}

function encodePath(path) {
	return path
		.split('/')
		.map((segment) => encodeURIComponent(segment))
		.join('/');
}

function createLinkNode(target, label, resolveWikiTarget, resolveAssetTarget) {
	const cleanTarget = target.trim().replace(/^\/+|\/+$/g, '');
	const extension = extname(cleanTarget).toLowerCase();

	if (assetExtensions.has(extension)) {
		const assetPath = resolveAssetTarget(cleanTarget);

		return {
			type: 'link',
			url: `/blog-assets/${encodePath(assetPath)}`,
			title: null,
			children: [createTextNode(label.trim() || cleanTarget)],
		};
	}

	const slug = resolveWikiTarget(cleanTarget);
	const [path, hash] = slug.split('#');

	return {
		type: 'link',
		url: `/blog/${encodeURI(path)}${hash ? `#${encodeURIComponent(hash)}` : ''}`,
		title: null,
		children: [createTextNode(label.trim() || slug)],
	};
}

// `![[file]]` embeds. Video files also come out as image nodes here; embedVideos() turns them into players.
function createImageNode(target, label, resolveAssetTarget) {
	const cleanTarget = target.trim().replace(/^\/+|\/+$/g, '');
	const assetPath = resolveAssetTarget(cleanTarget);
	const isVideo = videoExtensions.has(extname(cleanTarget).toLowerCase());

	return {
		type: 'image',
		url: `/blog-assets/${encodePath(assetPath)}`,
		title: null,
		alt: label?.trim() || (isVideo ? '' : target.trim()),
	};
}

function transformTextNode(node, resolveWikiTarget, resolveAssetTarget) {
	if (node.type !== 'text' || !wikiLinkPattern.test(node.value)) return node;

	wikiLinkPattern.lastIndex = 0;
	const children = [];
	let lastIndex = 0;
	let match;

	while ((match = wikiLinkPattern.exec(node.value))) {
		if (match.index > lastIndex) {
			children.push(createTextNode(node.value.slice(lastIndex, match.index)));
		}

		if (match[1] === '!') {
			children.push(createImageNode(match[2], match[3], resolveAssetTarget));
		} else {
			children.push(createLinkNode(match[2], match[3] ?? match[2], resolveWikiTarget, resolveAssetTarget));
		}

		lastIndex = match.index + match[0].length;
	}

	if (lastIndex < node.value.length) {
		children.push(createTextNode(node.value.slice(lastIndex)));
	}

	return children;
}

function mergeAdjacentTextChildren(children) {
	const merged = [];

	children.forEach((child) => {
		const previous = merged.at(-1);
		if (child.type === 'text' && previous?.type === 'text') {
			previous.value += child.value;
			return;
		}

		merged.push(child);
	});

	return merged;
}

function visit(node, resolveWikiTarget, resolveAssetTarget, parent) {
	if (!node || typeof node !== 'object') return;
	if (node.type === 'code' || node.type === 'inlineCode' || node.type === 'link') return;
	if (!Array.isArray(node.children)) return;

	node.children = mergeAdjacentTextChildren(node.children).flatMap((child) => {
		const transformed = transformTextNode(child, resolveWikiTarget, resolveAssetTarget);
		if (Array.isArray(transformed)) return transformed;
		visit(transformed, resolveWikiTarget, resolveAssetTarget, node);
		return transformed;
	});

	if (parent) parent.children = parent.children;
}

function isBlankInline(node) {
	return node.type === 'break' || (node.type === 'text' && node.value.trim() === '');
}

function createVideoFigure(player, caption) {
	const children = [{ type: 'element', tagName: 'div', properties: { className: ['video-frame'] }, children: [player] }];

	if (caption) {
		children.push({ type: 'element', tagName: 'figcaption', properties: {}, children: [{ type: 'text', value: caption }] });
	}

	return {
		type: 'videoEmbed',
		children: [],
		data: { hName: 'figure', hProperties: { className: ['video-embed'] }, hChildren: children },
	};
}

function createPlayerFigure(video) {
	return createVideoFigure({
		type: 'element',
		tagName: 'iframe',
		properties: {
			src: videoEmbedSrc(video),
			title: video.type === 'bilibili' ? 'Bilibili video' : 'YouTube video',
			loading: 'lazy',
			allow: videoIframeAllow,
			allowFullScreen: true,
			referrerPolicy: 'strict-origin-when-cross-origin',
		},
		children: [],
	});
}

function createFileVideoFigure(src, label) {
	return createVideoFigure(
		{
			type: 'element',
			tagName: 'video',
			properties: { src, controls: true, preload: 'metadata', playsInline: true, ariaLabel: label || undefined },
			children: [],
		},
		label,
	);
}

function isVideoImage(node) {
	return node.type === 'image' && videoExtensions.has(extname(node.url.split(/[?#]/)[0]).toLowerCase());
}

// Absolute URLs and /public paths are used as is; a relative path points at a
// file next to the post, which is served through /blog-assets/.
function resolveVideoSrc(node, file) {
	const { url } = node;
	if (/^(https?:)?\/\//.test(url) || url.startsWith('/')) return url;

	const markdownPath = file?.path ?? file?.history?.[0];
	const assetPath = markdownPath ? relative(blogDir, resolve(dirname(markdownPath), decodeURI(url))).replace(/\\/g, '/') : '..';

	if (assetPath.startsWith('..')) {
		const message = `Relative video path "${url}" only works for posts under src/content/blog. Put the file in public/ and reference it by absolute path, e.g. /projects/<slug>/demo.mp4.`;
		// Astro's content loader logs render errors and carries on, which would publish
		// the page without its body. Make the build exit non-zero instead.
		process.exitCode = 1;
		if (file) file.fail(message, node);
		throw new Error(message);
	}

	return `/blog-assets/${encodePath(assetPath)}`;
}

// A Bilibili or YouTube URL that is the whole paragraph and written bare (not `[label](url)`).
function getStandaloneVideoLink(paragraph) {
	const children = paragraph.children.filter((child) => !isBlankInline(child));
	if (children.length !== 1) return undefined;

	const [child] = children;
	if (child.type === 'text') return parseVideoUrl(child.value.trim());
	if (child.type !== 'link') return undefined;

	const sourceLength = child.position ? child.position.end.offset - child.position.start.offset : undefined;
	const label = child.children.length === 1 && child.children[0].type === 'text' ? child.children[0].value : undefined;
	const isBare = sourceLength !== undefined ? sourceLength <= child.url.length + 2 : label === child.url;

	return isBare ? parseVideoUrl(child.url) : undefined;
}

function transformParagraph(paragraph, file, isTopLevel) {
	if (isTopLevel) {
		const video = getStandaloneVideoLink(paragraph);
		if (video) return [createPlayerFigure(video)];
	}

	if (!paragraph.children.some(isVideoImage)) return [paragraph];

	// A <figure> cannot sit inside a <p>, so split the paragraph around each video.
	const output = [];
	let inline = [];
	const flushInline = () => {
		if (inline.some((child) => !isBlankInline(child))) output.push({ type: 'paragraph', children: inline });
		inline = [];
	};

	paragraph.children.forEach((child) => {
		if (!isVideoImage(child)) {
			inline.push(child);
			return;
		}

		flushInline();
		output.push(createFileVideoFigure(resolveVideoSrc(child, file), child.alt?.trim()));
	});
	flushInline();

	return output;
}

function embedVideos(node, file, isTopLevel = true) {
	if (!node || typeof node !== 'object' || !Array.isArray(node.children)) return;

	node.children = node.children.flatMap((child) => {
		if (child.type === 'paragraph') return transformParagraph(child, file, isTopLevel);
		embedVideos(child, file, false);
		return [child];
	});
}

export default function remarkWikiLinks() {
	const resolveWikiTarget = createWikiResolver();
	const resolveAssetTarget = createAssetResolver();

	return (tree, file) => {
		visit(tree, resolveWikiTarget, resolveAssetTarget);
		embedVideos(tree, file);
	};
}
