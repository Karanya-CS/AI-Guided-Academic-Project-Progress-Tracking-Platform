import {
  BookOpen,
  ClipboardList,
  FolderKanban,
  GraduationCap,
  LayoutDashboard,
  LineChart,
  LogOut,
  MessageSquare,
  Plus,
  Settings,
  Sparkles,
  X,
} from 'lucide-react';
import { pageTitle, useApp } from '../context';
import type { PageId } from '../types';

const items: { id: PageId; label: string; icon: typeof LayoutDashboard; roleTarget?: 'student' | 'faculty'; tag?: string }[] = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, roleTarget: 'student' },
  { id: 'create-project', label: 'New Project', icon: Plus, roleTarget: 'student' },
  { id: 'my-projects', label: 'My Projects', icon: FolderKanban },
  { id: 'ai-agents', label: 'AI Agents', icon: Sparkles },
  { id: 'blueprint', label: 'Project Blueprint', icon: ClipboardList },
  { id: 'progress', label: 'Progress Tracking', icon: LineChart },
  { id: 'documentation', label: 'Documentation', icon: BookOpen },
  { id: 'mentorship', label: 'AI Mentorship', icon: MessageSquare },
  { id: 'faculty', label: 'Faculty Dashboard', icon: GraduationCap, roleTarget: 'faculty' },
];

export default function Sidebar() {
  const { page, setPage, sidebarOpen, setSidebarOpen, role, logout } = useApp();

  const nav = (
    <>
      <div className="px-5 py-5 border-b border-white/10">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-white/15 text-indigo-100">
                {role === 'student' ? 'Student' : role === 'faculty' ? 'Faculty' : 'Mentor'}
              </span>
            </div>
            <h2 className="text-xs font-black tracking-tight leading-snug text-white">
              AI-Guided Academic Project Progress Tracking Platform
            </h2>
            <p className="text-[10px] text-indigo-200 font-medium">
              with Planning &amp; Mentorship Assistance
            </p>
          </div>
          <button type="button" className="lg:hidden text-white/80" onClick={() => setSidebarOpen(false)} aria-label="Close menu">
            <X size={20} />
          </button>
        </div>
      </div>
      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
        {items.map((item) => {
          const Icon = item.icon;
          const active = page === item.id || (item.id === 'ai-agents' && page === 'ai-analysis');
          const isRoleMatch = item.roleTarget === role || (item.roleTarget === 'faculty' && role === 'mentor');
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setPage(item.id)}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm text-left transition-all ${
                active ? 'bg-white text-indigo-700 font-semibold shadow-sm' : 'text-indigo-100 hover:bg-white/10'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon size={18} />
                <span>{item.label}</span>
              </div>
              <div className="flex items-center gap-1.5">
                {item.tag && (
                  <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider ${
                    active ? 'bg-indigo-100 text-indigo-700' : 'bg-amber-400/20 text-amber-200 border border-amber-400/30'
                  }`}>
                    {item.tag}
                  </span>
                )}
                {isRoleMatch && !active && (
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" title="Primary for your role" />
                )}
              </div>
            </button>
          );
        })}
      </nav>
      <div className="p-3 border-t border-white/10 space-y-1">
        <button
          type="button"
          onClick={() => setPage('settings')}
          className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm ${
            page === 'settings' ? 'bg-white text-indigo-700 font-semibold' : 'text-indigo-100 hover:bg-white/10'
          }`}
        >
          <Settings size={18} />
          Settings
        </button>
        <button
          type="button"
          onClick={logout}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm text-rose-200 hover:bg-rose-500/20 hover:text-white transition-all font-semibold"
        >
          <LogOut size={18} />
          Sign Out
        </button>
      </div>
    </>
  );

  return (
    <>
      {sidebarOpen && (
        <button
          type="button"
          className="fixed inset-0 z-40 bg-slate-900/40 lg:hidden"
          aria-label="Close sidebar"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      <aside
        className={`fixed lg:static z-50 inset-y-0 left-0 w-72 bg-gradient-to-b from-indigo-700 via-indigo-700 to-violet-800 text-white flex flex-col shadow-xl transform transition-transform duration-200 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
        aria-label="Primary"
      >
        {nav}
      </aside>
      <span className="sr-only">{pageTitle(page)}</span>
    </>
  );
}
