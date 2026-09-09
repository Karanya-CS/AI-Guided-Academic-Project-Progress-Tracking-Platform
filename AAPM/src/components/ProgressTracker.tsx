import { CheckCircle2, Circle, Loader2 } from 'lucide-react';
import type { Milestone, MilestoneStatus } from '../types';

interface Props {
  milestones: Milestone[];
  onToggle?: (id: string) => void;
  compact?: boolean;
}

export default function ProgressTracker({ milestones, onToggle, compact }: Props) {
  return (
    <div className={compact ? '' : 'card p-6 shadow-sm border-slate-200'}>
      {!compact && (
        <div className="flex items-center justify-between mb-5 pb-3 border-b border-slate-100">
          <div>
            <h3 className="font-bold text-slate-900 text-base">Academic Milestone Progress</h3>
            <p className="text-xs text-slate-500">9 Core Academic Stages from Problem Identification to Documentation</p>
          </div>
          {onToggle && (
            <span className="text-[11px] font-semibold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-full">
              Click stage to cycle status
            </span>
          )}
        </div>
      )}

      <div className="space-y-0">
        {milestones.map((m, idx) => (
          <div key={m.id} className="relative">
            <button
              type="button"
              onClick={() => onToggle?.(m.id)}
              disabled={!onToggle}
              className={`flex items-center justify-between gap-3 w-full text-left py-2 px-3 rounded-xl transition-all ${
                onToggle ? 'hover:bg-slate-50 cursor-pointer' : 'cursor-default'
              }`}
            >
              <div className="flex items-center gap-3 min-w-0">
                {m.status === 'completed' ? (
                  <CheckCircle2 size={20} className="text-emerald-600 shrink-0" />
                ) : m.status === 'in-progress' ? (
                  <Loader2 size={20} className="text-indigo-600 shrink-0 animate-spin" />
                ) : (
                  <Circle size={20} className="text-slate-300 shrink-0" />
                )}
                <span
                  className={`text-xs sm:text-sm font-semibold truncate ${
                    m.status === 'completed'
                      ? 'text-emerald-700 font-bold'
                      : m.status === 'in-progress'
                        ? 'text-indigo-700 font-bold'
                        : 'text-slate-500'
                  }`}
                >
                  Stage {idx + 1}: {m.label}
                </span>
              </div>

              <span
                className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md shrink-0 ${
                  m.status === 'completed'
                    ? 'bg-emerald-100 text-emerald-800'
                    : m.status === 'in-progress'
                      ? 'bg-indigo-100 text-indigo-800'
                      : 'bg-slate-100 text-slate-500'
                }`}
              >
                {m.status === 'completed' ? 'Completed' : m.status === 'in-progress' ? 'In Progress' : 'Pending'}
              </span>
            </button>

            {idx < milestones.length - 1 && (
              <div
                className={`ml-[22px] my-0.5 h-4 w-0.5 rounded-full transition-colors ${
                  m.status === 'completed' ? 'bg-emerald-500' : m.status === 'in-progress' ? 'bg-indigo-400' : 'bg-slate-200'
                }`}
              />
            )}
          </div>
        ))}
      </div>

      {onToggle && (
        <p className="text-[11px] text-slate-400 mt-4 text-center">
          Click any milestone to cycle state: Pending &rarr; In Progress &rarr; Completed.
        </p>
      )}
    </div>
  );
}

export function cycleMilestone(status: MilestoneStatus): MilestoneStatus {
  if (status === 'pending') return 'in-progress';
  if (status === 'in-progress') return 'completed';
  return 'pending';
}

