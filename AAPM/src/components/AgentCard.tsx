import { useState } from 'react';
import { AlertTriangle, Calendar, Cpu, Lightbulb, Target, CheckCircle, Clock } from 'lucide-react';
import type { AgentStatus } from '../types';
import Modal from './Modal';

export interface AgentDef {
  id: 'idea' | 'scope' | 'technology' | 'timeline' | 'risk';
  name: string;
  purpose: string;
  icon: 'idea' | 'scope' | 'tech' | 'timeline' | 'risk';
  bullets: string[];
  backend: 'implemented' | 'planned';
}

const ICONS = {
  idea: Lightbulb,
  scope: Target,
  tech: Cpu,
  timeline: Calendar,
  risk: AlertTriangle,
};

interface Props {
  agent: AgentDef;
  status: AgentStatus;
}

function statusClass(status: AgentStatus) {
  switch (status) {
    case 'COMPLETED':
      return 'bg-emerald-50 text-emerald-700 border-emerald-200';
    case 'ANALYZING':
      return 'bg-indigo-50 text-indigo-700 border-indigo-200';
    case 'PLANNED':
      return 'bg-amber-50 text-amber-800 border-amber-200';
    default:
      return 'bg-slate-100 text-slate-600 border-slate-200';
  }
}

export default function AgentCard({ agent, status }: Props) {
  const [open, setOpen] = useState(false);
  const Icon = ICONS[agent.icon];

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={`card-hover p-5 text-left w-full flex flex-col justify-between ${
          status === 'ANALYZING' ? 'analyzing ring-2 ring-indigo-400/50 shadow-md' : ''
        }`}
      >
        <div>
          <div className="flex items-start justify-between gap-2">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center shrink-0">
              <Icon size={20} />
            </div>
            <span className={`badge ${statusClass(status)}`}>{status}</span>
          </div>
          <h3 className="mt-3 font-bold text-slate-900 text-sm leading-snug">{agent.name}</h3>
          <p className="text-xs text-slate-500 mt-1 line-clamp-2">{agent.purpose}</p>
          <ul className="mt-3 space-y-1">
            {agent.bullets.map((b) => (
              <li key={b} className="text-xs text-slate-600 flex items-center gap-1.5">
                <span className="w-1 h-1 rounded-full bg-indigo-500 shrink-0" />
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px]">
          {agent.backend === 'implemented' ? (
            <span className="font-semibold text-emerald-600 flex items-center gap-1">
              <CheckCircle size={12} /> Python + Claude 4.5
            </span>
          ) : (
            <span className="font-semibold text-amber-700 flex items-center gap-1">
              <Clock size={12} /> Planned / Future Integration
            </span>
          )}
          <span className="text-indigo-600 font-medium hover:underline">Details &rarr;</span>
        </div>
      </button>

      <Modal open={open} title={agent.name} onClose={() => setOpen(false)} wide>
        <div className="space-y-4">
          <p className="text-sm text-slate-600">{agent.purpose}</p>
          <div className="flex flex-wrap items-center gap-2 pb-2 border-b border-slate-100">
            <span className={`badge ${statusClass(status)}`}>Agent Status: {status}</span>
            <span className={agent.backend === 'implemented' ? 'badge-success' : 'badge-warning'}>
              {agent.backend === 'implemented' ? 'Backend Integration: Active (Claude Sonnet 4.5)' : 'Backend Integration: Planned / Future Integration'}
            </span>
          </div>
          {status === 'ANALYZING' && (
            <div className="p-3 rounded-xl bg-indigo-50 border border-indigo-100 text-indigo-700 text-sm analyzing flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-indigo-600 animate-ping" />
              Specialized agent is analyzing the project parameters…
            </div>
          )}
          {status === 'WAITING' && (
            <p className="text-sm text-slate-600">Waiting for AI Orchestrator to route data to this agent.</p>
          )}
          {status === 'PLANNED' && (
            <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs leading-relaxed">
              <span className="font-semibold block mb-0.5">Architecture Status: Planned / Future Integration</span>
              Each specialized agent focuses on a specific project-planning task, making the overall workflow more organized and modular. In current execution, Idea, Scope, and Technology agents run live via Anthropic Claude API, while Timeline Planning and Risk Assessment agents are scheduled for future integration.
            </div>
          )}
          {agent.id === 'idea' && status === 'COMPLETED' && <IdeaResult />}
          {agent.id === 'scope' && status === 'COMPLETED' && <ScopeResult />}
          {agent.id === 'technology' && status === 'COMPLETED' && <TechResult />}
          {agent.id === 'timeline' && <TimelineResult planned={status !== 'COMPLETED'} />}
          {agent.id === 'risk' && <RiskResult planned={status !== 'COMPLETED'} />}
        </div>
      </Modal>
    </>
  );
}

function Score({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-xl border border-slate-100 bg-slate-50/50 p-3">
      <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1.5">
        <span>{label}</span>
        <span className="text-indigo-600 font-bold">{value}/10</span>
      </div>
      <div className="h-2 rounded-full bg-slate-200/80 overflow-hidden">
        <div
          className="h-2 rounded-full bg-gradient-to-r from-indigo-500 to-violet-600 transition-all duration-500"
          style={{ width: `${value * 10}%` }}
        />
      </div>
    </div>
  );
}

export function IdeaResult() {
  return (
    <div className="space-y-4">
      <div className="grid sm:grid-cols-2 gap-3">
        <Score label="Feasibility" value={8} />
        <Score label="Academic Suitability" value={9} />
        <Score label="Innovation" value={8} />
        <Score label="Difficulty Level" value={7} />
      </div>
      <div>
        <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Target Users</p>
        <div className="flex flex-wrap gap-2">
          {['Undergraduate & Postgrad Students', 'Faculty Mentors', 'Project Coordinators', 'Evaluation Committees'].map((u) => (
            <span key={u} className="badge-primary">
              {u}
            </span>
          ))}
        </div>
      </div>
      <div className="grid sm:grid-cols-2 gap-3">
        <div className="rounded-xl bg-slate-50 border border-slate-100 p-3.5">
          <p className="text-xs font-bold uppercase tracking-wide text-indigo-700 mb-1">Problem Analysis</p>
          <p className="text-xs text-slate-700 leading-relaxed">
            Student teams lack a unified, intelligent framework to convert raw project ideas into actionable technical blueprints, track milestone velocity, and share clear progress records with mentors.
          </p>
        </div>
        <div className="rounded-xl bg-slate-50 border border-slate-100 p-3.5">
          <p className="text-xs font-bold uppercase tracking-wide text-indigo-700 mb-1">Innovation Suggestions</p>
          <p className="text-xs text-slate-700 leading-relaxed">
            Combine central orchestrator multi-agent decomposition with continuous progress evidence tracking, automated documentation generation, and role-based faculty monitoring views.
          </p>
        </div>
      </div>
      <p className="text-[11px] text-slate-400 italic">
        Output generated from Idea Evaluation Agent via `idea_agent()` pipeline.
      </p>
    </div>
  );
}

export function ScopeResult() {
  const lists = [
    { title: 'Project Objectives', items: ['Decompose project ideas into executable academic plans', 'Guide milestone updates via AI mentorship'] },
    { title: 'Key Features', items: ['Multi-agent orchestration', 'Project blueprint viewer', 'Interactive progress tracker', 'Faculty dashboard'] },
    { title: 'Functional Requirements', items: ['Create project inputs', 'Trigger agent execution', 'Update milestone statuses', 'Generate report content'] },
    { title: 'Non-Functional Requirements', items: ['Responsive SaaS UI', 'Sub-second client tab switching', 'Role-based view separation'] },
    { title: 'Project Scope', items: ['Academic planning, technology stack recommendation, milestone tracking, and mentorship'] },
    { title: 'Out-of-Scope Items', items: ['Production payment handling', 'Third-party code execution sandbox'] },
    { title: 'Deliverables', items: ['Full working frontend platform', 'Specialist agent visual topology', 'Exportable documentation'] },
    { title: 'Expected Output', items: ['Production-ready academic blueprint and mentor progress log'] },
  ];
  return (
    <div className="grid sm:grid-cols-2 gap-3">
      {lists.map((l) => (
        <div key={l.title} className="rounded-xl border border-slate-100 bg-slate-50/40 p-3.5">
          <p className="text-xs font-bold uppercase tracking-wide text-indigo-700 mb-2">{l.title}</p>
          <ul className="space-y-1">
            {l.items.map((i) => (
              <li key={i} className="text-xs text-slate-700 flex items-start gap-1.5">
                <span className="text-indigo-500 font-bold">•</span>
                <span>{i}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
      <p className="text-[11px] text-slate-400 sm:col-span-2 italic">
        Output generated from Scope Definition Agent via `scope_agent()`.
      </p>
    </div>
  );
}

export const TECH_STACK = [
  { name: 'Python 3.11+', category: 'Programming Language', purpose: 'AI Orchestrator & agent backend logic', why: 'Matches backend `ask_ai()` & agent execution setup', tag: 'Implemented' as const },
  { name: 'Claude Sonnet 4.5', category: 'AI / ML / LLM', purpose: 'Decomposition, evaluation & mentorship reasoning', why: 'Anthropic LLM API integration', tag: 'Implemented' as const },
  { name: 'FastAPI', category: 'Backend Framework', purpose: 'REST API endpoints for agent orchestrator', why: 'Lightweight, asynchronous Python server', tag: 'Planned' as const },
  { name: 'React 19 + TypeScript', category: 'Frontend Framework', purpose: 'Student and Faculty SaaS interfaces', why: 'Vite build setup with strict typing', tag: 'Implemented' as const },
  { name: 'Tailwind CSS', category: 'Styling & Design System', purpose: 'Responsive dashboard visual design', why: 'Modern utility-first responsive layout', tag: 'Implemented' as const },
  { name: 'PostgreSQL / MongoDB', category: 'Database', purpose: 'Persisting projects, progress & documentation', why: 'Scalable data persistence layer', tag: 'Planned' as const },
  { name: 'Docker', category: 'Deployment', purpose: 'Containerized deployment package', why: 'Standardized demo deployment', tag: 'Planned' as const },
  { name: 'Cloud Hosting (AWS)', category: 'Deployment / Cloud', purpose: 'Host API & Web application', why: 'Production infrastructure strategy', tag: 'Planned' as const },
];

export function TechResult() {
  return (
    <div className="grid sm:grid-cols-2 gap-3">
      {TECH_STACK.map((t) => (
        <div key={t.name} className="rounded-xl border border-slate-100 bg-slate-50/40 p-3.5">
          <div className="flex items-center justify-between gap-2">
            <p className="font-bold text-slate-900 text-sm">{t.name}</p>
            <span className={t.tag === 'Implemented' ? 'badge-success' : 'badge-warning'}>{t.tag}</span>
          </div>
          <p className="text-[11px] font-semibold text-indigo-600 mt-0.5">{t.category}</p>
          <p className="text-xs text-slate-700 mt-2">{t.purpose}</p>
          <p className="text-[11px] text-slate-500 mt-1 italic">{t.why}</p>
        </div>
      ))}
    </div>
  );
}

export const TIMELINE_ROWS = [
  { phase: 'Phase 1', week: 'Week 1', milestone: 'Problem Identification', task: 'Formulate problem statement and project idea', status: 'Complete' },
  { phase: 'Phase 1', week: 'Week 2', milestone: 'Requirement Gathering', task: 'Specify functional and non-functional requirements', status: 'Complete' },
  { phase: 'Phase 2', week: 'Week 3', milestone: 'Literature Survey', task: 'Synthesize related academic papers and tools', status: 'In Progress' },
  { phase: 'Phase 2', week: 'Week 4', milestone: 'System Architecture', task: 'Design AI Orchestrator and agent interface layout', status: 'Planned' },
  { phase: 'Phase 3', week: 'Weeks 5–8', milestone: 'Development', task: 'Construct UI components and integration connectors', status: 'Planned' },
  { phase: 'Phase 3', week: 'Week 9', milestone: 'AI Integration', task: 'Wire remaining Claude agent prompts to orchestrator', status: 'Planned' },
  { phase: 'Phase 4', week: 'Week 10', milestone: 'Testing', task: 'Perform scenario tests and faculty review flow', status: 'Planned' },
  { phase: 'Phase 4', week: 'Week 11', milestone: 'Deployment', task: 'Package application for evaluation demonstration', status: 'Planned' },
  { phase: 'Phase 4', week: 'Week 12', milestone: 'Documentation', task: 'Finalize project synopsis, report, and slide deck', status: 'Planned' },
];

export function TimelineResult({ planned }: { planned?: boolean }) {
  return (
    <div className="space-y-3">
      {planned && (
        <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs font-medium">
          Timeline Planning Agent output preview · Status: Planned / Future Integration
        </div>
      )}
      <div className="overflow-x-auto rounded-xl border border-slate-200">
        <table className="w-full text-xs">
          <thead>
            <tr className="text-left font-bold uppercase tracking-wider text-slate-500 bg-slate-50 border-b border-slate-200">
              <th className="p-3">Phase</th>
              <th className="p-3">Week</th>
              <th className="p-3">Milestone</th>
              <th className="p-3">Task Details</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 bg-white">
            {TIMELINE_ROWS.map((row) => (
              <tr key={row.week} className="hover:bg-slate-50/80">
                <td className="p-3 font-semibold text-indigo-700 whitespace-nowrap">{row.phase}</td>
                <td className="p-3 font-medium text-slate-800 whitespace-nowrap">{row.week}</td>
                <td className="p-3 font-medium text-slate-900">{row.milestone}</td>
                <td className="p-3 text-slate-600">{row.task}</td>
                <td className="p-3">
                  <span
                    className={
                      row.status === 'Complete'
                        ? 'badge-success'
                        : row.status === 'In Progress'
                          ? 'badge-primary'
                          : 'badge-muted'
                    }
                  >
                    {row.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-[11px] text-slate-500">Expected Output: Structured 12-week timeline breakdown with defined deliverables per milestone.</p>
    </div>
  );
}

export const RISKS = [
  { risk: 'LLM API Dependency & Quota Limit', severity: 'High', probability: 'Medium', impact: 'Analysis workflow delayed if API limit exceeded', mitigation: 'Implement response caching and pre-built dataset fallback for live demos.' },
  { risk: 'Scope Creep During Development', severity: 'High', probability: 'High', impact: 'Team delays core milestones for optional features', mitigation: 'Strict Scope Agent boundary enforcement; require faculty approval for scope changes.' },
  { risk: 'Dataset & Integration Delays', severity: 'Medium', probability: 'Medium', impact: 'Incomplete validation data for evaluation', mitigation: 'Prepare standardized academic synthetic benchmark datasets.' },
  { risk: 'Deployment Environment Discrepancies', severity: 'Medium', probability: 'Low', impact: 'Build failures during presentation', mitigation: 'Use containerized Docker configuration and document exact runtime commands.' },
  { risk: 'Mentorship Alignment Lag', severity: 'Low', probability: 'Medium', impact: 'Student progress unverified by faculty', mitigation: 'Send weekly status notifications and highlighted risk alerts in Faculty View.' },
];

export function RiskResult({ planned }: { planned?: boolean }) {
  return (
    <div className="space-y-3">
      {planned && (
        <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs font-medium">
          Risk Assessment Agent output preview · Status: Planned / Future Integration
        </div>
      )}
      <div className="space-y-2.5">
        {RISKS.map((r) => (
          <div key={r.risk} className="rounded-xl border border-slate-200 bg-white p-3.5 shadow-sm">
            <div className="flex items-start justify-between gap-2">
              <h4 className="font-bold text-slate-900 text-xs sm:text-sm">{r.risk}</h4>
              <div className="flex items-center gap-1.5 shrink-0">
                <span className="text-[11px] text-slate-500 font-medium">Prob: {r.probability}</span>
                <span className={r.severity === 'High' ? 'badge-error' : 'badge-warning'}>{r.severity} Severity</span>
              </div>
            </div>
            <p className="text-xs text-slate-600 mt-2">
              <strong className="text-slate-700">Impact:</strong> {r.impact}
            </p>
            <p className="text-xs text-indigo-700 font-medium mt-1">
              <strong className="text-indigo-900">Mitigation Strategy:</strong> {r.mitigation}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export const AGENTS: AgentDef[] = [
  {
    id: 'idea',
    name: 'Idea Evaluation Agent',
    purpose: 'Assess project feasibility, academic suitability, innovation, and target users.',
    icon: 'idea',
    bullets: ['Feasibility & Innovation', 'Academic Suitability', 'Target User Analysis'],
    backend: 'implemented',
  },
  {
    id: 'scope',
    name: 'Scope Definition Agent',
    purpose: 'Define project objectives, scope boundaries, and functional & non-functional requirements.',
    icon: 'scope',
    bullets: ['Objectives & Scope', 'Functional & Non-Functional Reqs', 'Deliverables & Outputs'],
    backend: 'implemented',
  },
  {
    id: 'technology',
    name: 'Technology Recommendation Agent',
    purpose: 'Recommend suitable programming languages, frameworks, database, and cloud stack.',
    icon: 'tech',
    bullets: ['Languages & AI Models', 'Backend & Database', 'Deployment & Cloud Stack'],
    backend: 'implemented',
  },
  {
    id: 'timeline',
    name: 'Timeline Planning Agent',
    purpose: 'Plan weekly project phases, tasks, and milestone targets.',
    icon: 'timeline',
    bullets: ['Weekly Phase Schedule', 'Milestone Dependencies', 'Deliverable Timelines'],
    backend: 'planned',
  },
  {
    id: 'risk',
    name: 'Risk Assessment Agent',
    purpose: 'Identify technical and timeline risks and propose mitigation strategies.',
    icon: 'risk',
    bullets: ['Risk Identification', 'Severity & Impact Rating', 'Mitigation Strategies'],
    backend: 'planned',
  },
];

