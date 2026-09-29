# astroyu.com

与航的个人主页：一张明信片，和几个自己托管的小应用。

## 技术结构

- Vinext + React
- Cloudflare Vite plugin
- Cloudflare Workers + Static Assets
- GitHub Actions 持续部署

## 本地开发

需要 Node.js 22.13 或更高版本。

```bash
npm ci
npm run dev
```

## 验证

```bash
npm test
```

测试会重新构建站点，并确认首页内容、分享信息和 Cloudflare Worker
部署产物均正确生成。

## 部署到 Cloudflare Workers

首次启用 GitHub Actions 前，在仓库的 `Settings → Secrets and variables → Actions`
中添加：

- `CLOUDFLARE_API_TOKEN`：具有 Workers Scripts 编辑权限的 Cloudflare API Token
- `CLOUDFLARE_ACCOUNT_ID`：Cloudflare Account ID

合并到 `main` 后，`.github/workflows/deploy-cloudflare.yml` 会自动测试并部署。
如果尚未添加上述两个 Secrets，工作流只运行构建与测试，不会尝试部署。
也可以手动执行：

```bash
npm run deploy
```

自定义域名 `astroyu.com` 已通过 `wrangler.jsonc` 绑定到 Worker。Cloudflare
负责证书签发和流量路由，`www.astroyu.com` 会永久重定向到根域名。
Relay、Photos 和 Videos 分别位于 `relay.astroyu.com`、`photos.astroyu.com`
和 `v.astroyu.com`，由各自的服务独立托管，不经过此 Worker。

## 宋体子集字体

标题、明信片留言、邮戳和应用短语使用的宋体在苹果设备上是系统自带的「宋体-简」，其他设备使用
`public/fonts/noto-serif-sc-subset.woff2`（思源宋体 Noto Serif SC，SIL OFL 许可），
只包含页面用到的 44 个字，约 9KB。修改这些文字后需要重新生成：

1. 把页面上所有宋体文字去重，URL 编码后填入
   `https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@400&text=<文字>`
2. 用现代浏览器 UA 请求该地址，下载返回 CSS 中的 woff2 文件，覆盖上述字体文件
3. 把 CSS 中的 `unicode-range` 同步到 `app/globals.css` 的 `@font-face`
