const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');

const root = __dirname;
const port = Number(process.env.PORT || 3000);
const supabaseUrl = process.env.SUPABASE_URL?.replace(/\/$/, '');
const supabaseKey = process.env.SUPABASE_KEY;
const types = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.mp4': 'video/mp4',
  '.ico': 'image/x-icon'
};

function sendJson(response, status, body) {
  response.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store'
  });
  response.end(JSON.stringify(body));
}

function readBody(request) {
  return new Promise((resolve, reject) => {
    let body = '';
    request.on('data', (chunk) => {
      body += chunk;
      if (body.length > 32_000) reject(new Error('Request too large'));
    });
    request.on('end', () => resolve(body));
    request.on('error', reject);
  });
}

async function saveLead(lead) {
  if (!supabaseUrl || !supabaseKey || !/^https?:\/\//.test(supabaseUrl)) {
    throw new Error('Supabase is not configured on the server');
  }
  const result = await fetch(`${supabaseUrl}/rest/v1/lead_submissions`, {
    method: 'POST',
    headers: {
      apikey: supabaseKey,
      Authorization: `Bearer ${supabaseKey}`,
      'Content-Type': 'application/json',
      Prefer: 'return=minimal'
    },
    body: JSON.stringify(lead)
  });
  if (!result.ok) {
    const detail = await result.text();
    throw new Error(`Supabase rejected the lead (${result.status}): ${detail.slice(0, 300)}`);
  }
}

const server = http.createServer(async (request, response) => {
  const url = new URL(request.url, `http://${request.headers.host || 'localhost'}`);

  if (url.pathname === '/api/leads') {
    if (request.method !== 'POST') return sendJson(response, 405, { error: 'Method not allowed' });
    try {
      const payload = JSON.parse(await readBody(request));
      const name = String(payload.name || '').trim().slice(0, 120);
      const contact = String(payload.contact || '').trim().slice(0, 180);
      const need = String(payload.need || 'Not sure yet').trim().slice(0, 120);
      const message = String(payload.message || '').trim().slice(0, 2_000);
      const landingPage = String(payload.landing_page || url.searchParams.get('landing_page') || '/').trim().slice(0, 500);
      const website = String(payload.website || '').trim();

      if (website) return sendJson(response, 200, { ok: true });
      if (!name || !contact) return sendJson(response, 400, { error: 'Name and email or phone are required.' });

      await saveLead({
        name,
        contact,
        need,
        message,
        source: 'ashisdigitalhub.com consultation form',
        landing_page: landingPage || '/',
        user_agent: request.headers['user-agent'] || null
      });
      return sendJson(response, 201, { ok: true });
    } catch (error) {
      console.error(error);
      return sendJson(response, 500, { error: 'We could not save your inquiry right now. Please try again shortly.' });
    }
  }

  const requestPath = decodeURIComponent(url.pathname === '/' ? '/index.html' : url.pathname);
  const relativePath = requestPath === '/manus-routes.json' || requestPath.startsWith('/favicon')
    ? path.join('public', requestPath.slice(1))
    : requestPath.slice(1);
  const filePath = path.resolve(root, relativePath);
  if (!filePath.startsWith(root)) {
    response.writeHead(403, { 'Content-Type': 'text/plain; charset=utf-8' });
    response.end('Forbidden');
    return;
  }
  fs.stat(filePath, (error, stats) => {
    if (error || !stats.isFile()) {
      response.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      response.end('Not found');
      return;
    }
    response.writeHead(200, {
      'Content-Type': types[path.extname(filePath)] || 'application/octet-stream',
      'Cache-Control': 'no-cache'
    });
    fs.createReadStream(filePath).pipe(response);
  });
});

server.listen(port, '0.0.0.0', () => {
  console.log(`AshisDigitalHub site listening on ${port}`);
});
