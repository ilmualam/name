"""Preview only: gzip transfer and cache headers approximate static CDN delivery.
Production headers still require verification after deployment.
"""
from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler
from pathlib import Path
import gzip,sys
ROOT=Path(__file__).resolve().parent.parent
class Handler(SimpleHTTPRequestHandler):
    extensions_map={**SimpleHTTPRequestHandler.extensions_map,'.webmanifest':'application/manifest+json','.js':'text/javascript'}
    def __init__(self,*args,**kwargs):super().__init__(*args,directory=str(ROOT/'_site'),**kwargs)
    def do_GET(self):
        name=self.path.split('?')[0]
        target=Path(self.translate_path(name))
        if target.is_dir():target=target/'index.html'
        if target.is_file() and 'gzip' in self.headers.get('Accept-Encoding','') and target.suffix in ['.html','.js','.css','.json','.txt','.xml','.svg']:
            data=gzip.compress(target.read_bytes())
            self.send_response(200);self.send_header('Content-Type',self.guess_type(str(target)));self.send_header('Content-Encoding','gzip');self.send_header('Vary','Accept-Encoding');self.send_header('Content-Length',str(len(data)));self.send_header('Cache-Control','public, max-age=600');self.end_headers();self.wfile.write(data)
        else:super().do_GET()
    def send_error(self,code,message=None,explain=None):
        if code==404:
            body=(ROOT/'404.html').read_bytes();self.send_response(404);self.send_header('Content-Type','text/html; charset=utf-8');self.send_header('Content-Length',str(len(body)));self.end_headers();self.wfile.write(body)
        else:super().send_error(code,message,explain)
ThreadingHTTPServer(('127.0.0.1',int(sys.argv[1]) if len(sys.argv)>1 else 8767),Handler).serve_forever()
