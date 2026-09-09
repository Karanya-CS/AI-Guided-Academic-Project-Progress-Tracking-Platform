import { ArrowDown, Brain, Sparkles, User, LayoutList, BookOpen, MessageSquare, GraduationCap } from 'lucide-react';
import AgentCard, { AGENTS } from '../components/AgentCard';
import { useApp } from '../context';

export default function AIAgents() {
  const { setPage } = useApp();
  return (
    <div className="page-wrap space-y-8">
      {/* Header */}
      <div>
        <p className="text-[10px] sm:text-[11px] uppercase tracking-wider text-indigo-600 font-extrabold mb-1">
          AI-Guided Academic Project Progress Tracking Platform with Planning &amp; Mentorship Assistance
        </p>
        <span className="badge-primary px-3 py-1 text-xs font-bold uppercase tracking-wider mb-2">
          System AI Architecture Topology
        </span>
        <h1 className="section-title">AI Agents &amp; Orchestration Architecture</h1>
        <p className="section-subtitle">
          Central Main Agent (AI Orchestrator) coordinating five specialized agents: Idea Evaluation, Scope Definition, Technology Recommendation, Timeline Planning, and Risk Assessment. Each specialized agent focuses on a specific project-planning task, making the overall workflow more organized and modular.
        </p>
      </div>

      {/* Full Architecture Workflow Diagram Card */}
      <div className="card p-6 sm:p-8 bg-gradient-to-br from-indigo-50/60 via-white to-violet-50/60 border-indigo-100 shadow-sm space-y-6">
        <div className="flex items-center justify-between border-b border-slate-200/80 pb-4">
          <div>
            <h2 className="text-base font-bold text-slate-900">End-to-End Platform Flow Topology</h2>
            <p className="text-xs text-slate-500 mt-0.5">Visual representation of data routing from student idea input to faculty project monitoring.</p>
          </div>
          <span className="badge-success text-xs">Anthropic Claude Sonnet 4.5 Orchestration</span>
        </div>

        {/* Visual Node Diagram */}
        <div className="py-4 space-y-6">
          {/* Step 1: Input */}
          <div className="flex justify-center">
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl bg-white border border-slate-200 shadow-sm">
              <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center font-bold">
                <User size={18} />
              </div>
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Step 1: Input</p>
                <p className="text-sm font-bold text-slate-900">Student Enters Project Idea</p>
              </div>
            </div>
          </div>

          <div className="flex justify-center text-indigo-400">
            <ArrowDown size={22} className="animate-bounce" />
          </div>

          {/* Step 2: Main Agent */}
          <div className="flex justify-center">
            <div className="relative rounded-3xl bg-gradient-to-br from-indigo-700 via-indigo-800 to-violet-900 text-white px-8 py-6 text-center shadow-lg max-w-sm w-full border border-indigo-400/40 orchestrator-glow">
              <div className="mx-auto mb-2.5 w-14 h-14 rounded-2xl bg-white/15 backdrop-blur-md flex items-center justify-center border border-white/20">
                <Brain size={28} className="text-indigo-100" />
              </div>
              <p className="text-[11px] font-bold tracking-[0.25em] text-indigo-200 uppercase">AI ORCHESTRATOR</p>
              <h3 className="text-lg font-black tracking-tight mt-0.5">CENTRAL / MAIN AGENT</h3>
              <p className="text-indigo-100 text-xs mt-1.5">Coordinates 5 specialized agents & aggregates results</p>
            </div>
          </div>

          <div className="flex flex-col items-center text-indigo-400">
            <div className="h-6 w-0.5 bg-gradient-to-b from-indigo-600 to-indigo-300" />
            <div className="w-full max-w-4xl h-0.5 bg-indigo-200 hidden sm:block" />
            <ArrowDown size={20} className="mt-1 text-indigo-500" />
          </div>

          {/* Step 3: 5 Specialist Agents */}
          <div>
            <div className="text-center mb-3">
              <p className="text-xs font-bold uppercase tracking-wider text-indigo-700">Step 3: Five Specialized AI Agents</p>
            </div>
            <div className="grid sm:grid-cols-2 xl:grid-cols-5 gap-3">
              {AGENTS.map((agent) => (
                <div key={agent.id} className="relative">
                  <AgentCard agent={agent} status={agent.backend === 'implemented' ? 'COMPLETED' : 'PLANNED'} />
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center text-indigo-400 pt-2">
            <ArrowDown size={22} className="text-indigo-500" />
          </div>

          {/* Step 4: Downstream Outputs */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-center">
            {[
              { title: 'Project Blueprint', icon: LayoutList, page: 'blueprint' as const },
              { title: 'Documentation', icon: BookOpen, page: 'documentation' as const },
              { title: 'Progress Tracking', icon: Sparkles, page: 'progress' as const },
              { title: 'AI Mentorship', icon: MessageSquare, page: 'mentorship' as const },
              { title: 'Faculty Monitoring', icon: GraduationCap, page: 'faculty' as const },
            ].map((node) => {
              const Icon = node.icon;
              return (
                <button
                  key={node.title}
                  type="button"
                  onClick={() => setPage(node.page)}
                  className="card p-3 hover:border-indigo-300 hover:shadow-md transition-all text-left flex flex-col justify-between"
                >
                  <div className="w-7 h-7 rounded-lg bg-indigo-50 text-indigo-700 flex items-center justify-center mb-2">
                    <Icon size={14} />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-bold text-slate-400">Output Stage</p>
                    <p className="text-xs font-bold text-slate-800 leading-tight mt-0.5">{node.title}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Action button */}
        <div className="pt-4 border-t border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-500">
            Backend Python dataclass & `ask_ai()` setup integrated. Idea, Scope & Tech implemented via Claude 4.5.
          </p>
          <button type="button" className="btn-primary shrink-0" onClick={() => setPage('create-project')}>
            <Sparkles size={16} /> Run Analysis on New Project
          </button>
        </div>
      </div>
    </div>
  );
}

