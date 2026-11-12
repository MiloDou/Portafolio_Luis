import { cp, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { runInNewContext } from 'node:vm';

const root = process.cwd();
const dist = resolve(root, 'dist');
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
await cp(resolve(root, 'public/vendor'), resolve(dist, 'vendor'), { recursive: true });
await cp(resolve(root, 'src/styles.css'), resolve(dist, 'src/styles.css'));
await cp(resolve(root, 'src/content.js'), resolve(dist, 'src/content.js'));

const jsx = await readFile(resolve(root, 'src/main.jsx'), 'utf8');
const compiled = Babel.transform(jsx, { presets: ['react'], filename: 'main.jsx' }).code;
await writeFile(resolve(dist, 'src/main.js'), compiled);

let html = await readFile(resolve(root, 'index.html'), 'utf8');
html = html.replace('<link rel="stylesheet" href="/src/styles.css" />', '<link rel="stylesheet" href="/src/styles.css" />');
html = html.replace('<script src="/vendor/babel.min.js"></script>\n', '');
html = html.replace('<script type="text/babel" data-presets="react" src="/src/main.jsx"></script>', '<script src="/src/main.js"></script>');
await writeFile(resolve(dist, 'index.html'), html);
await rm(resolve(dist, 'vendor/babel.min.js'), { force: true });
console.log('Versión estática creada en dist/.');
