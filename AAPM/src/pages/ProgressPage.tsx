import { useState } from 'react';
import ProgressTracker, { cycleMilestone } from '../components/ProgressTracker';
import StatusBadge from '../components/StatusBadge';
import ProofOfWorkTimeline from '../components/ProofOfWorkTimeline';
import ProjectReadinessChecker from '../components/ProjectReadinessChecker';
import ProjectRescueMode from '../components/ProjectRescueMode';
import { useApp } from '../context';
import { Award, CheckSquare, Clock, LineChart, ShieldAlert } from 'lucide-react';

export default function ProgressPage() {
  const { projects, selectedProject, setSelectedProjectId, updateProject, toast } = useApp();
  const [activeTab, setActiveTab] = useState<'milestones' | 'proof-of-work' | 'readiness' | 'rescue'>('milestones');
  const p = selectedProject;
  if (!p) return null;

  const completed = p.milestones.filter((m) => m.status === 'completed').length;
  const pending = p.milestones.filter((m) => m.status !== 'completed').length;
  const current = p.milestones.find((m) => m.status === 'in-progress') ?? p.milestones.find((m) => m.status === 'pending');
  const next = p.milestones.find((m) => m.status === 'pending' && m.id !== current?.id);

  const toggle = (id: string) => {
    const milestones = p.milestones.map((m) => (m.id === id ? { ...m, status: cycleMilestone(m.status) } : m));
    const done = milestones.filter((m) => m.status === 'completed').length;
    const progress = Math.round((done / milestones.length) * 100);
    const currentMs = milestones.find((m) => m.status === 'in-progress')?.label ?? milestones.find((m) => m.status === 'pending')?.label ?? 'Documentation';
    const status = progress === 100 ? ('COMPLETED' as const) : p.status === 'COMPLETED' ? ('ON TRACK' as const) : p.status;
    updateProject(p.id, { milestones, progress, currentMilestone: currentMs, status });
    toast(`Progress updated: ${progress}% complete`, 'success');
  };

  return (
    <div className="page-wrap space-y-6">
      {/* Header */}
      <div>
        <p className="text-[10px] sm:text-[11px] uppercase tracking-wider text-indigo-600 font-extrabold mb-1">
          AI-Guided Academic Project Progress Tracking Platform with Planning &amp; Mentorship Assistance
        </p>
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <span className="badge-primary px-3 py-1 text-xs font-bold uppercase tracking-wider">
            Milestone Velocity Log
          </span>
          <span className="text-xs text-indigo-700 bg-indigo-50 font-bold px-2.5 py-1 rounded-lg border border-indigo-100 flex items-center gap-1.5">
            <Clock size={12} className="text-indigo-600" /> Duration: {p.duration}
          </span>
        </div>
        <h1 className="section-title">Progress Tracking</h1>
        <p className="section-subtitle">
          Track and log milestone progress for student projects across all 9 academic stages. Updates reflect live in Faculty Dashboard.
        </p>
      </div>

      {/* Project Selector Pills */}
      <div className="space-y-2">
        <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Select Project To Track</p>
        <div className="flex flex-wrap gap-2">
          {projects.map((proj) => (
            <button
              key={proj.id}
              type="button"
              onClick={() => setSelectedProjectId(proj.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all ${
                proj.id === p.id
                  ? 'border-indigo-600 bg-indigo-50 text-indigo-800 shadow-sm'
                  : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
              }`}
            >
              {proj.name} ({proj.progress}%)
            </button>
          ))}
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-7 gap-3">
        {[
          { k: 'Overall Progress', v: `${p.progress}%`, highlight: true },
          { k: 'Current Milestone', v: current?.label ?? p.currentMilestone },
          { k: 'Project Duration', v: p.duration, isDuration: true },
          { k: 'Completed Tasks', v: `${completed} / ${p.milestones.length}` },
          { k: 'Pending Tasks', v: String(pending) },
          { k: 'Next Milestone', v: next?.label ?? 'None (Final Stage)' },
          { k: 'Project Status', v: p.status },
        ].map((c) => (
          <div key={c.k} className={`card p-4 ${c.highlight ? 'bg-indigo-50/60 border-indigo-200' : ''}`}>
            <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">{c.k}</p>
            {c.k === 'Project Status' ? (
              <div className="mt-1.5">
                <StatusBadge status={p.status} />
              </div>
            ) : c.isDuration ? (
              <p className="font-extrabold mt-1 text-sm text-indigo-700 flex items-center gap-1">
                <Clock size={14} className="text-indigo-600 shrink-0" /> {c.v}
              </p>
            ) : (
              <p className={`font-extrabold mt-1 text-sm ${c.highlight ? 'text-indigo-700 text-lg' : 'text-slate-900'}`}>{c.v}</p>
            )}
          </div>
        ))}
      </div>

      {/* Progress Bar Banner */}
      <div className="card p-5 bg-white border-slate-200 space-y-2">
        <div className="flex items-center justify-between text-xs font-bold">
          <span className="text-slate-700">Project Completion Bar</span>
          <span className="text-indigo-700">{p.progress}% Completed</span>
        </div>
        <div className="h-3 rounded-full bg-slate-100 overflow-hidden">
          <div
            className="h-3 rounded-full bg-gradient-to-r from-indigo-500 via-indigo-600 to-violet-600 transition-all duration-500 shadow-sm"
            style={{ width: `${p.progress}%` }}
          />
        </div>
      </div>

      {/* View Switcher Tabs */}
      <div className="card p-2 border-slate-200 bg-slate-50/80 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setActiveTab('milestones')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'milestones'
              ? 'bg-white text-indigo-700 shadow-sm border border-slate-200/80'
              : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
          }`}
        >
          <LineChart size={14} /> 9-Stage Academic Milestones
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('proof-of-work')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'proof-of-work'
              ? 'bg-white text-indigo-700 shadow-sm border border-slate-200/80'
              : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
          }`}
        >
          <Award size={14} /> Proof-of-Work Timeline
          <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-amber-100 text-amber-800 uppercase tracking-wider">
            Future
          </span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('readiness')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'readiness'
              ? 'bg-white text-indigo-700 shadow-sm border border-slate-200/80'
              : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
          }`}
        >
          <CheckSquare size={14} /> Project Readiness Checker
          <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-amber-100 text-amber-800 uppercase tracking-wider">
            Future
          </span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('rescue')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'rescue'
              ? 'bg-white text-indigo-700 shadow-sm border border-slate-200/80'
              : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
          }`}
        >
          <ShieldAlert size={14} /> Project Rescue Mode
          <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-amber-100 text-amber-800 uppercase tracking-wider">
            Future
          </span>
        </button>
      </div>

      {/* Tab Contents */}
      {activeTab === 'milestones' && (
        <ProgressTracker milestones={p.milestones} onToggle={toggle} />
      )}

      {activeTab === 'proof-of-work' && <ProofOfWorkTimeline />}

      {activeTab === 'readiness' && <ProjectReadinessChecker />}

      {activeTab === 'rescue' && <ProjectRescueMode forceShow />}
    </div>
  );
}

