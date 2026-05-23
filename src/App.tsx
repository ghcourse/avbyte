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
    submittedAt: 'Today · 08:14',
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
    submittedAt: 'Today · 06:48',
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
    submittedAt: 'Yesterday · 16:40',
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
    submittedAt: 'Yesterday · 09:12',
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
    title: 'Capture the request once',
    detail: 'Tenants submit issues with photos, access notes, and urgency so your team starts with context instead of chasing details.',
  },
  {
    title: 'Assign and update fast',
    detail: 'Managers route the job, set expectations, and coordinate vendors without scattered text threads.',
  },
  {
    title: 'Keep everyone aligned',
    detail: 'A shared timeline gives tenants, staff, and vendors one clear source of truth from intake to completion.',
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
      <div className="glow glow-one" />
      <div className="glow glow-two" />
      <div className="glow glow-three" />

      <div className="app-shell">
        <section className="topbar">
          <div className="brand-lockup">
            <div className="brand-badge">MO</div>
            <div>
              <p className="eyebrow">MaintenanceOS</p>
              <strong>Maintenance operations for small landlords</strong>
            </div>
          </div>

          <div className="topbar-actions">
            <span className="ghost-pill">Focused product wedge</span>
            <a className="primary-button small" href="#product">Explore product</a>
          </div>
        </section>

        <section className="hero" id="product">
          <div className="hero-copy">
            <p className="section-kicker">Rebuilt interface concept</p>
            <h1>Keep every repair request, vendor handoff, and tenant update in one calm workflow.</h1>
            <p className="hero-text">
              MaintenanceOS is a cleaner operating layer for small landlords and property managers who are tired of
              juggling texts, spreadsheets, and bloated all-in-one software.
            </p>

            <div className="hero-actions">
              <a className="primary-button" href="#dashboard">View dashboard</a>
              <button className="secondary-button" onClick={() => setShowTenantForm((value) => !value)}>
                {showTenantForm ? 'Hide intake panel' : 'Show intake panel'}
              </button>
            </div>

            <div className="stats-grid">
              {stats.map((item) => (
                <article key={item.label} className="stat-card">
                  <span>{item.label}</span>
                  <strong>{item.value}</strong>
                </article>
              ))}
            </div>
          </div>

          <div className="hero-preview card-surface">
            <div className="preview-header">
              <div>
                <p className="eyebrow">Live operations snapshot</p>
                <h2>Today’s queue</h2>
              </div>
              <span className="status-pill tone-green">4 updates sent</span>
            </div>

            <div className="preview-stack">
              {requests.slice(0, 3).map((request) => (
                <button key={request.id} className="preview-row" onClick={() => setSelectedId(request.id)}>
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

        <section className="value-grid">
          {workflowSteps.map((step, index) => (
            <article key={step.title} className="value-card card-surface">
              <span className="step-index">0{index + 1}</span>
              <h3>{step.title}</h3>
              <p>{step.detail}</p>
            </article>
          ))}
        </section>

        <section className="workspace-grid" id="dashboard">
          <div className="card-surface queue-panel">
            <div className="panel-header">
              <div>
                <p className="eyebrow">Queue</p>
                <h2>Request board</h2>
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

            <div className="request-list">
              {filteredRequests.map((request) => (
                <button
                  key={request.id}
                  className={`request-card ${selectedId === request.id ? 'selected' : ''}`}
                  onClick={() => setSelectedId(request.id)}
                >
                  <div className="request-card-top">
                    <div>
                      <span className="request-id">{request.id}</span>
                      <h3>{request.title}</h3>
                    </div>
                    <span className={`status-pill tone-${priorityTone[request.priority]}`}>{request.priority}</span>
                  </div>

                  <div className="request-card-meta">
                    <span>
                      {request.property} · {request.unit}
                    </span>
                    <span>{request.tenant}</span>
                    <span>{request.accessWindow}</span>
                  </div>

                  <div className="request-card-bottom">
                    <span className={`status-pill tone-${statusTone[request.status]}`}>{request.status}</span>
                    <p>{request.lastUpdate}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="detail-column">
            <section className="card-surface detail-panel">
              <div className="panel-header">
                <div>
                  <p className="eyebrow">Selected request</p>
                  <h2>{selectedRequest.title}</h2>
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
                  <span>Tenant</span>
                  <strong>{selectedRequest.tenant}</strong>
                </article>
                <article>
                  <span>Assigned vendor</span>
                  <strong>{selectedRequest.vendor}</strong>
                </article>
                <article>
                  <span>Estimate</span>
                  <strong>{selectedRequest.estimate}</strong>
                </article>
              </div>

              <p className="detail-description">{selectedRequest.description}</p>

              <div className="timeline-block">
                <div className="timeline-header">
                  <h3>Shared timeline</h3>
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
              <div className="card-surface vendor-panel">
                <div className="panel-header compact">
                  <div>
                    <p className="eyebrow">Vendor coordination</p>
                    <h3>Active partners</h3>
                  </div>
                </div>

                <div className="vendor-list">
                  {vendors.map((vendor) => (
                    <article key={vendor.name} className="vendor-card">
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
                <div className="card-surface intake-panel">
                  <div className="panel-header compact">
                    <div>
                      <p className="eyebrow">Tenant view</p>
                      <h3>Simple intake form</h3>
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
      </div>
    </div>
  )
}

export default App
