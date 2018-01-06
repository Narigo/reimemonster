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

print "Go to http://localhost:{port}/demo/ to see it running".format(port=PORT)
httpd.serve_forever()
