import { useMemo, useState } from 'react';
import Modal from '../components/Modal';
import StatusBadge from '../components/StatusBadge';
import ProgressTracker from '../components/ProgressTracker';
import { TimelineResult, RiskResult, ScopeResult } from '../components/AgentCard';
import { useApp } from '../context';
import type { Project, ProjectStatus } from '../types';
import { GraduationCap, FolderKanban, CheckCircle2, Clock, AlertTriangle, Eye, Search, Sparkles } from 'lucide-react';

export default function FacultyDashboard() {
  const { projects, setSelectedProjectId, setPage } = useApp();
  const [open, setOpen] = useState<Project | null>(null);
  const [tab, setTab] = useState<'overview' | 'blueprint' | 'progress' | 'timeline' | 'risks' | 'milestones'>('overview');
  const [filterStatus, setFilterStatus] = useState<'ALL' | ProjectStatus>('ALL');
  const [query, setQuery] = useState('');

  const total = projects.length;
  const active = projects.filter((p) => p.status !== 'COMPLETED').length;
  const completed = projects.filter((p) => p.status === 'COMPLETED').length;
  const delayed = projects.filter((p) => p.status === 'DELAYED' || p.status === 'AT RISK').length;
  const avg = total ? Math.round(projects.reduce((s, p) => s + p.progress, 0) / total) : 0;

  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      const matchQuery = `${p.name} ${p.student} ${p.team} ${p.domain}`.toLowerCase().includes(query.toLowerCase());
      const matchStatus = filterStatus === 'ALL' || p.status === filterStatus;
      return matchQuery && matchStatus;
    });
  }, [projects, query, filterStatus]);

  return (
    <div className="page-wrap space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <p className="text-[10px] sm:text-[11px] uppercase tracking-wider text-indigo-600 font-extrabold mb-1">
            AI-Guided Academic Project Progress Tracking Platform with Planning &amp; Mentorship Assistance
          </p>
          <span className="badge-primary px-3 py-1 text-xs font-bold uppercase tracking-wider mb-2 inline-flex items-center gap-1.5">
            <GraduationCap size={14} /> Faculty &amp; Mentor Oversight
          </span>
          <h1 className="section-title">Faculty Monitoring Dashboard</h1>
          <p className="section-subtitle">
            Monitor student and team projects, review milestone velocity, and inspect project risks across all assigned teams.
          </p>
        </div>
      </div>

      {/* Summary Statistics */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
        {[
          { label: 'Total Projects', value: String(total), icon: FolderKanban, color: 'text-indigo-600 bg-indigo-50' },
          { label: 'Active Projects', value: String(active), icon: Clock, color: 'text-violet-600 bg-violet-50' },
          { label: 'Completed Projects', value: String(completed), icon: CheckCircle2, color: 'text-emerald-600 bg-emerald-50' },
          { label: 'Delayed / At Risk', value: String(delayed), icon: AlertTriangle, color: 'text-amber-600 bg-amber-50' },
          { label: 'Average Progress', value: `${avg}%`, icon: Sparkles, color: 'text-indigo-600 bg-indigo-50' },
        ].map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.label} className="card p-4 hover:shadow-md transition-all">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide">{s.label}</p>
                  <p className="text-2xl font-extrabold text-slate-900 mt-1">{s.value}</p>
                </div>
                <div className={`w-10 h-10 rounded-xl ${s.color} flex items-center justify-center shrink-0`}>
                  <Icon size={18} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Search & Status Filter Bar */}
      <div className="card p-4 flex flex-col sm:flex-row items-center justify-between gap-3 border-slate-200">
        <div className="relative w-full sm:w-80">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            className="input-field pl-9 text-xs"
            placeholder="Filter by project name, student, or team..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
          <span className="text-xs text-slate-500 font-semibold mr-1">Status Filter:</span>
          {(['ALL', 'ON TRACK', 'AT RISK', 'DELAYED', 'COMPLETED'] as const).map((st) => (
            <button
              key={st}
              type="button"
              onClick={() => setFilterStatus(st)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                filterStatus === st
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Student Project Monitoring Table */}
      <div className="card overflow-hidden border-slate-200 shadow-sm">
        <div className="p-4 bg-slate-50/80 border-b border-slate-200 flex items-center justify-between">
          <h3 className="font-bold text-slate-900 text-sm">Student Teams Project Roster</h3>
          <span className="text-xs text-slate-500 font-medium">Showing {filteredProjects.length} of {total} Projects</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs min-w-[760px]">
            <thead>
              <tr className="text-left font-bold uppercase tracking-wider text-slate-500 bg-slate-50/40 border-b border-slate-200">
                <th className="p-4">Project Name</th>
                <th className="p-4">Student / Team</th>
                <th className="p-4">Domain</th>
                <th className="p-4">Progress %</th>
                <th className="p-4">Current Milestone</th>
                <th className="p-4">Status</th>
                <th className="p-4">Last Updated</th>
                <th className="p-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              {filteredProjects.map((p) => (
                <tr
                  key={p.id}
                  className="hover:bg-slate-50/80 transition-colors cursor-pointer"
                  onClick={() => {
                    setOpen(p);
                    setTab('overview');
                  }}
                >
                  <td className="p-4 font-bold text-slate-900">{p.name}</td>
                  <td className="p-4 text-slate-700 font-medium">
                    {p.student} <span className="text-slate-400">({p.team})</span>
                  </td>
                  <td className="p-4">
                    <span className="text-indigo-700 font-semibold">{p.domain}</span>
                    <span className="block text-[11px] text-slate-500 font-medium">Duration: {p.duration}</span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-800">{p.progress}%</span>
                      <div className="w-16 h-1.5 rounded-full bg-slate-100 overflow-hidden hidden sm:block">
                        <div
                          className="h-1.5 rounded-full bg-indigo-600"
                          style={{ width: `${p.progress}%` }}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="p-4 font-medium text-slate-800">{p.currentMilestone}</td>
                  <td className="p-4">
                    <StatusBadge status={p.status} />
                  </td>
                  <td className="p-4 text-slate-500 font-medium">{p.lastUpdated}</td>
                  <td className="p-4 text-right">
                    <button
                      type="button"
                      className="btn-outline text-[11px] py-1 px-2.5 hover:border-indigo-300 hover:text-indigo-700"
                      onClick={(e) => {
                        e.stopPropagation();
                        setOpen(p);
                        setTab('overview');
                      }}
                    >
                      <Eye size={12} /> Inspect
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal for Project Inspection */}
      <Modal open={!!open} title={open?.name ?? 'Project Audit'} onClose={() => setOpen(null)} wide>
        {open && (
          <div className="space-y-4">
            <div className="flex flex-wrap gap-1.5 pb-3 border-b border-slate-100">
              {(['overview', 'blueprint', 'progress', 'timeline', 'risks', 'milestones'] as const).map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setTab(t)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold capitalize transition-all ${
                    tab === t ? 'bg-indigo-600 text-white shadow-xs' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>

            {tab === 'overview' && (
              <div className="space-y-4 text-xs sm:text-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-slate-900 text-base">{open.name}</h3>
                    <p className="text-slate-500 text-xs">Domain: {open.domain} · Duration: {open.duration}</p>
                  </div>
                  <StatusBadge status={open.status} />
                </div>
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                  <p className="font-bold text-slate-700 text-xs uppercase tracking-wide mb-1">Student & Team</p>
                  <p className="text-slate-900 font-semibold">{open.student} ({open.team})</p>
                </div>
                <div className="p-3.5 rounded-xl bg-indigo-50/60 border border-indigo-100">
                  <p className="font-bold text-indigo-700 text-xs uppercase tracking-wide mb-1">Project Idea</p>
                  <p className="text-slate-800 leading-relaxed">{open.idea}</p>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                  <p className="font-bold text-slate-700 text-xs uppercase tracking-wide mb-1">Problem Statement</p>
                  <p className="text-slate-800 leading-relaxed">{open.problemStatement}</p>
                </div>
              </div>
            )}

            {tab === 'blueprint' && (
              <div className="space-y-3">
                <p className="text-xs font-bold text-slate-700">Consolidated Project Blueprint Overview</p>
                <div className="grid grid-cols-3 gap-2 text-center text-xs">
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="text-slate-500 block">Feasibility</span>
                    <strong className="text-indigo-700 text-sm">8 / 10</strong>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="text-slate-500 block">Innovation</span>
                    <strong className="text-indigo-700 text-sm">8 / 10</strong>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="text-slate-500 block">Difficulty</span>
                    <strong className="text-indigo-700 text-sm">7 / 10</strong>
                  </div>
                </div>
                <ScopeResult />
              </div>
            )}

            {tab === 'progress' && (
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span>Overall Project Progress: {open.progress}%</span>
                  <span className="text-indigo-700">Current: {open.currentMilestone}</span>
                </div>
                <div className="h-3 rounded-full bg-slate-100 overflow-hidden">
                  <div className="h-3 rounded-full bg-indigo-600" style={{ width: `${open.progress}%` }} />
                </div>
                <p className="text-xs text-slate-600 pt-2">
                  Student has completed milestone items up to {open.currentMilestone}. Review progress logs under Milestones tab.
                </p>
              </div>
            )}

            {tab === 'timeline' && <TimelineResult planned />}

            {tab === 'risks' && <RiskResult planned />}

            {tab === 'milestones' && <ProgressTracker milestones={open.milestones} compact />}

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs text-slate-500">Project ID: {open.id}</span>
              <button
                type="button"
                className="btn-primary text-xs"
                onClick={() => {
                  setSelectedProjectId(open.id);
                  setOpen(null);
                  setPage('blueprint');
                }}
              >
                Open Full Project Blueprint &rarr;
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}

