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
  "lastUpdated": "21 May 2026 · 22:56 UTC",
  "topOpportunity": {
    "title": "Agency intake + approvals SaaS",
    "bullets": [
      "Frequent pain tied directly to client delivery",
      "Easy to validate with agencies already using messy workarounds",
      "Natural path from MVP to higher-value workflow ownership"
    ]
  },
  "heroStats": [
    {
      "label": "Ideas tracked",
      "value": "6"
    },
    {
      "label": "Update cadence",
      "value": "Daily"
    },
    {
      "label": "Best model",
      "value": "Micro-SaaS"
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
      "source": "Repeated Reddit pain in r/agency, r/PPC, and service-business founder posts."
    },
    {
      "title": "Recruiter inbox-to-pipeline tracker",
      "niche": "Boutique recruiting firms",
      "model": "Micro-SaaS",
      "whyNow": "Small teams still lose candidate context across texts, emails, referrals, and job boards because full ATS suites feel bloated or overpriced.",
      "monetization": "$39–149/mo",
      "buildAngle": "Unify candidate capture first, then layer reporting and follow-up reminders.",
      "signal": "Spreadsheet replacement with clear workflow ROI.",
      "source": "Reddit recruiting communities and founder chatter around messy inbound hiring ops."
    },
    {
      "title": "Maintenance update portal for small landlords",
      "niche": "Landlords with small portfolios",
      "model": "Micro-SaaS",
      "whyNow": "Smaller landlords want something simpler than enterprise property software, especially for repairs, updates, and tenant communication.",
      "monetization": "$29–99/mo",
      "buildAngle": "Focus on maintenance requests, status updates, vendor coordination, and tenant visibility.",
      "signal": "Simple recurring pain, though more price sensitive than agency tools.",
      "source": "Posts in landlord and property-management communities asking for lightweight tools."
    },
    {
      "title": "Premium niche dashboard template packs",
      "niche": "Founders, creators, agencies",
      "model": "Digital product",
      "whyNow": "Fast-launch template businesses still work when the offer is polished, category-specific, and tied to an obvious business use case.",
      "monetization": "$49–299 one-time",
      "buildAngle": "Sell templates first, then upsell a hosted version or premium data layer.",
      "signal": "Fastest route to validating demand and funding the next product step.",
      "source": "Strong creator economy demand for polished, ready-made operating dashboards."
    },
    {
      "title": "AI workflow packs for service operators",
      "niche": "Agencies, consultants, recruiters",
      "model": "Digital product + subscription upsell",
      "whyNow": "Buyers are more willing to pay for done-for-you automations and prompt systems than generic “learn AI” content.",
      "monetization": "$79–499 upfront + membership upsell",
      "buildAngle": "Package SOPs, prompts, templates, and automations around one workflow at a time.",
      "signal": "Strong bridge from one-off product sales into recurring revenue.",
      "source": "Social content trends around operations AI, automation kits, and workflow templates."
    },
    {
      "title": "Quote follow-up tracker for local service businesses",
      "niche": "Roofers, HVAC, landscapers, contractors",
      "model": "Micro-SaaS",
      "whyNow": "Small operators still lose revenue because estimates go cold in texts, email threads, and manual callbacks.",
      "monetization": "$39–129/mo",
      "buildAngle": "Track sent quotes, reminders, follow-up status, and close-rate reporting.",
      "signal": "Revenue-adjacent pain with direct ROI is easier to sell.",
      "source": "Common small-business complaint across service operator communities and sales threads."
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
      "summary": "Market attention is still clustering around AI beneficiaries, but buyers are increasingly watching for profitable follow-through rather than headlines alone.",
      "pulse": "Measured risk-on"
    },
    {
      "title": "Crypto trend",
      "summary": "Crypto momentum stays healthiest in liquid majors and infrastructure names with clear utility narratives.",
      "pulse": "Quality bid"
    },
    {
      "title": "AI news",
      "summary": "The strongest AI companies are selling time savings and workflow ownership, not just access to models.",
      "pulse": "Workflow winners"
    }
  ],
  "stockTickers": [
    {
      "symbol": "NVDA",
      "price": "$1,184.20",
      "change": 5.4,
      "note": "Still the core AI sentiment leader."
    },
    {
      "symbol": "MSFT",
      "price": "$468.15",
      "change": 2.1,
      "note": "Distribution plus enterprise trust is a huge edge."
    },
    {
      "symbol": "AMD",
      "price": "$176.42",
      "change": 3.18,
      "note": "Watch as a second-order AI infrastructure beneficiary."
    },
    {
      "symbol": "SMCI",
      "price": "$1,041.88",
      "change": 7.8,
      "note": "High-beta infra momentum remains powerful and volatile."
    }
  ],
  "cryptoTickers": [
    {
      "symbol": "BTC",
      "price": "$104,820",
      "change": 3.9,
      "note": "Primary macro proxy and institutional attention magnet."
    },
    {
      "symbol": "ETH",
      "price": "$5,260",
      "change": 4.6,
      "note": "Still relevant for ecosystem depth and network effects."
    },
    {
      "symbol": "SOL",
      "price": "$214",
      "change": 6.2,
      "note": "Keeps strong consumer and creator attention."
    },
    {
      "symbol": "LINK",
      "price": "$21.74",
      "change": 5.08,
      "note": "Infrastructure and data-rail positioning stays compelling."
    }
  ],
  "aiSignals": [
    {
      "label": "Best builder pattern",
      "value": "Vertical beats generic",
      "detail": "Niche tools that replace a real workflow still monetize better than broad assistant products."
    },
    {
      "label": "Launch edge",
      "value": "Distribution first",
      "detail": "Founders with an audience or repeatable daily content loop can validate faster and cheaper."
    },
    {
      "label": "Strongest wedge",
      "value": "Replace spreadsheets",
      "detail": "The cleanest opportunities still come from teams duct-taping Sheets, email, and forms together."
    },
    {
      "label": "Income logic",
      "value": "Recurring > one-off",
      "detail": "One-time products help validate, but recurring workflow value is what compounds."
    }
  ],
  "sourceSignals": [
    {
      "label": "Primary source",
      "value": "Reddit pain threads",
      "detail": "The best ideas come from repeated complaints, workaround posts, and “what tool do you use?” discussions."
    },
    {
      "label": "Social pattern",
      "value": "Curated summaries win",
      "detail": "Short daily research recaps and specific breakdowns outperform vague hustle content."
    },
    {
      "label": "Update cadence",
      "value": "Daily refresh ready",
      "detail": "This page is structured so idea cards and briefs can be swapped daily without redesigning the site."
    },
    {
      "label": "Filter rule",
      "value": "Proof over hype",
      "detail": "The bar is practical demand, buyer budget, and simple implementation — not just trend-chasing."
    }
  ],
  "updateChecklist": [
    "Pull fresh Reddit and social-media pain points into the idea feed.",
    "Refresh Market Brief summary cards for stocks, crypto, and AI.",
    "Swap top opportunity callout when a stronger niche appears.",
    "Keep only ideas that have a clear buyer, monetization path, and visible market signal."
  ],
  "sourceChecklist": [
    "Reddit founder, agency, recruiting, landlord, and micro-SaaS communities",
    "X/Twitter creator and operator posts for workflow pain and monetization angles",
    "AI builder/news feeds for workflow ownership and startup momentum",
    "Market headlines that shape what buyers pay attention to this week"
  ]
}
