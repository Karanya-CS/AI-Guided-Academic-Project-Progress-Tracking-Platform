import { useState, type FormEvent, type ReactNode } from 'react';
import { ArrowLeft, Sparkles, Wand2 } from 'lucide-react';
import { DOMAINS, DURATIONS, TEAM_SIZES } from '../data/demo';
import { useApp } from '../context';
import type { CreateProjectForm } from '../types';

const empty: CreateProjectForm = {
  projectName: '',
  problemStatement: '',
  projectIdea: '',
  domain: '',
  teamSize: '',
  expectedDuration: '',
};

const SAMPLE_PROJECT: CreateProjectForm = {
  projectName: 'AI-Guided Academic Project Progress Tracking Platform',
  problemStatement: 'Students and faculty face difficulties with unstructured project execution, lack of clear milestone tracking, and limited continuous mentorship.',
  projectIdea: 'I want to build an AI-guided academic project progress tracking platform that provides AI-based project planning, progress tracking across 9 academic stages, and mentorship assistance.',
  domain: 'Artificial Intelligence',
  teamSize: '3 Students',
  expectedDuration: '6 Months',
};

export default function CreateProject() {
  const { setPage, addProject, toast } = useApp();
  const [form, setForm] = useState<CreateProjectForm>(empty);
  const [error, setError] = useState('');

  const update = (key: keyof CreateProjectForm, value: string) => {
    setForm((f) => ({ ...f, [key]: value }));
    setError('');
  };

  const fillSample = () => {
    setForm(SAMPLE_PROJECT);
    setError('');
    toast('Sample project data filled! Click Generate Project Plan.', 'info');
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!form.projectName || !form.problemStatement || !form.projectIdea || !form.domain || !form.teamSize || !form.expectedDuration) {
      setError('Please complete all form fields before generating a plan.');
      toast('Please complete every field.', 'error');
      return;
    }
    addProject(form);
    toast('Project plan submitted! AI Orchestrator is coordinating agents…', 'success');
    setPage('ai-analysis');
  };

  return (
    <div className="page-wrap max-w-3xl space-y-6">
      <button type="button" className="btn-ghost text-indigo-700 px-0 -mb-2" onClick={() => setPage('dashboard')}>
        <ArrowLeft size={16} />
        Back to Dashboard
      </button>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <p className="text-[10px] sm:text-[11px] uppercase tracking-wider text-indigo-600 font-extrabold mb-1">
            AI-Guided Academic Project Progress Tracking Platform with Planning &amp; Mentorship Assistance
          </p>
          <h1 className="section-title">Create Your Project Plan</h1>
          <p className="section-subtitle">
            Describe your project idea and let our AI agents analyze, scope, and guide your academic project.
          </p>
        </div>
        <button
          type="button"
          onClick={fillSample}
          className="btn-outline text-xs text-indigo-700 border-indigo-200 bg-indigo-50/50 hover:bg-indigo-100 shrink-0"
        >
          <Wand2 size={14} /> Quick Fill Example Idea
        </button>
      </div>

      <form onSubmit={onSubmit} className="card p-6 sm:p-8 space-y-6 border-slate-200 shadow-md">
        {error && (
          <div className="rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-sm px-4 py-3 font-medium">
            {error}
          </div>
        )}

        <Field label="Project Name">
          <input
            className="input-field"
            value={form.projectName}
            onChange={(e) => update('projectName', e.target.value)}
            placeholder="e.g. AI-Guided Academic Project Progress Tracking Platform"
          />
        </Field>

        <Field label="Problem Statement">
          <textarea
            className="input-field resize-none"
            rows={3}
            value={form.problemStatement}
            onChange={(e) => update('problemStatement', e.target.value)}
            placeholder="What academic or real-world problem does this project solve?"
          />
        </Field>

        <Field label="Project Idea">
          <textarea
            className="input-field resize-none min-h-[160px]"
            rows={6}
            value={form.projectIdea}
            onChange={(e) => update('projectIdea', e.target.value)}
            placeholder="I want to build an AI-guided academic project progress tracking platform..."
          />
          <p className="text-xs text-slate-500 mt-2">
            A detailed idea helps Idea Evaluation, Scope Definition, and Technology Recommendation agents produce a accurate plan.
          </p>
        </Field>

        <Field label="Domain">
          <select className="input-field" value={form.domain} onChange={(e) => update('domain', e.target.value)}>
            <option value="">Select a domain…</option>
            {DOMAINS.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </Field>

        <div>
          <label className="block text-sm font-semibold text-slate-900 mb-2">Team Size</label>
          <div className="flex flex-wrap gap-2">
            {TEAM_SIZES.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => update('teamSize', s)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold border transition-all ${
                  form.teamSize === s
                    ? 'border-indigo-600 bg-indigo-50 text-indigo-800 shadow-sm'
                    : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                }`}
              >
                {s === '1' ? 'Solo (1)' : s}
              </button>
            ))}
          </div>
        </div>

        <Field label="Project Duration">
          <select
            className="input-field font-medium text-slate-800"
            value={form.expectedDuration}
            onChange={(e) => update('expectedDuration', e.target.value)}
          >
            <option value="">Select project duration…</option>
            {DURATIONS.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          <div className="flex flex-wrap gap-2 mt-2">
            {DURATIONS.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => update('expectedDuration', s)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                  form.expectedDuration === s
                    ? 'border-indigo-600 bg-indigo-50 text-indigo-800 shadow-xs'
                    : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </Field>

        <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <button type="submit" className="btn-primary text-base px-8 py-3 w-full sm:w-auto">
            <Sparkles size={18} /> Generate Project Plan
          </button>
          <p className="text-xs text-slate-400 text-center sm:text-right">
            Coordinates 5 AI Agents & generate Blueprint
          </p>
        </div>
      </form>
    </div>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="block text-sm font-semibold text-slate-900 mb-2">{label}</span>
      {children}
    </label>
  );
}

