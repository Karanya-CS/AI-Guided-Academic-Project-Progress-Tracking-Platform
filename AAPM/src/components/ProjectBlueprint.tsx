import { useState } from 'react';
import { Clock, Gauge, Sparkles, Star, TrendingUp, CheckCircle2 } from 'lucide-react';
import { useApp } from '../context';
import { IdeaResult, RiskResult, ScopeResult, TECH_STACK, TimelineResult } from './AgentCard';
import MentorshipPanel from './MentorshipPanel';
import ProgressTracker from './ProgressTracker';

type Tab =
  | 'overview'
  | 'objectives'
  | 'scope'
  | 'requirements'
  | 'technology'
  | 'architecture'
  | 'timeline'
  | 'risks'
  | 'deliverables';

const TABS: { id: Tab; label: string }[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'objectives', label: 'Objectives' },
  { id: 'scope', label: 'Scope' },
  { id: 'requirements', label: 'Requirements' },
  { id: 'technology', label: 'Technology' },
  { id: 'architecture', label: 'Architecture' },
  { id: 'timeline', label: 'Timeline' },
  { id: 'risks', label: 'Risks' },
  { id: 'deliverables', label: 'Deliverables' },
];

export default function ProjectBlueprint() {
  const { selectedProject, setPage } = useApp();
  const [tab, setTab] = useState<Tab>('overview');
  const p = selectedProject;

  if (!p) {
    return (
      <div className="page-wrap">
        <div className="card p-10 text-center">
          <p className="font-semibold text-slate-900">No project selected</p>
          <p className="text-sm text-slate-500 mt-1">Create a project to generate a complete academic blueprint.</p>
          <button type="button" className="btn-primary mt-4" onClick={() => setPage('create-project')}>
            + Create New Project
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="page-wrap space-y-6">
      {/* Top Header */}
      <div>
        <p className="text-[10px] sm:text-[11px] uppercase tracking-wider text-indigo-600 font-extrabold mb-1">
          AI-Guided Academic Project Progress Tracking Platform with Planning &amp; Mentorship Assistance
        </p>
        <div className="flex flex-wrap items-center gap-2 mb-1">
          <span className="badge-primary">Academic Blueprint</span>
          <span className="badge-success">Idea + Scope + Technology (Claude Active)</span>
        </div>
        <h1 className="section-title">{p.name}</h1>
        <p className="section-subtitle">
          Domain: <strong className="text-slate-700">{p.domain}</strong> · Student: <strong className="text-slate-700">{p.student}</strong> · Generated from 5-Agent Orchestrator Pipeline.
        </p>
      </div>

      {/* Summary Score Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
        {[
          { label: 'Feasibility', value: '8/10', icon: Star, hint: 'High Academic Suitability', color: 'text-amber-500' },
          { label: 'Innovation', value: '8/10', icon: Sparkles, hint: 'Multi-Agent AI Design', color: 'text-indigo-600' },
          { label: 'Difficulty', value: '7/10', icon: TrendingUp, hint: 'Moderate Academic Level', color: 'text-violet-600' },
          { label: 'Duration', value: p.duration, icon: Clock, hint: 'Target Completion Time', color: 'text-emerald-600' },
          { label: 'Project Health', value: p.status, icon: Gauge, hint: `${p.progress}% Completed`, color: p.status === 'COMPLETED' ? 'text-emerald-600' : p.status === 'AT RISK' ? 'text-rose-600' : 'text-indigo-600' },
        ].map((c) => {
          const Icon = c.icon;
          return (
            <div key={c.label} className="card p-4 hover:shadow-md transition-all">
              <div className="flex items-center gap-2 mb-1">
                <Icon size={16} className={c.color} />
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">{c.label}</span>
              </div>
              <p className="text-xl font-extrabold text-slate-900 mt-1">{c.value}</p>
              <p className="text-[11px] text-slate-500 mt-0.5">{c.hint}</p>
            </div>
          );
        })}
      </div>

      {/* Main Layout Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left Column: Blueprint Tabs Container */}
        <div className="lg:col-span-2 card overflow-hidden flex flex-col shadow-sm border-slate-200">
          <div className="flex overflow-x-auto border-b border-slate-200 bg-slate-50/70 px-2">
            {TABS.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setTab(t.id)}
                className={`px-4 py-3 text-xs sm:text-sm font-bold whitespace-nowrap transition-all border-b-2 ${
                  tab === t.id
                    ? 'text-indigo-700 border-indigo-600 bg-white shadow-xs'
                    : 'text-slate-500 hover:text-slate-900 border-transparent'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          <div className="p-6 flex-1 bg-white">
            {tab === 'overview' && (
              <div className="space-y-5">
                <div className="rounded-2xl bg-indigo-50/60 border border-indigo-100 p-4">
                  <p className="text-xs font-bold uppercase tracking-wider text-indigo-700 mb-1">Project Idea & Goal</p>
                  <p className="text-sm text-slate-800 leading-relaxed font-medium">{p.idea}</p>
                </div>
                <div className="rounded-2xl bg-slate-50 border border-slate-100 p-4">
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Problem Statement</p>
                  <p className="text-sm text-slate-800 leading-relaxed">{p.problemStatement}</p>
                </div>
                <div className="grid sm:grid-cols-3 gap-3">
                  <Stat k="Team Size" v={p.teamSize} />
                  <Stat k="Student / Team" v={`${p.student} (${p.team})`} />
                  <Stat k="Current Milestone" v={p.currentMilestone} />
                </div>
              </div>
            )}

            {tab === 'objectives' && <IdeaResult />}

            {tab === 'scope' && <ScopeResult />}

            {tab === 'requirements' && (
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                  <h4 className="font-bold text-slate-900 text-sm mb-2 text-indigo-700">Functional Requirements</h4>
                  <ul className="space-y-1.5 text-xs text-slate-700">
                    <li className="flex items-center gap-2">• System shall allow students to submit project ideas & parameters.</li>
                    <li className="flex items-center gap-2">• Central Orchestrator shall invoke 5 specialized agents.</li>
                    <li className="flex items-center gap-2">• Platform shall render real-time progress velocity & milestone toggles.</li>
                    <li className="flex items-center gap-2">• Documentation workspace shall generate synopsis, abstract, UML & slide content.</li>
                  </ul>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                  <h4 className="font-bold text-slate-900 text-sm mb-2 text-indigo-700">Non-Functional Requirements</h4>
                  <ul className="space-y-1.5 text-xs text-slate-700">
                    <li className="flex items-center gap-2">• Responsiveness across desktop, tablet, and mobile device viewports.</li>
                    <li className="flex items-center gap-2">• Sub-second tab response time using client-side React state.</li>
                    <li className="flex items-center gap-2">• Clear separation of Student and Faculty monitoring views.</li>
                  </ul>
                </div>
              </div>
            )}

            {tab === 'technology' && (
              <div className="grid sm:grid-cols-2 gap-3">
                {TECH_STACK.map((t) => (
                  <div key={t.name} className="rounded-xl border border-slate-100 bg-slate-50/40 p-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <p className="font-bold text-slate-900 text-sm">{t.name}</p>
                      <span className={t.tag === 'Implemented' ? 'badge-success' : 'badge-warning'}>{t.tag}</span>
                    </div>
                    <p className="text-[11px] font-semibold text-indigo-600 mt-0.5">{t.category}</p>
                    <p className="text-xs text-slate-700 mt-2">{t.purpose}</p>
                  </div>
                ))}
              </div>
            )}

            {tab === 'architecture' && (
              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-gradient-to-r from-indigo-900 to-slate-900 text-white shadow-md">
                  <p className="text-xs font-bold uppercase tracking-widest text-indigo-300">Central Architecture Flow</p>
                  <p className="text-sm font-bold text-white mt-1">
                    Student Input &rarr; AI Orchestrator &rarr; 5 Agents &rarr; Blueprint &rarr; Docs &rarr; Progress &rarr; Mentorship &rarr; Faculty
                  </p>
                </div>
                <div className="grid sm:grid-cols-2 gap-3">
                  {[
                    { step: '1. Student Input', desc: 'Captures project idea, problem statement, team size & duration.' },
                    { step: '2. AI Orchestrator', desc: 'Central agent decomposes parameters & routes tasks.' },
                    { step: '3. Specialized Agents', desc: 'Idea, Scope, Technology (Claude) + Timeline & Risk (Planned).' },
                    { step: '4. Academic Blueprint', desc: 'Consolidates analysis into structured project blueprint.' },
                    { step: '5. Documentation', desc: 'Generates synopsis, abstract, UML & PPT report materials.' },
                    { step: '6. Progress & Mentorship', desc: 'Tracks 9 milestone stages with AI mentor assistant.' },
                    { step: '7. Faculty Dashboard', desc: 'Mentors inspect team health, progress & risks.' },
                  ].map((s) => (
                    <div key={s.step} className="rounded-xl border border-slate-100 bg-slate-50/50 p-3">
                      <p className="font-bold text-xs text-indigo-700">{s.step}</p>
                      <p className="text-xs text-slate-600 mt-1">{s.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {tab === 'timeline' && <TimelineResult planned />}

            {tab === 'risks' && <RiskResult planned />}

            {tab === 'deliverables' && (
              <div className="grid sm:grid-cols-2 gap-3">
                {[
                  'Project Synopsis',
                  'System Architecture & Flowchart',
                  'Specialist Agent Analysis Output',
                  'Interactive Progress Tracking Log',
                  'Complete Academic Project Report',
                  'PowerPoint Presentation Content',
                  'User & System Manual',
                  'Faculty Review Record',
                ].map((d) => (
                  <div key={d} className="rounded-xl bg-slate-50 border border-slate-100 p-3 flex items-center gap-2 text-xs font-semibold text-slate-800">
                    <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
                    <span>{d}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Progress Tracker + AI Mentorship Panel */}
        <div className="space-y-6">
          <ProgressTracker milestones={p.milestones} compact={false} />
          <MentorshipPanel />
        </div>
      </div>
    </div>
  );
}

function Stat({ k, v }: { k: string; v: string }) {
  return (
    <div className="rounded-xl border border-slate-100 bg-slate-50/50 p-3">
      <p className="text-xs text-slate-500 font-semibold">{k}</p>
      <p className="text-sm font-bold text-slate-900 mt-1">{v}</p>
    </div>
  );
}

