import { useState } from 'react';
import { Copy, Download, Eye, Sparkles, FileText, CheckCircle2 } from 'lucide-react';
import { useApp } from '../context';

const DOCS = [
  'Synopsis',
  'Abstract',
  'Problem Statement',
  'Objectives',
  'Literature Review',
  'System Architecture',
  'UML',
  'Flowchart',
  'Project Report',
  'PPT Content',
  'User Manual',
] as const;

export default function DocumentationPage() {
  const { selectedProject, toast } = useApp();
  const [active, setActive] = useState<(typeof DOCS)[number]>('Synopsis');
  const [preview, setPreview] = useState<string>(() => {
    const name = selectedProject?.name ?? 'AI-Guided Academic Project';
    return `PROJECT SYNOPSIS\n==============================\nTitle: ${name}\nDomain: ${selectedProject?.domain ?? 'Artificial Intelligence'}\nStudent: ${selectedProject?.student ?? 'Karanya'}\n\nPROJECT OVERVIEW:\n${selectedProject?.idea || selectedProject?.problemStatement || 'AI-Guided Academic Project'}\n\nSYSTEM ARCHITECTURE:\nThe platform deploys a Central AI Orchestrator (Main Agent) coordinating 5 specialized agents:\n1. Idea Evaluation Agent\n2. Scope Definition Agent\n3. Technology Recommendation Agent\n4. Timeline Planning Agent (Planned)\n5. Risk Assessment Agent (Planned)\n\nDELIVERABLES:\n- Project Blueprint & Requirements\n- 9-Stage Milestone Velocity Log\n- AI Mentor Assistant\n- Faculty Monitoring Dashboard`;
  });
  const p = selectedProject;

  const generate = (type: (typeof DOCS)[number]) => {
    const name = p?.name ?? 'Academic Project';
    const body: Record<(typeof DOCS)[number], string> = {
      Synopsis: `PROJECT SYNOPSIS\n==============================\nTitle: ${name}\nDomain: ${p?.domain ?? 'Artificial Intelligence'}\nStudent: ${p?.student ?? 'Student Team'}\n\nPROJECT OVERVIEW:\n${p?.idea}\n\nKEY GOALS:\n- Decompose project idea into structured academic blueprint.\n- Track 9-stage milestone velocity for mentor reviews.\n- Provide AI mentorship and role-based faculty oversight.`,
      Abstract: `ABSTRACT\n==============================\n${name} is an academic project tracking and planning platform powered by a central AI Orchestrator coordinating five specialized agents (Idea Evaluation, Scope Definition, Technology Recommendation, Timeline Planning, and Risk Assessment).\n\nThe platform converts raw project ideas into structured technical blueprints, provides context-aware AI mentorship, tracks project velocity across 9 academic stages, and offers a dedicated Faculty Monitoring Dashboard for mentor evaluation.`,
      'Problem Statement': `PROBLEM STATEMENT\n==============================\n${p?.problemStatement || 'Academic project teams face significant challenges in converting high-level project concepts into concrete technical scope items, maintaining weekly milestone velocity, and presenting transparent progress records to faculty mentors.'}`,
      Objectives: `PROJECT OBJECTIVES\n==============================\n1. Enable automated multi-agent AI project analysis.\n2. Decompose ideas into functional & non-functional requirements.\n3. Recommend optimal programming languages, frameworks, databases, and LLM models.\n4. Provide interactive progress tracking across 9 academic milestone stages.\n5. Supply an AI Mentor Assistant for context-aware project guidance.\n6. Offer a Faculty Dashboard for mentor monitoring and risk evaluation.`,
      'Literature Review': `LITERATURE REVIEW & RELATED WORK\n==============================\n1. Academic LMS Platforms: Traditional Learning Management Systems focus on assignment submission but lack intelligent project planning tools.\n2. Generic LLM Chatbots: General AI tools provide unstructured conversational output without enforcing software engineering constraints or milestone tracking.\n3. Platform Innovation: Unifies multi-agent orchestration, structured academic blueprints, milestone progress velocity tracking, and faculty mentorship in a single SaaS environment.`,
      'System Architecture': `SYSTEM ARCHITECTURE SPECIFICATION\n==============================\nFlowchart Topology:\nStudent Input → AI Orchestrator (Main Agent) → 5 Specialized Agents → Project Blueprint → Documentation → Progress Tracking → AI Mentorship → Faculty Dashboard\n\nComponent Layers:\n1. Frontend: React 19, TypeScript, Vite, Tailwind CSS\n2. AI Backend: Python 3.11, Anthropic Claude Sonnet 4.5 API\n3. Orchestrator: Multi-Agent task routing & prompt synthesis\n4. Database Layer: PostgreSQL / MongoDB (Planned Persistence)`,
      UML: `UML CLASS & COMPONENT DIAGRAM SPECIFICATION\n==============================\nClasses:\n+ Student (id, name, email, projectRef)\n+ FacultyMentor (id, name, department, assignedProjects)\n+ AcademicProject (id, name, domain, idea, progress, status)\n+ AIOrchestrator (id, status, agentQueue)\n+ SpecialistAgent (name, purpose, status, resultData)\n+ Milestone (id, stageName, status, lastUpdated)\n+ DocumentArtifact (type, textContent, createdAt)\n\nRelationships:\nStudent "1" -- "1..*" AcademicProject\nAcademicProject "1" -- "5" SpecialistAgent\nFacultyMentor "1" -- "*" AcademicProject`,
      Flowchart: `SYSTEM WORKFLOW FLOWCHART\n==============================\n[START] → Student submits project idea & domain\n   ↓\n[AI ORCHESTRATOR] → Validates input parameters\n   ↓\n┌──────────────────────────────────────────────┐\n│ → Idea Evaluation Agent (Claude 4.5)         │\n│ → Scope Definition Agent (Claude 4.5)        │\n│ → Technology Recommendation Agent (Claude)   │\n│ → Timeline Planning Agent (Planned)          │\n│ → Risk Assessment Agent (Planned)            │\n└──────────────────────────────────────────────┘\n   ↓\n[PROJECT BLUEPRINT] → Consolidates scope & stack\n   ↓\n[PROGRESS TRACKER] → Updates 9 academic stages\n   ↓\n[FACULTY DASHBOARD] → Faculty reviews team status\n[END]`,
      'Project Report': `ACADEMIC PROJECT REPORT OUTLINE\n==============================\n1. TITLE PAGE & DECLARATION\n2. ABSTRACT & SYNOPSIS\n3. INTRODUCTION & PROBLEM STATEMENT\n4. SYSTEM REQUIREMENT SPECIFICATION\n   4.1 Functional Requirements\n   4.2 Non-Functional Requirements\n5. SYSTEM DESIGN & AI ARCHITECTURE\n   5.1 Central Orchestrator & 5 Specialist Agents\n   5.2 Data Flow & Visual Topology\n6. IMPLEMENTATION DETAILS\n   6.1 React 19 Frontend SaaS Interface\n   6.2 Python + Claude Sonnet 4.5 Integration\n7. TESTING & PROGRESS EVALUATION\n8. CONCLUSION & FUTURE WORK`,
      'PPT Content': `SLIDE PRESENTATION CONTENT (6 SLIDES)\n==============================\nSLIDE 1: Title\nAI-Guided Academic Project Progress Tracking Platform with Planning & Mentorship Assistance\n\nSLIDE 2: Problem & Solution\nConverting student ideas into structured technical blueprints with real-time faculty visibility.\n\nSLIDE 3: AI Architecture\nCentral AI Orchestrator coordinating 5 specialist agents (Idea, Scope, Tech, Timeline, Risk).\n\nSLIDE 4: Platform Features\nProject Blueprint, 9-Stage Progress Tracker, AI Mentor Assistant, Documentation Generator.\n\nSLIDE 5: Faculty Monitoring\nReal-time dashboard for faculty to audit team velocity, risks, and milestone completion.\n\nSLIDE 6: Conclusion & Milestone Demo`,
      'User Manual': `USER & OPERATIONAL MANUAL\n==============================\nFOR STUDENTS:\n1. Click "New Project" in sidebar navigation.\n2. Fill project title, problem statement, idea text, and domain.\n3. Click "Generate Project Plan" to trigger AI Orchestrator.\n4. Inspect 5 agent cards and view the generated Project Blueprint.\n5. Update stage completion under "Progress Tracking".\n\nFOR FACULTY / MENTORS:\n1. Click "Faculty Dashboard" in sidebar navigation.\n2. Review summary statistics (Total, Active, Completed, Delayed).\n3. Click any student project row to open the complete inspection modal.`,
    };
    setActive(type);
    setPreview(body[type]);
    toast(`${type} generated successfully!`, 'success');
  };

  const copy = async () => {
    if (!preview) {
      toast('Generate or select a document first.', 'error');
      return;
    }
    await navigator.clipboard.writeText(preview);
    toast(`Copied ${active} content to clipboard!`, 'success');
  };

  const download = () => {
    if (!preview) {
      toast('Generate or select a document first.', 'error');
      return;
    }
    const blob = new Blob([preview], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${active.replace(/\s+/g, '-')}-AcademicArtifact.txt`;
    a.click();
    URL.revokeObjectURL(url);
    toast(`Downloaded ${active}.txt file`, 'success');
  };

  return (
    <div className="page-wrap space-y-6">
      {/* Top Banner */}
      <div>
        <p className="text-[10px] sm:text-[11px] uppercase tracking-wider text-indigo-600 font-extrabold mb-1">
          AI-Guided Academic Project Progress Tracking Platform with Planning &amp; Mentorship Assistance
        </p>
        <span className="badge-primary px-3 py-1 text-xs font-bold uppercase tracking-wider mb-2">
          Academic Artifacts Workspace
        </span>
        <h1 className="section-title">Documentation Workspace</h1>
        <p className="section-subtitle">
          Generate, preview, copy, and export 11 academic project artifacts formatted for reports, presentations, and mentor review.
        </p>
      </div>

      {/* 11 Document Selector Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
        {DOCS.map((d) => {
          const isSelected = active === d;
          return (
            <div
              key={d}
              className={`card p-4 flex flex-col justify-between transition-all ${
                isSelected ? 'ring-2 ring-indigo-600 border-indigo-200 bg-indigo-50/30' : 'hover:border-slate-300'
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <FileText size={16} className={isSelected ? 'text-indigo-600' : 'text-slate-500'} />
                    <h3 className="font-bold text-slate-900 text-sm">{d}</h3>
                  </div>
                  {isSelected && <CheckCircle2 size={16} className="text-indigo-600" />}
                </div>
                <p className="text-[11px] text-slate-500 mt-1">Academic document artifact</p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap gap-1.5">
                <button
                  type="button"
                  className="btn-primary py-1 px-2.5 text-[11px] font-bold"
                  onClick={() => generate(d)}
                >
                  <Sparkles size={12} /> Generate
                </button>
                <button
                  type="button"
                  className="btn-outline py-1 px-2.5 text-[11px]"
                  onClick={() => generate(d)}
                >
                  <Eye size={12} /> Preview
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Active Document Editor & Previewer */}
      <div className="card p-6 border-slate-200 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-600">Document Previewer</span>
            <h2 className="text-lg font-bold text-slate-900 mt-0.5">{active} Artifact</h2>
          </div>
          <div className="flex items-center gap-2">
            <button type="button" className="btn-outline text-xs" onClick={copy}>
              <Copy size={14} /> Copy Content
            </button>
            <button type="button" className="btn-primary text-xs" onClick={download}>
              <Download size={14} /> Download (.txt)
            </button>
          </div>
        </div>

        {preview ? (
          <div className="rounded-2xl bg-slate-900 text-slate-100 p-5 font-mono text-xs sm:text-sm overflow-x-auto leading-relaxed shadow-inner border border-slate-800 min-h-[300px]">
            <pre className="whitespace-pre-wrap font-mono">{preview}</pre>
          </div>
        ) : (
          <div className="text-center py-12 text-slate-500 text-sm">
            Select "Generate" or "Preview" on any document card above to view artifact contents.
          </div>
        )}
      </div>
    </div>
  );
}

