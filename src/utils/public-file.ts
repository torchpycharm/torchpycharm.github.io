import { existsSync } from 'node:fs';
import { resolve } from 'node:path';

const publicDir = resolve('public');

// True for external URLs and for site-root paths that exist under public/.
export function publicFileExists(path: string): boolean {
	if (/^https?:\/\//.test(path)) return true;
	return existsSync(resolve(publicDir, `.${decodeURI(path.startsWith('/') ? path : `/${path}`)}`));
}
