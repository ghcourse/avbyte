import { useState } from 'react'
import './App.css'
import { siteData } from './data/siteData'

type TabKey = 'ideas' | 'blueprints' | 'market' | 'stocks' | 'crypto' | 'ai' | 'sources'

const tabs: Array<{ key: TabKey; label: string; eyebrow: string }> = [
  { key: 'ideas', label: 'Idea Feed', eyebrow: 'Passive income' },
  { key: 'blueprints', label: 'Build Blueprints', eyebrow: 'Execution' },
  { key: 'market', label: 'Market Brief', eyebrow: 'Daily pulse' },
  { key: 'stocks', label: 'Stocks', eyebrow: 'Trend watch' },
  { key: 'crypto', label: 'Crypto', eyebrow: 'Momentum' },
  { key: 'ai', label: 'AI News', eyebrow: 'Builder signals' },
  { key: 'sources', label: 'Research Sources', eyebrow: 'Daily mining' },
]

const formatPct = (value: number) => `${value >= 0 ? '+' : ''}${value.toFixed(2)}%`

function App() {
  const [activeTab, setActiveTab] = useState<TabKey>('ideas')

  return (
    <div className="app-shell">
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />
      <div className="ambient ambient-three" />

      <section className="hero-panel">
        <div className="hero-nav">
          <div className="brand-wrap">
            <div className="brand-badge">AV</div>
            <div>
              <p className="mini-kicker">AV Byte · Passive Income Radar</p>
              <h1>Daily passive-income ideas worth building, not just scrolling past.</h1>
            </div>
          </div>

          <div className="hero-status">
            <span className="status-pill">Updated {siteData.lastUpdated}</span>
            <span className="status-pill muted">Stocks · Crypto · AI · Reddit · Social</span>
          </div>
        </div>

        <div className="hero-grid">
          <div className="hero-copy">
            <p className="section-kicker">What this page does</p>
            <p className="hero-text">
              This site tracks practical ideas for passive-ish income with a bias toward niche
              micro-SaaS, templates, memberships, and AI workflow products. Instead of generic side
              hustle fluff, each idea is framed around buyer pain, monetization, build path, and
              why it matters now.
            </p>

            <div className="hero-cta-row">
              <button className="primary-button" onClick={() => setActiveTab('ideas')}>
                Explore idea feed
              </button>
              <button className="secondary-button" onClick={() => setActiveTab('market')}>
                Read market brief
              </button>
            </div>

            <div className="signal-strip">
              {siteData.heroStats.map((item) => (
                <article key={item.label} className="signal-card">
                  <span>{item.label}</span>
                  <strong>{item.value}</strong>
                  <p>Focused on compact, monetizable opportunities with visible market demand.</p>
                </article>
              ))}
            </div>
          </div>

          <aside className="hero-highlight">
            <p className="section-kicker">Top current wedge</p>
            <div className="focus-ring">
              <div>
                <span>Best opportunity right now</span>
                <strong>{siteData.topOpportunity.title}</strong>
              </div>
            </div>
            <ul className="focus-list">
              {siteData.topOpportunity.bullets.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </aside>
        </div>
      </section>

      <section className="tab-panel">
        <div className="tab-header">
          <div>
            <p className="section-kicker">Research workspace</p>
            <h2>Idea intelligence + market context</h2>
          </div>
          <span className="status-pill">Source-led, updated for repeat use</span>
        </div>

        <div className="tab-bar">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              className={`tab-button ${activeTab === tab.key ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.key)}
            >
              <span className="tab-eyebrow">{tab.eyebrow}</span>
              <strong>{tab.label}</strong>
            </button>
          ))}
        </div>

        {activeTab === 'ideas' && (
          <div className="content-grid idea-grid">
            {siteData.ideas.map((idea) => (
              <article key={idea.title} className="content-card idea-card">
                <div className="card-head">
                  <div>
                    <p className="section-kicker">{idea.niche}</p>
                    <h3>{idea.title}</h3>
                  </div>
                  <span className="badge-soft">{idea.model}</span>
                </div>
                <p className="card-copy">{idea.whyNow}</p>
                <div className="idea-meta">
                  <div className="metric-card compact">
                    <span>Monetization</span>
                    <strong>{idea.monetization}</strong>
                  </div>
                  <div className="metric-card compact">
                    <span>Signal</span>
                    <strong>{idea.signal}</strong>
                  </div>
                </div>
                <div className="idea-build-box">
                  <span>Build angle</span>
                  <p>{idea.buildAngle}</p>
                </div>
                <p className="story-source">{idea.source}</p>
              </article>
            ))}
          </div>
        )}

        {activeTab === 'blueprints' && (
          <div className="signal-grid blueprint-grid">
            {siteData.blueprints.map((item) => (
              <article key={item.title} className="signal-card blueprint-card">
                <span>{item.title}</span>
                <strong>{item.outcome}</strong>
                <p>{item.stack}</p>
                <div className="blueprint-moat">{item.moat}</div>
              </article>
            ))}
          </div>
        )}

        {activeTab === 'market' && (
          <div className="content-grid overview-grid">
            <article className="content-card">
              <div className="card-head">
                <div>
                  <p className="section-kicker">Daily read</p>
                  <h3>Market brief</h3>
                </div>
                <span className="badge-soft">Stocks · Crypto · AI</span>
              </div>
              <div className="story-list">
                {siteData.marketBrief.map((story) => (
                  <article key={story.title} className="story-card">
                    <div className="story-meta-row story-topline">
                      <span className="story-tag">{story.title}</span>
                      <span className="story-pulse">{story.pulse}</span>
                    </div>
                    <p>{story.summary}</p>
                  </article>
                ))}
              </div>
            </article>

            <aside className="content-card">
              <div className="card-head">
                <div>
                  <p className="section-kicker">Daily update workflow</p>
                  <h3>How this page stays useful</h3>
                </div>
              </div>
              <ul className="bullet-list">
                {siteData.updateChecklist.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </aside>
          </div>
        )}

        {activeTab === 'stocks' && (
          <div className="ticker-grid">
            {siteData.stockTickers.map((ticker) => (
              <article key={ticker.symbol} className="ticker-card">
                <div className="ticker-topline">
                  <strong>{ticker.symbol}</strong>
                  <span className={ticker.change >= 0 ? 'positive' : 'negative'}>
                    {formatPct(ticker.change)}
                  </span>
                </div>
                <h3>{ticker.price}</h3>
                <p>{ticker.note}</p>
              </article>
            ))}
          </div>
        )}

        {activeTab === 'crypto' && (
          <div className="ticker-grid">
            {siteData.cryptoTickers.map((ticker) => (
              <article key={ticker.symbol} className="ticker-card">
                <div className="ticker-topline">
                  <strong>{ticker.symbol}</strong>
                  <span className={ticker.change >= 0 ? 'positive' : 'negative'}>
                    {formatPct(ticker.change)}
                  </span>
                </div>
                <h3>{ticker.price}</h3>
                <p>{ticker.note}</p>
              </article>
            ))}
          </div>
        )}

        {activeTab === 'ai' && (
          <div className="signal-grid">
            {siteData.aiSignals.map((item) => (
              <article key={item.label} className="signal-card">
                <span>{item.label}</span>
                <strong>{item.value}</strong>
                <p>{item.detail}</p>
              </article>
            ))}
          </div>
        )}

        {activeTab === 'sources' && (
          <div className="content-grid overview-grid">
            <div className="signal-grid source-grid">
              {siteData.sourceSignals.map((item) => (
                <article key={item.label} className="signal-card">
                  <span>{item.label}</span>
                  <strong>{item.value}</strong>
                  <p>{item.detail}</p>
                </article>
              ))}
            </div>
            <aside className="content-card source-note-card">
              <div className="card-head">
                <div>
                  <p className="section-kicker">What to mine daily</p>
                  <h3>Source checklist</h3>
                </div>
              </div>
              <ul className="bullet-list">
                {siteData.sourceChecklist.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </aside>
          </div>
        )}
      </section>
    </div>
  )
}

export default App
