import { useMemo, useState } from 'react';
import StatusBadge from '../components/StatusBadge';
import { DOMAINS } from '../data/demo';
import { useApp } from '../context';
import type { ProjectStatus } from '../types';
import { Plus, Search, FolderKanban } from 'lucide-react';

export default function MyProjects() {
  const { projects, searchQuery, setSearchQuery, setSelectedProjectId, setPage } = useApp();
  const [domain, setDomain] = useState('All');
  const [status, setStatus] = useState<'All' | ProjectStatus>('All');
  const [sort, setSort] = useState<'updated' | 'progress' | 'name'>('updated');

  const rows = useMemo(() => {
    let list = [...projects];
    const q = searchQuery.trim().toLowerCase();
    if (q) list = list.filter((p) => `${p.name} ${p.domain} ${p.currentMilestone} ${p.student}`.toLowerCase().includes(q));
    if (domain !== 'All') list = list.filter((p) => p.domain === domain);
    if (status !== 'All') list = list.filter((p) => p.status === status);
    list.sort((a, b) => {
      if (sort === 'progress') return b.progress - a.progress;
      if (sort === 'name') return a.name.localeCompare(b.name);
      return a.lastUpdated < b.lastUpdated ? 1 : -1;
    });
    return list;
  }, [projects, searchQuery, domain, status, sort]);

  return (
    <div className="page-wrap space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <p className="text-[10px] sm:text-[11px] uppercase tracking-wider text-indigo-600 font-extrabold mb-1">
            AI-Guided Academic Project Progress Tracking Platform with Planning &amp; Mentorship Assistance
          </p>
          <span className="badge-primary px-3 py-1 text-xs font-bold uppercase tracking-wider mb-2">
            Project Repository
          </span>
          <h1 className="section-title">My Projects</h1>
          <p className="section-subtitle">Search, filter, and inspect academic project blueprints &amp; progress.</p>
        </div>
        <button type="button" className="btn-primary shrink-0" onClick={() => setPage('create-project')}>
          <Plus size={16} /> + Create New Project
        </button>
      </div>

      {/* Filter Controls Card */}
      <div className="card p-4 grid sm:grid-cols-2 lg:grid-cols-4 gap-3 border-slate-200 shadow-sm">
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            className="input-field pl-9 text-xs"
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <select className="input-field text-xs font-medium" value={domain} onChange={(e) => setDomain(e.target.value)}>
          <option value="All">All Domains</option>
          {DOMAINS.map((d) => (
            <option key={d} value={d}>{d}</option>
          ))}
        </select>
        <select className="input-field text-xs font-medium" value={status} onChange={(e) => setStatus(e.target.value as 'All' | ProjectStatus)}>
          <option value="All">All Statuses</option>
          <option value="ON TRACK">ON TRACK</option>
          <option value="AT RISK">AT RISK</option>
          <option value="DELAYED">DELAYED</option>
          <option value="COMPLETED">COMPLETED</option>
        </select>
        <select className="input-field text-xs font-medium" value={sort} onChange={(e) => setSort(e.target.value as typeof sort)}>
          <option value="updated">Sort by: Last Updated</option>
          <option value="progress">Sort by: Progress %</option>
          <option value="name">Sort by: Project Name</option>
        </select>
      </div>

      {/* Results Grid */}
      {rows.length === 0 ? (
        <div className="card p-12 text-center space-y-3">
          <FolderKanban size={40} className="mx-auto text-slate-300" />
          <h3 className="font-bold text-slate-800 text-base">No Projects Match Your Search</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Try adjusting your search filter or clear domain/status selections to see all projects.
          </p>
          <button
            type="button"
            className="btn-outline text-xs mt-2"
            onClick={() => { setSearchQuery(''); setDomain('All'); setStatus('All'); }}
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
          {rows.map((p) => (
            <button
              key={p.id}
              type="button"
              className="card-hover p-6 text-left flex flex-col justify-between"
              onClick={() => {
                setSelectedProjectId(p.id);
                setPage('blueprint');
              }}
            >
              <div>
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <h3 className="font-bold text-slate-900 text-base truncate">{p.name}</h3>
                    <p className="text-xs text-slate-500 font-medium mt-0.5">{p.domain}</p>
                  </div>
                  <StatusBadge status={p.status} />
                </div>
                <p className="text-xs text-slate-600 mt-3 line-clamp-2 leading-relaxed">
                  {p.problemStatement || p.idea}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-100">
                <div className="flex items-center justify-between text-xs text-slate-600 mb-1.5 font-semibold">
                  <span>Progress: {p.progress}%</span>
                  <span className="text-indigo-600 font-bold">{p.currentMilestone}</span>
                </div>
                <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
                  <div
                    className="h-2 rounded-full bg-gradient-to-r from-indigo-500 to-violet-600 transition-all duration-300"
                    style={{ width: `${p.progress}%` }}
                  />
                </div>
                <div className="mt-3 flex flex-wrap items-center justify-between text-[11px] text-slate-400 font-medium gap-1">
                  <span>Student: {p.student}</span>
                  <span className="text-indigo-600 font-semibold bg-indigo-50 px-1.5 py-0.5 rounded">Duration: {p.duration}</span>
                  <span>Updated: {p.lastUpdated}</span>
                </div>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

