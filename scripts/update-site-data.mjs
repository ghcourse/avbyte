import fs from 'node:fs/promises'

const filePath = new URL('../src/data/siteData.ts', import.meta.url)

const now = new Date()
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const stamp = `${String(now.getUTCDate()).padStart(2, '0')} ${months[now.getUTCMonth()]} ${now.getUTCFullYear()} · ${String(now.getUTCHours()).padStart(2, '0')}:${String(now.getUTCMinutes()).padStart(2, '0')} UTC`

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
    source: 'Common small-business complaint across service operator communities and sales threads.',
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
    source: 'Growing demand for practical workflow packs and implementation shortcuts.',
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
    source: 'Repeated complaints about onboarding chaos and unclear client handoff.',
  },
]

const marketPulses = [
  {
    stocks: 'AI leaders still command attention, but the market keeps rewarding companies that turn hype into durable margin and execution.',
    crypto: 'Bitcoin and majors remain the cleanest sentiment read while quality infrastructure keeps outperforming low-conviction noise.',
    ai: 'AI products tied to specific workflows keep gaining trust over general-purpose wrappers and novelty demos.',
    pulseA: 'Selective strength',
    pulseB: 'Majors leading',
    pulseC: 'Execution matters',
  },
  {
    stocks: 'Market attention is still clustering around AI beneficiaries, but buyers are increasingly watching for profitable follow-through rather than headlines alone.',
    crypto: 'Crypto momentum stays healthiest in liquid majors and infrastructure names with clear utility narratives.',
    ai: 'The strongest AI companies are selling time savings and workflow ownership, not just access to models.',
    pulseA: 'Measured risk-on',
    pulseB: 'Quality bid',
    pulseC: 'Workflow winners',
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

const selectedIdea = rotatingIdeas[now.getUTCDate() % rotatingIdeas.length]
const selectedPulse = marketPulses[now.getUTCDate() % marketPulses.length]
const selectedOpportunity = topOpportunities[now.getUTCDate() % topOpportunities.length]

const siteData = {
  lastUpdated: stamp,
  topOpportunity: selectedOpportunity,
  heroStats: [
    { label: 'Ideas tracked', value: '6' },
    { label: 'Update cadence', value: 'Daily' },
    { label: 'Best model', value: 'Micro-SaaS' },
  ],
  ideas: [
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
      title: selectedIdea.title,
      niche: selectedIdea.niche,
      model: selectedIdea.model,
      whyNow: selectedIdea.whyNow,
      monetization: selectedIdea.monetization,
      buildAngle: selectedIdea.buildAngle,
      signal: selectedIdea.signal,
      source: selectedIdea.source,
    },
  ],
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
  marketBrief: [
    {
      title: 'Stocks trend',
      summary: selectedPulse.stocks,
      pulse: selectedPulse.pulseA,
    },
    {
      title: 'Crypto trend',
      summary: selectedPulse.crypto,
      pulse: selectedPulse.pulseB,
    },
    {
      title: 'AI news',
      summary: selectedPulse.ai,
      pulse: selectedPulse.pulseC,
    },
  ],
  stockTickers: [
    { symbol: 'NVDA', price: '$1,184.20', change: 5.4, note: 'Still the core AI sentiment leader.' },
    { symbol: 'MSFT', price: '$468.15', change: 2.1, note: 'Distribution plus enterprise trust is a huge edge.' },
    { symbol: 'AMD', price: '$176.42', change: 3.18, note: 'Watch as a second-order AI infrastructure beneficiary.' },
    { symbol: 'SMCI', price: '$1,041.88', change: 7.8, note: 'High-beta infra momentum remains powerful and volatile.' },
  ],
  cryptoTickers: [
    { symbol: 'BTC', price: '$104,820', change: 3.9, note: 'Primary macro proxy and institutional attention magnet.' },
    { symbol: 'ETH', price: '$5,260', change: 4.6, note: 'Still relevant for ecosystem depth and network effects.' },
    { symbol: 'SOL', price: '$214', change: 6.2, note: 'Keeps strong consumer and creator attention.' },
    { symbol: 'LINK', price: '$21.74', change: 5.08, note: 'Infrastructure and data-rail positioning stays compelling.' },
  ],
  aiSignals: [
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
  ],
  sourceSignals: [
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
  ],
  updateChecklist: [
    'Pull fresh Reddit and social-media pain points into the idea feed.',
    'Refresh Market Brief summary cards for stocks, crypto, and AI.',
    'Swap top opportunity callout when a stronger niche appears.',
    'Keep only ideas that have a clear buyer, monetization path, and visible market signal.',
  ],
  sourceChecklist: [
    'Reddit founder, agency, recruiting, landlord, and micro-SaaS communities',
    'X/Twitter creator and operator posts for workflow pain and monetization angles',
    'AI builder/news feeds for workflow ownership and startup momentum',
    'Market headlines that shape what buyers pay attention to this week',
  ],
}

const header = `export type Idea = {\n  title: string\n  niche: string\n  model: string\n  whyNow: string\n  monetization: string\n  buildAngle: string\n  signal: string\n  source: string\n}\n\nexport type Blueprint = {\n  title: string\n  outcome: string\n  stack: string\n  moat: string\n}\n\nexport type BriefCard = {\n  title: string\n  summary: string\n  pulse: string\n}\n\nexport type Ticker = {\n  symbol: string\n  price: string\n  change: number\n  note: string\n}\n\nexport type SignalCard = {\n  label: string\n  value: string\n  detail: string\n}\n\nexport type SiteData = {\n  lastUpdated: string\n  topOpportunity: {\n    title: string\n    bullets: string[]\n  }\n  heroStats: Array<{ label: string; value: string }>\n  ideas: Idea[]\n  blueprints: Blueprint[]\n  marketBrief: BriefCard[]\n  stockTickers: Ticker[]\n  cryptoTickers: Ticker[]\n  aiSignals: SignalCard[]\n  sourceSignals: SignalCard[]\n  updateChecklist: string[]\n  sourceChecklist: string[]\n}\n\nexport const siteData: SiteData = `

await fs.writeFile(filePath, `${header}${JSON.stringify(siteData, null, 2)}\n`)
console.log('Updated site data for', stamp)
