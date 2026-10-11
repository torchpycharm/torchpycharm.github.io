// Checks that every internal link and asset reference in dist/ points at something that exists.
// Usage: npm run build && node scripts/check-links.mjs

import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative, resolve } from 'node:path';

const distDir = resolve('dist');
const siteOrigin = readFileSync('astro.config.mjs', 'utf8').match(/site:\s*['"]([^'"]+)['"]/)?.[1].replace(/\/$/, '');
const requiredPages = ['/', '/about/', '/projects/', '/blog/', '/graph/', '/resume/', '/contact/'].flatMap((path) => [path, `/en${path}`]);

if (!existsSync(distDir)) {
	console.error('dist/ not found. Run `npm run build` first.');
	process.exit(1);
}

function walk(dir) {
	return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
		const path = join(dir, entry.name);
		return entry.isDirectory() ? walk(path) : [path];
	});
}

const fileCache = new Map();
function read(file) {
	if (!fileCache.has(file)) fileCache.set(file, readFileSync(file, 'utf8'));
	return fileCache.get(file);
}

function decodeEntities(value) {
	return value
		.replace(/&#x([0-9a-f]+);/gi, (_, code) => String.fromCodePoint(Number.parseInt(code, 16)))
		.replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)))
		.replace(/&quot;/g, '"')
		.replace(/&amp;/g, '&');
}

// URL path of a file in dist/: dist/about/index.html -> /about/, dist/404.html -> /404.html
function toUrlPath(file) {
	const path = `/${relative(distDir, file).replace(/\\/g, '/')}`;
	return path.replace(/(^|\/)index\.html$/, '$1');
}

function extractHtmlReferences(html) {
	// Code samples and inline scripts can contain markup that is not a real reference.
	const markup = html.replace(/<(script|style|pre|code)\b[\s\S]*?<\/\1>/gi, '');
	const references = [];

	for (const match of markup.matchAll(/\s(?:href|src|poster)\s*=\s*(?:"([^"]*)"|'([^']*)')/gi)) {
		references.push(match[1] ?? match[2]);
	}

	for (const match of markup.matchAll(/\ssrcset\s*=\s*"([^"]*)"/gi)) {
		references.push(...match[1].split(',').map((candidate) => candidate.trim().split(/\s+/)[0]));
	}

	for (const match of markup.matchAll(/<meta\s+property="og:(?:image|url)"\s+content="([^"]*)"/gi)) {
		references.push(match[1]);
	}

	return references.filter(Boolean).map(decodeEntities);
}

function extractCssReferences(css) {
	return [...css.matchAll(/url\(\s*['"]?([^'")]+)['"]?\s*\)/g)].map((match) => match[1]);
}

// Returns { pathname, hash } for references into this site, or null for anything external.
function resolveReference(reference, fromPath) {
	if (/^(mailto:|tel:|data:|javascript:|blob:)/i.test(reference)) return null;

	let target = reference;
	if (/^(https?:)?\/\//i.test(reference)) {
		if (!siteOrigin || !(reference === siteOrigin || reference.startsWith(`${siteOrigin}/`))) return null;
		target = reference.slice(siteOrigin.length) || '/';
	}

	const url = new URL(target, `http://site.invalid${fromPath}`);
	return { pathname: decodeURIComponent(url.pathname), hash: decodeURIComponent(url.hash.slice(1)) };
}

// GitHub Pages serves /about from about/index.html (after a redirect) and /about.html.
function findFile(pathname) {
	const base = join(distDir, pathname);
	const candidates = pathname.endsWith('/') ? [join(base, 'index.html')] : [base, `${base}.html`, join(base, 'index.html')];
	return candidates.find((candidate) => existsSync(candidate) && statSync(candidate).isFile());
}

function hasAnchor(file, id) {
	const escaped = id.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
	return new RegExp(`\\sid=(["'])${escaped}\\1`).test(read(file));
}

const files = walk(distDir);
const htmlFiles = files.filter((file) => file.endsWith('.html'));
const cssFiles = files.filter((file) => file.endsWith('.css'));
const problems = new Map();
let checked = 0;

function report(fromPath, reference, reason) {
	if (!problems.has(fromPath)) problems.set(fromPath, new Set());
	problems.get(fromPath).add(`${reference}  (${reason})`);
}

function checkReferences(file, references) {
	const fromPath = toUrlPath(file);

	for (const reference of references) {
		const target = resolveReference(reference, fromPath);
		if (!target) continue;
		checked += 1;

		const targetFile = findFile(target.pathname);
		if (!targetFile) {
			report(fromPath, reference, 'no such file');
		} else if (target.hash && targetFile.endsWith('.html') && !hasAnchor(targetFile, target.hash)) {
			report(fromPath, reference, `no element with id "${target.hash}"`);
		}
	}
}

htmlFiles.forEach((file) => checkReferences(file, extractHtmlReferences(read(file))));
cssFiles.forEach((file) => checkReferences(file, extractCssReferences(read(file))));

const pages = new Set(htmlFiles.map(toUrlPath));
const missingPages = requiredPages.filter((page) => !pages.has(page));

console.log(`Checked ${checked} internal references in ${htmlFiles.length} pages and ${cssFiles.length} stylesheets.`);

if (missingPages.length > 0) {
	console.error(`\nMissing pages:\n${missingPages.map((page) => `  ${page}`).join('\n')}`);
}

for (const [fromPath, items] of problems) {
	console.error(`\n${fromPath}`);
	items.forEach((item) => console.error(`  ✗ ${item}`));
}

if (missingPages.length > 0 || problems.size > 0) {
	const count = [...problems.values()].reduce((sum, items) => sum + items.size, 0);
	console.error(`\n${count} broken reference(s), ${missingPages.length} missing page(s).`);
	process.exit(1);
}

console.log('All internal links and assets resolve.');
