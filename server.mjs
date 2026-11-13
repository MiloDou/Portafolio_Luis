import { createReadStream } from 'node:fs';
import { readFile, stat } from 'node:fs/promises';
import { createServer } from 'node:http';
import { dirname, extname, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { runInNewContext } from 'node:vm';

const projectRoot = dirname(fileURLToPath(import.meta.url));
const isDist = process.argv.includes('--dist');
const root = isDist ? resolve(projectRoot, 'dist') : projectRoot;
const port = Number(process.env.PORT || 5173);

let Babel = null;
let lastJsxMtime = 0;
let cachedJsxBundle = '';

if (!isDist) {
  const babelSource = await readFile(resolve(projectRoot, 'public/vendor/babel.min.js'), 'utf8');
  const babelContext = {};
  babelContext.self = babelContext;
  babelContext.window = babelContext;
  babelContext.global = babelContext;
  runInNewContext(babelSource, babelContext);
  Babel = babelContext.Babel;
}

async function getDevelopmentBundle() {
  if (isDist || !Babel) return '';
  const jsxPath = resolve(projectRoot, 'src/main.jsx');
  try {
    const fileStat = await stat(jsxPath);
    if (fileStat.mtimeMs !== lastJsxMtime || !cachedJsxBundle) {
      const jsx = await readFile(jsxPath, 'utf8');
      cachedJsxBundle = Babel.transform(jsx, { presets: ['react'], filename: 'main.jsx' }).code;
      lastJsxMtime = fileStat.mtimeMs;
    }
    return cachedJsxBundle;
  } catch (err) {
    console.error('Error compiling main.jsx:', err);
    return cachedJsxBundle || `console.error(${JSON.stringify(String(err))});`;
  }
}

const contentTypes = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.jsx': 'text/babel; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
  '.ttf': 'font/ttf',
  '.mp4': 'video/mp4'
};

const server = createServer(async (request, response) => {
  if (!['GET', 'HEAD'].includes(request.method || '')) {
    response.writeHead(405, { Allow: 'GET, HEAD' }).end('Method not allowed');
    return;
  }

  let pathname;
  try {
    pathname = decodeURIComponent(new URL(request.url || '/', 'http://localhost').pathname);
  } catch {
    response.writeHead(400).end('Bad request');
    return;
  }

  const relativePath = pathname === '/' ? 'index.html' : pathname.replace(/^\/+/, '');
  const isPublicAsset = !isDist && /^(assets|fonts|vendor)\//.test(relativePath);
  const filePath = isPublicAsset
    ? resolve(projectRoot, 'public', relativePath)
    : resolve(root, relativePath);

  if (filePath !== root && !filePath.startsWith(root + sep)) {
    response.writeHead(403).end('Forbidden');
    return;
  }

  if (pathname === '/src/main.js' && !isDist) {
    const bundle = await getDevelopmentBundle();
    response.writeHead(200, {
      'Content-Type': 'text/javascript; charset=utf-8',
      'Content-Length': Buffer.byteLength(bundle),
      'Cache-Control': 'no-store'
    }).end(request.method === 'HEAD' ? undefined : bundle);
    return;
  }

  try {
    const fileInfo = await stat(filePath);
    if (!fileInfo.isFile()) throw new Error('Not a file');
    const headers = {
      'Content-Type': contentTypes[extname(filePath)] || 'application/octet-stream',
      'Cache-Control': 'no-store'
    };
    const isVideo = extname(filePath) === '.mp4';
    if (isVideo) headers['Accept-Ranges'] = 'bytes';

    // Browser video controls use byte ranges when seeking. Support one range;
    // unsupported range syntax is ignored as permitted by HTTP.
    const rangeHeader = isVideo && !request.headers['if-range'] ? request.headers.range : null;
    const match = typeof rangeHeader === 'string'
      ? /^bytes=(\d*)-(\d*)$/i.exec(rangeHeader.trim())
      : null;

    if (match && (match[1] || match[2])) {
      const startValue = match[1] ? Number(match[1]) : null;
      const endValue = match[2] ? Number(match[2]) : null;
      const validNumbers = (startValue === null || Number.isSafeInteger(startValue))
        && (endValue === null || Number.isSafeInteger(endValue));

      if (validNumbers) {
        const start = startValue === null
          ? Math.max(0, fileInfo.size - endValue)
          : startValue;
        const end = startValue === null || endValue === null
          ? fileInfo.size - 1
          : Math.min(endValue, fileInfo.size - 1);

        if (fileInfo.size === 0 || start >= fileInfo.size || end < start || (startValue === null && endValue === 0)) {
          response.writeHead(416, {
            ...headers,
            'Content-Range': `bytes */${fileInfo.size}`,
            'Content-Length': 0
          }).end();
          return;
        }

        response.writeHead(206, {
          ...headers,
          'Content-Range': `bytes ${start}-${end}/${fileInfo.size}`,
          'Content-Length': end - start + 1
        });
        if (request.method === 'HEAD') response.end();
        else createReadStream(filePath, { start, end }).pipe(response);
        return;
      }
    }

    response.writeHead(200, { ...headers, 'Content-Length': fileInfo.size });
    if (request.method === 'HEAD') response.end();
    else createReadStream(filePath).pipe(response);
  } catch {
    response.writeHead(404).end('Not found');
  }
});

function startServer(targetPort) {
  server.listen(targetPort, '0.0.0.0', () => {
    console.log(`Portafolio listo en http://localhost:${targetPort} (${isDist ? 'dist' : 'dev'})`);
  });

  server.once('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.log(`El puerto ${targetPort} está ocupado, intentando en http://localhost:${targetPort + 1}...`);
      startServer(targetPort + 1);
    } else {
      console.error('Error al iniciar el servidor:', err);
    }
  });
}

startServer(port);
