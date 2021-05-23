const  HttpMid = require('http-proxy-middleware');
const {
  createProxyMiddleware,
} = HttpMid;
module.exports = function(app) {
  // app.use('/mockApi', createProxyMiddleware({ target: 'http://localhost:3001', changeOrigin: true, }));
  app.use('/api', createProxyMiddleware({ target: 'http://localhost:3000', changeOrigin: true }));  
};
