import { useEffect, useMemo, useState } from 'react'
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
  source?: string
}

type CommunityPulse = {
  label: string
  value: string
  detail: string
}

type DashboardState = {
  stocks: Ticker[]
  crypto: Ticker[]
  stories: Story[]
  aiBriefs: Story[]
  socialHeat: CommunityPulse[]
  updatedAt: string
  mode: 'live' | 'demo'
}

const demoStocks: Ticker[] = [
  { symbol: 'NVDA', price: '$1,184.20', change: '+5.4%', sentiment: 'AI infra leader' },
  { symbol: 'MSFT', price: '$468.15', change: '+2.1%', sentiment: 'Cloud + copilots' },
  { symbol: 'SMCI', price: '$1,041.88', change: '+7.8%', sentiment: 'Server momentum' },
]

const demoCrypto: Ticker[] = [
  { symbol: 'BTC', price: '$104,820', change: '+3.9%', sentiment: 'Risk-on flows' },
  { symbol: 'ETH', price: '$5,260', change: '+4.6%', sentiment: 'L2 & ETF buzz' },
  { symbol: 'SOL', price: '$214', change: '+6.2%', sentiment: 'Creator economy lift' },
]

const demoStories: Story[] = [
  {
    tag: 'Stocks',
    title: 'Momentum crowds into AI infrastructure and profitable automation leaders',
    summary:
      'Semiconductor, cloud, and enterprise software names remain the center of attention as buyers chase real AI revenue.',
    pulse: 'High conviction',
    source: 'Market narrative',
  },
  {
    tag: 'Crypto',
    title: 'Utility is outperforming pure hype as liquidity returns to digital assets',
    summary:
      'Bitcoin stays dominant while Ethereum, Solana, and data-driven ecosystems pull in more builders and social traders.',
    pulse: 'Volatile upside',
    source: 'Crypto desk',
  },
  {
    tag: 'AI',
    title: 'Agents and vertical copilots are shaping the next breakout product cycle',
    summary:
      'The market is rewarding products that connect model capability with clear workflow outcomes and distribution.',
    pulse: 'Fast-moving',
    source: 'AI watch',
  },
]

const demoAiBriefs: Story[] = [
  {
    tag: 'AI Signal',
    title: 'Enterprise copilots are becoming distribution channels, not just features',
    summary: 'Teams are bundling automation, analytics, and collaboration into sticky operating layers.',
    pulse: 'Adoption climb',
  },
  {
    tag: 'Builder',
    title: 'Creator tooling is merging brand storytelling with agent-powered production',
    summary: 'Fast content systems are becoming essential for social-first launches and community retention.',
    pulse: 'Creator demand',
  },
]

const demoSocialHeat: CommunityPulse[] = [
  { label: 'Investor buzz', value: '92', detail: 'AI infrastructure and crypto utility dominate discussion.' },
  { label: 'Creator trend', value: '+38%', detail: 'Short-form explainers and live market recap clips are accelerating.' },
  { label: 'Community loops', value: '14', detail: 'High-value feedback loops between traders, founders, and marketers.' },
]

const productSignals = [
  {
    title: 'Live trend radar',
    copy: 'Track breakout symbols, sectors, and narratives across stocks, crypto, and AI in one visual command center.',
  },
  {
    title: 'Social heat layer',
    copy: 'Map how communities, founders, traders, and creators move attention before the mainstream catches up.',
  },
  {
    title: 'Marketing launchpad',
    copy: 'Turn trend discovery into campaign ideas, creator prompts, and community activation for your next launch.',
  },
]

const featureRoadmap = [
  'Live watchlists with market alerts',
  'Social profiles for creators and analysts',
  'AI-generated campaign briefs from trend data',
  'Community rooms around sectors, tokens, and narratives',
]

const formatCurrency = (value: number) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: value >= 1000 ? 0 : 2,
  }).format(value)

const formatChange = (value: number) => `${value >= 0 ? '+' : ''}${value.toFixed(2)}%`

async function fetchCryptoTickers(): Promise<Ticker[]> {
  const response = await fetch(
    'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=3&page=1&sparkline=false',
  )

  if (!response.ok) throw new Error('Crypto feed unavailable')

  const data = (await response.json()) as Array<{
    symbol: string
    current_price: number
    price_change_percentage_24h: number
    name: string
  }>

  return data.map((coin) => ({
    symbol: coin.symbol.toUpperCase(),
    price: formatCurrency(coin.current_price),
    change: formatChange(coin.price_change_percentage_24h ?? 0),
    sentiment: `${coin.name} momentum`,
  }))
}

async function fetchBusinessStories(): Promise<Story[]> {
  const response = await fetch('https://www.reddit.com/r/investing/hot.json?limit=3')
  if (!response.ok) throw new Error('News feed unavailable')

  const json = (await response.json()) as {
    data?: {
      children?: Array<{
        data: {
          title: string
          selftext?: string
          subreddit_name_prefixed?: string
          score?: number
        }
      }>
    }
  }

  return (
    json.data?.children?.slice(0, 3).map(({ data }, index) => ({
      tag: index === 0 ? 'Stocks' : index === 1 ? 'Crypto' : 'Markets',
      title: data.title,
      summary: data.selftext?.slice(0, 160) || 'Community conversation shaping the day’s market narrative.',
      pulse: `${data.score ?? 0} community points`,
      source: data.subreddit_name_prefixed,
    })) ?? []
  )
}

async function fetchAiStories(): Promise<Story[]> {
  const response = await fetch('https://hn.algolia.com/api/v1/search?query=AI&tags=story&hitsPerPage=2')
  if (!response.ok) throw new Error('AI feed unavailable')

  const json = (await response.json()) as {
    hits?: Array<{
      title?: string
      story_text?: string
      points?: number
      author?: string
    }>
  }

  return (
    json.hits?.map((item) => ({
      tag: 'AI',
      title: item.title || 'AI discussion trending now',
      summary: item.story_text?.slice(0, 160) || 'Builders and operators are tracking a fast-moving AI conversation.',
      pulse: `${item.points ?? 0} points`,
      source: item.author ? `by ${item.author}` : 'Hacker News',
    })) ?? []
  )
}

const initialState: DashboardState = {
  stocks: demoStocks,
  crypto: demoCrypto,
  stories: demoStories,
  aiBriefs: demoAiBriefs,
  socialHeat: demoSocialHeat,
  updatedAt: 'Demo mode',
  mode: 'demo',
}

function App() {
  const [dashboard, setDashboard] = useState<DashboardState>(initialState)

  useEffect(() => {
    let cancelled = false

    const loadLiveData = async () => {
      try {
        const [crypto, stories, aiBriefs] = await Promise.all([
          fetchCryptoTickers(),
          fetchBusinessStories(),
          fetchAiStories(),
        ])

        if (cancelled) return

        setDashboard({
          stocks: demoStocks,
          crypto: crypto.length ? crypto : demoCrypto,
          stories: stories.length ? stories : demoStories,
          aiBriefs: aiBriefs.length ? aiBriefs : demoAiBriefs,
          socialHeat: [
            {
              label: 'Investor buzz',
              value: `${88 + Math.floor(Math.random() * 8)}`,
              detail: 'Cross-market attention is clustering around AI, Bitcoin, and infrastructure.',
            },
            {
              label: 'Creator trend',
              value: `+${30 + Math.floor(Math.random() * 15)}%`,
              detail: 'Explainer clips and daily market storytelling are climbing across social channels.',
            },
            {
              label: 'Community loops',
              value: `${10 + Math.floor(Math.random() * 8)}`,
              detail: 'Recurring conversations between traders, founders, and marketers are compounding.',
            },
          ],
          updatedAt: new Date().toLocaleString(),
          mode: 'live',
        })
      } catch {
        if (!cancelled) {
          setDashboard(initialState)
        }
      }
    }

    loadLiveData()
    return () => {
      cancelled = true
    }
  }, [])

  const combinedTickers = useMemo(
    () => [...dashboard.stocks, ...dashboard.crypto],
    [dashboard.stocks, dashboard.crypto],
  )

  const pulseScore = useMemo(() => {
    const total = dashboard.socialHeat.reduce((sum, item) => sum + Number.parseInt(item.value, 10), 0)
    return Number.isNaN(total) ? 92 : Math.min(99, Math.max(80, Math.round(total / dashboard.socialHeat.length)))
  }, [dashboard.socialHeat])

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
            <a href="#markets">Markets</a>
            <a href="#stories">News Pulse</a>
            <a href="#network">Community</a>
          </div>
        </nav>

        <div className="hero-grid">
          <section className="hero-copy">
            <p className="eyebrow">Market intelligence × social momentum</p>
            <h1>Vibrant trend intelligence for stocks, crypto, and AI culture.</h1>
            <p className="hero-text">
              avbyte blends market data, narrative discovery, and social energy into a
              premium dashboard for traders, creators, founders, and marketers.
            </p>
            <div className="hero-actions">
              <a className="primary-btn" href="#markets">
                View live dashboard
              </a>
              <a className="secondary-btn" href="#network">
                See community vision
              </a>
            </div>
            <ul className="hero-metrics">
              <li>
                <strong>{dashboard.mode === 'live' ? 'LIVE' : 'DEMO'}</strong>
                <span>data mode</span>
              </li>
              <li>
                <strong>{combinedTickers.length}</strong>
                <span>tracked movers</span>
              </li>
              <li>
                <strong>{dashboard.aiBriefs.length}</strong>
                <span>AI briefs</span>
              </li>
            </ul>
          </section>

          <aside className="hero-panel">
            <div className="panel-glow" />
            <p className="panel-label">Pulse engine</p>
            <div className="signal-orb">
              <span>Pulse</span>
              <strong>{pulseScore}</strong>
            </div>
            <div className="status-row">
              <span className={`status-pill ${dashboard.mode}`}>{dashboard.mode} mode</span>
              <span className="updated-at">Updated: {dashboard.updatedAt}</span>
            </div>
            <ul className="activity-list">
              {dashboard.socialHeat.map((item) => (
                <li key={item.label}>
                  <strong>{item.label}</strong>
                  <span>{item.value}</span>
                  <p>{item.detail}</p>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </header>

      <main>
        <section className="ticker-strip" id="markets" aria-label="Trending market tickers">
          {combinedTickers.map((ticker) => (
            <article key={ticker.symbol} className="ticker-card">
              <div>
                <p className="ticker-symbol">{ticker.symbol}</p>
                <p className="ticker-sentiment">{ticker.sentiment}</p>
              </div>
              <div className="ticker-values">
                <strong>{ticker.price}</strong>
                <span className={ticker.change.startsWith('-') ? 'negative' : ''}>{ticker.change}</span>
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
            {dashboard.stories.map((story) => (
              <article key={story.title} className="story-card">
                <span className="story-tag">{story.tag}</span>
                <h3>{story.title}</h3>
                <p>{story.summary}</p>
                <div className="story-footer">
                  <strong>{story.pulse}</strong>
                  <span>{story.source}</span>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="section-block ai-layout">
          <div className="section-heading">
            <p className="eyebrow">AI briefings</p>
            <h2>Fresh AI stories for builders and growth teams</h2>
          </div>
          <div className="ai-grid">
            {dashboard.aiBriefs.map((story) => (
              <article key={story.title} className="glass-card ai-card">
                <span className="story-tag">{story.tag}</span>
                <h3>{story.title}</h3>
                <p>{story.summary}</p>
                <div className="story-footer">
                  <strong>{story.pulse}</strong>
                  <span>{story.source}</span>
                </div>
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
            <div className="roadmap-list">
              {featureRoadmap.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
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
