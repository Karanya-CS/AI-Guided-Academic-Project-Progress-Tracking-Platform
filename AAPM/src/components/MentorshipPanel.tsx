import { useState } from 'react';
import { Bot, Send, User } from 'lucide-react';
import { useApp } from '../context';

const SUGGESTIONS = [
  'What should I do next?',
  'Am I on schedule?',
  'Which technology should I use?',
  'How can I reduce my project risk?',
];

export default function MentorshipPanel({ full }: { full?: boolean }) {
  const { selectedProject, toast } = useApp();
  const [question, setQuestion] = useState('');
  const [messages, setMessages] = useState<{ role: 'mentor' | 'user'; text: string; timestamp: string }[]>([
    {
      role: 'mentor',
      text: `Hello! I am your AI Academic Project Mentor. I am currently monitoring "${selectedProject?.name || 'your project'}".`,
      timestamp: 'Just now',
    },
    {
      role: 'mentor',
      text: `Current Milestone: "${selectedProject?.currentMilestone || 'Problem Identification'}" (${selectedProject?.progress || 0}% overall progress). Status: ${selectedProject?.status || 'ON TRACK'}. How can I assist your project team today?`,
      timestamp: 'Just now',
    },
  ]);

  const replyFor = (q: string) => {
    const p = selectedProject;
    const lower = q.toLowerCase();
    if (lower.includes('next')) {
      return `Academic Mentor Guidance for "${p?.name}":\n\nYour current focus stage is "${p?.currentMilestone}".\n1. Finalize deliverable artifacts for this milestone.\n2. Update the status in Progress Tracking to notify your faculty mentor.\n3. Do not start new scope items until this stage is marked complete.`;
    }
    if (lower.includes('schedule')) {
      return `Schedule Evaluation for "${p?.name}":\n\nYour project is currently ${p?.status} at ${p?.progress}% completion.\n${
        p?.status === 'ON TRACK'
          ? 'You are maintaining solid velocity. Ensure your Literature Survey and Architecture documents are updated on time.'
          : 'Your project velocity is lagging behind schedule. Focus on completing pending tasks for the current milestone before adding new feature requests.'
      }`;
    }
    if (lower.includes('technology')) {
      return `Technology Recommendations for "${p?.name}" (${p?.domain}):\n\n- Primary Language: Python 3.11+\n- AI Model: Anthropic Claude Sonnet 4.5 for orchestrated reasoning\n- Frontend: React + Vite + Tailwind CSS\n- Backend: FastAPI for agent endpoint orchestration\n- Persistence: PostgreSQL / MongoDB for project records`;
    }
    if (lower.includes('risk')) {
      return `Risk Mitigation Strategy for "${p?.name}":\n\n1. API Quotas: Implement fallback cached agent data for faculty demonstrations.\n2. Scope Creep: Strictly align deliverables with the Scope Definition Agent blueprint.\n3. Mentor Visibility: Share weekly progress logs through the Faculty Dashboard.`;
    }
    return `Academic Mentor Advice for "${q}":\n\nFollow the structured academic workflow: Project Idea → AI Orchestrator → 5 Specialized Agents → Blueprint → Progress Tracking → Faculty Evaluation. Feel free to ask about your technology stack, risks, or upcoming milestones.`;
  };

  const send = (text: string) => {
    const q = text.trim();
    if (!q) {
      toast('Please enter a question for your AI Mentor.', 'error');
      return;
    }
    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setMessages((m) => [...m, { role: 'user', text: q, timestamp: now }]);
    setQuestion('');
    window.setTimeout(() => {
      setMessages((m) => [...m, { role: 'mentor', text: replyFor(q), timestamp: now }]);
    }, 400);
  };

  return (
    <div className={`card p-6 flex flex-col shadow-sm border-slate-200 ${full ? 'min-h-[560px]' : ''}`}>
      <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center">
            <Bot size={18} />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 text-sm">AI Project Mentor</h3>
            <p className="text-[11px] text-slate-500">Context-Aware Academic Guidance (Not a generic chatbot)</p>
          </div>
        </div>
        <span className="badge-primary text-[10px]">Academic Assistant</span>
      </div>

      <div className="space-y-1.5 mb-4">
        <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Suggested Questions</p>
        <div className="flex flex-wrap gap-1.5">
          {SUGGESTIONS.map((s) => (
            <button
              key={s}
              type="button"
              className="text-xs px-3 py-1.5 rounded-xl border border-indigo-100 bg-indigo-50/60 text-indigo-800 font-semibold hover:bg-indigo-100 transition-all text-left"
              onClick={() => send(s)}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 space-y-3 overflow-y-auto max-h-80 mb-4 pr-1">
        {messages.map((msg, idx) => (
          <div
            key={`${idx}-${msg.text.slice(0, 15)}`}
            className={`flex gap-2.5 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {msg.role === 'mentor' && (
              <div className="w-7 h-7 rounded-lg bg-indigo-600 text-white flex items-center justify-center shrink-0 mt-0.5">
                <Bot size={14} />
              </div>
            )}
            <div
              className={`max-w-[85%] rounded-2xl p-3.5 text-xs leading-relaxed ${
                msg.role === 'mentor'
                  ? 'bg-indigo-50/80 text-indigo-950 border border-indigo-100 rounded-tl-none whitespace-pre-wrap font-medium'
                  : 'bg-indigo-600 text-white rounded-tr-none shadow-sm font-medium'
              }`}
            >
              {msg.text}
              <div
                className={`text-[9px] mt-1.5 ${
                  msg.role === 'mentor' ? 'text-indigo-400' : 'text-indigo-200'
                }`}
              >
                {msg.timestamp}
              </div>
            </div>
            {msg.role === 'user' && (
              <div className="w-7 h-7 rounded-lg bg-slate-200 text-slate-700 flex items-center justify-center shrink-0 mt-0.5">
                <User size={14} />
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="space-y-2 pt-2 border-t border-slate-100">
        <textarea
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Ask your academic mentor about milestones, stack, or risk mitigations..."
          className="input-field resize-none text-xs"
          rows={2}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              send(question);
            }
          }}
        />
        <button type="button" className="btn-primary w-full text-xs" onClick={() => send(question)}>
          <Send size={14} /> Ask AI Project Mentor
        </button>
      </div>
    </div>
  );
}

