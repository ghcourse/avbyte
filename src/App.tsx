import { useEffect, useMemo, useState } from 'react'
import './App.css'

type Ticker = {
  symbol: string
  price: string
  change: number
  sentiment: string
  volume: string
}

type Story = {
  tag: string
  title: string
  summary: string
  pulse: string
  source: string
  url?: string
}

type SignalCard = {
  label: string
  value: string
  detail: string
}

type FeedMode = 'live' | 'demo'

type DashboardFeeds = {
  stocks: Ticker[]
  crypto: Ticker[]
  topStories: Story[]
  aiSignals: Story[]
  socialSignals: SignalCard[]
  updatedAt: string
  mode: FeedMode
}

type TabKey = 'overview' | 'stocks' | 'crypto' | 'ai' | 'social'

const tabs: Array<{ key: TabKey; label: string; eyebrow: string }> = [
  { key: 'overview', label: 'Overview', eyebrow: 'Command view' },
  { key: 'stocks', label: 'Stocks', eyebrow: 'Equity flow' },
  { key: 'crypto', label: 'Crypto', eyebrow: 'Token momentum' },
  { key: 'ai', label: 'AI', eyebrow: 'Builder watch' },
  { key: 'social', label: 'Social', eyebrow: 'Audience heat' },
]

const formatCurrency = (value: number) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: value >= 1000 ? 0 : 2,
  }).format(value)

const formatCompactCurrency = (value: number) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    notation: 'compact',
    maximumFractionDigits: 1,
  }).format(value)

const formatPct = (value: number) => `${value >= 0 ? '+' : ''}${value.toFixed(2)}%`

const formatUpdatedAt = () =>
  new Date().toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    timeZone: 'UTC',
    timeZoneName: 'short',
  })

const demoStocks: Ticker[] = [
  {
    symbol: 'NVDA',
    price: '$1,184.20',
    change: 5.4,
    sentiment: 'AI compute demand stays dominant',
    volume: '41.2M vol',
  },
  {
    symbol: 'MSFT',
    price: '$468.15',
    change: 2.1,
    sentiment: 'Enterprise AI platform strength',
    volume: '24.8M vol',
  },
  {
    symbol: 'SMCI',
    price: '$1,041.88',
    change: 7.8,
    sentiment: 'Server momentum breakout',
    volume: '8.6M vol',
  },
  {
    symbol: 'AMD',
    price: '$176.42',
    change: 3.18,
    sentiment: 'GPU narrative broadening',
    volume: '52.1M vol',
  },
]

const demoCrypto: Ticker[] = [
  {
    symbol: 'BTC',
    price: '$104,820',
    change: 3.9,
    sentiment: 'Institutional risk appetite is firm',
    volume: '$38.4B 24h',
  },
  {
    symbol: 'ETH',
    price: '$5,260',
    change: 4.6,
    sentiment: 'L2 + staking themes still strong',
    volume: '$19.7B 24h',
  },
  {
    symbol: 'SOL',
    price: '$214',
    change: 6.2,
    sentiment: 'Creator and consumer token energy',
    volume: '$5.9B 24h',
  },
  {
    symbol: 'LINK',
    price: '$21.74',
    change: 5.08,
    sentiment: 'Infrastructure utility bid returning',
    volume: '$1.1B 24h',
  },
]

const demoTopStories: Story[] = [
  {
    tag: 'Macro',
    title: 'Capital is clustering around execution, not just hype',
    summary:
      'Leaders with clear monetization, distribution, and ecosystem gravity are separating from the field across stocks, crypto, and AI.',
    pulse: 'High conviction',
    source: 'Cross-market brief',
  },
  {
    tag: 'Equities',
    title: 'AI infrastructure remains the center of institutional attention',
    summary:
      'Chipmakers, cloud providers, and data stack names continue absorbing the majority of momentum capital.',
    pulse: 'Persistent inflow',
    source: 'Desk signal',
  },
  {
    tag: 'Crypto',
    title: 'Utility narratives are outperforming pure meme-driven flows',
    summary:
      'Assets connected to settlement, compute, and ecosystem usage are seeing healthier participation than short-lived hype cycles.',
    pulse: 'Selective upside',
    source: 'Token monitor',
  },
]

const demoAiSignals: Story[] = [
  {
    tag: 'Product',
    title: 'Vertical copilots are turning into full workflow operating layers',
    summary:
      'The strongest products are bundling automation, analytics, and collaboration into one recurring surface.',
    pulse: 'Adoption climb',
    source: 'AI operator watch',
  },
  {
    tag: 'Distribution',
    title: 'Audience capture is becoming as important as model quality',
    summary:
      'Teams that pair good AI UX with community loops and creator-friendly distribution are moving faster.',
    pulse: 'Go-to-market edge',
    source: 'Growth signal',
  },
  {
    tag: 'Builders',
    title: 'Agents are shifting from demo appeal to measurable business utility',
    summary:
      'Operational use cases with clear ROI are starting to beat generic assistant positioning.',
    pulse: 'Commercialization',
    source: 'Builder brief',
  },
]

const demoSocialSignals: SignalCard[] = [
  {
    label: 'Creator velocity',
    value: '+38%',
    detail: 'Daily explainers, clips, and rapid market commentary formats are scaling fast.',
  },
  {
    label: 'Community loops',
    value: '14 active',
    detail: 'Founder, trader, and analyst feedback loops are driving stronger retention.',
  },
  {
    label: 'Narrative strength',
    value: '92/100',
    detail: 'AI x finance crossover content is winning disproportionate attention right now.',
  },
  {
    label: 'Campaign angle',
    value: 'Launch-ready',
    detail: 'Turn these signals into social rooms, watchlists, and creator-led recaps.',
  },
]

const roadmap = [
  'Live browser-safe feeds with graceful static fallback',
  'Tabbed watchlists for stocks, crypto, and AI narratives',
  'Pinned story modules for campaign-ready market recaps',
  'Social networking layer for traders, creators, and founders',
]

const initialFeeds: DashboardFeeds = {
  stocks: demoStocks,
  crypto: demoCrypto,
  topStories: demoTopStories,
  aiSignals: demoAiSignals,
  socialSignals: demoSocialSignals,
  updatedAt: 'Demo mode',
  mode: 'demo',
}

async function fetchJson<T>(url: string): Promise<T> {
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`)
  }

  return (await response.json()) as T
}

async function fetchCrypto(): Promise<Ticker[]> {
  const data = await fetchJson<
    Array<{
      symbol: string
      current_price: number
      price_change_percentage_24h: number | null
      total_volume: number
      name: string
    }>
  >(
    'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=4&page=1&sparkline=false',
  )

  return data.map((coin) => ({
    symbol: coin.symbol.toUpperCase(),
    price: formatCurrency(coin.current_price),
    change: coin.price_change_percentage_24h ?? 0,
    sentiment: `${coin.name} market momentum`,
    volume: `${formatCompactCurrency(coin.total_volume)} 24h`,
  }))
}

async function fetchStocks(): Promise<Ticker[]> {
  const data = await fetchJson<{
    finance?: {
      result?: Array<{
        quotes?: Array<{
          symbol?: string
          regularMarketPrice?: number
          regularMarketChangePercent?: number
          marketState?: string
        }>
      }>
    }
  }>('https://query1.finance.yahoo.com/v1/finance/search?q=NVDA%20MSFT%20AMD%20SMCI')

  const quotes = data.finance?.result?.[0]?.quotes ?? []
  const wanted = ['NVDA', 'MSFT', 'AMD', 'SMCI']

  const mapped = wanted
    .map((symbol) => {
      const quote = quotes.find((item) => item.symbol === symbol)
      if (!quote?.regularMarketPrice) return null

      return {
        symbol,
        price: formatCurrency(quote.regularMarketPrice),
        change: quote.regularMarketChangePercent ?? 0,
        sentiment: quote.marketState === 'REGULAR' ? 'Market session active' : 'Tracking market flow',
        volume: 'Yahoo Finance signal',
      }
    })
    .filter((item): item is Ticker => item !== null)

  if (!mapped.length) throw new Error('No stock quotes')
  return mapped
}

async function fetchNews(): Promise<Story[]> {
  const data = await fetchJson<{
    data?: {
      children?: Array<{
        data: {
          title: string
          selftext?: string
          score?: number
          subreddit_name_prefixed?: string
          url?: string
        }
      }>
    }
  }>('https://www.reddit.com/r/investing+stocks+cryptocurrency/hot.json?limit=3')

  const stories =
    data.data?.children?.map(({ data: item }, index) => ({
      tag: index === 0 ? 'Markets' : index === 1 ? 'Stocks' : 'Crypto',
      title: item.title,
      summary:
        item.selftext?.trim().slice(0, 160) ||
        'Community discussion shaping the current market narrative and trader attention.',
      pulse: `${item.score ?? 0} points`,
      source: item.subreddit_name_prefixed ?? 'Reddit',
      url: item.url,
    })) ?? []

  if (!stories.length) throw new Error('No market stories')
  return stories
}

async function fetchAiNews(): Promise<Story[]> {
  const data = await fetchJson<{
    hits?: Array<{
      title?: string
      story_text?: string
      points?: number
      author?: string
      url?: string
    }>
  }>('https://hn.algolia.com/api/v1/search?query=AI&tags=story&hitsPerPage=3')

  const stories =
    data.hits?.map((item, index) => ({
      tag: index === 0 ? 'AI' : index === 1 ? 'Builders' : 'Products',
      title: item.title ?? 'AI discussion trending now',
      summary:
        item.story_text?.trim().slice(0, 160) ||
        'Builders and operators are tracking a fast-moving AI conversation around products, tools, and adoption.',
      pulse: `${item.points ?? 0} points`,
      source: item.author ? `by ${item.author}` : 'Hacker News',
      url: item.url,
    })) ?? []

  if (!stories.length) throw new Error('No AI stories')
  return stories
}

function buildSocialSignals(stocks: Ticker[], crypto: Ticker[], aiSignals: Story[], mode: FeedMode): SignalCard[] {
  const avgStockMove = stocks.reduce((sum, item) => sum + item.change, 0) / stocks.length
  const avgCryptoMove = crypto.reduce((sum, item) => sum + item.change, 0) / crypto.length
  const hottestAi = aiSignals[0]?.pulse ?? 'Fresh buzz'

  return [
    {
      label: 'Equity mood',
      value: formatPct(avgStockMove),
      detail: 'Average move across the tracked stock leaders.',
    },
    {
      label: 'Crypto mood',
      value: formatPct(avgCryptoMove),
      detail: 'Average 24h move across the crypto watchlist.',
    },
    {
      label: 'AI chatter',
      value: hottestAi,
      detail: mode === 'live' ? 'Derived from current AI stories.' : 'Fallback signal from demo brief.',
    },
    {
      label: 'Feed mode',
      value: mode === 'live' ? 'Live' : 'Demo',
      detail: mode === 'live' ? 'Browser-accessible public feeds are active.' : 'Showing polished fallback content.',
    },
  ]
}

function App() {
  const [activeTab, setActiveTab] = useState<TabKey>('overview')
  const [feeds, setFeeds] = useState<DashboardFeeds>(initialFeeds)

  useEffect(() => {
    let cancelled = false

    const loadFeeds = async () => {
      try {
        const [stocks, crypto, topStories, aiSignals] = await Promise.all([
          fetchStocks(),
          fetchCrypto(),
          fetchNews(),
          fetchAiNews(),
        ])

        if (cancelled) return

        setFeeds({
          stocks,
          crypto,
          topStories,
          aiSignals,
          socialSignals: buildSocialSignals(stocks, crypto, aiSignals, 'live'),
          updatedAt: formatUpdatedAt(),
          mode: 'live',
        })
      } catch {
        if (cancelled) return

        setFeeds({
          ...initialFeeds,
          socialSignals: buildSocialSignals(demoStocks, demoCrypto, demoAiSignals, 'demo'),
          updatedAt: 'Demo fallback',
          mode: 'demo',
        })
      }
    }

    void loadFeeds()

    return () => {
      cancelled = true
    }
  }, [])

  const currentTab = useMemo(() => tabs.find((tab) => tab.key === activeTab) ?? tabs[0], [activeTab])

  const marketBoard = useMemo(
    () => [
      {
        title: 'Market pulse',
        value: feeds.mode === 'live' ? 'Connected' : 'Fallback',
        detail:
          feeds.mode === 'live'
            ? 'Live public feeds are powering the dashboard.'
            : 'Public feed limits detected, so demo data is keeping the UI polished.',
      },
      {
        title: 'Updated',
        value: feeds.updatedAt,
        detail: 'Refreshes when the app loads in the browser.',
      },
      {
        title: 'Social velocity',
        value: feeds.socialSignals[0]?.value ?? '+0.00%',
        detail: 'A quick pulse from the current tracked signals.',
      },
    ],
    [feeds],
  )

  return (
    <main className="app-shell">
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />
      <div className="ambient ambient-three" />

      <section className="hero-panel">
        <div className="hero-nav">
          <div className="brand-wrap">
            <span className="brand-badge">A</span>
            <div>
              <p className="mini-kicker">avbyte market network</p>
              <h1>Trend intelligence for stocks, crypto, and AI.</h1>
            </div>
          </div>
          <div className="hero-status">
            <span className="status-pill">{feeds.mode === 'live' ? 'Live feeds active' : 'Demo fallback ready'}</span>
            <span className="status-pill muted">GitHub Pages compatible</span>
          </div>
        </div>

        <div className="hero-grid">
          <div className="hero-copy">
            <p className="section-kicker">Live-looking social finance interface</p>
            <p className="hero-text">
              A modern command center with clean tabs, stronger hierarchy, live browser-safe public
              data, and graceful fallback when feeds block static hosting.
            </p>

            <div className="hero-cta-row">
              <button className="primary-button" type="button" onClick={() => setActiveTab('overview')}>
                Open overview
              </button>
              <button className="secondary-button" type="button" onClick={() => setActiveTab('social')}>
                View social heat
              </button>
            </div>

            <div className="signal-strip">
              {marketBoard.map((item) => (
                <article className="signal-card" key={item.title}>
                  <span>{item.title}</span>
                  <strong>{item.value}</strong>
                  <p>{item.detail}</p>
                </article>
              ))}
            </div>
          </div>

          <aside className="hero-highlight">
            <p className="section-kicker">Current focus</p>
            <div className="focus-ring">
              <div>
                <span>Primary narrative</span>
                <strong>{feeds.topStories[0]?.tag ?? 'Markets'} x audience</strong>
              </div>
            </div>
            <ul className="focus-list">
              <li>Track breakout symbols in one place</li>
              <li>Frame stories for creator-friendly content</li>
              <li>Build community around trend discovery</li>
            </ul>
          </aside>
        </div>
      </section>

      <section className="tab-panel">
        <div className="tab-header">
          <div>
            <p className="section-kicker">Navigation</p>
            <h2>{currentTab.label}</h2>
          </div>
          <p className="tab-eyebrow">{currentTab.eyebrow}</p>
        </div>

        <div className="tab-bar" role="tablist" aria-label="Dashboard tabs">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              type="button"
              role="tab"
              aria-selected={activeTab === tab.key}
              className={activeTab === tab.key ? 'tab-button active' : 'tab-button'}
              onClick={() => setActiveTab(tab.key)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === 'overview' && (
          <div className="content-grid overview-grid">
            <section className="content-card story-stack">
              <div className="card-head">
                <div>
                  <p className="section-kicker">Narratives</p>
                  <h3>What is leading attention</h3>
                </div>
                <span className="badge-soft">{feeds.mode === 'live' ? 'Live stories' : 'Fallback brief'}</span>
              </div>

              <div className="story-list">
                {feeds.topStories.map((story) => (
                  <article className="story-card" key={story.title}>
                    <div className="story-topline">
                      <span className="story-tag">{story.tag}</span>
                      <span className="story-pulse">{story.pulse}</span>
                    </div>
                    <h4>{story.title}</h4>
                    <p>{story.summary}</p>
                    <span className="story-source">{story.source}</span>
                  </article>
                ))}
              </div>
            </section>

            <section className="content-card compact-card">
              <div className="card-head">
                <div>
                  <p className="section-kicker">Roadmap</p>
                  <h3>What is built in</h3>
                </div>
              </div>
              <ul className="bullet-list">
                {roadmap.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>
          </div>
        )}

        {activeTab === 'stocks' && (
          <section className="content-card">
            <div className="card-head">
              <div>
                <p className="section-kicker">Trending stocks</p>
                <h3>Leaders on the tape</h3>
              </div>
              <span className="badge-soft">{feeds.mode === 'live' ? 'Live equity view' : 'Demo watchlist'}</span>
            </div>
            <div className="ticker-grid">
              {feeds.stocks.map((item) => (
                <article className="ticker-card" key={item.symbol}>
                  <div className="ticker-topline">
                    <strong>{item.symbol}</strong>
                    <span className={item.change >= 0 ? 'up' : 'down'}>{formatPct(item.change)}</span>
                  </div>
                  <h4>{item.price}</h4>
                  <p>{item.sentiment}</p>
                  <span>{item.volume}</span>
                </article>
              ))}
            </div>
          </section>
        )}

        {activeTab === 'crypto' && (
          <section className="content-card">
            <div className="card-head">
              <div>
                <p className="section-kicker">Trending crypto</p>
                <h3>Digital asset rotation</h3>
              </div>
              <span className="badge-soft">{feeds.mode === 'live' ? 'Live token view' : 'Demo watchlist'}</span>
            </div>
            <div className="ticker-grid">
              {feeds.crypto.map((item) => (
                <article className="ticker-card" key={item.symbol}>
                  <div className="ticker-topline">
                    <strong>{item.symbol}</strong>
                    <span className={item.change >= 0 ? 'up' : 'down'}>{formatPct(item.change)}</span>
                  </div>
                  <h4>{item.price}</h4>
                  <p>{item.sentiment}</p>
                  <span>{item.volume}</span>
                </article>
              ))}
            </div>
          </section>
        )}

        {activeTab === 'ai' && (
          <section className="content-card">
            <div className="card-head">
              <div>
                <p className="section-kicker">AI brief</p>
                <h3>Builder and product momentum</h3>
              </div>
              <span className="badge-soft">{feeds.mode === 'live' ? 'Live AI stories' : 'Curated fallback'}</span>
            </div>
            <div className="story-list ai-grid">
              {feeds.aiSignals.map((story) => (
                <article className="story-card" key={story.title}>
                  <div className="story-topline">
                    <span className="story-tag">{story.tag}</span>
                    <span className="story-pulse">{story.pulse}</span>
                  </div>
                  <h4>{story.title}</h4>
                  <p>{story.summary}</p>
                  <span className="story-source">{story.source}</span>
                </article>
              ))}
            </div>
          </section>
        )}

        {activeTab === 'social' && (
          <section className="content-card">
            <div className="card-head">
              <div>
                <p className="section-kicker">Social heat</p>
                <h3>Campaign and community opportunities</h3>
              </div>
              <span className="badge-soft">Derived signal layer</span>
            </div>
            <div className="signal-grid">
              {feeds.socialSignals.map((signal) => (
                <article className="metric-card" key={signal.label}>
                  <span>{signal.label}</span>
                  <strong>{signal.value}</strong>
                  <p>{signal.detail}</p>
                </article>
              ))}
            </div>
          </section>
        )}
      </section>
    </main>
  )
}

export default App
