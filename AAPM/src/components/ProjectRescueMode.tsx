import { useState } from 'react';
import { AlertTriangle, Clock, ShieldAlert, Zap, ArrowRight, CheckCircle2, RefreshCw } from 'lucide-react';
import { useApp } from '../context';

interface Props {
  forceShow?: boolean;
}

export default function ProjectRescueMode({ forceShow = false }: Props) {
  const { selectedProject, setPage, toast } = useApp();
  const [demoMode, setDemoMode] = useState(false);
  const [accepted, setAccepted] = useState(false);

  const p = selectedProject;
  const isDelayed = p?.status === 'DELAYED' || p?.status === 'AT RISK';
  const shouldRender = forceShow || isDelayed || demoMode;

  if (!p) return null;

  const pendingMilestones = p.milestones.filter((m) => m.status !== 'completed');
  const delayTime = p.status === 'DELAYED' ? '2 Weeks Behind Schedule' : '5 Days Behind Milestone Schedule';
  const remainingTime = '3 Weeks Remaining';

  const revisedPlan = [
    {
      phase: 'Sprint 1: Core Fast-Track',
      days: 'Days 1–5',
      focus: 'Compress Architecture & Development',
      action: 'Finalize schema and mock secondary APIs to unblock frontend development.',
      status: 'High Priority',
    },
    {
      phase: 'Sprint 2: Parallel Integration',
      days: 'Days 6–10',
      focus: 'AI Integration & Initial Validation',
      action: 'Integrate prompt pipelines concurrently while writing test assertion suites.',
      status: 'Critical Path',
    },
    {
      phase: 'Sprint 3: Final Consolidation',
      days: 'Days 11–15',
      focus: 'Testing & Auto-Documentation',
      action: 'Generate report draft with Documentation Workspace & prepare final deliverables.',
      status: 'Target Delivery',
    },
  ];

  if (!shouldRender) {
    return (
      <div className="card p-4 bg-slate-50 border-slate-200 flex items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 text-slate-600">
          <ShieldAlert size={16} className="text-slate-400" />
          <span>
            Project status is currently <strong className="text-emerald-700">{p.status}</strong>. Planned feature: Rescue Mode will identify delayed projects and provide a recovery roadmap.
          </span>
        </div>
        <button
          type="button"
          onClick={() => setDemoMode(true)}
          className="btn-outline text-[11px] py-1 px-2.5 shrink-0 hover:border-amber-300 hover:text-amber-800"
        >
          Preview Rescue Mode
        </button>
      </div>
    );
  }

  return (
    <div className="card p-6 border-amber-300 bg-gradient-to-br from-amber-50/70 via-white to-rose-50/40 shadow-sm relative overflow-hidden">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-4 border-b border-amber-200/80">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-amber-500 text-white flex items-center justify-center shadow-sm shrink-0">
            <ShieldAlert size={22} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
                Project Rescue Mode
              </h2>
              <span className="badge-warning text-[10px] font-bold uppercase tracking-wider">
                Future Enhancement
              </span>
            </div>
            <p className="text-xs text-amber-900 font-medium mt-0.5">
              Identify delayed projects and provide a structured recovery roadmap.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {demoMode && !isDelayed && (
            <button
              type="button"
              onClick={() => setDemoMode(false)}
              className="text-[11px] text-slate-500 hover:underline"
            >
              Exit Preview
            </button>
          )}
          <span className="badge-error text-xs font-bold animate-pulse">
            <AlertTriangle size={12} className="mr-1 inline" /> Attention Required
          </span>
        </div>
      </div>

      {/* Main Narrative Banner */}
      <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-300/80 mb-5">
        <p className="text-xs sm:text-sm font-bold text-amber-950 leading-relaxed">
          "Your project is behind schedule. A recovery plan can help prioritize the remaining tasks."
        </p>
        <p className="text-xs text-amber-800 mt-1">
          Active project: <strong className="text-slate-900">{p.name}</strong> · Planned Duration: <strong className="text-slate-900">{p.duration}</strong> · Current stage: <strong className="text-slate-900">{p.currentMilestone}</strong>
        </p>
      </div>

      {/* 3 Metric Diagnostics */}
      <div className="grid sm:grid-cols-3 gap-3 mb-5">
        <div className="p-3.5 rounded-xl bg-white border border-amber-200 shadow-xs">
          <p className="text-[11px] font-bold uppercase tracking-wider text-rose-600">Current Delay</p>
          <p className="text-sm sm:text-base font-black text-slate-900 mt-1">{delayTime}</p>
          <p className="text-[11px] text-slate-500 mt-0.5">Milestone pace lagging standard timeline</p>
        </div>

        <div className="p-3.5 rounded-xl bg-white border border-amber-200 shadow-xs">
          <p className="text-[11px] font-bold uppercase tracking-wider text-amber-700">Pending Tasks</p>
          <p className="text-sm sm:text-base font-black text-slate-900 mt-1">{pendingMilestones.length} Pending Milestones</p>
          <p className="text-[11px] text-slate-500 mt-0.5">Critical path stages requiring execution</p>
        </div>

        <div className="p-3.5 rounded-xl bg-white border border-amber-200 shadow-xs">
          <p className="text-[11px] font-bold uppercase tracking-wider text-indigo-700">Remaining Time</p>
          <p className="text-sm sm:text-base font-black text-slate-900 mt-1">{remainingTime}</p>
          <p className="text-[11px] text-slate-500 mt-0.5">Target deadline for faculty review</p>
        </div>
      </div>

      {/* AI Recovery Suggestion */}
      <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs mb-5 space-y-2.5">
        <div className="flex items-center gap-2">
          <Zap size={16} className="text-amber-600" />
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
            AI Recovery Recommendations
          </h4>
        </div>
        <ul className="space-y-2 text-xs text-slate-700">
          <li className="flex items-start gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0 mt-1.5" />
            <span>
              <strong className="text-slate-900">Scope Compression:</strong> Defer optional third-party integrations to future work and prioritize minimum viable requirements for evaluation.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0 mt-1.5" />
            <span>
              <strong className="text-slate-900">Concurrent Milestone Execution:</strong> Run System Architecture and Development sprints simultaneously rather than sequentially.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0 mt-1.5" />
            <span>
              <strong className="text-slate-900">Automated Documentation Drafts:</strong> Pre-generate literature summaries and test checklists using the Documentation Workspace.
            </span>
          </li>
        </ul>
      </div>

      {/* Revised Recovery Plan */}
      <div className="space-y-2.5 mb-5">
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
            Revised Recovery Plan (Phased Roadmap)
          </h4>
          <span className="text-[11px] text-slate-400">Target: Completion within 3 Weeks</span>
        </div>
        <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
          <table className="w-full text-xs min-w-[500px]">
            <thead>
              <tr className="text-left font-bold uppercase tracking-wider text-slate-500 bg-slate-50 border-b border-slate-200">
                <th className="p-3">Phase</th>
                <th className="p-3">Timeline</th>
                <th className="p-3">Focus Area</th>
                <th className="p-3">Corrective Action</th>
                <th className="p-3 text-right">Priority</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {revisedPlan.map((r) => (
                <tr key={r.phase} className="hover:bg-slate-50/80">
                  <td className="p-3 font-bold text-slate-900 whitespace-nowrap">{r.phase}</td>
                  <td className="p-3 font-semibold text-indigo-700 whitespace-nowrap">{r.days}</td>
                  <td className="p-3 font-medium text-slate-800">{r.focus}</td>
                  <td className="p-3 text-slate-600">{r.action}</td>
                  <td className="p-3 text-right">
                    <span className="badge-warning text-[10px] font-bold">{r.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Actions */}
      <div className="pt-3 border-t border-amber-200/80 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="text-[11px] text-slate-500 flex items-center gap-1.5">
          <Clock size={12} className="text-amber-600" />
          <span>Automated milestone rebalancing algorithm · Planned backend integration</span>
        </div>
        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
          <button
            type="button"
            onClick={() => setPage('mentorship')}
            className="btn-outline text-xs flex-1 sm:flex-none"
          >
            Consult AI Mentor &rarr;
          </button>
          <button
            type="button"
            disabled={accepted}
            onClick={() => {
              setAccepted(true);
              toast('Recovery schedule staged! In production, this will update milestone deadlines.', 'info');
            }}
            className="btn-primary text-xs flex-1 sm:flex-none bg-amber-600 hover:bg-amber-700 border-amber-700 shadow-amber-200"
          >
            {accepted ? (
              <>
                <CheckCircle2 size={14} /> Plan Staged
              </>
            ) : (
              <>
                <RefreshCw size={14} /> Adopt Recovery Plan (Coming Soon)
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
