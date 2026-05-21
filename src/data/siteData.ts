export type Idea = {
  title: string
  niche: string
  model: string
  whyNow: string
  monetization: string
  buildAngle: string
  signal: string
  source: string
}

export type Blueprint = {
  title: string
  outcome: string
  stack: string
  moat: string
}

export type BriefCard = {
  title: string
  summary: string
  pulse: string
}

export type Ticker = {
  symbol: string
  price: string
  change: number
  note: string
}

export type SignalCard = {
  label: string
  value: string
  detail: string
}

export type SiteData = {
  lastUpdated: string
  topOpportunity: {
    title: string
    bullets: string[]
  }
  heroStats: Array<{ label: string; value: string }>
  ideas: Idea[]
  blueprints: Blueprint[]
  marketBrief: BriefCard[]
  stockTickers: Ticker[]
  cryptoTickers: Ticker[]
  aiSignals: SignalCard[]
  sourceSignals: SignalCard[]
  updateChecklist: string[]
  sourceChecklist: string[]
}

export const siteData: SiteData = {
  "lastUpdated": "21 May 2026 · 23:00 UTC",
  "topOpportunity": {
    "title": "Quote follow-up tracker for local service businesses",
    "bullets": [
      "Risk appetite is alive with AMD and SOL both showing positive momentum.",
      "That usually supports builder attention, tool spend, and appetite for new workflow products.",
      "The best monetization angle is still solving one repeated business process end-to-end."
    ]
  },
  "heroStats": [
    {
      "label": "Ideas tracked",
      "value": "6"
    },
    {
      "label": "Update cadence",
      "value": "Daily live"
    },
    {
      "label": "Data sources",
      "value": "HN + markets"
    }
  ],
  "ideas": [
    {
      "title": "Client intake + approvals hub for niche agencies",
      "niche": "Small marketing and creative agencies",
      "model": "Micro-SaaS",
      "whyNow": "Agency operators keep complaining about juggling forms, email, Slack, and Google Drive just to get assets approved and projects kicked off.",
      "monetization": "$49–199/mo",
      "buildAngle": "Start with onboarding checklists, asset collection, and approval trails.",
      "signal": "Pain is frequent, easy to demo, and tied to revenue delivery.",
      "source": "Operator pattern: agencies still stitch onboarding together with forms, docs, and email."
    },
    {
      "title": "Recruiter inbox-to-pipeline tracker",
      "niche": "Boutique recruiting firms",
      "model": "Micro-SaaS",
      "whyNow": "Small teams still lose candidate context across texts, emails, referrals, and job boards because full ATS suites feel bloated or overpriced.",
      "monetization": "$39–149/mo",
      "buildAngle": "Unify candidate capture first, then layer reporting and follow-up reminders.",
      "signal": "Spreadsheet replacement with clear workflow ROI.",
      "source": "Operator pattern: recruiting teams keep patching workflows across inboxes and spreadsheets."
    },
    {
      "title": "Maintenance update portal for small landlords",
      "niche": "Landlords with small portfolios",
      "model": "Micro-SaaS",
      "whyNow": "Smaller landlords want something simpler than enterprise property software, especially for repairs, updates, and tenant communication.",
      "monetization": "$29–99/mo",
      "buildAngle": "Focus on maintenance requests, status updates, vendor coordination, and tenant visibility.",
      "signal": "Simple recurring pain, though more price sensitive than agency tools.",
      "source": "Operator pattern: lightweight property workflows still beat bloated all-in-one suites for small owners."
    },
    {
      "title": "Premium niche dashboard template packs",
      "niche": "Founders, creators, agencies",
      "model": "Digital product",
      "whyNow": "Fast-launch template businesses still work when the offer is polished, category-specific, and tied to an obvious business use case.",
      "monetization": "$49–299 one-time",
      "buildAngle": "Sell templates first, then upsell a hosted version or premium data layer.",
      "signal": "Fastest route to validating demand and funding the next product step.",
      "source": "Creator pattern: polished operating assets still convert when they save setup time."
    },
    {
      "title": "AI workflow packs for service operators",
      "niche": "Agencies, consultants, recruiters",
      "model": "Digital product + subscription upsell",
      "whyNow": "Buyers are more willing to pay for done-for-you automations and prompt systems than generic “learn AI” content.",
      "monetization": "$79–499 upfront + membership upsell",
      "buildAngle": "Package SOPs, prompts, templates, and automations around one workflow at a time.",
      "signal": "Strong bridge from one-off product sales into recurring revenue.",
      "source": "AI operator pattern: practical workflow kits beat abstract education."
    },
    {
      "title": "Quote follow-up tracker for local service businesses",
      "niche": "Roofers, HVAC, landscapers, contractors",
      "model": "Micro-SaaS",
      "whyNow": "Small operators still lose revenue because estimates go cold in texts, email threads, and manual callbacks.",
      "monetization": "$39–129/mo",
      "buildAngle": "Track sent quotes, reminders, follow-up status, and close-rate reporting.",
      "signal": "Revenue-adjacent pain with direct ROI is easier to sell.",
      "source": "Live business-signal rotation: quote follow-up remains a recurring operational leak for local service teams."
    }
  ],
  "blueprints": [
    {
      "title": "Fast validation path",
      "outcome": "Launch a paid MVP in 7–14 days",
      "stack": "Landing page + Airtable/Supabase + Stripe + manual concierge backend",
      "moat": "Speed and buyer feedback before writing too much product code."
    },
    {
      "title": "Passive-ish product ladder",
      "outcome": "Move from services to recurring revenue",
      "stack": "Template/product first, then membership, then SaaS wedge",
      "moat": "Audience and customer trust compound as you climb the ladder."
    },
    {
      "title": "Best buyer pattern",
      "outcome": "Sell to people already wasting time in spreadsheets",
      "stack": "Simple dashboard, reminders, intake forms, notifications, exports",
      "moat": "Workflow ownership is harder to replace than content alone."
    },
    {
      "title": "Distribution edge",
      "outcome": "Use content as acquisition, not just branding",
      "stack": "Daily idea posts + weekly roundup + lead magnet + email capture",
      "moat": "Organic distribution lowers CAC and makes the product feel alive."
    }
  ],
  "marketBrief": [
    {
      "title": "Stocks trend",
      "summary": "Live stock tape shows NVDA down 1.25% and AMD up 1.70%. The practical read is that AI infrastructure appetite is still driving attention, but dispersion matters.",
      "pulse": "Mixed tape"
    },
    {
      "title": "Crypto trend",
      "summary": "Live crypto tape shows BTC at $77,547, ETH at $2,130, and SOL moving +1.39% on the day. Momentum is healthiest when majors and infrastructure both participate.",
      "pulse": "Momentum intact"
    },
    {
      "title": "AI news",
      "summary": "Don't post generated/AI-edited comments. HN is for conversation  is leading live Hacker News attention. The bigger commercial lesson is unchanged: tools that own a workflow keep earning more trust than generic wrappers.",
      "pulse": "Live builder interest"
    }
  ],
  "stockTickers": [
    {
      "symbol": "NVDA",
      "price": "$219.51",
      "change": -1.25,
      "note": "Live Stooq quote; still a strong proxy for AI infrastructure sentiment."
    },
    {
      "symbol": "MSFT",
      "price": "$419.10",
      "change": -1.33,
      "note": "Live Stooq quote; enterprise distribution keeps it strategically important."
    },
    {
      "symbol": "AMD",
      "price": "$449.51",
      "change": 1.7,
      "note": "Live Stooq quote; a useful second-order AI infrastructure watch."
    },
    {
      "symbol": "SMCI",
      "price": "$33.45",
      "change": 1.49,
      "note": "Live Stooq quote; higher-beta infrastructure momentum read."
    }
  ],
  "cryptoTickers": [
    {
      "symbol": "BTC",
      "price": "$77,547",
      "change": 0.19,
      "note": "Live CoinGecko price; still the clearest macro sentiment proxy in crypto."
    },
    {
      "symbol": "ETH",
      "price": "$2,130",
      "change": 0.24,
      "note": "Live CoinGecko price; ecosystem depth remains a key signal."
    },
    {
      "symbol": "SOL",
      "price": "$87.11",
      "change": 1.39,
      "note": "Live CoinGecko price; keeps strong consumer and builder attention."
    },
    {
      "symbol": "LINK",
      "price": "$9.73",
      "change": 1.17,
      "note": "Live CoinGecko price; data-rail and infrastructure angle remains relevant."
    }
  ],
  "aiSignals": [
    {
      "label": "Top AI headline",
      "value": "Don't post generated/AI-edited comments. HN is for conversation ",
      "detail": "Live HN signal with 4229 points. Builder attention is clustering around this theme right now."
    },
    {
      "label": "AI signal 2",
      "value": "Airfoil",
      "detail": "Live HN signal with 2544 points. Builder attention is clustering around this theme right now."
    },
    {
      "label": "AI signal 3",
      "value": "Open source AI is the path forward",
      "detail": "Live HN signal with 2360 points. Builder attention is clustering around this theme right now."
    },
    {
      "label": "AI signal 4",
      "value": "My AI skeptic friends are all nuts",
      "detail": "Live HN signal with 2356 points. Builder attention is clustering around this theme right now."
    }
  ],
  "sourceSignals": [
    {
      "label": "AI source pulse",
      "value": "HN active",
      "detail": "Top live headline: Don't post generated/AI-edited comments. HN is for conversation between humans"
    },
    {
      "label": "Market data",
      "value": "CoinGecko + Stooq",
      "detail": "Crypto and stock watchlists are refreshed from public market endpoints during each run."
    },
    {
      "label": "Business idea engine",
      "value": "Operator-pattern rotation",
      "detail": "Idea feed blends stable operator pain points with a rotating live-research wedge."
    },
    {
      "label": "Reliability rule",
      "value": "Public sources only",
      "detail": "The pipeline avoids brittle authenticated scraping so daily automation stays dependable."
    }
  ],
  "updateChecklist": [
    "Refresh live market data from public stock and crypto endpoints.",
    "Pull live AI headline signals from Hacker News search.",
    "Rotate the final passive-income idea using current operator-demand patterns.",
    "Publish only when the site data changes and the build passes."
  ],
  "sourceChecklist": [
    "Hacker News search for AI stories and builder themes",
    "CoinGecko market data for BTC, ETH, SOL, and LINK",
    "Stooq daily stock quotes for NVDA, MSFT, AMD, and SMCI",
    "Rotating operator-demand patterns for passive-income idea generation"
  ]
}
