const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/marketplace',
    createProxyMiddleware({
      target: 'https://www.chronogolf.com/marketplace',
      changeOrigin: true,
    })
  );
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://www.foreupsoftware.com/api',
      changeOrigin: true,
    })
  );
}; 