import { createProxyMiddleware } from "http-proxy-middleware";
import { Express } from "express"; // Assuming you're using Express for your server

export default function setupProxy(app: Express) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "http://localhost:8080",
      changeOrigin: true,
    })
  );
}
