import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { join, extname } from 'node:path';

const PORT = 3000;
const ROOT = process.cwd();
const SPA_PREFIX = '/docs/pages/';
const SPA_INDEX = join(ROOT, 'docs/pages/index.html');

const MIME = {
  '.html': 'text/html',
  '.js':   'application/javascript',
  '.mjs':  'application/javascript',
  '.css':  'text/css',
  '.json': 'application/json',
  '.svg':  'image/svg+xml',
  '.png':  'image/png',
  '.jpg':  'image/jpeg',
  '.ico':  'image/x-icon',
  '.woff': 'font/woff',
  '.woff2':'font/woff2',
};

async function serve(req, res) {
  let pathname = new URL(req.url, `http://localhost:${PORT}`).pathname;

  // Try the exact file first
  let filePath = join(ROOT, pathname);
  let found = await stat(filePath).then(s => s.isFile()).catch(() => false);

  // SPA fallback: any /docs/pages/* that isn't a real file → index.html
  if (!found && pathname.startsWith(SPA_PREFIX)) {
    filePath = SPA_INDEX;
    found = true;
  }

  // Try adding .html for extensionless requests
  if (!found && !extname(pathname)) {
    const withHtml = filePath + '.html';
    found = await stat(withHtml).then(s => s.isFile()).catch(() => false);
    if (found) filePath = withHtml;
  }

  // Try index.html inside directories
  if (!found) {
    const dirIndex = join(filePath, 'index.html');
    found = await stat(dirIndex).then(s => s.isFile()).catch(() => false);
    if (found) filePath = dirIndex;
  }

  if (!found) {
    res.writeHead(404, { 'content-type': 'text/plain' });
    res.end('404 Not Found');
    return;
  }

  const ext = extname(filePath);
  const mime = MIME[ext] || 'application/octet-stream';
  const body = await readFile(filePath);

  res.writeHead(200, {
    'content-type': mime,
    'cache-control': 'no-cache',
  });
  res.end(body);
}

createServer(serve).listen(PORT, () => {
  console.log(`\n  Dev server running at http://localhost:${PORT}\n`);
});
