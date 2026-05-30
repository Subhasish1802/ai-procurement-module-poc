export const tenders = [
  {
    id: 'GEM-2026-B-4521',
    title: 'IT Hardware — 500 Desktops',
    department: 'Ministry of Defence',
    category: 'IT Hardware',
    estimatedValue: '₹4.25 Cr',
    status: 'evaluating' as const,
    bidsReceived: 8,
    evalProgress: 65,
    createdAt: '2026-05-15',
  },
  {
    id: 'CPP-2026-S-892',
    title: 'Cloud Infrastructure — MeitY',
    department: 'MeitY',
    category: 'Cloud Services',
    estimatedValue: '₹12.8 Cr',
    status: 'active' as const,
    bidsReceived: 3,
    evalProgress: 0,
    createdAt: '2026-05-20',
  },
  {
    id: 'GEM-2026-B-4498',
    title: 'Office Furniture — 200 Units',
    department: 'Ministry of Finance',
    category: 'Furniture',
    estimatedValue: '₹85 L',
    status: 'completed' as const,
    bidsReceived: 12,
    evalProgress: 100,
    createdAt: '2026-04-28',
    l1Bidder: 'Godrej Interio',
    l1Amount: '₹72.4L',
  },
  {
    id: 'GEM-2026-B-4535',
    title: 'CCTV Security System — 120 Cameras',
    department: 'Ministry of Home Affairs',
    category: 'Security',
    estimatedValue: '₹1.6 Cr',
    status: 'draft' as const,
    bidsReceived: 0,
    evalProgress: 0,
    createdAt: '2026-05-28',
  },
]

export const bidders = [
  {
    id: 'B001',
    name: 'HP India Pvt Ltd',
    type: 'Large',
    localClass: 'Class 1 Local',
    msme: false,
    scores: { specMatch: 28, experience: 14, warranty: 13, delivery: 7, total: 62, maxTotal: 70 },
    amount: '₹3.92 Cr',
    rank: 1,
    evidence: [
      { criterion: 'CPU specification (i5 12th gen+)', score: '10/10', status: 'pass', evidence: '"Intel Core i5-13400 processor, 10 cores, 4.6GHz boost"', page: 'pg. 4' },
      { criterion: 'RAM specification (16GB DDR4+)', score: '10/10', status: 'pass', evidence: '"16GB DDR4-3200MHz, expandable to 32GB"', page: 'pg. 4' },
      { criterion: 'SSD specification (512GB NVMe)', score: '8/10', status: 'pass', evidence: '"512GB PCIe NVMe M.2 SSD, sequential read 3500MB/s"', page: 'pg. 5' },
      { criterion: 'Past experience (3+ orders of 100+)', score: '14/15', status: 'pass', evidence: '"5 completed orders for MoD, DRDO, MeitY totalling 2400 units"', page: 'pg. 12-14' },
      { criterion: '3-year on-site warranty', score: '13/15', status: 'pass', evidence: '"Comprehensive 3-year on-site warranty with 4hr SLA in metros"', page: 'pg. 8' },
      { criterion: 'Delivery within 45 days', score: '7/10', status: 'pass', evidence: '"Committed delivery: 40 days from PO for metro locations"', page: 'pg. 9' },
    ],
  },
  {
    id: 'B002',
    name: 'Dell Technologies India',
    type: 'Large',
    localClass: 'Class 1 Local',
    msme: false,
    scores: { specMatch: 27, experience: 13, warranty: 14, delivery: 6, total: 60, maxTotal: 70 },
    amount: '₹4.05 Cr',
    rank: 2,
    evidence: [
      { criterion: 'CPU specification (i5 12th gen+)', score: '9/10', status: 'pass', evidence: '"Intel Core i5-13500 processor, 14 cores"', page: 'pg. 3' },
      { criterion: 'RAM specification (16GB DDR4+)', score: '10/10', status: 'pass', evidence: '"16GB DDR5-4800MHz dual-channel"', page: 'pg. 3' },
      { criterion: 'SSD specification (512GB NVMe)', score: '8/10', status: 'pass', evidence: '"512GB M.2 PCIe NVMe Class 40 SSD"', page: 'pg. 4' },
      { criterion: 'Past experience (3+ orders of 100+)', score: '13/15', status: 'pass', evidence: '"4 completed Govt orders including Railways, UIDAI"', page: 'pg. 10' },
      { criterion: '3-year on-site warranty', score: '14/15', status: 'pass', evidence: '"ProSupport Plus 3-year warranty, next business day"', page: 'pg. 6' },
      { criterion: 'Delivery within 45 days', score: '6/10', status: 'pass', evidence: '"Estimated delivery: 42 days from confirmed PO"', page: 'pg. 8' },
    ],
  },
  {
    id: 'B003',
    name: 'Acer India Ltd',
    type: 'Large',
    localClass: 'Class 2 Local',
    msme: false,
    scores: { specMatch: 24, experience: 11, warranty: 12, delivery: 5, total: 52, maxTotal: 70 },
    amount: '₹3.68 Cr',
    rank: 3,
    evidence: [],
  },
  {
    id: 'B004',
    name: 'CompuTech Solutions',
    type: 'MSME',
    localClass: 'Micro Enterprise',
    msme: true,
    scores: { specMatch: 22, experience: 9, warranty: 11, delivery: 5, total: 47, maxTotal: 70 },
    amount: '₹3.55 Cr',
    rank: 4,
    evidence: [],
  },
  {
    id: 'B005',
    name: 'Lenovo India',
    type: 'Large',
    localClass: 'Class 1 Local',
    msme: false,
    scores: { specMatch: 26, experience: 12, warranty: 13, delivery: 7, total: 58, maxTotal: 70 },
    amount: '₹4.12 Cr',
    rank: 5,
    evidence: [],
  },
]

export const activities = [
  { type: 'success', text: 'Evaluation complete — Office Furniture tender. L1: Godrej Interio at ₹72.4L', time: '2 hours ago' },
  { type: 'info', text: 'New bid received — TCS submitted bid for Cloud Infrastructure tender', time: '4 hours ago' },
  { type: 'warning', text: 'Document verification — 3 MSME certificates verified for IT Hardware', time: '6 hours ago' },
  { type: 'purple', text: 'RFP generated — CCTV Security System draft created via AI assistant', time: 'Yesterday' },
]

export const stats = [
  { label: 'Active tenders', value: '12', sub: '3 awaiting evaluation', icon: 'file', color: 'text-blue-600' },
  { label: 'Pending evaluations', value: '7', sub: '48 bids to review', icon: 'clock', color: 'text-amber-600' },
  { label: 'Completed this month', value: '23', sub: '+38% vs last month', icon: 'check', color: 'text-emerald-600' },
  { label: 'Avg eval time', value: '2.4 hrs', sub: 'Was 8-12 weeks manual', icon: 'zap', color: 'text-purple-600' },
]

export const rfpSystemPrompt = `You are an AI Government Procurement RFP drafting assistant for Indian government tendering.

Your role is to help government officers create GeM-compliant tender documents through conversation.

RULES:
- Follow GFR 2017 (Rules 144-175)
- Include MSME clauses per MSME Order 2018
- Include Make-in-India preference per DPIIT Order
- Generate scoring matrix with appropriate weights
- Use GeM tender format with all mandatory fields
- Be conversational but professional
- Ask clarifying questions when needed
- When you have enough info, generate the RFP sections

When generating an RFP, structure it as:
1. Tender Title & ID
2. Scope of Work
3. Eligibility Criteria
4. Scoring Matrix (Technical:Financial ratio)
5. MSME & Make-in-India clauses
6. EMD & Tender Fee details
7. Submission Timeline

Keep responses concise and actionable. Use markdown formatting.`

export const evalSystemPrompt = `You are an AI Bid Evaluation Engine for Indian government procurement.

Given a tender requirement and a bidder's submission details, evaluate the bid technically.

For each criterion:
1. Assign a score (0 to max)
2. Determine Pass/Fail
3. Quote specific evidence from the bid
4. Write a 1-2 sentence rationale

Output in a structured format. Be precise and cite evidence.
Every evaluation must be explainable and auditable per GFR 2017 requirements.`
