const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = (WrapComponent) => {
  WrapComponent.use(
    "/JSP",
    createProxyMiddleware({
      "target":"http://gurwlszx.cafe24.com",
      changeOrigin: true
    })
  )
}