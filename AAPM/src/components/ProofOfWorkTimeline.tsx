import { useState } from 'react';
import {
  CheckCircle2,
  Clock,
  ExternalLink,
  FileText,
  GitCommit,
  Image,
  Plus,
  Radio,
  Video,
  Eye,
  ShieldCheck,
} from 'lucide-react';
import { useApp } from '../context';
import type { ProofOfWorkStage } from '../types';
import Modal from './Modal';

const INITIAL_STAGES: ProofOfWorkStage[] = [
  {
    id: 's1',
    stage: 'Requirement Analysis',
    date: '12 Aug 2026',
    completedWork:
      'Identified problem statement, conducted stakeholder interviews, and defined 14 functional & non-functional requirements.',
    status: 'Completed',
    evidence: [
      { type: 'Documents', label: 'SRS Specification v1.0.pdf', details: 'Full academic requirements specification with user stories and constraint boundaries.' },
      { type: 'Progress Update', label: 'Faculty Milestone Sign-off', details: 'Verified by Dr. Rajesh Kumar during weekly capstone check-in.' },
    ],
  },
  {
    id: 's2',
    stage: 'Architecture',
    date: '20 Aug 2026',
    completedWork:
      'Designed Central AI Orchestrator topology, drafted 5 specialized agent schemas, and completed relational ER diagram.',
    status: 'Completed',
    evidence: [
      { type: 'Screenshots', label: 'System Flowchart & Agent Topology.png', details: 'High-res export of multi-agent dispatch diagram and Claude API routes.' },
      { type: 'Documents', label: 'Database Schema & ER Model.pdf', details: 'Relational entity relationship model with 8 tables and foreign keys.' },
    ],
  },
  {
    id: 's3',
    stage: 'Development',
    date: '28 Aug 2026',
    completedWork:
      'Implemented React 19 + TypeScript + Vite frontend client and wired Python Claude 4.5 agent execution prompts.',
    status: 'In Progress',
    evidence: [
      { type: 'GitHub', label: 'commit #a4f91b (Agent Pipeline)', details: 'Merged prompt templates and response parsing handlers for Idea & Scope agents.' },
      { type: 'Screenshots', label: 'Interactive Dashboard UI.png', details: 'Captured student dashboard with live milestone velocity meters.' },
      { type: 'Progress Update', label: 'Sprint 3 Velocity Check', details: '68% of core modules completed on schedule.' },
    ],
  },
  {
    id: 's4',
    stage: 'Testing',
    date: 'Target: 8 Sep 2026',
    completedWork:
      'Scenario testing on prompt inputs, rate limit graceful fallback verification, and cross-browser responsiveness audit.',
    status: 'Pending Review',
    evidence: [
      { type: 'Documents', label: 'Test Case Matrix (Draft)', details: '24 automated unit assertions testing edge-case boundary parameters.' },
    ],
  },
  {
    id: 's5',
    stage: 'Deployment',
    date: 'Target: 18 Sep 2026',
    completedWork:
      'Production Vite build optimization, Docker container configuration, and live evaluation demo rehearsal.',
    status: 'Pending Review',
    evidence: [
      { type: 'Demo Video', label: '3-Minute Walkthrough Rehearsal (Pending)', details: 'Live recording of student and faculty dual-view user journeys.' },
    ],
  },
];

export default function ProofOfWorkTimeline() {
  const { selectedProject, toast } = useApp();
  const [stages, setStages] = useState<ProofOfWorkStage[]>(INITIAL_STAGES);
  const [previewEvidence, setPreviewEvidence] = useState<{
    stage: string;
    item: { type: string; label: string; details: string };
  } | null>(null);

  const getEvidenceIcon = (type: string) => {
    switch (type) {
      case 'Screenshots':
        return <Image size={13} className="text-indigo-600" />;
      case 'Documents':
        return <FileText size={13} className="text-emerald-600" />;
      case 'GitHub':
        return <GitCommit size={13} className="text-slate-800" />;
      case 'Demo Video':
        return <Video size={13} className="text-rose-600" />;
      default:
        return <Radio size={13} className="text-violet-600" />;
    }
  };

  const handleAddEvidence = (stageName: string) => {
    toast(`Evidence uploader for "${stageName}" is a future enhancement (Coming Soon).`, 'info');
  };

  return (
    <div className="card p-6 border-indigo-100 bg-white shadow-sm space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <span className="badge-primary text-xs font-bold uppercase tracking-wider">
              Verification Ledger
            </span>
            <span className="badge-warning text-[10px] font-bold uppercase tracking-wider">
              Future Enhancement
            </span>
          </div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight mt-1">
            Proof-of-Work Timeline
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Associate development evidence with project milestones.
          </p>
        </div>

        <div className="text-xs font-semibold text-slate-600 bg-slate-50 px-3.5 py-2 rounded-xl border border-slate-200 shrink-0">
          5 Core Stages: Requirement Analysis &rarr; Architecture &rarr; Development &rarr; Testing &rarr; Deployment
        </div>
      </div>

      {/* Visual Timeline Stepper */}
      <div className="relative pl-6 sm:pl-8 space-y-8 before:absolute before:left-3 sm:before:left-4 before:top-3 before:bottom-3 before:w-0.5 before:bg-indigo-100">
        {stages.map((st, idx) => {
          const isDone = st.status === 'Completed';
          const isInProg = st.status === 'In Progress';

          return (
            <div key={st.id} className="relative group">
              {/* Bullet Node */}
              <div
                className={`absolute -left-6 sm:-left-8 top-1 w-6 h-6 sm:w-8 sm:h-8 rounded-full border-2 flex items-center justify-center transition-all ${
                  isDone
                    ? 'bg-emerald-500 border-white text-white shadow-sm'
                    : isInProg
                      ? 'bg-indigo-600 border-white text-white shadow-md ring-4 ring-indigo-100'
                      : 'bg-white border-slate-300 text-slate-400'
                }`}
              >
                {isDone ? (
                  <CheckCircle2 size={16} />
                ) : isInProg ? (
                  <Clock size={16} className="animate-spin" />
                ) : (
                  <span className="text-[10px] font-bold">{idx + 1}</span>
                )}
              </div>

              {/* Stage Card */}
              <div
                className={`card p-5 border transition-all ${
                  isInProg
                    ? 'border-indigo-300 bg-indigo-50/20 shadow-sm'
                    : isDone
                      ? 'border-slate-200 bg-white'
                      : 'border-slate-200 bg-slate-50/40 opacity-80'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-100">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600">
                      Stage {idx + 1}
                    </span>
                    <h3 className="text-base font-bold text-slate-900">{st.stage}</h3>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-500 font-medium bg-slate-100 px-2.5 py-0.5 rounded-full">
                      {st.date}
                    </span>
                    <span
                      className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                        isDone
                          ? 'bg-emerald-100 text-emerald-800'
                          : isInProg
                            ? 'bg-indigo-100 text-indigo-800'
                            : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {st.status}
                    </span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-700 mt-2.5 leading-relaxed">
                  <strong className="text-slate-800 font-semibold">Completed Work: </strong>
                  {st.completedWork}
                </p>

                {/* Evidence items */}
                <div className="mt-3 pt-3 border-t border-slate-100 space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                      Associated Evidence ({st.evidence.length})
                    </p>
                    <button
                      type="button"
                      onClick={() => handleAddEvidence(st.stage)}
                      className="text-[11px] font-bold text-indigo-600 hover:text-indigo-800 inline-flex items-center gap-1"
                    >
                      <Plus size={12} /> Associate Evidence (Coming Soon)
                    </button>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {st.evidence.map((ev, i) => (
                      <button
                        key={`${ev.label}-${i}`}
                        type="button"
                        onClick={() => setPreviewEvidence({ stage: st.stage, item: ev })}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 bg-white text-xs font-semibold text-slate-700 hover:border-indigo-300 hover:text-indigo-700 hover:shadow-xs transition-all text-left"
                      >
                        {getEvidenceIcon(ev.type)}
                        <span>{ev.label}</span>
                        <Eye size={12} className="text-slate-400 ml-0.5" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Evidence Preview Modal */}
      <Modal
        open={!!previewEvidence}
        title={`Evidence: ${previewEvidence?.item.label}`}
        onClose={() => setPreviewEvidence(null)}
      >
        {previewEvidence && (
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="badge-primary text-xs">{previewEvidence.stage}</span>
              <span className="badge-muted text-xs">Type: {previewEvidence.item.type}</span>
              <span className="badge-success text-xs inline-flex items-center gap-1">
                <ShieldCheck size={12} /> Integrity Verified
              </span>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <p className="text-xs font-bold text-slate-800 uppercase tracking-wide">
                Evidence Description
              </p>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                {previewEvidence.item.details}
              </p>
            </div>

            <div className="p-4 rounded-xl border border-indigo-100 bg-indigo-50/50 text-xs text-indigo-900 space-y-1">
              <p className="font-bold">Planned Review Workflow</p>
              <p>
                Planned feature: Students can associate development evidence (commits, screenshots, documents, and demo videos) with project milestones for mentor review.
              </p>
            </div>

            <div className="pt-2 text-right">
              <button
                type="button"
                onClick={() => setPreviewEvidence(null)}
                className="btn-primary text-xs px-4"
              >
                Close Preview
              </button>
            </div>
          </div>
        )}
      </Modal>

      {/* Footer */}
      <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
        <span>Planned feature: Students can associate development evidence with project milestones.</span>
        <span className="italic">Future Enhancement</span>
      </div>
    </div>
  );
}
