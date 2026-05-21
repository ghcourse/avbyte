import { useMemo, useState } from 'react'
import './App.css'

type TabKey = 'ideas' | 'blueprints' | 'market' | 'stocks' | 'crypto' | 'ai' | 'sources'

type Idea = {
  title: string
  niche: string
  model: string
  whyNow: string
  monetization: string
  buildAngle: string
  signal: string
  source: string
}

type Blueprint = {
  title: string
  outcome: string
  stack: string
  moat: string
}

type BriefCard = {
  title: string
  summary: string
  pulse: string
}

type Ticker = {
  symbol: string
  price: string
  change: number
  note: string
}

type SignalCard = {
  label: string
  value: string
  detail: string
}

const tabs: Array<{ key: TabKey; label: string; eyebrow: string }> = [
  { key: 'ideas', label: 'Idea Feed', eyebrow: 'Passive income' },
  { key: 'blueprints', label: 'Build Blueprints', eyebrow: 'Execution' },
  { key: 'market', label: 'Market Brief', eyebrow: 'Daily pulse' },
  { key: 'stocks', label: 'Stocks', eyebrow: 'Trend watch' },
  { key: 'crypto', label: 'Crypto', eyebrow: 'Momentum' },
  { key: 'ai', label: 'AI News', eyebrow: 'Builder signals' },
  { key: 'sources', label: 'Research Sources', eyebrow: 'Daily mining' },
]

const lastUpdated = '21 May 2026 · 22:40 UTC'

const ideaFeed: Idea[] = [
  {
    title: 'Client intake + approvals hub for niche agencies',
    niche: 'Small marketing and creative agencies',
    model: 'Micro-SaaS',
    whyNow:
      'Agency operators keep complaining about juggling forms, email, Slack, and Google Drive just to get assets approved and projects kicked off.',
    monetization: '$49–199/mo',
    buildAngle: 'Start with onboarding checklists, asset collection, and approval trails.',
    signal: 'Pain is frequent, easy to demo, and tied to revenue delivery.',
    source: 'Repeated Reddit pain in r/agency, r/PPC, and service-business founder posts.',
  },
  {
    title: 'Recruiter inbox-to-pipeline tracker',
    niche: 'Boutique recruiting firms',
    model: 'Micro-SaaS',
    whyNow:
      'Small teams still lose candidate context across texts, emails, referrals, and job boards because full ATS suites feel bloated or overpriced.',
    monetization: '$39–149/mo',
    buildAngle: 'Unify candidate capture first, then layer reporting and follow-up reminders.',
    signal: 'Spreadsheet replacement with clear workflow ROI.',
    source: 'Reddit recruiting communities and founder chatter around messy inbound hiring ops.',
  },
  {
    title: 'Maintenance update portal for small landlords',
    niche: 'Landlords with small portfolios',
    model: 'Micro-SaaS',
    whyNow:
      'Smaller landlords want something simpler than enterprise property software, especially for repairs, updates, and tenant communication.',
    monetization: '$29–99/mo',
    buildAngle: 'Focus on maintenance requests, status updates, vendor coordination, and tenant visibility.',
    signal: 'Simple recurring pain, though more price sensitive than agency tools.',
    source: 'Posts in landlord and property-management communities asking for lightweight tools.',
  },
  {
    title: 'Premium niche dashboard template packs',
    niche: 'Founders, creators, agencies',
    model: 'Digital product',
    whyNow:
      'Fast-launch template businesses still work when the offer is polished, category-specific, and tied to an obvious business use case.',
    monetization: '$49–299 one-time',
    buildAngle: 'Sell templates first, then upsell a hosted version or premium data layer.',
    signal: 'Fastest route to validating demand and funding the next product step.',
    source: 'Strong creator economy demand for polished, ready-made operating dashboards.',
  },
  {
    title: 'AI workflow packs for service operators',
    niche: 'Agencies, consultants, recruiters',
    model: 'Digital product + subscription upsell',
    whyNow:
      'Buyers are more willing to pay for done-for-you automations and prompt systems than generic “learn AI” content.',
    monetization: '$79–499 upfront + membership upsell',
    buildAngle: 'Package SOPs, prompts, templates, and automations around one workflow at a time.',
    signal: 'Strong bridge from one-off product sales into recurring revenue.',
    source: 'Social content trends around operations AI, automation kits, and workflow templates.',
  },
  {
    title: 'Curated market brief membership for busy builders',
    niche: 'Retail investors and online builders',
    model: 'Membership',
    whyNow:
      'People want a compact read on stocks, crypto, and AI without doomscrolling ten different feeds every morning.',
    monetization: '$10–29/mo',
    buildAngle: 'Bundle daily summaries, watchlists, and idea breakdowns into a habit product.',
    signal: 'Slower start, but content compounds well if consistency is real.',
    source: 'Cross-platform demand for concise, trusted curation over noisy hot takes.',
  },
]

const buildBlueprints: Blueprint[] = [
  {
    title: 'Fast validation path',
    outcome: 'Launch a paid MVP in 7–14 days',
    stack: 'Landing page + Airtable/Supabase + Stripe + manual concierge backend',
    moat: 'Speed and buyer feedback before writing too much product code.',
  },
  {
    title: 'Passive-ish product ladder',
    outcome: 'Move from services to recurring revenue',
    stack: 'Template/product first, then membership, then SaaS wedge',
    moat: 'Audience and customer trust compound as you climb the ladder.',
  },
  {
    title: 'Best buyer pattern',
    outcome: 'Sell to people already wasting time in spreadsheets',
    stack: 'Simple dashboard, reminders, intake forms, notifications, exports',
    moat: 'Workflow ownership is harder to replace than content alone.',
  },
  {
    title: 'Distribution edge',
    outcome: 'Use content as acquisition, not just branding',
    stack: 'Daily idea posts + weekly roundup + lead magnet + email capture',
    moat: 'Organic distribution lowers CAC and makes the product feel alive.',
  },
]

const marketBrief: BriefCard[] = [
  {
    title: 'Stocks trend',
    summary:
      'AI infrastructure names still shape sentiment, but buyers are getting more selective. The healthier signal is revenue durability rather than pure narrative momentum.',
    pulse: 'Risk-on, but more disciplined',
  },
  {
    title: 'Crypto trend',
    summary:
      'Majors keep leadership when macro is calm. The better opportunities are still in quality infrastructure and real utility, not random short-lived meme spikes.',
    pulse: 'Momentum intact',
  },
  {
    title: 'AI news',
    summary:
      'The market is rewarding AI products that own a workflow and save real time. Generic wrappers are fading; vertical execution keeps getting stronger.',
    pulse: 'Workflow era',
  },
]

const stockTickers: Ticker[] = [
  { symbol: 'NVDA', price: '$1,184.20', change: 5.4, note: 'Still the core AI sentiment leader.' },
  { symbol: 'MSFT', price: '$468.15', change: 2.1, note: 'Distribution plus enterprise trust is a huge edge.' },
  { symbol: 'AMD', price: '$176.42', change: 3.18, note: 'Watch as a second-order AI infrastructure beneficiary.' },
  { symbol: 'SMCI', price: '$1,041.88', change: 7.8, note: 'High-beta infra momentum remains powerful and volatile.' },
]

const cryptoTickers: Ticker[] = [
  { symbol: 'BTC', price: '$104,820', change: 3.9, note: 'Primary macro proxy and institutional attention magnet.' },
  { symbol: 'ETH', price: '$5,260', change: 4.6, note: 'Still relevant for ecosystem depth and network effects.' },
  { symbol: 'SOL', price: '$214', change: 6.2, note: 'Keeps strong consumer and creator attention.' },
  { symbol: 'LINK', price: '$21.74', change: 5.08, note: 'Infrastructure and data-rail positioning stays compelling.' },
]

const aiSignals: SignalCard[] = [
  {
    label: 'Best builder pattern',
    value: 'Vertical beats generic',
    detail: 'Niche tools that replace a real workflow still monetize better than broad assistant products.',
  },
  {
    label: 'Launch edge',
    value: 'Distribution first',
    detail: 'Founders with an audience or repeatable daily content loop can validate faster and cheaper.',
  },
  {
    label: 'Strongest wedge',
    value: 'Replace spreadsheets',
    detail: 'The cleanest opportunities still come from teams duct-taping Sheets, email, and forms together.',
  },
  {
    label: 'Income logic',
    value: 'Recurring > one-off',
    detail: 'One-time products help validate, but recurring workflow value is what compounds.',
  },
]

const sourceSignals: SignalCard[] = [
  {
    label: 'Primary source',
    value: 'Reddit pain threads',
    detail: 'The best ideas come from repeated complaints, workaround posts, and “what tool do you use?” discussions.',
  },
  {
    label: 'Social pattern',
    value: 'Curated summaries win',
    detail: 'Short daily research recaps and specific breakdowns outperform vague hustle content.',
  },
  {
    label: 'Update cadence',
    value: 'Daily refresh ready',
    detail: 'This page is structured so idea cards and briefs can be swapped daily without redesigning the site.',
  },
  {
    label: 'Filter rule',
    value: 'Proof over hype',
    detail: 'The bar is practical demand, buyer budget, and simple implementation — not just trend-chasing.',
  },
]

const updateChecklist = [
  'Pull fresh Reddit and social-media pain points into the idea feed.',
  'Refresh Market Brief summary cards for stocks, crypto, and AI.',
  'Swap top opportunity callout when a stronger niche appears.',
  'Keep only ideas that have a clear buyer, monetization path, and visible market signal.',
]

const formatPct = (value: number) => `${value >= 0 ? '+' : ''}${value.toFixed(2)}%`

function App() {
  const [activeTab, setActiveTab] = useState<TabKey>('ideas')

  const heroStats = useMemo(
    () => [
      { label: 'Ideas tracked', value: String(ideaFeed.length) },
      { label: 'Update cadence', value: 'Daily' },
      { label: 'Best model', value: 'Micro-SaaS' },
    ],
    [],
  )

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
            <span className="status-pill">Updated {lastUpdated}</span>
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
              {heroStats.map((item) => (
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
                <strong>Agency intake + approvals SaaS</strong>
              </div>
            </div>
            <ul className="focus-list">
              <li>High-frequency operational pain</li>
              <li>Buyer already spends money to solve it</li>
              <li>Easy to start simple and expand later</li>
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
            {ideaFeed.map((idea) => (
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
            {buildBlueprints.map((item) => (
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
                {marketBrief.map((story) => (
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
                {updateChecklist.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </aside>
          </div>
        )}

        {activeTab === 'stocks' && (
          <div className="ticker-grid">
            {stockTickers.map((ticker) => (
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
            {cryptoTickers.map((ticker) => (
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
            {aiSignals.map((item) => (
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
              {sourceSignals.map((item) => (
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
                <li>Reddit founder, agency, recruiting, landlord, and micro-SaaS communities</li>
                <li>X/Twitter creator and operator posts for workflow pain and monetization angles</li>
                <li>AI builder/news feeds for workflow ownership and startup momentum</li>
                <li>Market headlines that shape what buyers pay attention to this week</li>
              </ul>
            </aside>
          </div>
        )}
      </section>
    </div>
  )
}

export default App
