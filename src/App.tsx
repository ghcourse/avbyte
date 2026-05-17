import './App.css'

type Ticker = {
  symbol: string
  price: string
  change: string
  sentiment: string
}

type Story = {
  tag: string
  title: string
  summary: string
  pulse: string
}

const marketTickers: Ticker[] = [
  { symbol: 'NVDA', price: '$1,184.20', change: '+5.4%', sentiment: 'AI infra leader' },
  { symbol: 'MSFT', price: '$468.15', change: '+2.1%', sentiment: 'Cloud + copilots' },
  { symbol: 'SMCI', price: '$1,041.88', change: '+7.8%', sentiment: 'Server momentum' },
  { symbol: 'BTC', price: '$104,820', change: '+3.9%', sentiment: 'Risk-on flows' },
  { symbol: 'ETH', price: '$5,260', change: '+4.6%', sentiment: 'L2 & ETF buzz' },
  { symbol: 'SOL', price: '$214', change: '+6.2%', sentiment: 'Creator economy lift' },
]

const topStories: Story[] = [
  {
    tag: 'Stocks',
    title: 'Momentum crowds into AI infrastructure and profitable automation leaders',
    summary:
      'A fresh wave of buyers is rotating into semiconductor, cloud, and enterprise software names that can show real revenue from AI products.',
    pulse: 'High conviction',
  },
  {
    tag: 'Crypto',
    title: 'Liquidity is back, but the market is rewarding utility over pure hype',
    summary:
      'Bitcoin remains the macro anchor while Ethereum, Solana, and data-focused protocols gain attention from builders and social traders.',
    pulse: 'Volatile upside',
  },
  {
    tag: 'AI',
    title: 'Agents, creator tools, and vertical copilots are winning the narrative',
    summary:
      'The next breakout products are blending distribution, community, and workflow automation rather than chasing raw model novelty alone.',
    pulse: 'Fast-moving',
  },
]

const productSignals = [
  {
    title: 'Live trend radar',
    copy: 'Track breakout symbols, sectors, and narratives across stocks, crypto, and AI in one visual command center.',
  },
  {
    title: 'Social heat layer',
    copy: 'Map how communities, founders, traders, and creators are moving attention before the mainstream catches up.',
  },
  {
    title: 'Marketing launchpad',
    copy: 'Turn trend discovery into campaign ideas, creator prompts, and community activation for your next big launch.',
  },
]

const activityFeed = [
  'AI chips + cloud tooling dominate watchlists in North America',
  'Memecoins cool while infrastructure tokens keep social volume',
  'Retail attention spikes around autonomous agents and creator automation',
  'Brands experiment with real-time investor + community storytelling',
]

function App() {
  return (
    <div className="page-shell">
      <header className="hero-card">
        <nav className="topbar">
          <div>
            <span className="brand-mark">AV</span>
            <span className="brand-name">avbyte</span>
          </div>
          <div className="topbar-links">
            <a href="#signals">Signals</a>
            <a href="#stories">News Pulse</a>
            <a href="#network">Community</a>
          </div>
        </nav>

        <div className="hero-grid">
          <section className="hero-copy">
            <p className="eyebrow">Market intelligence × social momentum</p>
            <h1>Vibrant trend intelligence for stocks, crypto, and AI culture.</h1>
            <p className="hero-text">
              avbyte is a bold marketing and social networking concept that blends
              live market stories, breakout assets, and community energy into one
              immersive dashboard.
            </p>
            <div className="hero-actions">
              <a className="primary-btn" href="#network">
                Explore the concept
              </a>
              <a className="secondary-btn" href="#stories">
                See trend highlights
              </a>
            </div>
            <ul className="hero-metrics">
              <li>
                <strong>24/7</strong>
                <span>cross-market pulse</span>
              </li>
              <li>
                <strong>3</strong>
                <span>trend engines</span>
              </li>
              <li>
                <strong>∞</strong>
                <span>campaign angles</span>
              </li>
            </ul>
          </section>

          <aside className="hero-panel">
            <div className="panel-glow" />
            <p className="panel-label">Trending now</p>
            <div className="signal-orb">
              <span>Pulse</span>
              <strong>92</strong>
            </div>
            <ul className="activity-list">
              {activityFeed.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </aside>
        </div>
      </header>

      <main>
        <section className="ticker-strip" aria-label="Trending market tickers">
          {marketTickers.map((ticker) => (
            <article key={ticker.symbol} className="ticker-card">
              <div>
                <p className="ticker-symbol">{ticker.symbol}</p>
                <p className="ticker-sentiment">{ticker.sentiment}</p>
              </div>
              <div className="ticker-values">
                <strong>{ticker.price}</strong>
                <span>{ticker.change}</span>
              </div>
            </article>
          ))}
        </section>

        <section className="section-block" id="signals">
          <div className="section-heading">
            <p className="eyebrow">Core experience</p>
            <h2>Built as a social-first market discovery platform</h2>
          </div>
          <div className="signal-grid">
            {productSignals.map((signal) => (
              <article key={signal.title} className="glass-card">
                <h3>{signal.title}</h3>
                <p>{signal.copy}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section-block story-layout" id="stories">
          <div className="section-heading">
            <p className="eyebrow">Latest market narratives</p>
            <h2>What is moving the conversation right now</h2>
          </div>
          <div className="story-grid">
            {topStories.map((story) => (
              <article key={story.title} className="story-card">
                <span className="story-tag">{story.tag}</span>
                <h3>{story.title}</h3>
                <p>{story.summary}</p>
                <strong>{story.pulse}</strong>
              </article>
            ))}
          </div>
        </section>

        <section className="section-block network-layout" id="network">
          <div className="network-card large">
            <p className="eyebrow">Marketing angle</p>
            <h2>Made to turn attention into community and brand momentum</h2>
            <p>
              avbyte is positioned like a premium digital venue: part insight terminal,
              part media brand, part social graph for trend-chasing communities.
            </p>
          </div>
          <div className="network-card">
            <p className="mini-label">Audience</p>
            <ul>
              <li>Retail traders</li>
              <li>Crypto-native founders</li>
              <li>AI builders</li>
              <li>Growth marketers</li>
            </ul>
          </div>
          <div className="network-card">
            <p className="mini-label">Why it stands out</p>
            <ul>
              <li>Bright visual identity</li>
              <li>Story-led market discovery</li>
              <li>Community-native features</li>
              <li>Launch-ready brand voice</li>
            </ul>
          </div>
        </section>
      </main>
    </div>
  )
}

export default App
