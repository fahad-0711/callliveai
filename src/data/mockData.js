// ═══════════════════════════════════════════════════
// CALLLIVEAI — Mock Data
// ═══════════════════════════════════════════════════

export const agents = [
  { id: 1, name: 'Priya Reddy', initials: 'PR', color: '#00f5ff', gradient: 'linear-gradient(135deg, #00f5ff, #0088cc)', leads: 12, calls: 34, deals: 3, role: 'Senior Agent' },
  { id: 2, name: 'Rahul Sharma', initials: 'RS', color: '#bf00ff', gradient: 'linear-gradient(135deg, #bf00ff, #8000aa)', leads: 8, calls: 28, deals: 2, role: 'Agent' },
  { id: 3, name: 'Meera Krishnan', initials: 'MK', color: '#ffaa00', gradient: 'linear-gradient(135deg, #ffaa00, #cc7700)', leads: 6, calls: 19, deals: 1, role: 'Agent' },
  { id: 4, name: 'Arjun Tiwari', initials: 'AT', color: '#00ff88', gradient: 'linear-gradient(135deg, #00ff88, #00aa55)', leads: 9, calls: 31, deals: 3, role: 'Agent' },
];

export const currentUser = {
  id: 0,
  name: 'Pintu Singha',
  initials: 'PS',
  role: 'TEAM LEAD',
  gradient: 'linear-gradient(135deg, #00f5ff, #bf00ff)',
};

export const leads = [
  {
    id: 1, name: 'Ravi Kumar', phone: '9876543210', email: 'ravi@email.com',
    source: 'MagicBricks', property: '3BHK', locality: 'Whitefield', budget: '₹85L',
    budgetNum: 8500000, status: 'Hot', stage: 'Negotiation', agentId: 1,
    lastContact: '2026-06-13', nextFollowup: '2026-06-16',
    aiCallStatus: 'Connected', aiCallDuration: '2m 34s', sentiment: 'Interested',
    notes: 'Looking for a spacious 3BHK near IT corridor. Prefers East-facing.',
    createdAt: '2026-05-20',
  },
  {
    id: 2, name: 'Ananya Sharma', phone: '9845012345', email: 'ananya@email.com',
    source: 'Instagram', property: 'Villa', locality: 'Sarjapur', budget: '₹1.8Cr',
    budgetNum: 18000000, status: 'Warm', stage: 'Site Visit', agentId: 2,
    lastContact: '2026-06-14', nextFollowup: '2026-06-17',
    aiCallStatus: 'No Answer', aiCallDuration: '0m 00s', sentiment: '—',
    notes: 'Interested in premium villas with garden.',
    createdAt: '2026-05-25',
  },
  {
    id: 3, name: 'Arjun Mehta', phone: '9900112233', email: 'arjun.m@email.com',
    source: 'Walk-in', property: '2BHK', locality: 'Electronic City', budget: '₹55L',
    budgetNum: 5500000, status: 'Cold', stage: 'New Inquiry', agentId: 3,
    lastContact: '2026-06-10', nextFollowup: '2026-06-18',
    aiCallStatus: 'Connected', aiCallDuration: '1m 12s', sentiment: 'Neutral',
    notes: 'First-time buyer, needs financing guidance.',
    createdAt: '2026-06-01',
  },
  {
    id: 4, name: 'Sunita Rao', phone: '9811223344', email: 'sunita.rao@email.com',
    source: '99acres', property: 'Plot', locality: 'Devanahalli', budget: '₹45L',
    budgetNum: 4500000, status: 'Hot', stage: 'New Inquiry', agentId: 1,
    lastContact: '2026-06-14', nextFollowup: '2026-06-16',
    aiCallStatus: 'Connected', aiCallDuration: '3m 02s', sentiment: 'Interested',
    notes: 'Looking for plot near airport for investment.',
    createdAt: '2026-06-05',
  },
  {
    id: 5, name: 'Vikram Nair', phone: '9922334455', email: 'vikram.n@email.com',
    source: 'Referral', property: '4BHK', locality: 'Indiranagar', budget: '₹2.4Cr',
    budgetNum: 24000000, status: 'Hot', stage: 'Documentation', agentId: 4,
    lastContact: '2026-06-12', nextFollowup: '2026-06-15',
    aiCallStatus: 'Voicemail', aiCallDuration: '0m 00s', sentiment: '—',
    notes: 'High-value buyer, relocating from Mumbai.',
    createdAt: '2026-05-15',
  },
  {
    id: 6, name: 'Divya Patel', phone: '9833445566', email: 'divya.p@email.com',
    source: 'MagicBricks', property: '3BHK', locality: 'Hennur', budget: '₹72L',
    budgetNum: 7200000, status: 'Warm', stage: 'Negotiation', agentId: 2,
    lastContact: '2026-06-13', nextFollowup: '2026-06-17',
    aiCallStatus: 'Connected', aiCallDuration: '1m 45s', sentiment: 'Interested',
    notes: 'Comparing with 2 other properties in the area.',
    createdAt: '2026-05-28',
  },
  {
    id: 7, name: 'Suresh Iyer', phone: '9744556677', email: 'suresh.i@email.com',
    source: 'Walk-in', property: 'Commercial', locality: 'HSR Layout', budget: '₹3.2Cr',
    budgetNum: 32000000, status: 'Hot', stage: 'Documentation', agentId: 1,
    lastContact: '2026-06-14', nextFollowup: '2026-06-15',
    aiCallStatus: 'Connected', aiCallDuration: '4m 15s', sentiment: 'Interested',
    notes: 'Looking for office space, 2000+ sq ft.',
    createdAt: '2026-05-10',
  },
  {
    id: 8, name: 'Kavya Reddy', phone: '9655667788', email: 'kavya.r@email.com',
    source: 'Instagram', property: '2BHK', locality: 'Yelahanka', budget: '₹48L',
    budgetNum: 4800000, status: 'Warm', stage: 'New Inquiry', agentId: 3,
    lastContact: '2026-06-11', nextFollowup: '2026-06-18',
    aiCallStatus: 'No Answer', aiCallDuration: '0m 00s', sentiment: '—',
    notes: 'Young professional, prefers modern amenities.',
    createdAt: '2026-06-08',
  },
  {
    id: 9, name: 'Mohammed Farouk', phone: '9566778899', email: 'mfarouk@email.com',
    source: '99acres', property: '3BHK', locality: 'KR Puram', budget: '₹68L',
    budgetNum: 6800000, status: 'Hot', stage: 'Site Visit', agentId: 4,
    lastContact: '2026-06-14', nextFollowup: '2026-06-16',
    aiCallStatus: 'Connected', aiCallDuration: '2m 10s', sentiment: 'Interested',
    notes: 'Needs proximity to metro station.',
    createdAt: '2026-05-30',
  },
  {
    id: 10, name: 'Preethi Nair', phone: '9477889900', email: 'preethi@email.com',
    source: 'Referral', property: 'Villa', locality: 'Whitefield', budget: '₹2.1Cr',
    budgetNum: 21000000, status: 'Warm', stage: 'Site Visit', agentId: 2,
    lastContact: '2026-06-13', nextFollowup: '2026-06-17',
    aiCallStatus: 'Connected', aiCallDuration: '3m 30s', sentiment: 'Interested',
    notes: 'Family of 5, needs 4+ bedrooms, garden.',
    createdAt: '2026-05-22',
  },
  {
    id: 11, name: 'Aditya Kulkarni', phone: '9388990011', email: 'aditya.k@email.com',
    source: 'MagicBricks', property: '2BHK', locality: 'Bannerghatta', budget: '₹52L',
    budgetNum: 5200000, status: 'Cold', stage: 'New Inquiry', agentId: 3,
    lastContact: '2026-06-08', nextFollowup: '2026-06-19',
    aiCallStatus: 'No Answer', aiCallDuration: '0m 00s', sentiment: '—',
    notes: 'Budget-conscious buyer, exploring options.',
    createdAt: '2026-06-07',
  },
  {
    id: 12, name: 'Rekha Menon', phone: '9299001122', email: 'rekha.m@email.com',
    source: 'Walk-in', property: '3BHK', locality: 'JP Nagar', budget: '₹78L',
    budgetNum: 7800000, status: 'Closed', stage: 'Closed Won', agentId: 1,
    lastContact: '2026-06-14', nextFollowup: null,
    aiCallStatus: 'Connected', aiCallDuration: '5m 20s', sentiment: 'Interested',
    notes: 'Deal closed! Registration next week.',
    createdAt: '2026-04-15',
  },
];

export const pipelineStages = [
  { id: 'new-inquiry', name: 'New Inquiry', color: '#00f5ff' },
  { id: 'site-visit', name: 'Site Visit', color: '#bf00ff' },
  { id: 'negotiation', name: 'Negotiation', color: '#ff006e' },
  { id: 'documentation', name: 'Documentation', color: '#ffd700' },
  { id: 'closed-won', name: 'Closed Won', color: '#00ff88' },
];

export const stageMap = {
  'New Inquiry': 'new-inquiry',
  'Site Visit': 'site-visit',
  'Negotiation': 'negotiation',
  'Documentation': 'documentation',
  'Closed Won': 'closed-won',
};

export const kpiData = [
  {
    id: 'total-leads', label: 'Total Leads', value: 284, trend: 12, icon: 'Target',
    color: '#00f5ff', sparkline: [220, 235, 248, 255, 260, 272, 284],
  },
  {
    id: 'hot-leads', label: 'Hot Leads', value: 47, trend: 8, icon: 'Flame',
    color: '#ff006e', sparkline: [32, 35, 38, 40, 42, 44, 47],
  },
  {
    id: 'calls-today', label: 'Calls Today', value: 89, trend: 31, icon: 'PhoneCall',
    color: '#bf00ff', sparkline: [55, 62, 68, 72, 78, 83, 89],
  },
  {
    id: 'pipeline-value', label: 'Pipeline Value', value: 18.4, prefix: '₹', suffix: 'Cr', trend: 23, icon: 'IndianRupee',
    color: '#ffd700', sparkline: [12.1, 13.5, 14.8, 15.6, 16.2, 17.1, 18.4],
  },
  {
    id: 'deals-closed', label: 'Deals Closed', value: 9, trend: 3, trendAbsolute: true, icon: 'CheckCircle2',
    color: '#00ff88', sparkline: [3, 4, 5, 5, 6, 7, 9],
  },
];

export const pipelineFunnelData = [
  { stage: 'New Inquiry', count: 84, color: '#00f5ff' },
  { stage: 'Site Visit', count: 52, color: '#bf00ff', dropoff: '-38%' },
  { stage: 'Negotiation', count: 31, color: '#ff006e', dropoff: '-40%' },
  { stage: 'Documentation', count: 18, color: '#ffd700', dropoff: '-42%' },
  { stage: 'Closed', count: 9, color: '#00ff88', dropoff: '-50%' },
];

export const leadSourceData = [
  { name: 'MagicBricks', value: 91, fill: '#00f5ff', percentage: 32 },
  { name: '99acres', value: 68, fill: '#bf00ff', percentage: 24 },
  { name: 'Walk-in', value: 51, fill: '#ff006e', percentage: 18 },
  { name: 'Instagram', value: 43, fill: '#ffd700', percentage: 15 },
  { name: 'Referral', value: 31, fill: '#00ff88', percentage: 11 },
];

export const callAnalyticsData = [
  { day: 'Mon', calls: 68, connects: 42, voicemails: 18 },
  { day: 'Tue', calls: 75, connects: 48, voicemails: 20 },
  { day: 'Wed', calls: 82, connects: 55, voicemails: 16 },
  { day: 'Thu', calls: 71, connects: 45, voicemails: 19 },
  { day: 'Fri', calls: 90, connects: 62, voicemails: 14 },
  { day: 'Sat', calls: 55, connects: 38, voicemails: 12 },
  { day: 'Sun', calls: 89, connects: 58, voicemails: 15 },
];

export const aiCallLogs = [
  {
    id: 1, leadName: 'Ravi Kumar', phone: '9876×××210', calledAt: 'Today 9:30 AM',
    duration: '2m 34s', status: 'Connected', sentiment: 'Interested',
    hasRecording: true, followupSet: true,
  },
  {
    id: 2, leadName: 'Ananya Sharma', phone: '9845×××345', calledAt: 'Today 9:45 AM',
    duration: '0m 00s', status: 'No Answer', sentiment: '—',
    hasRecording: false, followupSet: false,
  },
  {
    id: 3, leadName: 'Arjun Mehta', phone: '9900×××233', calledAt: 'Today 10:00 AM',
    duration: '1m 12s', status: 'Connected', sentiment: 'Neutral',
    hasRecording: true, followupSet: true,
  },
  {
    id: 4, leadName: 'Sunita Rao', phone: '9811×××344', calledAt: 'Today 10:15 AM',
    duration: '3m 02s', status: 'Connected', sentiment: 'Interested',
    hasRecording: true, followupSet: true,
  },
  {
    id: 5, leadName: 'Vikram Nair', phone: '9922×××455', calledAt: 'Yesterday',
    duration: '0m 00s', status: 'Voicemail', sentiment: '—',
    hasRecording: false, followupSet: false,
  },
  {
    id: 6, leadName: 'Divya Patel', phone: '9833×××566', calledAt: 'Yesterday',
    duration: '1m 45s', status: 'Connected', sentiment: 'Interested',
    hasRecording: true, followupSet: true,
  },
  {
    id: 7, leadName: 'Suresh Iyer', phone: '9744×××677', calledAt: 'Jun 13',
    duration: '4m 15s', status: 'Connected', sentiment: 'Interested',
    hasRecording: true, followupSet: true,
  },
  {
    id: 8, leadName: 'Kavya Reddy', phone: '9655×××788', calledAt: 'Jun 13',
    duration: '0m 00s', status: 'No Answer', sentiment: '—',
    hasRecording: false, followupSet: false,
  },
];

export const activities = [
  {
    id: 1, time: '9:30 AM', type: 'ai-call', icon: 'Bot',
    title: 'AI Voice Call — Ravi Kumar',
    description: 'Connected · 2m 34s · Interested in 3BHK Whitefield',
    status: 'completed', agent: 'AI Agent',
  },
  {
    id: 2, time: '10:00 AM', type: 'site-visit', icon: 'MapPin',
    title: 'Site Visit — Ananya Sharma',
    description: 'Villa tour at Sarjapur Road project',
    status: 'completed', agent: 'Rahul Sharma',
  },
  {
    id: 3, time: '11:30 AM', type: 'call', icon: 'Phone',
    title: 'Follow-up Call — Mohammed Farouk',
    description: 'Discuss pricing for 3BHK at KR Puram',
    status: 'completed', agent: 'Arjun Tiwari',
  },
  {
    id: 4, time: '2:00 PM', type: 'meeting', icon: 'Users',
    title: 'Team Sync — Pipeline Review',
    description: 'Weekly pipeline review with all agents',
    status: 'upcoming', agent: 'Pintu Singha',
  },
  {
    id: 5, time: '4:00 PM', type: 'proposal', icon: 'FileText',
    title: 'Send Proposal — Vikram Nair',
    description: '4BHK Indiranagar — final pricing document',
    status: 'upcoming', agent: 'Arjun Tiwari',
  },
];

export const agentLeaderboard = [
  { ...agents[0], rank: 1, totalCalls: 34, dealsThisMonth: 3, revenue: '₹2.4Cr' },
  { ...agents[3], rank: 2, totalCalls: 31, dealsThisMonth: 3, revenue: '₹2.1Cr' },
  { ...agents[1], rank: 3, totalCalls: 28, dealsThisMonth: 2, revenue: '₹1.5Cr' },
  { ...agents[2], rank: 4, totalCalls: 19, dealsThisMonth: 1, revenue: '₹0.78Cr' },
];

// Mask phone for display
export const maskPhone = (phone) => {
  if (!phone || phone.length < 6) return phone;
  return phone.slice(0, 4) + '×××' + phone.slice(-3);
};
