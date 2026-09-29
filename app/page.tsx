/* 暂时隐藏的文章、计划与联系栏目保存在 git 提交 3bb8b67 的 app/page.tsx 中，需要时可从那里恢复。 */

// Relay deliberately names no provider, so the homepage doesn't advertise what runs behind it.
const apps: { name: string; href: string; domain: string; note: string; provider?: string; providerHref?: string }[] = [
  { name: "Relay", href: "https://relay.astroyu.com", domain: "relay.astroyu.com", note: "看世界" },
  { name: "Photos", href: "https://photos.astroyu.com", domain: "photos.astroyu.com", note: "忆往昔", provider: "Immich", providerHref: "https://immich.app/" },
  { name: "Videos", href: "https://v.astroyu.com", domain: "v.astroyu.com", note: "藏所爱", provider: "Jellyfin", providerHref: "https://jellyfin.org/" },
];

function Postmark() {
  return (
    <svg className="postmark" viewBox="0 0 120 120" aria-hidden="true">
      <defs>
        <path id="postmark-ring" d="M60 60 m-40 0 a40 40 0 1 1 80 0 a40 40 0 1 1 -80 0" />
      </defs>
      <circle cx="60" cy="60" r="52" />
      <circle cx="60" cy="60" r="31" />
      <text className="postmark-ring"><textPath href="#postmark-ring" textLength="246" lengthAdjust="spacing">TEMPLE OF HEAVEN · BEIJING · JANUARY 2026 ·</textPath></text>
      <text className="postmark-day" x="60" y="58" textAnchor="middle">01.31</text>
      <text className="postmark-year" x="60" y="72" textAnchor="middle">天坛</text>
    </svg>
  );
}

export default function Home() {
  return (
    <main className="page" id="top">
      <header className="top">
        <a className="wordmark" href="#top" aria-label="Back to top">
          与航<span>。</span>
        </a>
      </header>

      <section className="hero">
        {/* 两句并列、同等分量，每个分句各占一行。 */}
        <h1 className="intro">
          <span className="line"><span>顺路的话，</span><span>我们看一样的风景。</span></span>
          <span className="line"><span>不顺路的话，</span><span>祝我们都能看到自己想要的风景。</span></span>
        </h1>

        <figure className="postcard">
          <div className="postcard-frame">
            <img
              src="/hero-yuhang-temple.jpg"
              alt="与航和朋友在天坛的手绘旅行画"
              width={1086}
              height={1448}
              fetchPriority="high"
              decoding="async"
            />
          </div>
          <Postmark />
          <figcaption><span>天地这么大，</span><span>我们恰好在这一刻并肩而立。</span></figcaption>
        </figure>
      </section>

      <section className="apps-section" aria-labelledby="apps-title">
        <h2 id="apps-title" className="label">Apps</h2>
        <ul className="apps">
          {apps.map((app, index) => (
            <li className="app" key={app.name}>
              <span className="app-index" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
              <a className="app-link" href={app.href} target="_blank" rel="noreferrer">{app.name}</a>
              <span className="app-note">{app.note}</span>
              <span className="app-foot">
                <span className="app-domain">{app.domain}</span>
                {app.provider && (
                  <a className="app-provider" href={app.providerHref} target="_blank" rel="noreferrer">{app.provider}</a>
                )}
              </span>
            </li>
          ))}
        </ul>
      </section>

      <footer className="footer">
        <span>© 2026 与航</span>
        <span>向前看</span>
      </footer>
    </main>
  );
}
