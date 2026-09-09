import { useState, useMemo } from 'react';
import { CheckCircle2, AlertCircle, Clock, ShieldCheck, ArrowRight, FileCheck, RefreshCw } from 'lucide-react';
import { useApp } from '../context';
import type { ReadinessItem } from '../types';

const DEFAULT_ITEMS: ReadinessItem[] = [
  {
    id: 'r1',
    category: 'Requirements',
    name: 'Functional & Non-Functional Specifications',
    status: 'Ready',
    recommendation: 'Requirements specification is frozen and signed off against the Project Blueprint.',
  },
  {
    id: 'r2',
    category: 'Development',
    name: 'Frontend & Backend Architecture Implementation',
    status: 'Ready',
    recommendation: 'Core application components, state models, and UI workflows are functioning cleanly.',
  },
  {
    id: 'r3',
    category: 'Testing',
    name: 'Test Cases & Edge Case Validation',
    status: 'Needs Attention',
    recommendation: 'Complete automated test assertions for fallback caching and API timeout scenarios.',
  },
  {
    id: 'r4',
    category: 'Documentation',
    name: 'Project Synopsis, SRS & Literature Survey',
    status: 'Ready',
    recommendation: 'All 11 academic documentation artifacts are pre-generated and formatted for submission.',
  },
  {
    id: 'r5',
    category: 'Screenshots',
    name: 'High-Resolution UI & Flowchart Screenshots',
    status: 'Needs Attention',
    recommendation: 'Capture 5 high-resolution screenshots showing multi-agent analysis and progress tracking views.',
  },
  {
    id: 'r6',
    category: 'Presentation',
    name: 'Project Slide Deck (6-Slide Presentation)',
    status: 'Ready',
    recommendation: 'Slide structure ready with problem, multi-agent architecture, and demo milestones.',
  },
  {
    id: 'r7',
    category: 'Final Deliverables',
    name: 'Source Code Packaging & Demo Video Walkthrough',
    status: 'Needs Attention',
    recommendation: 'Record a 3-minute video walkthrough of the application workflow and verify repository readme.',
  },
];

export default function ProjectReadinessChecker() {
  const { selectedProject, setPage, toast } = useApp();
  const [items, setItems] = useState<ReadinessItem[]>(DEFAULT_ITEMS);
  const [filter, setFilter] = useState<'all' | 'attention' | 'ready'>('all');

  const readyCount = items.filter((i) => i.status === 'Ready').length;
  const attentionCount = items.filter((i) => i.status === 'Needs Attention').length;

  // Weighted criteria evaluation: Requirements (15%), Development (25%), Testing (15%), Documentation (15%), Screenshots (10%), Presentation (10%), Final Deliverables (10%)
  const readinessScore = useMemo(() => {
    const weights: Record<string, { ready: number; attention: number }> = {
      r1: { ready: 15, attention: 5 },  // Requirements
      r2: { ready: 25, attention: 10 }, // Development
      r3: { ready: 15, attention: 7 },  // Testing (7% partial progress)
      r4: { ready: 15, attention: 5 },  // Documentation
      r5: { ready: 10, attention: 5 },  // Screenshots (5% partial progress)
      r6: { ready: 10, attention: 3 },  // Presentation
      r7: { ready: 10, attention: 5 },  // Final Deliverables (5% partial progress)
    };
    return items.reduce((acc, item) => {
      const w = weights[item.id] || { ready: 14, attention: 5 };
      return acc + (item.status === 'Ready' ? w.ready : w.attention);
    }, 0);
  }, [items]);

  const filteredItems = useMemo(() => {
    if (filter === 'attention') return items.filter((i) => i.status === 'Needs Attention');
    if (filter === 'ready') return items.filter((i) => i.status === 'Ready');
    return items;
  }, [items, filter]);

  const toggleItem = (id: string) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const next = item.status === 'Ready' ? 'Needs Attention' : 'Ready';
          return { ...item, status: next };
        }
        return item;
      }),
    );
    toast('Readiness checklist updated.', 'info');
  };

  return (
    <div className="card p-6 border-indigo-100 bg-white shadow-sm space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="badge-primary text-xs font-bold uppercase tracking-wider">
              Submission Audit
            </span>
            <span className="badge-warning text-[10px] font-bold uppercase tracking-wider">
              Future Enhancement
            </span>
          </div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">
            Project Readiness Checker
          </h2>
          <p className="text-xs text-slate-500">
            Check whether your project is ready for final submission.
          </p>
        </div>

        {/* Big Score Summary Banner */}
        <div className="p-4 rounded-2xl bg-indigo-50/70 border border-indigo-100 flex items-center gap-4 shrink-0">
          <div className="text-right">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Project Readiness Score</p>
            <p className="text-3xl font-extrabold text-indigo-700 leading-tight">
              {readinessScore}%
            </p>
          </div>
          <div className="h-10 w-px bg-indigo-200" />
          <div>
            <p className="text-xs font-bold text-amber-700 flex items-center gap-1">
              <AlertCircle size={14} /> {attentionCount} {attentionCount === 1 ? 'item still needs' : 'items still need'} attention.
            </p>
            <p className="text-[11px] text-slate-500">{readyCount} of 7 checks verified</p>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => setFilter('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              filter === 'all'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            All 7 Criteria
          </button>
          <button
            type="button"
            onClick={() => setFilter('attention')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              filter === 'attention'
                ? 'bg-amber-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Needs Attention ({attentionCount})
          </button>
          <button
            type="button"
            onClick={() => setFilter('ready')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              filter === 'ready'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Ready ({readyCount})
          </button>
        </div>
        <span className="text-[11px] text-slate-400">Click any check to toggle completion status</span>
      </div>

      {/* Checklist items */}
      <div className="space-y-3">
        {filteredItems.map((item) => {
          const isReady = item.status === 'Ready';
          return (
            <div
              key={item.id}
              onClick={() => toggleItem(item.id)}
              className={`p-4 rounded-xl border transition-all cursor-pointer ${
                isReady
                  ? 'border-emerald-200 bg-emerald-50/20 hover:border-emerald-300'
                  : 'border-amber-200 bg-amber-50/20 hover:border-amber-300'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5">
                    {isReady ? (
                      <CheckCircle2 size={20} className="text-emerald-600 shrink-0" />
                    ) : (
                      <AlertCircle size={20} className="text-amber-600 shrink-0" />
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        {item.category}
                      </span>
                      <span
                        className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                          isReady ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {item.status}
                      </span>
                    </div>
                    <h3 className="font-bold text-slate-900 text-sm mt-0.5">{item.name}</h3>
                  </div>
                </div>

                <span className="text-xs font-semibold text-indigo-600 hover:underline shrink-0 pt-0.5">
                  {isReady ? 'Mark Incomplete' : 'Mark Resolved'}
                </span>
              </div>

              <div className="mt-3 ml-8 p-3 rounded-lg bg-white/80 border border-slate-200/60 text-xs text-slate-600">
                <strong className="text-slate-800 font-semibold">Recommended Action: </strong>
                {item.recommendation}
              </div>
            </div>
          );
        })}
      </div>

      {/* Incomplete items summary callout if any */}
      {attentionCount > 0 && (
        <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-200 text-xs text-amber-950 flex items-start gap-3">
          <Clock size={18} className="text-amber-700 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <p className="font-bold text-amber-900">
              Next Action: Address {attentionCount} outstanding {attentionCount === 1 ? 'item' : 'items'} to achieve 100% Submission Readiness.
            </p>
            <p className="text-amber-800">
              Use the Documentation Workspace to generate pending reports and slide deck content, then attach demo evidence.
            </p>
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="pt-2 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <span className="text-slate-400 text-[11px]">
          Automated submission validator · Future enhancement scheduled for capstone grading integration
        </span>
        <button
          type="button"
          onClick={() => setPage('documentation')}
          className="btn-outline text-xs text-indigo-700 border-indigo-200 hover:bg-indigo-50"
        >
          Open Documentation Workspace &rarr;
        </button>
      </div>
    </div>
  );
}
