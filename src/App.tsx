import './App.css'

const stats = [
  { label: 'Response times', value: 'Faster updates' },
  { label: 'Target users', value: '5–200 units' },
  { label: 'Primary wedge', value: 'Maintenance ops' },
]

const painPoints = [
  'Tenant requests get buried in texts, calls, and email threads.',
  'Landlords waste time answering “any update?” instead of moving repairs forward.',
  'Vendor coordination lives in someone’s head or in a spreadsheet nobody trusts.',
  'There is rarely a clean repair timeline with photos, notes, and completion proof.',
]

const coreFeatures = [
  {
    title: 'Maintenance request intake',
    text: 'Collect issue type, urgency, unit, photos, and preferred access time in one clean flow.',
  },
  {
    title: 'Real-time status updates',
    text: 'Track every job from new → acknowledged → scheduled → in progress → completed.',
  },
  {
    title: 'Vendor coordination',
    text: 'Assign the right contractor, attach notes, estimate cost, and keep the handoff visible.',
  },
  {
    title: 'Tenant visibility',
    text: 'Give tenants a simple status timeline so they stop chasing updates in random chats.',
  },
]

const workflows = [
  {
    step: '01',
    title: 'Tenant submits request',
    text: 'Phone-friendly form with unit, category, urgency, photos, and access notes.',
  },
  {
    step: '02',
    title: 'Manager triages and assigns',
    text: 'Route the issue, set priority, assign vendor, and confirm next step in one view.',
  },
  {
    step: '03',
    title: 'Vendor completes the job',
    text: 'Capture notes, before/after photos, schedule changes, and completion status.',
  },
  {
    step: '04',
    title: 'Tenant sees the timeline',
    text: 'Everyone sees the same repair record, which cuts back-and-forth dramatically.',
  },
]

const modules = [
  {
    title: 'Landlord dashboard',
    bullets: ['Open requests by property', 'Overdue jobs', 'Vendor response speed', 'Recurring issue tracking'],
  },
  {
    title: 'Tenant request portal',
    bullets: ['Mobile-first form', 'Photo uploads', 'Urgency flagging', 'Status page by request'],
  },
  {
    title: 'Vendor workspace',
    bullets: ['Assigned work orders', 'Scheduling notes', 'Completion photos', 'Internal handoff comments'],
  },
]

const roadmap = [
  {
    phase: 'MVP',
    title: 'Repair communication hub',
    text: 'Intake, status pipeline, vendor assignment, timeline, and notifications.',
  },
  {
    phase: 'Phase 2',
    title: 'Property-level history',
    text: 'Recurring issue tracking, vendor history, searchable maintenance records.',
  },
  {
    phase: 'Phase 3',
    title: 'Operational intelligence',
    text: 'Owner reporting, invoice storage, trend detection, and AI-generated summaries.',
  },
]

const pricing = [
  {
    plan: 'Starter',
    price: '$29/mo',
    detail: 'For small self-managed landlords up to 20 units.',
  },
  {
    plan: 'Growth',
    price: '$79/mo',
    detail: 'For growing operators who need multiple properties and vendor workflows.',
  },
  {
    plan: 'Manager',
    price: '$149+/mo',
    detail: 'For small property managers handling larger portfolios and more coordination.',
  },
]

function App() {
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
              <p className="mini-kicker">AV Byte · MaintenanceOS</p>
              <h1>Maintenance requests, status updates, vendor coordination, and tenant visibility — finally in one place.</h1>
            </div>
          </div>

          <div className="hero-status">
            <span className="status-pill">Micro-SaaS wedge</span>
            <span className="status-pill muted">For small landlords & property managers</span>
          </div>
        </div>

        <div className="hero-grid">
          <div className="hero-copy">
            <p className="section-kicker">Product direction</p>
            <p className="hero-text">
              This product is built for the gap between scattered text-thread chaos and bloated
              property management software. The wedge is narrow on purpose: intake, repair status,
              vendor coordination, and a clean tenant-facing timeline.
            </p>

            <div className="hero-cta-row">
              <a className="primary-button" href="#product">View product scope</a>
              <a className="secondary-button" href="#roadmap">See build roadmap</a>
            </div>

            <div className="signal-strip">
              {stats.map((item) => (
                <article key={item.label} className="signal-card">
                  <span>{item.label}</span>
                  <strong>{item.value}</strong>
                  <p>Simple workflow ownership beats another bloated all-in-one suite.</p>
                </article>
              ))}
            </div>
          </div>

          <aside className="hero-highlight">
            <p className="section-kicker">Why this wedge works</p>
            <div className="focus-ring">
              <div>
                <span>Core promise</span>
                <strong>Stop running maintenance through random chats.</strong>
              </div>
            </div>
            <ul className="focus-list">
              <li>Easy ROI story: fewer missed requests, faster updates, cleaner records.</li>
              <li>Clear positioning: maintenance communication, not full property software.</li>
              <li>Strong mobile use case for tenants, vendors, and landlords.</li>
            </ul>
          </aside>
        </div>
      </section>

      <section className="tab-panel" id="product">
        <div className="tab-header">
          <div>
            <p className="section-kicker">Problem</p>
            <h2>What breaks today</h2>
          </div>
          <span className="status-pill">Small-portfolio landlord pain</span>
        </div>

        <div className="content-grid idea-grid">
          {painPoints.map((item) => (
            <article key={item} className="content-card idea-card">
              <p className="section-kicker">Pain point</p>
              <h3>{item}</h3>
              <p className="card-copy">
                The maintenance workflow is usually fragmented, reactive, and impossible to audit.
                That makes this a strong software wedge.
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="tab-panel">
        <div className="tab-header">
          <div>
            <p className="section-kicker">Core product</p>
            <h2>MVP features</h2>
          </div>
          <span className="status-pill">Ship this first</span>
        </div>

        <div className="signal-grid feature-grid">
          {coreFeatures.map((item) => (
            <article key={item.title} className="signal-card">
              <span>Feature</span>
              <strong>{item.title}</strong>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="tab-panel">
        <div className="tab-header">
          <div>
            <p className="section-kicker">Workflow</p>
            <h2>How the product should feel</h2>
          </div>
          <span className="status-pill">Fast, visible, low-friction</span>
        </div>

        <div className="signal-grid workflow-grid">
          {workflows.map((item) => (
            <article key={item.step} className="signal-card workflow-card">
              <span>{item.step}</span>
              <strong>{item.title}</strong>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="tab-panel">
        <div className="tab-header">
          <div>
            <p className="section-kicker">Modules</p>
            <h2>Product surfaces</h2>
          </div>
          <span className="status-pill">3-screen MVP</span>
        </div>

        <div className="content-grid overview-grid">
          {modules.map((item) => (
            <article key={item.title} className="content-card">
              <div className="card-head">
                <div>
                  <p className="section-kicker">Surface</p>
                  <h3>{item.title}</h3>
                </div>
              </div>
              <ul className="bullet-list">
                {item.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="tab-panel" id="roadmap">
        <div className="tab-header">
          <div>
            <p className="section-kicker">Roadmap</p>
            <h2>Build sequence</h2>
          </div>
          <span className="status-pill">Narrow wedge first</span>
        </div>

        <div className="signal-grid blueprint-grid">
          {roadmap.map((item) => (
            <article key={item.phase} className="signal-card blueprint-card">
              <span>{item.phase}</span>
              <strong>{item.title}</strong>
              <p>{item.text}</p>
              <div className="blueprint-moat">Stay tightly focused on maintenance ops until retention is obvious.</div>
            </article>
          ))}
        </div>
      </section>

      <section className="tab-panel">
        <div className="tab-header">
          <div>
            <p className="section-kicker">Pricing</p>
            <h2>Simple early pricing</h2>
          </div>
          <span className="status-pill">Price by portfolio size</span>
        </div>

        <div className="ticker-grid pricing-grid">
          {pricing.map((item) => (
            <article key={item.plan} className="ticker-card pricing-card">
              <div className="ticker-topline">
                <strong>{item.plan}</strong>
                <span className="positive">Launch tier</span>
              </div>
              <h3>{item.price}</h3>
              <p>{item.detail}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}

export default App
