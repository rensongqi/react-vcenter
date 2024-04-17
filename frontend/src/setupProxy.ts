export const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports= function (app:any) {
    app.use(
        createProxyMiddleware(
            "/api",
            {
                target: "http://localhost:8888",
                changeOrigin: true,
                ws: true,
                pathRewrite:{
                    "^/api":"",
                },
            }
        )
    )
}
