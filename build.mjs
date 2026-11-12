import { cp, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { runInNewContext } from 'node:vm';
import React from 'react';
import { renderToString } from 'react-dom/server';

const root = process.cwd();
const dist = resolve(root, 'dist');
const defaultOrigin = 'https://portafolio-luis-gomez.animesino.workers.dev';
const siteOrigin = new URL(process.env.SITE_URL || defaultOrigin).origin;
const babelSource = await readFile(resolve(root, 'public/vendor/babel.min.js'), 'utf8');
const babelContext = {};
babelContext.self = babelContext;
babelContext.window = babelContext;
babelContext.global = babelContext;
runInNewContext(babelSource, babelContext);
const Babel = babelContext.Babel;

await rm(dist, { recursive: true, force: true });
await mkdir(resolve(dist, 'src'), { recursive: true });
await cp(resolve(root, 'public/assets'), resolve(dist, 'assets'), { recursive: true });
await cp(resolve(root, 'public/fonts'), resolve(dist, 'fonts'), { recursive: true });
await cp(resolve(root, 'public/vendor'), resolve(dist, 'vendor'), { recursive: true });
await cp(resolve(root, 'src/styles.css'), resolve(dist, 'src/styles.css'));
await cp(resolve(root, 'src/content.js'), resolve(dist, 'src/content.js'));

const jsx = await readFile(resolve(root, 'src/main.jsx'), 'utf8');
const compiled = Babel.transform(jsx, { presets: ['react'], filename: 'main.jsx' }).code;
await writeFile(resolve(dist, 'src/main.js'), compiled);

const contentSource = await readFile(resolve(root, 'src/content.js'), 'utf8');
const prerenderContext = { React, window: { location: { hash: '' } } };
runInNewContext(contentSource, prerenderContext);
const bootstrapStart = jsx.lastIndexOf('const root = document.getElementById(');
if (bootstrapStart < 0) throw new Error('No se encontró el inicio de React en main.jsx');
const serverSource = `${jsx.slice(0, bootstrapStart)}\nglobalThis.PortfolioApp = App;`;
const serverCompiled = Babel.transform(serverSource, { presets: ['react'], filename: 'main.jsx' }).code;
runInNewContext(serverCompiled, prerenderContext);
const prerenderedApp = renderToString(React.createElement(prerenderContext.PortfolioApp));

let html = await readFile(resolve(root, 'index.html'), 'utf8');
html = html.replace('<div id="root"></div>', `<div id="root" data-prerendered>${prerenderedApp}</div>`);
html = html.replaceAll(defaultOrigin, siteOrigin);
await writeFile(resolve(dist, 'index.html'), html);
await cp(resolve(root, 'public/_headers'), resolve(dist, '_headers'));
const siteUrl = `${siteOrigin}/`;
await writeFile(resolve(dist, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>${siteUrl}</loc></url></urlset>\n`);
await rm(resolve(dist, 'vendor/babel.min.js'), { force: true });
console.log('Versión estática creada en dist/.');
