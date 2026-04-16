#!/usr/bin/env python3
"""
CORS proxy for schneid-mr12-dashboard.html → ESPHome web_server.

Usage:
    python3 mr12-proxy.py <esphome_host> [local_port]

Example:
    python3 mr12-proxy.py 192.168.1.73
    python3 mr12-proxy.py 192.168.1.73 9090
"""

import sys, os, http.server, urllib.request, urllib.error

ESPHOME_HOST = sys.argv[1] if len(sys.argv) > 1 else '192.168.1.73'
LOCAL_PORT   = int(sys.argv[2]) if len(sys.argv) > 2 else 8080
SCRIPT_DIR   = os.path.dirname(os.path.abspath(__file__))
DASHBOARD    = os.path.join(SCRIPT_DIR, 'schneid-mr12-dashboard.html')
ESPHOME_BASE = f'http://{ESPHOME_HOST}'

CORS = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Authorization, Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
}


class ProxyHandler(http.server.BaseHTTPRequestHandler):

    def log_message(self, fmt, *args):
        print(f'  {self.command} {self.path}')

    def _cors(self):
        for k, v in CORS.items():
            self.send_header(k, v)

    def do_OPTIONS(self):
        self.send_response(204)
        self._cors()
        self.end_headers()

    def do_GET(self):
        # Serve dashboard HTML
        if self.path in ('/', '/schneid-mr12-dashboard.html'):
            try:
                with open(DASHBOARD, 'rb') as f:
                    data = f.read()
                self.send_response(200)
                self.send_header('Content-Type', 'text/html; charset=utf-8')
                self.send_header('Content-Length', str(len(data)))
                self._cors()
                self.end_headers()
                self.wfile.write(data)
            except FileNotFoundError:
                self.send_error(404, 'Dashboard HTML not found')
            return

        # Build forwarded request headers
        fwd_headers = {}
        if 'Authorization' in self.headers:
            fwd_headers['Authorization'] = self.headers['Authorization']

        target = ESPHOME_BASE + self.path

        # SSE endpoint — must stream chunks, never buffers full body
        if self.path.startswith('/events'):
            self._stream(target, fwd_headers)
            return

        # Regular proxy request
        try:
            req = urllib.request.Request(target, headers=fwd_headers)
            with urllib.request.urlopen(req, timeout=10) as resp:
                body = resp.read()
                self.send_response(resp.status)
                self.send_header('Content-Type',
                                 resp.headers.get('Content-Type', 'application/octet-stream'))
                self._cors()
                self.end_headers()
                self.wfile.write(body)
        except urllib.error.HTTPError as e:
            self.send_response(e.code)
            self._cors()
            self.end_headers()
        except Exception as e:
            self.send_error(502, str(e))

    def _stream(self, target, headers):
        """Forward an SSE stream chunk-by-chunk."""
        try:
            req = urllib.request.Request(target, headers=headers)
            with urllib.request.urlopen(req, timeout=None) as resp:
                self.send_response(resp.status)
                self.send_header('Content-Type',
                                 resp.headers.get('Content-Type', 'text/event-stream'))
                self.send_header('Cache-Control', 'no-cache')
                self.send_header('X-Accel-Buffering', 'no')
                self._cors()
                self.end_headers()
                while True:
                    chunk = resp.read(512)
                    if not chunk:
                        break
                    self.wfile.write(chunk)
                    self.wfile.flush()
        except Exception:
            pass  # client disconnected or ESPHome went away


if __name__ == '__main__':
    print(f'Proxying http://localhost:{LOCAL_PORT} → {ESPHOME_BASE}')
    print(f'Open:  http://localhost:{LOCAL_PORT}')
    print(f'Host to enter in login form: localhost:{LOCAL_PORT}')
    print('Press Ctrl-C to stop.\n')
    server = http.server.HTTPServer(('', LOCAL_PORT), ProxyHandler)
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print('\nStopped.')
