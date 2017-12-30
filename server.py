import SimpleHTTPServer
import SocketServer
import os

PORT = 8000

web_dir = os.path.join(os.path.dirname(__file__), 'src')
os.chdir(web_dir)

Handler = SimpleHTTPServer.SimpleHTTPRequestHandler
Handler.extensions_map.update({
    '.mjs': 'application/javascript',
});

httpd = SocketServer.TCPServer(("", PORT), Handler)

print "Serving at port", PORT
httpd.serve_forever()
