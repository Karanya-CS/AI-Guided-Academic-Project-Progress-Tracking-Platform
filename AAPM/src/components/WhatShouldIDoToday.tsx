import { useState } from 'react';
import { CheckCircle2, Clock, Compass, AlertCircle, Sparkles, ArrowRight } from 'lucide-react';
import { useApp } from '../context';

const RECOMMENDATIONS: Record<
  string,
  { task: string; priority: 'High' | 'Medium' | 'Urgent'; time: string; rationale: string }
> = {
  'Problem Identification': {
    task: 'Refine the core problem statement and validate academic novelty with faculty mentor.',
    priority: 'High',
    time: '1h 30m',
    rationale: 'Clarifying the exact problem scope prevents major architecture revisions later.',
  },
  'Requirement Gathering': {
    task: 'Draft functional requirements matrix and specify expected API input/output structures.',
    priority: 'High',
    time: '2h 00m',
    rationale: 'Requirements are required before finalizing the system architecture model.',
  },
  'Literature Survey': {
    task: 'Review 3 benchmark papers on project domain and summarize comparative analysis table.',
    priority: 'Medium',
    time: '2h 30m',
    rationale: 'Necessary foundation for the academic project synopsis and literature chapter.',
  },
  'System Architecture': {
    task: 'Complete the database schema design and upload the ER diagram.',
    priority: 'High',
    time: '2h 15m',
    rationale: 'System architecture diagram must be frozen before proceeding with core code implementation.',
  },
  Development: {
    task: 'Complete the database design and upload the ER diagram.',
    priority: 'High',
    time: '2h 30m',
    rationale: 'Backend persistence contracts are pending schema finalization for active sprints.',
  },
  'AI Integration': {
    task: 'Wire model prompt templates to central orchestrator and configure JSON response parser.',
    priority: 'Urgent',
    time: '3h 00m',
    rationale: 'Critical path milestone to enable live AI analysis output generation.',
  },
  Testing: {
    task: 'Execute test suites on core edge cases and document test logs for project evaluation.',
    priority: 'High',
    time: '2h 00m',
    rationale: 'Validation logs serve as empirical proof-of-work during project evaluation.',
  },
  Deployment: {
    task: 'Verify Docker container builds cleanly and test deployment demonstration script.',
    priority: 'Urgent',
    time: '1h 45m',
    rationale: 'Live demonstration readiness is required for final submission review.',
  },
  Documentation: {
    task: 'Compile the complete academic project report and review slide deck talking points.',
    priority: 'Urgent',
    time: '2h 30m',
    rationale: 'Final milestone deliverable prior to final project submission.',
  },
};

export default function WhatShouldIDoToday() {
  const { selectedProject, setPage, toast } = useApp();
  const [completed, setCompleted] = useState(false);

  const milestone = selectedProject?.currentMilestone || 'Development';
  const rec = RECOMMENDATIONS[milestone] || RECOMMENDATIONS['Development'];

  const handleMarkCompleted = () => {
    setCompleted(true);
    toast('Task marked as completed! AI recommendation will refresh for your next study session.', 'success');
  };

  const priorityColor =
    rec.priority === 'Urgent'
      ? 'bg-rose-50 text-rose-700 border-rose-200'
      : rec.priority === 'High'
        ? 'bg-amber-50 text-amber-700 border-amber-200'
        : 'bg-indigo-50 text-indigo-700 border-indigo-200';

  return (
    <div className="card p-6 border-indigo-100 bg-gradient-to-br from-indigo-50/40 via-white to-violet-50/30 shadow-sm relative overflow-hidden">
      <div className="flex flex-wrap items-center justify-between gap-2 pb-3 mb-4 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-xs">
            <Compass size={18} />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              What Should I Do Today?
            </h3>
            <p className="text-[11px] text-slate-500">
              Get a personalized next action based on your project progress and upcoming milestones.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="badge-warning text-[10px] font-bold uppercase tracking-wider">
            Future Enhancement
          </span>
          <span className="text-[11px] text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full font-medium hidden sm:inline-block">
            Milestone: {milestone}
          </span>
        </div>
      </div>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-2 flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <span className={`text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full border ${priorityColor}`}>
              {rec.priority} Priority
            </span>
            <span className="inline-flex items-center gap-1 text-xs text-slate-600 font-medium bg-slate-100 px-2.5 py-0.5 rounded-full">
              <Clock size={12} className="text-slate-500" />
              Est. Time: {rec.time}
            </span>
            {completed && (
              <span className="badge-success text-[10px] inline-flex items-center gap-1 font-bold">
                <CheckCircle2 size={12} /> Completed Today
              </span>
            )}
          </div>

          <p className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
            "{rec.task}"
          </p>

          <p className="text-xs text-slate-600 leading-relaxed flex items-start gap-1.5">
            <Sparkles size={14} className="text-indigo-600 shrink-0 mt-0.5" />
            <span>
              <strong className="text-slate-700 font-semibold">AI Rationale:</strong> {rec.rationale}
            </span>
          </p>
        </div>

        <div className="flex sm:flex-col items-center sm:items-end gap-2 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-slate-100">
          {!completed ? (
            <button
              type="button"
              onClick={handleMarkCompleted}
              className="btn-primary text-xs w-full sm:w-auto px-4 py-2.5"
            >
              <CheckCircle2 size={14} /> Mark as Completed
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setCompleted(false)}
              className="btn-outline text-xs w-full sm:w-auto px-4 py-2 text-slate-600"
            >
              Undo Completion
            </button>
          )}
          <button
            type="button"
            onClick={() => setPage('progress')}
            className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
          >
            Go to Progress Log <ArrowRight size={12} />
          </button>
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-slate-100/80 flex items-center justify-between text-[11px] text-slate-400">
        <span className="inline-flex items-center gap-1">
          <AlertCircle size={12} className="text-slate-400" /> Planned feature: Task scheduler will provide personalized daily actions based on project progress and upcoming milestones.
        </span>
        <span className="italic">Coming Soon in Full Platform Release</span>
      </div>
    </div>
  );
}
