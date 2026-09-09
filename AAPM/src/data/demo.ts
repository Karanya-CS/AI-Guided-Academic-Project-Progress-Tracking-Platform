import type { Project } from '../types';

const defaultMilestones = (current: string): Project['milestones'] => {
  const order = [
    'Problem Identification',
    'Requirement Gathering',
    'Literature Survey',
    'System Architecture',
    'Development',
    'AI Integration',
    'Testing',
    'Deployment',
    'Documentation',
  ];
  const idx = Math.max(0, order.indexOf(current));
  return order.map((label, i) => ({
    id: `${i}-${label}`,
    label,
    status: i < idx ? 'completed' : i === idx ? 'in-progress' : 'pending',
  }));
};

export const DEMO_PROJECTS: Project[] = [
  {
    id: 'p1',
    name: 'AI-Guided Academic Project Tracking Platform',
    domain: 'Artificial Intelligence',
    problemStatement:
      'Academic teams struggle to plan, document and track projects with consistent faculty visibility.',
    idea: 'AI-Guided Academic Project Progress Tracking Platform with Planning & Mentorship Assistance.',
    teamSize: '4-5',
    duration: '6 Months',
    progress: 68,
    currentMilestone: 'Development',
    status: 'ON TRACK',
    lastUpdated: '1 Sep 2026',
    team: 'Core Project Team',
    student: 'Karanya',
    hasAnalysis: true,
    milestones: defaultMilestones('Development'),
  },
  {
    id: 'p2',
    name: 'Academic Research Assistant',
    domain: 'Artificial Intelligence',
    problemStatement: 'Students struggle to organize literature reviews and synthesize paper benchmarks efficiently.',
    idea: 'An intelligent academic research assistant that analyzes papers, extracts methodologies, and generates literature matrices.',
    teamSize: '2-3',
    duration: '5 Months',
    progress: 42,
    currentMilestone: 'Literature Survey',
    status: 'AT RISK',
    lastUpdated: '29 Aug 2026',
    team: 'Team Nexus',
    student: 'Rahul Mehta',
    hasAnalysis: true,
    milestones: defaultMilestones('Literature Survey'),
  },
  {
    id: 'p3',
    name: 'Smart Campus IoT',
    domain: 'IoT',
    problemStatement: 'Campus energy and occupancy data is fragmented across buildings.',
    idea: 'IoT sensors and a dashboard to monitor occupancy, energy and safety alerts.',
    teamSize: '4-5',
    duration: '4 Months',
    progress: 28,
    currentMilestone: 'Requirement Gathering',
    status: 'DELAYED',
    lastUpdated: '24 Aug 2026',
    team: 'Team Orbit',
    student: 'Ananya Iyer',
    hasAnalysis: false,
    milestones: defaultMilestones('Requirement Gathering'),
  },
  {
    id: 'p4',
    name: 'ML Grade Insights',
    domain: 'Machine Learning',
    problemStatement: 'Faculty lack early signals for students at academic risk.',
    idea: 'Predictive models on anonymised academic signals to flag support needs.',
    teamSize: '2-3',
    duration: '3 Months',
    progress: 100,
    currentMilestone: 'Documentation',
    status: 'COMPLETED',
    lastUpdated: '18 Aug 2026',
    team: 'Team Vector',
    student: 'Karthik Rao',
    hasAnalysis: true,
    milestones: defaultMilestones('Documentation').map((m, i, arr) =>
      i === arr.length - 1 ? { ...m, status: 'completed' } : { ...m, status: 'completed' },
    ),
  },
];

export const DOMAINS = [
  'Artificial Intelligence',
  'Machine Learning',
  'Web Development',
  'Data Science',
  'IoT',
  'Cybersecurity',
  'Cloud Computing',
  'Other',
];

export const TEAM_SIZES = ['1', '2-3', '4-5', '6-8', '9+'];
export const DURATIONS = [
  '3 Months',
  '4 Months',
  '5 Months',
  '6 Months',
  '7 Months',
  '8 Months',
];
