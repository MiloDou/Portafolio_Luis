// Workers Static Assets does not return byte ranges by itself. Route only reels here.
export default {
  async fetch(request, env) {
    if (request.method !== 'GET' && request.method !== 'HEAD') {
      return env.ASSETS.fetch(request);
    }

    const asset = await env.ASSETS.fetch(new Request(request.url, { method: 'GET' }));
    if (!asset.ok) return asset;

    const headers = new Headers(asset.headers);
    headers.set('Accept-Ranges', 'bytes');
    headers.set('X-Content-Type-Options', 'nosniff');
    const range = request.method === 'GET' ? request.headers.get('Range') : null;
    const ifRange = request.headers.get('If-Range');
    const validator = headers.get('ETag') || headers.get('Last-Modified');
    if (!range || (ifRange && ifRange !== validator)) {
      return new Response(request.method === 'HEAD' ? null : asset.body, {
        status: asset.status,
        headers
      });
    }

    const bytes = await asset.arrayBuffer();
    const size = bytes.byteLength;
    const match = /^bytes=(\d*)-(\d*)$/.exec(range.trim());
    if (!match || (!match[1] && !match[2])) {
      headers.set('Content-Range', `bytes */${size}`);
      return new Response(null, { status: 416, headers });
    }

    let start;
    let end;
    if (!match[1]) {
      const suffixLength = Number(match[2]);
      start = Math.max(0, size - suffixLength);
      end = size - 1;
    } else {
      start = Number(match[1]);
      end = match[2] ? Math.min(Number(match[2]), size - 1) : size - 1;
    }
    if (size === 0 || start >= size || start > end) {
      headers.set('Content-Range', `bytes */${size}`);
      return new Response(null, { status: 416, headers });
    }

    headers.set('Content-Range', `bytes ${start}-${end}/${size}`);
    headers.set('Content-Length', String(end - start + 1));
    return new Response(bytes.slice(start, end + 1), { status: 206, headers });
  }
};
