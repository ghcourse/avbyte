import fs from 'node:fs/promises'

const filePath = new URL('../src/data/siteData.ts', import.meta.url)

const now = new Date()
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const stamp = `${String(now.getUTCDate()).padStart(2, '0')} ${months[now.getUTCMonth()]} ${now.getUTCFullYear()} · ${String(now.getUTCHours()).padStart(2, '0')}:${String(now.getUTCMinutes()).padStart(2, '0')} UTC`

const hnQueries = [
  { key: 'ai', query: 'AI', label: 'AI' },
  { key: 'ai_agents', query: 'AI agents', label: 'AI agents' },
  { key: 'automation', query: 'automation', label: 'automation' },
  { key: 'micro_saas', query: 'micro saas', label: 'micro-SaaS' },
  { key: 'startup', query: 'startup', label: 'startup' },
]

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
    theme: 'automation',
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
    theme: 'ai_agents',
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
    theme: 'startup',
  },
  {
    title: 'Micro-SaaS benchmark library for Shopify and creator tools',
    niche: 'Indie founders and operators',
    model: 'Membership + data product',
    whyNow:
      'Founders want concrete examples of simple software businesses that actually sell, especially in ecosystems with built-in distribution.',
    monetization: '$19–59/mo',
    buildAngle: 'Ship case studies, teardown dashboards, benchmark tables, and recurring market maps.',
    signal: 'Information products with proof and curation can compound when updated frequently.',
    source: 'Live business-signal rotation: micro-SaaS curiosity stays durable during founder-market slowdowns.',
    theme: 'micro_saas',
  },
]

const sourceChecklist = [
  'Hacker News multi-query search for AI, agents, automation, micro-SaaS, and startup stories',
  'CoinGecko market data for BTC, ETH, SOL, and LINK',
  'Stooq daily stock quotes for NVDA, MSFT, AMD, and SMCI',
  'Operator-demand patterns mapped to the strongest active HN themes',
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

function normalizeHits(queryKey, hits) {
  return (hits || [])
    .map((hit) => ({
      queryKey,
      title: cleanTitle(hit.title || hit.story_title || ''),
      points: hit.points ?? 0,
      comments: hit.num_comments ?? 0,
      url: hit.url || hit.story_url || '',
    }))
    .filter((hit) => hit.title)
}

function scoreHit(hit) {
  return hit.points * 2 + hit.comments * 0.5
}

function summarizeTheme(queryKey) {
  const map = {
    ai: 'Builders are still watching broad AI platform shifts, but skepticism is rising around shallow wrappers.',
    ai_agents: 'Agent discussions are active, but trust, failure modes, and maintenance overhead are central concerns.',
    automation: 'Automation interest remains healthy when tools save labor directly and fit existing workflows.',
    micro_saas: 'Founders still want small, focused software businesses with simple buyer stories and low operating drag.',
    startup: 'Startup attention is rewarding practical, durable execution more than abstract ambition.',
  }
  return map[queryKey] || 'Current builder attention is clustered around practical workflow leverage.'
}

function buildAiSignals(allHits, byQuery) {
  const ranked = [...allHits].sort((a, b) => scoreHit(b) - scoreHit(a)).slice(0, 4)
  const topQuery = Object.entries(byQuery)
    .map(([key, hits]) => ({ key, total: hits.slice(0, 3).reduce((sum, hit) => sum + scoreHit(hit), 0) }))
    .sort((a, b) => b.total - a.total)[0]

  const signals = ranked.map((hit, index) => ({
    label: index === 0 ? 'Top live signal' : `Live signal ${index + 1}`,
    value: hit.title.slice(0, 64),
    detail: `${hnQueries.find((item) => item.key === hit.queryKey)?.label || hit.queryKey} query • ${hit.points} points • ${hit.comments} comments. ${summarizeTheme(hit.queryKey)}`,
  }))

  if (topQuery) {
    signals.unshift({
      label: 'Strongest active theme',
      value: hnQueries.find((item) => item.key === topQuery.key)?.label || topQuery.key,
      detail: summarizeTheme(topQuery.key),
    })
  }

  return signals.slice(0, 4)
}

function deriveSourceSignals(allHits, byQuery) {
  const strongest = Object.entries(byQuery)
    .map(([key, hits]) => ({ key, total: hits.slice(0, 3).reduce((sum, hit) => sum + scoreHit(hit), 0) }))
    .sort((a, b) => b.total - a.total)

  return [
    {
      label: 'Research spread',
      value: `${hnQueries.length} HN queries`,
      detail: 'The pipeline now synthesizes multiple builder/news themes instead of relying on a single AI search.',
    },
    {
      label: 'Strongest theme',
      value: hnQueries.find((item) => item.key === strongest[0]?.key)?.label || 'Mixed',
      detail: strongest[0] ? summarizeTheme(strongest[0].key) : 'No dominant theme detected.',
    },
    {
      label: 'Top headline count',
      value: String(allHits.length),
      detail: 'Unique HN results are deduplicated and folded into a single synthesis layer before publishing.',
    },
    {
      label: 'Market data',
      value: 'CoinGecko + Stooq',
      detail: 'Crypto and stock watchlists are refreshed from live public endpoints during each run.',
    },
  ]
}

function pickIdea(allHits, strongestThemeKey) {
  const mapped = rotatingIdeas.find((idea) => idea.theme === strongestThemeKey)
  if (mapped) return mapped

  const automationHit = allHits.find((hit) => /automation|workflow|zapier|n8n/i.test(hit.title))
  if (automationHit) return rotatingIdeas.find((idea) => idea.theme === 'automation') || rotatingIdeas[0]

  const microHit = allHits.find((hit) => /micro|shopify|saas/i.test(hit.title))
  if (microHit) return rotatingIdeas.find((idea) => idea.theme === 'micro_saas') || rotatingIdeas[0]

  const agentHit = allHits.find((hit) => /agent/i.test(hit.title))
  if (agentHit) return rotatingIdeas.find((idea) => idea.theme === 'ai_agents') || rotatingIdeas[0]

  return rotatingIdeas[now.getUTCDate() % rotatingIdeas.length]
}

function deriveTopOpportunity(selectedIdea, strongestThemeKey, stockTickers, cryptoTickers) {
  const positiveStocks = stockTickers.filter((item) => item.change > 0)
  const positiveCrypto = cryptoTickers.filter((item) => item.change > 0)

  return {
    title: selectedIdea.title,
    bullets: [
      `Research theme winner today: ${hnQueries.find((item) => item.key === strongestThemeKey)?.label || 'mixed builder demand'}.`,
      positiveStocks.length + positiveCrypto.length >= 4
        ? 'Risk appetite is healthy enough that builders are more likely to pay attention to new tools and workflow products.'
        : 'Even with a mixed market tape, repeated workflow pain still creates better opportunities than trend-chasing.',
      'The best monetization angle remains owning one repeated operational problem from intake to follow-up to reporting.',
    ],
  }
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
  const hnResponses = await Promise.all(
    hnQueries.map(async (item) => ({
      key: item.key,
      data: await fetchJson(`https://hn.algolia.com/api/v1/search?query=${encodeURIComponent(item.query)}&tags=story&hitsPerPage=8`),
    })),
  )

  const [btcEthSolLink, nvda, msft, amd, smci] = await Promise.all([
    fetchJson('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin,ethereum,solana,chainlink&price_change_percentage=24h'),
    getStockTicker('NVDA'),
    getStockTicker('MSFT'),
    getStockTicker('AMD'),
    getStockTicker('SMCI'),
  ])

  const byQuery = Object.fromEntries(
    hnResponses.map((item) => [item.key, normalizeHits(item.key, item.data.hits)]),
  )

  const dedupedMap = new Map()
  for (const hits of Object.values(byQuery)) {
    for (const hit of hits) {
      const key = hit.title.toLowerCase()
      const existing = dedupedMap.get(key)
      if (!existing || scoreHit(hit) > scoreHit(existing)) dedupedMap.set(key, hit)
    }
  }

  const allHits = [...dedupedMap.values()].sort((a, b) => scoreHit(b) - scoreHit(a))
  const strongestTheme = Object.entries(byQuery)
    .map(([key, hits]) => ({ key, total: hits.slice(0, 3).reduce((sum, hit) => sum + scoreHit(hit), 0) }))
    .sort((a, b) => b.total - a.total)[0]?.key || 'ai'

  const selectedIdea = pickIdea(allHits, strongestTheme)

  const cryptoMap = new Map(btcEthSolLink.map((coin) => [coin.symbol.toUpperCase(), coin]))

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
  const aiSignals = buildAiSignals(allHits, byQuery)
  const sourceSignals = deriveSourceSignals(allHits, byQuery)
  const topOpportunity = deriveTopOpportunity(selectedIdea, strongestTheme, stockTickers, cryptoTickers)

  const topHeadline = allHits[0]?.title || 'Builder attention is mixed across AI and startup themes.'
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
      summary: `${topHeadline} is the strongest live cross-query signal right now. The synthesis takeaway: builders still reward products that automate real work, but trust and workflow depth matter more than hype alone.`,
      pulse: hnQueries.find((item) => item.key === strongestTheme)?.label || 'Live builder interest',
    },
  ]

  const siteData = {
    lastUpdated: stamp,
    topOpportunity,
    heroStats: [
      { label: 'Ideas tracked', value: '6' },
      { label: 'Update cadence', value: 'Daily live' },
      { label: 'Research spread', value: `${hnQueries.length} queries` },
    ],
    ideas: [...baseIdeas, {
      title: selectedIdea.title,
      niche: selectedIdea.niche,
      model: selectedIdea.model,
      whyNow: selectedIdea.whyNow,
      monetization: selectedIdea.monetization,
      buildAngle: selectedIdea.buildAngle,
      signal: selectedIdea.signal,
      source: selectedIdea.source,
    }],
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
      'Run multiple HN queries and deduplicate results into one synthesis layer.',
      'Refresh live market data from public stock and crypto endpoints.',
      'Map the strongest current theme to a more specific passive-income idea wedge.',
      'Publish only when the regenerated data passes a full site build.',
    ],
    sourceChecklist,
  }

  const header = `export type Idea = {\n  title: string\n  niche: string\n  model: string\n  whyNow: string\n  monetization: string\n  buildAngle: string\n  signal: string\n  source: string\n}\n\nexport type Blueprint = {\n  title: string\n  outcome: string\n  stack: string\n  moat: string\n}\n\nexport type BriefCard = {\n  title: string\n  summary: string\n  pulse: string\n}\n\nexport type Ticker = {\n  symbol: string\n  price: string\n  change: number\n  note: string\n}\n\nexport type SignalCard = {\n  label: string\n  value: string\n  detail: string\n}\n\nexport type SiteData = {\n  lastUpdated: string\n  topOpportunity: {\n    title: string\n    bullets: string[]\n  }\n  heroStats: Array<{ label: string; value: string }>\n  ideas: Idea[]\n  blueprints: Blueprint[]\n  marketBrief: BriefCard[]\n  stockTickers: Ticker[]\n  cryptoTickers: Ticker[]\n  aiSignals: SignalCard[]\n  sourceSignals: SignalCard[]\n  updateChecklist: string[]\n  sourceChecklist: string[]\n}\n\nexport const siteData: SiteData = `

  await fs.writeFile(filePath, `${header}${JSON.stringify(siteData, null, 2)}\n`)
  console.log('Updated live site data with multi-query synthesis for', stamp)
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
