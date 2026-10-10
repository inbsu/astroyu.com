/* 暂时隐藏的文章、计划与联系栏目保存在 git 提交 3bb8b67 的 app/page.tsx 中，需要时可从那里恢复。 */

// Icons share the postcard's language: ink line work on paper, one orange accent each.
const icons = {
  compass: (
    <>
      <circle cx="16" cy="16" r="10.5" />
      <g transform="rotate(35 16 16)">
        <path className="accent" d="M16 7.2 19.4 16h-6.8z" />
        <path d="M12.6 16h6.8L16 24.8z" />
      </g>
    </>
  ),
  photos: (
    <>
      <rect x="6.5" y="7" width="15" height="18" rx="1.5" transform="rotate(-9 14 16)" className="faint" />
      <rect x="10" y="8" width="15" height="18" rx="1.5" className="card" />
      <path d="M12 22.5 15.5 18l2.5 2.5 1.8-1.8 3.2 3.8" />
      <circle cx="20.8" cy="12.6" r="1.7" className="accent" />
    </>
  ),
  screen: (
    <>
      <rect x="5.5" y="8" width="21" height="14.5" rx="2.5" />
      <path d="M12.5 26h7" />
      <path className="accent" d="M14.2 12.3v5.9l5-2.95z" />
    </>
  ),
};

const apps = [
  { name: "Relay", href: "https://relay.astroyu.com", note: "看世界", icon: icons.compass },
  { name: "Photos", href: "https://photos.astroyu.com", note: "忆往昔", icon: icons.photos },
  { name: "Videos", href: "https://v.astroyu.com", note: "藏所爱", icon: icons.screen },
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
          {apps.map((app) => (
            <li key={app.name}>
              <a className="app" href={app.href} target="_blank" rel="noreferrer">
                <span className="app-icon" aria-hidden="true">
                  <svg viewBox="0 0 32 32">{app.icon}</svg>
                </span>
                <span className="app-name">{app.name}</span>
                <span className="app-note">{app.note}</span>
              </a>
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
