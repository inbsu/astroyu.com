import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function render(url = "https://astroyu.com/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(url, {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders Yu Hang's minimal homepage", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  const text = html.replace(/<[^>]+>/g, "");
  assert.match(html, /<title>与航 — 向前看<\/title>/);
  assert.match(html, /<html lang="zh-CN">/);
  assert.match(html, /rel="icon" href="\/favicon\.svg"/);
  assert.match(html, /name="theme-color"/);
  assert.match(html, /\/og\.jpg/);
  assert.doesNotMatch(html, /og-yuhang\.png/);

  assert.match(text, /顺路的话，我们看一样的风景。/);
  assert.match(text, /不顺路的话，祝我们都能看到自己想要的风景。/);
  assert.doesNotMatch(html, /Places I’ve been|days as they unfold|足迹所至/i);
  assert.doesNotMatch(html, /Vast as the world may be|纵天地巍峨|命运的洪流/);

  assert.match(html, /hero-yuhang-temple\.jpg/);
  assert.match(text, /天地这么大，我们恰好在这一刻并肩而立。/);
  assert.doesNotMatch(html, /about-volcano-portrait\.jpg|鸡蛋/);
  assert.match(html, /与航<span>。<\/span>/);

  assert.ok(html.includes('href="https://relay.astroyu.com"'));
  assert.ok(html.includes("看世界"));
  assert.doesNotMatch(html, /3X-UI|docs\.sanaei\.dev/i);

  for (const [url, note, provider, providerUrl] of [
    ["https://photos.astroyu.com", "忆往昔", "Immich", "https://immich.app/"],
    ["https://v.astroyu.com", "藏所爱", "Jellyfin", "https://jellyfin.org/"],
  ]) {
    assert.ok(html.includes(`href="${url}"`), url);
    assert.ok(html.includes(note), note);
    assert.ok(html.includes(`href="${providerUrl}"`), providerUrl);
    assert.ok(html.includes(`>${provider}</a>`), provider);
  }
  assert.doesNotMatch(html, /https:\/\/(?:relay|photos|v)\.inbsu\.com/);

  assert.match(html, />© 2026 与航</);
  assert.match(html, />向前看</);
  assert.match(html, /class="postmark"/);
  assert.doesNotMatch(html, /hello@inbsu\.com|mailto:/);
  assert.doesNotMatch(html, /在潮州，沿着韩江走到天黑|把愿望写具体|如果你也在路上/);
  assert.doesNotMatch(html, /林屿|linyu\.design/);
});

test("redirects www to the canonical apex domain", async () => {
  const response = await render("https://www.astroyu.com/travel?from=www");
  assert.equal(response.status, 301);
  assert.equal(
    response.headers.get("location"),
    "https://astroyu.com/travel?from=www",
  );
});

test("build emits a deployable Cloudflare Worker", async () => {
  const config = JSON.parse(
    await readFile(new URL("../dist/server/wrangler.json", import.meta.url), "utf8"),
  );

  assert.equal(config.name, "inbsu-com");
  assert.equal(config.main, "index.js");
  assert.equal(config.no_bundle, true);
  assert.deepEqual(config.compatibility_flags, ["nodejs_compat"]);
  assert.equal(config.assets.directory, "../client");
  assert.equal(config.assets.binding, "ASSETS");
  assert.deepEqual(config.routes, [
    { pattern: "astroyu.com", custom_domain: true },
    { pattern: "www.astroyu.com", custom_domain: true },
  ]);
});
