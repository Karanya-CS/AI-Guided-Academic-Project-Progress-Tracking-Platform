export type PageId =
  | 'login'
  | 'signup'
  | 'dashboard'
  | 'create-project'
  | 'my-projects'
  | 'ai-agents'
  | 'ai-analysis'
  | 'blueprint'
  | 'progress'
  | 'documentation'
  | 'mentorship'
  | 'faculty'
  | 'settings';

export type Role = 'student' | 'faculty' | 'mentor';

export type ProjectStatus = 'ON TRACK' | 'AT RISK' | 'DELAYED' | 'COMPLETED';

export type AgentStatus = 'WAITING' | 'ANALYZING' | 'COMPLETED' | 'PLANNED';

export type MilestoneStatus = 'completed' | 'in-progress' | 'pending';

export interface Milestone {
  id: string;
  label: string;
  status: MilestoneStatus;
}

export interface Project {
  id: string;
  name: string;
  domain: string;
  problemStatement: string;
  idea: string;
  teamSize: string;
  duration: string;
  progress: number;
  currentMilestone: string;
  status: ProjectStatus;
  lastUpdated: string;
  team: string;
  student: string;
  hasAnalysis: boolean;
  milestones: Milestone[];
}

export interface ToastItem {
  id: string;
  message: string;
  type: 'success' | 'info' | 'error';
}

export interface CreateProjectForm {
  projectName: string;
  problemStatement: string;
  projectIdea: string;
  domain: string;
  teamSize: string;
  expectedDuration: string;
}

export interface DailyAction {
  task: string;
  milestone: string;
  priority: 'High' | 'Medium' | 'Urgent';
  estimatedTime: string;
  rationale: string;
}

export interface ReadinessItem {
  id: string;
  category: 'Requirements' | 'Development' | 'Testing' | 'Documentation' | 'Screenshots' | 'Presentation' | 'Final Deliverables';
  name: string;
  status: 'Ready' | 'Needs Attention' | 'Pending';
  recommendation: string;
}

export interface ProofOfWorkStage {
  id: string;
  stage: 'Requirement Analysis' | 'Architecture' | 'Development' | 'Testing' | 'Deployment';
  date: string;
  completedWork: string;
  status: 'Completed' | 'In Progress' | 'Pending Review';
  evidence: {
    type: 'Screenshots' | 'Documents' | 'GitHub' | 'Demo Video' | 'Progress Update';
    label: string;
    details: string;
  }[];
}
