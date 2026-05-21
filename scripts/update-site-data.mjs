import fs from 'node:fs/promises'

const filePath = new URL('../src/data/siteData.ts', import.meta.url)

const now = new Date()
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const stamp = `${String(now.getUTCDate()).padStart(2, '0')} ${months[now.getUTCMonth()]} ${now.getUTCFullYear()} · ${String(now.getUTCHours()).padStart(2, '0')}:${String(now.getUTCMinutes()).padStart(2, '0')} UTC`

const baseIdeas = [
  {
    title: 'Client intake + approvals hub for niche agencies',
    niche: 'Small marketing and creative agencies',
    model: 'Micro-SaaS',
    whyNow:
      'Agency operators keep complaining about juggling forms, email, Slack, and Google Drive just to get assets approved and projects kicked off.',
    monetization: '$49–199/mo',
    buildAngle: 'Start with onboarding checklists, asset collection, and approval trails.',
    signal: 'Pain is frequent, easy to demo, and tied to revenue delivery.',
    source: 'Operator pattern: agencies still stitch onboarding together with forms, docs, and email.',
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
    source: 'Operator pattern: recruiting teams keep patching workflows across inboxes and spreadsheets.',
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
    source: 'Operator pattern: lightweight property workflows still beat bloated all-in-one suites for small owners.',
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
    source: 'Creator pattern: polished operating assets still convert when they save setup time.',
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
    source: 'AI operator pattern: practical workflow kits beat abstract education.',
  },
]

const rotatingIdeas = [
  {
    title: 'Quote follow-up tracker for local service businesses',
    niche: 'Roofers, HVAC, landscapers, contractors',
    model: 'Micro-SaaS',
    whyNow:
      'Small operators still lose revenue because estimates go cold in texts, email threads, and manual callbacks.',
    monetization: '$39–129/mo',
    buildAngle: 'Track sent quotes, reminders, follow-up status, and close-rate reporting.',
    signal: 'Revenue-adjacent pain with direct ROI is easier to sell.',
    source: 'Live business-signal rotation: quote follow-up remains a recurring operational leak for local service teams.',
  },
  {
    title: 'Membership library of niche AI SOPs',
    niche: 'Operators, creators, and agency owners',
    model: 'Membership',
    whyNow:
      'People want applied AI workflows they can drop into the business today instead of consuming more abstract theory.',
    monetization: '$12–39/mo',
    buildAngle: 'Ship a growing library of prompts, SOPs, automations, and implementation notes.',
    signal: 'Content plus utility can compound when updated consistently.',
    source: 'Live business-signal rotation: practical AI implementation remains an active demand theme.',
  },
  {
    title: 'Customer onboarding portal for boutique B2B firms',
    niche: 'Fractional teams, consultants, and boutique software shops',
    model: 'Micro-SaaS',
    whyNow:
      'Small B2B firms still patch onboarding together with forms, docs, Looms, and email checklists.',
    monetization: '$49–179/mo',
    buildAngle: 'Combine intake, milestones, document collection, and status visibility.',
    signal: 'Strong spreadsheet-replacement pattern with premium buyer potential.',
    source: 'Live business-signal rotation: onboarding chaos is still a sticky, monetizable workflow problem.',
  },
]

const topOpportunities = [
  {
    title: 'Agency intake + approvals SaaS',
    bullets: [
      'Frequent pain tied directly to client delivery',
      'Easy to validate with agencies already using messy workarounds',
      'Natural path from MVP to higher-value workflow ownership',
    ],
  },
  {
    title: 'Quote follow-up CRM for local service businesses',
    bullets: [
      'Clear ROI when lost quotes are recovered',
      'Simple feature scope for a fast MVP',
      'Recurring operational need instead of one-time novelty',
    ],
  },
  {
    title: 'AI SOP membership for operators',
    bullets: [
      'Compounding content model with recurring revenue',
      'Good fit for daily publishing and audience growth',
      'Can expand into templates, automations, and software later',
    ],
  },
]

const sourceChecklist = [
  'Hacker News search for AI stories and builder themes',
  'CoinGecko market data for BTC, ETH, SOL, and LINK',
  'Stooq daily stock quotes for NVDA, MSFT, AMD, and SMCI',
  'Rotating operator-demand patterns for passive-income idea generation',
]

async function fetchJson(url) {
  const response = await fetch(url, { headers: { 'user-agent': 'Mozilla/5.0 AVByteBot/1.0' } })
  if (!response.ok) throw new Error(`${response.status} ${response.statusText} for ${url}`)
  return response.json()
}

async function fetchText(url) {
  const response = await fetch(url, { headers: { 'user-agent': 'Mozilla/5.0 AVByteBot/1.0' } })
  if (!response.ok) throw new Error(`${response.status} ${response.statusText} for ${url}`)
  return response.text()
}

function formatUsd(value) {
  if (value >= 1000) return `$${Number(value).toLocaleString('en-US', { maximumFractionDigits: 0 })}`
  return `$${Number(value).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
}

function formatPct(value) {
  const n = Number(value)
  return Number.isFinite(n) ? Number(n.toFixed(2)) : 0
}

function cleanTitle(title) {
  return String(title || '').replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim()
}

function summarizeAiSignals(hits) {
  const cleanHits = hits
    .map((hit) => ({
      title: cleanTitle(hit.title || hit.story_title || ''),
      points: hit.points ?? 0,
    }))
    .filter((hit) => hit.title)
    .slice(0, 4)

  return cleanHits.map((hit, index) => ({
    label: index === 0 ? 'Top AI headline' : `AI signal ${index + 1}`,
    value: hit.title.slice(0, 64),
    detail: `Live HN signal with ${hit.points} points. Builder attention is clustering around this theme right now.`,
  }))
}

function deriveSourceSignals(aiHits) {
  const topTitles = aiHits
    .map((hit) => cleanTitle(hit.title || hit.story_title || ''))
    .filter(Boolean)
    .slice(0, 2)

  return [
    {
      label: 'AI source pulse',
      value: topTitles[0] ? 'HN active' : 'HN checked',
      detail: topTitles[0]
        ? `Top live headline: ${topTitles[0]}`
        : 'Checked live AI headlines from Hacker News search.',
    },
    {
      label: 'Market data',
      value: 'CoinGecko + Stooq',
      detail: 'Crypto and stock watchlists are refreshed from public market endpoints during each run.',
    },
    {
      label: 'Business idea engine',
      value: 'Operator-pattern rotation',
      detail: 'Idea feed blends stable operator pain points with a rotating live-research wedge.',
    },
    {
      label: 'Reliability rule',
      value: 'Public sources only',
      detail: 'The pipeline avoids brittle authenticated scraping so daily automation stays dependable.',
    },
  ]
}

function deriveTopOpportunity(selectedIdea, stockTickers, cryptoTickers) {
  const strongStock = stockTickers.find((item) => item.change > 1)
  const strongCrypto = cryptoTickers.find((item) => item.change > 1)

  if (strongStock && strongCrypto) {
    return {
      title: selectedIdea.title,
      bullets: [
        `Risk appetite is alive with ${strongStock.symbol} and ${strongCrypto.symbol} both showing positive momentum.`,
        'That usually supports builder attention, tool spend, and appetite for new workflow products.',
        'The best monetization angle is still solving one repeated business process end-to-end.',
      ],
    }
  }

  return topOpportunities[now.getUTCDate() % topOpportunities.length]
}

async function getStockTicker(symbol) {
  const csv = await fetchText(`https://stooq.com/q/l/?s=${symbol.toLowerCase()}.us&i=d`)
  const row = csv.trim().split('\n').pop()?.split(',') || []
  const close = Number(row[6])
  const open = Number(row[3])
  const pct = open ? ((close - open) / open) * 100 : 0

  const notes = {
    NVDA: 'Live Stooq quote; still a strong proxy for AI infrastructure sentiment.',
    MSFT: 'Live Stooq quote; enterprise distribution keeps it strategically important.',
    AMD: 'Live Stooq quote; a useful second-order AI infrastructure watch.',
    SMCI: 'Live Stooq quote; higher-beta infrastructure momentum read.',
  }

  return {
    symbol,
    price: formatUsd(close),
    change: formatPct(pct),
    note: notes[symbol] || 'Live daily market quote.',
  }
}

async function main() {
  const [hnAi, btcEthSolLink, nvda, msft, amd, smci] = await Promise.all([
    fetchJson('https://hn.algolia.com/api/v1/search?query=AI&tags=story&hitsPerPage=8'),
    fetchJson('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin,ethereum,solana,chainlink&price_change_percentage=24h'),
    getStockTicker('NVDA'),
    getStockTicker('MSFT'),
    getStockTicker('AMD'),
    getStockTicker('SMCI'),
  ])

  const selectedIdea = rotatingIdeas[now.getUTCDate() % rotatingIdeas.length]

  const cryptoMap = new Map(
    btcEthSolLink.map((coin) => [coin.symbol.toUpperCase(), coin]),
  )

  const cryptoTickers = ['BTC', 'ETH', 'SOL', 'LINK'].map((symbol) => {
    const coin = cryptoMap.get(symbol)
    const notes = {
      BTC: 'Live CoinGecko price; still the clearest macro sentiment proxy in crypto.',
      ETH: 'Live CoinGecko price; ecosystem depth remains a key signal.',
      SOL: 'Live CoinGecko price; keeps strong consumer and builder attention.',
      LINK: 'Live CoinGecko price; data-rail and infrastructure angle remains relevant.',
    }

    return {
      symbol,
      price: formatUsd(coin?.current_price ?? 0),
      change: formatPct(coin?.price_change_percentage_24h_in_currency ?? coin?.price_change_percentage_24h ?? 0),
      note: notes[symbol] || 'Live crypto market read.',
    }
  })

  const stockTickers = [nvda, msft, amd, smci]
  const aiSignals = summarizeAiSignals(hnAi.hits || [])
  const sourceSignals = deriveSourceSignals(hnAi.hits || [])
  const topOpportunity = deriveTopOpportunity(selectedIdea, stockTickers, cryptoTickers)

  const marketBrief = [
    {
      title: 'Stocks trend',
      summary: `Live stock tape shows ${stockTickers[0].symbol} ${stockTickers[0].change >= 0 ? 'up' : 'down'} ${Math.abs(stockTickers[0].change).toFixed(2)}% and ${stockTickers[2].symbol} ${stockTickers[2].change >= 0 ? 'up' : 'down'} ${Math.abs(stockTickers[2].change).toFixed(2)}%. The practical read is that AI infrastructure appetite is still driving attention, but dispersion matters.`,
      pulse: stockTickers.filter((item) => item.change > 0).length >= 3 ? 'Broad strength' : 'Mixed tape',
    },
    {
      title: 'Crypto trend',
      summary: `Live crypto tape shows BTC at ${cryptoTickers[0].price}, ETH at ${cryptoTickers[1].price}, and SOL moving ${cryptoTickers[2].change >= 0 ? '+' : ''}${cryptoTickers[2].change.toFixed(2)}% on the day. Momentum is healthiest when majors and infrastructure both participate.`,
      pulse: cryptoTickers.filter((item) => item.change > 0).length >= 3 ? 'Momentum intact' : 'Selective bid',
    },
    {
      title: 'AI news',
      summary: aiSignals[0]
        ? `${aiSignals[0].value} is leading live Hacker News attention. The bigger commercial lesson is unchanged: tools that own a workflow keep earning more trust than generic wrappers.`
        : 'Live AI headlines were checked, but the commercial takeaway remains the same: workflow ownership beats novelty.',
      pulse: aiSignals[0] ? 'Live builder interest' : 'Steady',
    },
  ]

  const siteData = {
    lastUpdated: stamp,
    topOpportunity,
    heroStats: [
      { label: 'Ideas tracked', value: '6' },
      { label: 'Update cadence', value: 'Daily live' },
      { label: 'Data sources', value: 'HN + markets' },
    ],
    ideas: [...baseIdeas, { ...selectedIdea }],
    blueprints: [
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
    ],
    marketBrief,
    stockTickers,
    cryptoTickers,
    aiSignals,
    sourceSignals,
    updateChecklist: [
      'Refresh live market data from public stock and crypto endpoints.',
      'Pull live AI headline signals from Hacker News search.',
      'Rotate the final passive-income idea using current operator-demand patterns.',
      'Publish only when the site data changes and the build passes.',
    ],
    sourceChecklist,
  }

  const header = `export type Idea = {\n  title: string\n  niche: string\n  model: string\n  whyNow: string\n  monetization: string\n  buildAngle: string\n  signal: string\n  source: string\n}\n\nexport type Blueprint = {\n  title: string\n  outcome: string\n  stack: string\n  moat: string\n}\n\nexport type BriefCard = {\n  title: string\n  summary: string\n  pulse: string\n}\n\nexport type Ticker = {\n  symbol: string\n  price: string\n  change: number\n  note: string\n}\n\nexport type SignalCard = {\n  label: string\n  value: string\n  detail: string\n}\n\nexport type SiteData = {\n  lastUpdated: string\n  topOpportunity: {\n    title: string\n    bullets: string[]\n  }\n  heroStats: Array<{ label: string; value: string }>\n  ideas: Idea[]\n  blueprints: Blueprint[]\n  marketBrief: BriefCard[]\n  stockTickers: Ticker[]\n  cryptoTickers: Ticker[]\n  aiSignals: SignalCard[]\n  sourceSignals: SignalCard[]\n  updateChecklist: string[]\n  sourceChecklist: string[]\n}\n\nexport const siteData: SiteData = `

  await fs.writeFile(filePath, `${header}${JSON.stringify(siteData, null, 2)}\n`)
  console.log('Updated live site data for', stamp)
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
