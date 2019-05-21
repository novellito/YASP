const express = require('express');
const next = require('next');

// !todo setup proxies for docker!
const PORT = 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });

const handle = app.getRequestHandler();

const devProxy = {
  '/api': {
    target: 'http://localhost:5000/api',
    pathRewrite: { '^/api': '/' },
    changeOrigin: true
  }
};

app
  .prepare()
  .then(() => {
    const server = express();

    if (dev && devProxy) {
      const proxyMiddleware = require('http-proxy-middleware');
      server.use(proxyMiddleware('/api', devProxy['/api']));
    }

    // Default catch-all handler to allow Next.js to handle all other routes
    server.all('*', (req, res) => handle(req, res));

    server.listen(PORT, err => {
      if (err) throw err;
      console.log(`> Ready on port ${PORT}`);
    });
  })
  .catch(err => {
    console.log('An error occurred, unable to start the server');
    console.log(err);
  });
