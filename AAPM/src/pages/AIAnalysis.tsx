import { useEffect, useState } from 'react';
import { ArrowDown, Brain, Sparkles, CheckCircle2, ChevronRight, User, FileText, LayoutList, BookOpen, MessageSquare, GraduationCap } from 'lucide-react';
import AgentCard, { AGENTS } from '../components/AgentCard';
import { useApp } from '../context';
import type { AgentStatus } from '../types';

export default function AIAnalysis() {
  const { selectedProject, setPage } = useApp();
  const [statuses, setStatuses] = useState<Record<string, AgentStatus>>({
    idea: 'ANALYZING',
    scope: 'WAITING',
    technology: 'WAITING',
    timeline: 'PLANNED',
    risk: 'PLANNED',
  });

  useEffect(() => {
    const timers = [
      window.setTimeout(() => setStatuses((s) => ({ ...s, idea: 'COMPLETED', scope: 'ANALYZING' })), 1200),
      window.setTimeout(() => setStatuses((s) => ({ ...s, scope: 'COMPLETED', technology: 'ANALYZING' })), 2400),
      window.setTimeout(() => setStatuses((s) => ({ ...s, technology: 'COMPLETED' })), 3600),
    ];
    return () => timers.forEach((t) => window.clearTimeout(t));
  }, []);

  const implementedDone = ['idea', 'scope', 'technology'].every((id) => statuses[id] === 'COMPLETED');

  return (
    <div className="page-wrap">
      {/* Top Banner & Header */}
      <div className="text-center max-w-3xl mx-auto space-y-2">
        <p className="text-[10px] sm:text-[11px] uppercase tracking-wider text-indigo-600 font-extrabold mb-1">
          AI-Guided Academic Project Progress Tracking Platform with Planning &amp; Mentorship Assistance
        </p>
        <span className="badge-primary px-3 py-1 text-xs font-bold uppercase tracking-wider">
          Central Orchestration Pipeline
        </span>
        <h1 className="section-title text-center text-slate-900">AI PROJECT ANALYSIS</h1>
        <p className="section-subtitle mx-auto text-center">
          Each specialized agent focuses on a specific project-planning task, making the overall workflow more organized and modular.
        </p>
      </div>

      {/* Visual Pipeline Stepper Breadcrumb */}
      <div className="card p-4 overflow-x-auto bg-gradient-to-r from-indigo-50/50 via-white to-violet-50/50 border-slate-200">
        <div className="flex items-center justify-between min-w-[840px] text-xs font-semibold text-slate-600 px-2">
          <div className="flex items-center gap-1.5 text-indigo-700">
            <User size={14} /> Student
          </div>
          <ChevronRight size={14} className="text-slate-300" />
          <div className="flex items-center gap-1.5 text-indigo-700">
            <FileText size={14} /> Project Idea
          </div>
          <ChevronRight size={14} className="text-slate-300" />
          <div className="flex items-center gap-1.5 font-bold text-indigo-900 bg-indigo-100/80 px-2.5 py-1 rounded-lg">
            <Brain size={14} className="text-indigo-600" /> AI Orchestrator
          </div>
          <ChevronRight size={14} className="text-slate-300" />
          <div className="flex items-center gap-1.5 text-indigo-700">
            <Sparkles size={14} /> 5 AI Agents
          </div>
          <ChevronRight size={14} className="text-slate-300" />
          <div className="flex items-center gap-1.5 text-slate-500">
            <LayoutList size={14} /> Blueprint
          </div>
          <ChevronRight size={14} className="text-slate-300" />
          <div className="flex items-center gap-1.5 text-slate-500">
            <BookOpen size={14} /> Docs
          </div>
          <ChevronRight size={14} className="text-slate-300" />
          <div className="flex items-center gap-1.5 text-slate-500">
            <MessageSquare size={14} /> Mentorship
          </div>
          <ChevronRight size={14} className="text-slate-300" />
          <div className="flex items-center gap-1.5 text-slate-500">
            <GraduationCap size={14} /> Faculty
          </div>
        </div>
      </div>

      {/* Selected Project Box */}
      <div className="card p-6 max-w-3xl mx-auto border-indigo-100 bg-white shadow-sm">
        <div className="flex items-center justify-between gap-3 pb-3 border-b border-slate-100">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-wider text-indigo-600">Active Evaluation Input</p>
            <h2 className="text-lg font-bold text-slate-900 mt-0.5">{selectedProject?.name ?? 'Untitled Academic Project'}</h2>
          </div>
          <span className="badge-primary">{selectedProject?.domain ?? 'General Domain'}</span>
        </div>
        <p className="text-xs sm:text-sm text-slate-600 mt-3 leading-relaxed">
          <strong className="text-slate-800">Problem & Idea:</strong> {selectedProject?.idea || selectedProject?.problemStatement}
        </p>
      </div>

      {/* Orchestrator Connecting Arrow */}
      <div className="flex justify-center text-indigo-500">
        <ArrowDown className="animate-bounce" size={24} />
      </div>

      {/* AI Orchestrator Main Node */}
      <div className="flex justify-center">
        <div className="relative rounded-3xl bg-gradient-to-br from-indigo-700 via-indigo-800 to-violet-900 text-white px-10 py-8 text-center shadow-xl max-w-md w-full border border-indigo-500/30 orchestrator-glow">
          <div className="mx-auto mb-3 w-16 h-16 rounded-2xl bg-white/15 backdrop-blur-md flex items-center justify-center border border-white/20">
            <Brain size={32} className="text-indigo-100" />
          </div>
          <p className="text-xs font-bold tracking-[0.25em] text-indigo-200 uppercase">AI ORCHESTRATOR</p>
          <h3 className="text-xl font-black mt-1 tracking-tight">CENTRAL / MAIN AGENT</h3>
          <p className="text-indigo-100/90 text-xs mt-2 leading-relaxed">
            Decomposes academic project parameters and orchestrates 5 specialized AI agents concurrently.
          </p>
          <div className="mt-4 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[11px] font-medium text-indigo-100 border border-white/10">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Backend API: Anthropic Claude Sonnet 4.5
          </div>
        </div>
      </div>

      {/* Connector line down to 5 agents */}
      <div className="flex flex-col items-center text-indigo-400">
        <div className="h-6 w-0.5 bg-gradient-to-b from-indigo-600 to-indigo-300" />
        <div className="w-full max-w-4xl h-0.5 bg-indigo-200 hidden sm:block" />
        <ArrowDown size={22} className="mt-1 text-indigo-500" />
      </div>

      {/* 5 Specialized Agent Cards */}
      <div className="space-y-3">
        <div className="flex items-center justify-between max-w-4xl mx-auto px-1">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-500">5 Specialized Agents Status Topology</p>
          <span className="text-xs text-indigo-600 font-semibold">Click any card for full agent details</span>
        </div>
        <div className="grid sm:grid-cols-2 xl:grid-cols-5 gap-4">
          {AGENTS.map((agent) => (
            <AgentCard key={agent.id} agent={agent} status={statuses[agent.id]} />
          ))}
        </div>
      </div>

      {/* Bottom Completion Action */}
      <div className="flex flex-col items-center gap-3 pt-6 pb-4">
        <div className="flex items-center gap-2 text-slate-700 text-xs font-semibold">
          <span>5 Specialized Agents</span>
          <ChevronRight size={14} className="text-indigo-500" />
          <span className="text-indigo-700 font-bold">Project Blueprint</span>
        </div>

        {implementedDone ? (
          <div className="text-center space-y-3">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-700 bg-emerald-50 px-4 py-2 rounded-full border border-emerald-200">
              <CheckCircle2 size={16} /> Idea, Scope & Technology Analysis Complete!
            </div>
            <div>
              <button
                type="button"
                className="btn-primary text-base px-8 py-3 shadow-lg hover:shadow-indigo-200"
                onClick={() => setPage('blueprint')}
              >
                Open Project Blueprint &rarr;
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center space-y-2">
            <p className="text-xs text-slate-500 analyzing">
              Running live Claude analysis on implemented agents… Timeline and Risk remain in Planned state.
            </p>
            <button
              type="button"
              className="btn-outline text-xs"
              onClick={() => setPage('blueprint')}
            >
              Skip preview & open Blueprint
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

