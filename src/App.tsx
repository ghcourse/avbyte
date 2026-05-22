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
  const [showTenantForm, setShowTenantForm] = useState(false)

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
    <div className="app-shell">
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />
      <div className="ambient ambient-three" />

      <section className="hero-panel">
        <div className="hero-nav">
          <div className="brand-wrap">
            <div className="brand-badge">MO</div>
            <div>
              <p className="mini-kicker">MaintenanceOS · MVP app shell</p>
              <h1>Run landlord maintenance without losing the thread.</h1>
            </div>
          </div>

          <div className="hero-status">
            <span className="status-pill">Small landlord workflow</span>
            <button className="status-pill action-pill" onClick={() => setShowTenantForm((value) => !value)}>
              {showTenantForm ? 'Hide tenant form' : 'Open tenant form'}
            </button>
          </div>
        </div>

        <div className="hero-grid app-hero-grid">
          <div className="hero-copy">
            <p className="section-kicker">What this app covers</p>
            <p className="hero-text">
              A working MVP shell for the core wedge: request intake, status tracking, vendor
              coordination, and tenant visibility. This is the product direction we can now wire to
              real auth, database records, uploads, and notifications.
            </p>

            <div className="signal-strip stat-strip">
              {stats.map((item) => (
                <article key={item.label} className="signal-card stat-card">
                  <span>{item.label}</span>
                  <strong>{item.value}</strong>
                  <p>Focused on one workflow that landlords already feel every day.</p>
                </article>
              ))}
            </div>
          </div>

          <aside className="hero-highlight product-note">
            <p className="section-kicker">MVP scope</p>
            <div className="focus-ring">
              <div>
                <span>Build sequence</span>
                <strong>Dashboard → request detail → tenant intake → vendor ops</strong>
              </div>
            </div>
            <ul className="focus-list">
              <li>Keep the first version tightly focused on maintenance communication.</li>
              <li>Use role-based views later instead of cramming everything into one screen.</li>
              <li>The strongest differentiator is a clear timeline visible to everyone involved.</li>
            </ul>
          </aside>
        </div>
      </section>

      <section className="workspace-grid">
        <section className="panel board-panel">
          <div className="panel-head">
            <div>
              <p className="section-kicker">Dashboard</p>
              <h2>Request board</h2>
            </div>
            <div className="filter-row">
              {(['All', ...statusOrder] as const).map((status) => (
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
            {filteredRequests.map((item) => (
              <button
                key={item.id}
                className={`request-card ${selectedId === item.id ? 'selected' : ''}`}
                onClick={() => setSelectedId(item.id)}
              >
                <div className="request-topline">
                  <div>
                    <p className="request-id">{item.id}</p>
                    <h3>{item.title}</h3>
                  </div>
                  <span className={`tone-pill ${statusTone[item.status]}`}>{item.status}</span>
                </div>

                <div className="request-meta-grid">
                  <div>
                    <span>Property</span>
                    <strong>
                      {item.property} · {item.unit}
                    </strong>
                  </div>
                  <div>
                    <span>Priority</span>
                    <strong className={`priority-text ${priorityTone[item.priority]}`}>{item.priority}</strong>
                  </div>
                  <div>
                    <span>Vendor</span>
                    <strong>{item.vendor}</strong>
                  </div>
                  <div>
                    <span>Submitted</span>
                    <strong>{item.submittedAt}</strong>
                  </div>
                </div>

                <p className="request-note">{item.lastUpdate}</p>
              </button>
            ))}
          </div>
        </section>

        <section className="panel detail-panel">
          <div className="panel-head sticky-head">
            <div>
              <p className="section-kicker">Request detail</p>
              <h2>{selectedRequest.title}</h2>
            </div>
            <div className="tone-group">
              <span className={`tone-pill ${statusTone[selectedRequest.status]}`}>{selectedRequest.status}</span>
              <span className={`tone-pill ${priorityTone[selectedRequest.priority]}`}>{selectedRequest.priority}</span>
            </div>
          </div>

          <div className="detail-grid">
            <article className="detail-card">
              <span>Tenant</span>
              <strong>{selectedRequest.tenant}</strong>
              <p>{selectedRequest.property} · Unit {selectedRequest.unit}</p>
            </article>
            <article className="detail-card">
              <span>Category</span>
              <strong>{selectedRequest.category}</strong>
              <p>Preferred access: {selectedRequest.accessWindow}</p>
            </article>
            <article className="detail-card">
              <span>Vendor</span>
              <strong>{selectedRequest.vendor}</strong>
              <p>Current estimate: {selectedRequest.estimate}</p>
            </article>
          </div>

          <article className="content-block">
            <div className="card-head compact-head">
              <div>
                <p className="section-kicker">Description</p>
                <h3>What happened</h3>
              </div>
            </div>
            <p className="card-copy">{selectedRequest.description}</p>
          </article>

          <article className="content-block">
            <div className="card-head compact-head">
              <div>
                <p className="section-kicker">Timeline</p>
                <h3>Shared repair history</h3>
              </div>
            </div>
            <div className="timeline-list">
              {selectedRequest.timeline.map((item) => (
                <div key={`${item.label}-${item.time}`} className="timeline-item">
                  <div className="timeline-dot" />
                  <div>
                    <div className="timeline-topline">
                      <strong>{item.label}</strong>
                      <span>{item.time}</span>
                    </div>
                    <p>{item.note}</p>
                  </div>
                </div>
              ))}
            </div>
          </article>
        </section>

        <section className="panel side-panel">
          <div className="stack-panel">
            <div className="panel-head compact-head">
              <div>
                <p className="section-kicker">Vendor coordination</p>
                <h2>Active vendors</h2>
              </div>
            </div>
            <div className="vendor-list">
              {vendors.map((vendor) => (
                <article key={vendor.name} className="vendor-card">
                  <div className="vendor-topline">
                    <strong>{vendor.name}</strong>
                    <span>{vendor.specialty}</span>
                  </div>
                  <p>{vendor.eta}</p>
                  <small>{vendor.load}</small>
                </article>
              ))}
            </div>
          </div>

          <div className="stack-panel">
            <div className="panel-head compact-head">
              <div>
                <p className="section-kicker">Tenant view</p>
                <h2>Submission flow</h2>
              </div>
            </div>

            <div className={`tenant-form-card ${showTenantForm ? 'expanded' : ''}`}>
              <div className="fake-form-grid">
                <label>
                  <span>Issue title</span>
                  <input value="Water leaking from ceiling vent" readOnly />
                </label>
                <label>
                  <span>Property / Unit</span>
                  <input value="Maple Court · 3A" readOnly />
                </label>
                <label>
                  <span>Category</span>
                  <input value="Plumbing" readOnly />
                </label>
                <label>
                  <span>Urgency</span>
                  <input value="High" readOnly />
                </label>
                <label className="full-span">
                  <span>Description</span>
                  <textarea value="Leak started this morning. Ceiling is damp and dripping near the vent. Photos attached." readOnly />
                </label>
              </div>
              <div className="upload-row">
                <div className="upload-box">Photo 1</div>
                <div className="upload-box">Photo 2</div>
                <div className="upload-box ghost">+ add image</div>
              </div>
              <button className="primary-button full-width">Submit maintenance request</button>
            </div>
          </div>
        </section>
      </section>
    </div>
  )
}

export default App
