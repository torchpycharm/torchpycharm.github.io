// Shared by VideoEmbed.astro and the remark plugin so both build the same players.

const videoFileTypes = {
	'.mp4': 'video/mp4',
	'.webm': 'video/webm',
};

export const videoFileExtensions = Object.keys(videoFileTypes);

export const videoIframeAllow = 'accelerometer; autoplay; clipboard-write; encrypted-media; fullscreen; gyroscope; picture-in-picture; web-share';

/** MIME type for a local video path, or undefined when it is not a supported video file. */
export function videoFileType(path) {
	const extension = path.split(/[?#]/)[0].match(/\.[^./]+$/)?.[0].toLowerCase();
	return extension ? videoFileTypes[extension] : undefined;
}

export function bilibiliEmbedUrl(id, { page } = {}) {
	const params = new URLSearchParams({ isOutside: 'true', bvid: id, autoplay: '0' });
	if (page) params.set('p', String(page));
	return `https://player.bilibili.com/player.html?${params}`;
}

export function youtubeEmbedUrl(id, { start } = {}) {
	return `https://www.youtube-nocookie.com/embed/${encodeURIComponent(id)}${start ? `?start=${start}` : ''}`;
}

/** Player URL for a `{ type: 'bilibili' | 'youtube', id }` video. */
export function videoEmbedSrc(video) {
	return video.type === 'bilibili' ? bilibiliEmbedUrl(video.id, video) : youtubeEmbedUrl(video.id, video);
}

function parseStartSeconds(value) {
	if (!value) return undefined;
	if (/^\d+$/.test(value)) return Number(value) || undefined;

	const match = value.match(/^(?:(\d+)h)?(?:(\d+)m)?(?:(\d+)s)?$/);
	if (!match) return undefined;

	const [, hours = 0, minutes = 0, seconds = 0] = match;
	return Number(hours) * 3600 + Number(minutes) * 60 + Number(seconds) || undefined;
}

/**
 * Recognises Bilibili and YouTube video page URLs.
 * Returns `{ type, id, page?, start? }`, or undefined for any other URL.
 */
export function parseVideoUrl(value) {
	let url;
	try {
		url = new URL(value);
	} catch {
		return undefined;
	}

	if (url.protocol !== 'https:' && url.protocol !== 'http:') return undefined;
	const host = url.hostname.replace(/^(www|m)\./, '');

	if (host === 'bilibili.com') {
		const id = url.pathname.match(/^\/video\/(BV[0-9A-Za-z]+)\/?$/)?.[1];
		if (!id) return undefined;
		return { type: 'bilibili', id, page: Number(url.searchParams.get('p')) || undefined };
	}

	let id;
	if (host === 'youtu.be') {
		id = url.pathname.slice(1);
	} else if (host === 'youtube.com' || host === 'youtube-nocookie.com') {
		id = url.pathname === '/watch' ? url.searchParams.get('v') : url.pathname.match(/^\/(?:shorts|embed|live)\/([^/]+)\/?$/)?.[1];
	}

	if (!id || !/^[\w-]{6,}$/.test(id)) return undefined;
	return { type: 'youtube', id, start: parseStartSeconds(url.searchParams.get('t') ?? url.searchParams.get('start')) };
}
