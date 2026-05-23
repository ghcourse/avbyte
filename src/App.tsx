import { useMemo, useState } from 'react'
import './App.css'

type Status = 'New' | 'Acknowledged' | 'Scheduled' | 'In Progress' | 'Waiting on Parts' | 'Completed'
type Priority = 'Low' | 'Medium' | 'High' | 'Urgent'

type RequestItem = {
  id: string
  title: string
  property: string
  unit: string
  tenant: string
  category: string
  priority: Priority
  status: Status
  submittedAt: string
  accessWindow: string
  description: string
  vendor: string
  estimate: string
  lastUpdate: string
  timeline: Array<{ label: string; note: string; time: string }>
}

const requests: RequestItem[] = [
  {
    id: 'MR-1042',
    title: 'Kitchen sink leak under cabinet',
    property: 'Maple Court',
    unit: '2B',
    tenant: 'Sarah Chen',
    category: 'Plumbing',
    priority: 'High',
    status: 'Scheduled',
    submittedAt: '10/31/2024',
    accessWindow: 'Tomorrow · 1pm–4pm',
    description:
      'Tenant reported active dripping under the sink with cabinet floor getting wet. Uploaded two photos and noted mild odor.',
    vendor: 'Northline Plumbing',
    estimate: '$185',
    lastUpdate: 'Vendor confirmed arrival window and requested shutoff access.',
    timeline: [
      { label: 'Request submitted', note: 'Photos uploaded by tenant', time: '08:14' },
      { label: 'Acknowledged', note: 'Manager marked as plumbing priority', time: '08:26' },
      { label: 'Vendor assigned', note: 'Northline Plumbing accepted job', time: '09:02' },
      { label: 'Scheduled', note: 'Visit booked for tomorrow afternoon', time: '09:15' },
    ],
  },
  {
    id: 'MR-1038',
    title: 'Bedroom AC not cooling',
    property: 'Harbor Flats',
    unit: '14A',
    tenant: 'Luis Ortega',
    category: 'HVAC',
    priority: 'Urgent',
    status: 'In Progress',
    submittedAt: '9/6/2024',
    accessWindow: 'Any time with notice',
    description:
      'AC is blowing warm air. Tenant says this started overnight and room temperature is rising quickly.',
    vendor: 'BluePeak HVAC',
    estimate: '$320',
    lastUpdate: 'Technician is on site and checking compressor + thermostat.',
    timeline: [
      { label: 'Request submitted', note: 'Urgent HVAC issue logged', time: '06:48' },
      { label: 'Acknowledged', note: 'Escalated due to heat risk', time: '06:55' },
      { label: 'Vendor assigned', note: 'BluePeak HVAC dispatched tech', time: '07:22' },
      { label: 'In Progress', note: 'Technician entered unit', time: '10:11' },
    ],
  },
  {
    id: 'MR-1031',
    title: 'Hallway light flickering',
    property: 'Maple Court',
    unit: 'Common Area',
    tenant: 'Building manager note',
    category: 'Electrical',
    priority: 'Medium',
    status: 'Waiting on Parts',
    submittedAt: '4/4/2024',
    accessWindow: 'N/A',
    description:
      'Common hallway fixture is flickering repeatedly. Electrician says ballast replacement is needed.',
    vendor: 'BrightWire Electric',
    estimate: '$140',
    lastUpdate: 'Replacement ballast ordered, expected tomorrow morning.',
    timeline: [
      { label: 'Request submitted', note: 'Issue logged by onsite manager', time: '16:40' },
      { label: 'Acknowledged', note: 'Marked non-emergency but visible tenant issue', time: '16:58' },
      { label: 'Vendor assigned', note: 'BrightWire inspected fixture', time: '18:21' },
      { label: 'Waiting on Parts', note: 'Part ordered for next visit', time: '18:40' },
    ],
  },
  {
    id: 'MR-1027',
    title: 'Bathroom ceiling patch + paint',
    property: 'Pine Terrace',
    unit: '7C',
    tenant: 'Mina Patel',
    category: 'General repair',
    priority: 'Low',
    status: 'Completed',
    submittedAt: '3/12/2024',
    accessWindow: 'Weekdays after 10am',
    description:
      'Minor drywall patch needed after previous leak repair. Tenant requested finishing date for cleanup.',
    vendor: 'Evergreen Repairs',
    estimate: '$95',
    lastUpdate: 'Patch and paint completed; tenant confirmed issue resolved.',
    timeline: [
      { label: 'Request submitted', note: 'Drywall follow-up needed', time: '09:12' },
      { label: 'Scheduled', note: 'Painter booked for afternoon visit', time: '11:07' },
      { label: 'Completed', note: 'Tenant approved finished repair', time: '15:42' },
    ],
  },
]

const vendors = [
  { name: 'Northline Plumbing', specialty: 'Plumbing', eta: 'Tomorrow 1pm–4pm', load: '2 open jobs' },
  { name: 'BluePeak HVAC', specialty: 'HVAC', eta: 'On site', load: '1 urgent job' },
  { name: 'BrightWire Electric', specialty: 'Electrical', eta: 'Awaiting part', load: '1 blocked job' },
]

const workflowSteps = [
  {
    title: 'Operational clarity',
    detail: 'Capture every issue with the right context so managers stop wasting time on follow-up messages and scattered notes.',
  },
  {
    title: 'White-glove coordination',
    detail: 'Route vendors, schedule visits, and publish clean status updates that feel deliberate instead of reactive.',
  },
  {
    title: 'Tenant confidence',
    detail: 'Give residents a premium experience with clear timelines, faster acknowledgements, and visible progress.',
  },
]

const railItems = ['home', 'plus', 'clock', 'list', 'chart', 'mail', 'gear']

const navItems = [
  { section: 'Applications', items: [{ label: 'Maintenance Requests', active: true }] },
  {
    section: 'All Leases',
    items: [
      { label: 'Active Leases', active: false },
      { label: 'Inactive Leases', active: false },
    ],
  },
  {
    section: 'In Process',
    items: [
      { label: 'Draft Leases', active: false },
      { label: 'Renewals', active: false },
    ],
  },
]

const statusOrder: Status[] = ['New', 'Acknowledged', 'Scheduled', 'In Progress', 'Waiting on Parts', 'Completed']
const statusTone: Record<Status, string> = {
  New: 'slate',
  Acknowledged: 'blue',
  Scheduled: 'violet',
  'In Progress': 'amber',
  'Waiting on Parts': 'rose',
  Completed: 'green',
}
const priorityTone: Record<Priority, string> = {
  Low: 'slate',
  Medium: 'blue',
  High: 'amber',
  Urgent: 'rose',
}

function App() {
  const [selectedId, setSelectedId] = useState(requests[0].id)
  const [statusFilter, setStatusFilter] = useState<'All' | Status>('All')
  const [showTenantForm, setShowTenantForm] = useState(true)

  const selectedRequest = requests.find((item) => item.id === selectedId) ?? requests[0]

  const filteredRequests = useMemo(() => {
    if (statusFilter === 'All') return requests
    return requests.filter((item) => item.status === statusFilter)
  }, [statusFilter])

  const stats = [
    { label: 'Open requests', value: String(requests.filter((item) => item.status !== 'Completed').length) },
    { label: 'Urgent now', value: String(requests.filter((item) => item.priority === 'Urgent').length) },
    { label: 'Completed today', value: String(requests.filter((item) => item.status === 'Completed').length) },
    { label: 'Avg vendor response', value: '34 min' },
  ]

  return (
    <div className="page-shell">
      <div className="mesh mesh-one" />
      <div className="mesh mesh-two" />
      <div className="mesh mesh-three" />
      <div className="grid-fade" />

      <div className="workspace-shell">
        <aside className="icon-rail">
          <div className="icon-rail-top">
            <div className="rail-logo">M</div>
            {railItems.map((item, index) => (
              <button key={item} className={`rail-icon ${index === 3 ? 'active' : ''}`} aria-label={item}>
                <span />
              </button>
            ))}
          </div>
          <button className="rail-icon bottom" aria-label="profile">
            <span />
          </button>
        </aside>

        <aside className="sidebar-shell">
          <div className="sidebar-top">
            <button className="sidebar-back">‹</button>
            <div className="sidebar-brand-copy">
              <strong>Leasing</strong>
            </div>
          </div>

          <div className="sidebar-group-list">
            {navItems.map((group) => (
              <div key={group.section} className="sidebar-group">
                <span className="sidebar-label">{group.section}</span>
                <div className="sidebar-nav">
                  {group.items.map((item) => (
                    <button key={item.label} className={`sidebar-item ${item.active ? 'active' : ''}`}>
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </aside>

        <main className="app-shell">
          <section className="topbar premium-bar">
            <div>
              <p className="eyebrow">Applications-style workspace</p>
              <h1 className="page-title">Maintenance Requests</h1>
            </div>

            <div className="topbar-actions">
              <div className="search-shell">Search anything</div>
              <button className="utility-button">Share View</button>
              <div className="user-avatar">TC</div>
            </div>
          </section>

          <section className="hero premium-hero" id="product">
            <div className="hero-copy">
              <p className="section-kicker">Enterprise-inspired premium redesign</p>
              <h2>Turn maintenance into a branded, high-trust experience.</h2>
              <p className="hero-text">
                MaintenanceOS gives small landlords and property managers a more elevated operating layer for repair
                intake, vendor coordination, and resident communication — without the clutter of heavyweight property
                software.
              </p>

              <div className="hero-actions">
                <a className="primary-button" href="#dashboard">Open queue</a>
                <button className="secondary-button" onClick={() => setShowTenantForm((value) => !value)}>
                  {showTenantForm ? 'Hide resident intake' : 'Show resident intake'}
                </button>
              </div>

              <div className="hero-footnote">
                <span>Structured like a real operations workspace: quick scanning, compact records, and always-visible status.</span>
              </div>

              <div className="stats-grid">
                {stats.map((item) => (
                  <article key={item.label} className="stat-card luxe-card">
                    <span>{item.label}</span>
                    <strong>{item.value}</strong>
                  </article>
                ))}
              </div>
            </div>

            <div className="hero-preview card-surface luxe-panel light-panel">
              <div className="preview-header">
                <div>
                  <p className="eyebrow">Portfolio view</p>
                  <h3>Service quality snapshot</h3>
                </div>
                <span className="status-pill tone-gold">White-glove mode</span>
              </div>

              <div className="executive-strip">
                <article>
                  <span>Resident satisfaction</span>
                  <strong>96%</strong>
                </article>
                <article>
                  <span>Median first response</span>
                  <strong>11 min</strong>
                </article>
              </div>

              <div className="preview-stack compact-stack">
                {requests.slice(0, 3).map((request) => (
                  <button key={request.id} className="preview-row luxe-row light-row" onClick={() => setSelectedId(request.id)}>
                    <div>
                      <strong>{request.title}</strong>
                      <p>
                        {request.property} · {request.unit}
                      </p>
                    </div>
                    <div className="preview-meta">
                      <span className={`status-pill tone-${statusTone[request.status]}`}>{request.status}</span>
                      <span className={`status-pill tone-${priorityTone[request.priority]}`}>{request.priority}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </section>

          <section className="value-grid premium-value-grid">
            {workflowSteps.map((step, index) => (
              <article key={step.title} className="value-card card-surface luxe-card light-panel">
                <span className="step-index">0{index + 1}</span>
                <h3>{step.title}</h3>
                <p>{step.detail}</p>
              </article>
            ))}
          </section>

          <section className="workspace-grid" id="dashboard">
            <div className="card-surface queue-panel luxe-panel light-panel main-table-panel">
              <div className="panel-header panel-header-stacked table-toolbar">
                <div>
                  <p className="eyebrow">Queue</p>
                  <h3>Operations board</h3>
                </div>
                <div className="filter-row">
                  <button
                    className={`filter-chip ${statusFilter === 'All' ? 'active' : ''}`}
                    onClick={() => setStatusFilter('All')}
                  >
                    All
                  </button>
                  {statusOrder.map((status) => (
                    <button
                      key={status}
                      className={`filter-chip ${statusFilter === status ? 'active' : ''}`}
                      onClick={() => setStatusFilter(status)}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>

              <div className="data-table-shell">
                <div className="table-head request-table-row">
                  <span>Request</span>
                  <span>Property</span>
                  <span>Created At</span>
                  <span>Status</span>
                  <span>Next</span>
                </div>

                <div className="request-list table-list">
                  {filteredRequests.map((request) => (
                    <button
                      key={request.id}
                      className={`request-card request-table-row luxe-row light-row ${selectedId === request.id ? 'selected' : ''}`}
                      onClick={() => setSelectedId(request.id)}
                    >
                      <div className="table-primary applicant-cell">
                        <div className="avatar-circle">{request.tenant.slice(0, 2).toUpperCase()}</div>
                        <div>
                          <span className="request-id">{request.id}</span>
                          <strong>{request.title}</strong>
                          <p>{request.tenant}</p>
                        </div>
                      </div>
                      <span>
                        {request.property}
                        <small>{request.unit}</small>
                      </span>
                      <span>{request.submittedAt}</span>
                      <span className={`status-pill tone-${statusTone[request.status]}`}>{request.status}</span>
                      <div className="table-actions">
                        <span className={`mini-dot tone-bg-${statusTone[request.status]}`} />
                        <span className={`mini-dot tone-bg-${priorityTone[request.priority]}`} />
                        <span className="mini-dot tone-bg-slate" />
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="detail-column">
              <section className="card-surface detail-panel luxe-panel light-panel">
                <div className="panel-header">
                  <div>
                    <p className="eyebrow">Case detail</p>
                    <h3>{selectedRequest.title}</h3>
                  </div>
                  <span className={`status-pill tone-${statusTone[selectedRequest.status]}`}>{selectedRequest.status}</span>
                </div>

                <div className="detail-grid">
                  <article>
                    <span>Property</span>
                    <strong>
                      {selectedRequest.property} · {selectedRequest.unit}
                    </strong>
                  </article>
                  <article>
                    <span>Resident</span>
                    <strong>{selectedRequest.tenant}</strong>
                  </article>
                  <article>
                    <span>Assigned vendor</span>
                    <strong>{selectedRequest.vendor}</strong>
                  </article>
                  <article>
                    <span>Approved estimate</span>
                    <strong>{selectedRequest.estimate}</strong>
                  </article>
                </div>

                <p className="detail-description">{selectedRequest.description}</p>

                <div className="timeline-block luxe-inset">
                  <div className="timeline-header">
                    <h3>Resident-visible timeline</h3>
                    <span>{selectedRequest.submittedAt}</span>
                  </div>

                  <div className="timeline-list">
                    {selectedRequest.timeline.map((event) => (
                      <article key={`${event.label}-${event.time}`} className="timeline-item">
                        <div className="timeline-dot" />
                        <div>
                          <strong>{event.label}</strong>
                          <p>{event.note}</p>
                        </div>
                        <time>{event.time}</time>
                      </article>
                    ))}
                  </div>
                </div>
              </section>

              <section className="lower-grid">
                <div className="card-surface vendor-panel luxe-panel light-panel">
                  <div className="panel-header compact">
                    <div>
                      <p className="eyebrow">Vendor desk</p>
                      <h3>Preferred partners</h3>
                    </div>
                  </div>

                  <div className="vendor-list">
                    {vendors.map((vendor) => (
                      <article key={vendor.name} className="vendor-card luxe-inset">
                        <div>
                          <strong>{vendor.name}</strong>
                          <p>{vendor.specialty}</p>
                        </div>
                        <div className="vendor-meta">
                          <span>{vendor.eta}</span>
                          <span>{vendor.load}</span>
                        </div>
                      </article>
                    ))}
                  </div>
                </div>

                {showTenantForm ? (
                  <div className="card-surface intake-panel luxe-panel light-panel">
                    <div className="panel-header compact">
                      <div>
                        <p className="eyebrow">Resident experience</p>
                        <h3>Elegant intake flow</h3>
                      </div>
                    </div>

                    <div className="intake-form">
                      <label>
                        Issue title
                        <input value="Kitchen sink leak under cabinet" readOnly />
                      </label>
                      <label>
                        Describe the issue
                        <textarea value="Water dripping under sink. Cabinet floor is wet and getting worse." readOnly />
                      </label>
                      <div className="inline-fields">
                        <label>
                          Unit
                          <input value="2B" readOnly />
                        </label>
                        <label>
                          Access
                          <input value="Tomorrow 1pm–4pm" readOnly />
                        </label>
                      </div>
                      <button className="primary-button full">Submit request</button>
                    </div>
                  </div>
                ) : null}
              </section>
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}

export default App
