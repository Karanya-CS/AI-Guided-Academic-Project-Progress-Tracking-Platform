import { ArrowRight, FolderKanban, LineChart, Plus, Sparkles, Brain, Compass, ShieldAlert, CheckCircle, GitCommit } from 'lucide-react';
import StatusBadge from '../components/StatusBadge';
import WhatShouldIDoToday from '../components/WhatShouldIDoToday';
import ProjectRescueMode from '../components/ProjectRescueMode';
import { useApp } from '../context';

export default function Dashboard() {
  const { setPage, projects, setSelectedProjectId } = useApp();
  const active = projects.filter((p) => p.status !== 'COMPLETED').length;
  const avg = projects.length ? Math.round(projects.reduce((s, p) => s + p.progress, 0) / projects.length) : 0;
  const analyses = projects.filter((p) => p.hasAnalysis).length;
  const upcoming = projects.filter((p) => p.status !== 'COMPLETED').slice(0, 3);

  return (
    <div className="page-wrap space-y-8">
      {/* Top Banner & Titles */}
      <div className="space-y-1">
        <span className="badge-primary px-3 py-1 text-xs font-bold uppercase tracking-wider">
          Academic Project Platform
        </span>
        <h1 className="section-title text-slate-900 leading-tight">
          AI-Guided Academic Project Progress Tracking Platform with Planning &amp; Mentorship Assistance
        </h1>
        <p className="section-subtitle font-medium text-slate-600">
          Intelligent Planning • AI Mentorship • Progress Tracking
        </p>
      </div>

      {/* 1. Welcome / Project Overview (Hero Banner) */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-700 via-indigo-800 to-violet-900 p-8 sm:p-10 text-white shadow-xl border border-indigo-600/30">
        <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-white/10 blur-xl pointer-events-none" />
        <div className="absolute right-12 bottom-0 opacity-10 hidden lg:block">
          <Brain size={220} />
        </div>
        <div className="relative z-10 max-w-2xl">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 text-xs font-semibold text-indigo-100 backdrop-blur-md mb-3 border border-white/10">
            <Sparkles size={14} className="text-indigo-200" /> Multi-Agent AI System (5 Specialist Agents)
          </span>
          <h2 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight text-white">
            Turn Your Project Idea Into a Complete Academic Plan
          </h2>
          <p className="mt-3 text-sm sm:text-base text-indigo-100/90 leading-relaxed">
            Plan, analyze, track and improve your academic project with AI-powered guidance.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-bold text-indigo-800 shadow-md hover:bg-indigo-50 active:scale-[0.98] transition-all"
              onClick={() => setPage('create-project')}
            >
              <Plus size={18} />
              + Create New Project
            </button>
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-xl bg-indigo-900/60 hover:bg-indigo-900/80 px-5 py-3 text-sm font-semibold text-white border border-white/20 backdrop-blur-md transition-all"
              onClick={() => setPage('ai-agents')}
            >
              <Brain size={18} /> View AI Orchestrator Topology
            </button>
          </div>
        </div>
      </div>

      {/* 2. Active Projects and Progress (Dashboard Metrics) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Active Projects', value: String(active), icon: FolderKanban, color: 'text-indigo-600 bg-indigo-50' },
          { label: 'Overall Progress', value: `${avg}%`, icon: LineChart, color: 'text-emerald-600 bg-emerald-50' },
          { label: 'AI Analyses Completed', value: String(analyses), icon: Sparkles, color: 'text-violet-600 bg-violet-50' },
          { label: 'Upcoming Milestones', value: String(upcoming.length), icon: ArrowRight, color: 'text-amber-600 bg-amber-50' },
        ].map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.label} className="card p-5 hover:shadow-md transition-all">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">{s.label}</p>
                  <p className="text-3xl font-extrabold text-slate-900 mt-1">{s.value}</p>
                </div>
                <div className={`w-11 h-11 rounded-2xl ${s.color} flex items-center justify-center shrink-0`}>
                  <Icon size={20} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* 3. "What Should I Do Today?" Feature */}
      <div id="what-should-i-do-today">
        <WhatShouldIDoToday />
      </div>

      {/* 4. AI Project Workflow Visualization */}
      <div className="card p-6 bg-slate-900 text-white space-y-4 border-slate-800 shadow-md">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center shrink-0">
              <Brain size={20} />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-indigo-300">Platform Architecture Workflow</p>
              <h3 className="text-base font-bold text-white mt-0.5">End-to-End Academic Planning Pipeline</h3>
            </div>
          </div>
          <button
            type="button"
            className="btn-primary text-xs shrink-0 whitespace-nowrap bg-indigo-600 hover:bg-indigo-500"
            onClick={() => setPage('ai-agents')}
          >
            Inspect AI Orchestrator &rarr;
          </button>
        </div>

        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          Each specialized agent focuses on a specific project-planning task, making the overall workflow more organized and modular.
        </p>

        {/* Workflow Chain */}
        <div className="flex items-center gap-2 overflow-x-auto py-2 text-xs font-semibold text-slate-300">
          <span className="px-3 py-1.5 rounded-lg bg-slate-800 text-white whitespace-nowrap">Student Idea</span>
          <span className="text-indigo-400">&rarr;</span>
          <span className="px-3 py-1.5 rounded-lg bg-indigo-950 text-indigo-200 border border-indigo-700/50 whitespace-nowrap">Central AI Orchestrator</span>
          <span className="text-indigo-400">&rarr;</span>
          <span className="px-3 py-1.5 rounded-lg bg-indigo-900/60 text-indigo-100 whitespace-nowrap">5 AI Agents</span>
          <span className="text-indigo-400">&rarr;</span>
          <span className="px-3 py-1.5 rounded-lg bg-slate-800 text-white whitespace-nowrap">Project Blueprint</span>
          <span className="text-indigo-400">&rarr;</span>
          <span className="px-3 py-1.5 rounded-lg bg-slate-800 text-white whitespace-nowrap">Documentation</span>
          <span className="text-indigo-400">&rarr;</span>
          <span className="px-3 py-1.5 rounded-lg bg-slate-800 text-white whitespace-nowrap">AI Mentorship</span>
          <span className="text-indigo-400">&rarr;</span>
          <span className="px-3 py-1.5 rounded-lg bg-slate-800 text-white whitespace-nowrap">Faculty Dashboard</span>
        </div>
      </div>

      {/* Project Rescue Mode (shown if delayed or previewed) */}
      <ProjectRescueMode />

      {/* 5. Future Enhancements Section */}
      <div className="space-y-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-slate-900">Future Enhancements</h2>
            <span className="badge-warning text-[10px] font-bold uppercase tracking-wider">
              Planned Capabilities
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Planned future enhancements designed to maximize student project outcomes and milestone completion.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              id: 'today',
              name: 'What Should I Do Today?',
              icon: Compass,
              desc: 'Personalized next action based on your project progress and upcoming milestones.',
              badge: 'Future Enhancement',
              actionLabel: 'View Today',
              onClick: () => {
                const el = document.getElementById('what-should-i-do-today');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              },
            },
            {
              id: 'rescue',
              name: 'Project Rescue Mode',
              icon: ShieldAlert,
              desc: 'Identify delayed projects and provide a structured recovery roadmap.',
              badge: 'Future Enhancement',
              actionLabel: 'Preview Rescue',
              onClick: () => setPage('progress'),
            },
            {
              id: 'readiness',
              name: 'Project Readiness Checker',
              icon: CheckCircle,
              desc: 'Check whether your project is ready for final submission across 7 core criteria.',
              badge: 'Future Enhancement',
              actionLabel: 'Check Readiness',
              onClick: () => setPage('progress'),
            },
            {
              id: 'pow',
              name: 'Proof-of-Work Timeline',
              icon: GitCommit,
              desc: 'Associate development evidence (commits, screenshots, documents) with project milestones.',
              badge: 'Future Enhancement',
              actionLabel: 'View Timeline',
              onClick: () => setPage('progress'),
            },
          ].map((f) => {
            const Icon = f.icon;
            return (
              <div
                key={f.id}
                className="card p-5 text-left flex flex-col justify-between hover:border-indigo-200 hover:shadow-md transition-all"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center shrink-0">
                      <Icon size={18} />
                    </div>
                    <span className="badge-warning text-[9px] font-bold uppercase tracking-wider">{f.badge}</span>
                  </div>
                  <h3 className="font-bold text-slate-900 text-sm leading-snug">{f.name}</h3>
                  <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">{f.desc}</p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={f.onClick}
                    className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
                  >
                    {f.actionLabel} &rarr;
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recent Projects Cards */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Recent Projects</h2>
            <p className="text-xs text-slate-500">Academic projects being tracked in the platform.</p>
          </div>
          <button type="button" className="btn-outline text-xs" onClick={() => setPage('my-projects')}>
            View All Projects ({projects.length}) &rarr;
          </button>
        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
          {projects.slice(0, 3).map((p) => (
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
      </div>
    </div>
  );
}

