import { Bell, Menu, Search, User, LogOut, Settings } from 'lucide-react';
import { pageTitle, useApp } from '../context';

const NOTIFICATIONS = [
  { id: 1, text: 'Literature survey due for Academic Research Assistant', time: '2h ago' },
  { id: 2, text: 'Faculty comment on project progress', time: 'Yesterday' },
  { id: 3, text: 'Timeline agent is ready for integration', time: '2d ago' },
];

export default function Header() {
  const {
    page,
    setPage,
    setSidebarOpen,
    searchQuery,
    setSearchQuery,
    userName,
    role,
    userEmail,
    notifyOpen,
    setNotifyOpen,
    profileOpen,
    setProfileOpen,
    logout,
    toast,
  } = useApp();

  return (
    <header className="bg-white/90 backdrop-blur border-b border-slate-200 sticky top-0 z-30">
      <div className="px-4 sm:px-6 lg:px-8 py-3 flex items-center gap-3">
        <button
          type="button"
          className="lg:hidden btn-ghost p-2"
          onClick={() => setSidebarOpen(true)}
          aria-label="Open navigation"
        >
          <Menu size={20} />
        </button>

        <div className="min-w-0 flex-1">
          <p className="text-[10px] sm:text-[11px] uppercase tracking-wider text-indigo-600 font-extrabold truncate" title="AI-Guided Academic Project Progress Tracking Platform with Planning & Mentorship Assistance">
            AI-Guided Academic Project Progress Tracking Platform with Planning &amp; Mentorship Assistance
          </p>
          <h1 className="text-sm sm:text-base font-bold text-slate-900 truncate">{pageTitle(page)}</h1>
        </div>

        <form
          className="hidden md:flex flex-1 max-w-md"
          onSubmit={(e) => {
            e.preventDefault();
            setPage('my-projects');
            toast(`Showing results for “${searchQuery || 'all projects'}”`);
          }}
        >
          <label className="relative w-full">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search projects..."
              className="input-field pl-9"
            />
          </label>
        </form>

        <div className="relative">
          <button
            type="button"
            className="btn-ghost p-2 relative"
            onClick={() => {
              setNotifyOpen(!notifyOpen);
              setProfileOpen(false);
            }}
            aria-label="Notifications"
          >
            <Bell size={18} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full" />
          </button>
          {notifyOpen && (
            <div className="absolute right-0 mt-2 w-80 card p-2 shadow-xl">
              <p className="px-3 py-2 text-xs font-semibold text-slate-500">Notifications</p>
              {NOTIFICATIONS.map((n) => (
                <button
                  key={n.id}
                  type="button"
                  className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-50"
                  onClick={() => {
                    setNotifyOpen(false);
                    setPage('progress');
                    toast('Opened related progress view');
                  }}
                >
                  <p className="text-sm text-slate-800">{n.text}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{n.time}</p>
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="relative">
          <button
            type="button"
            className="flex items-center gap-2 pl-2 sm:pl-3 border-l border-slate-200"
            onClick={() => {
              setProfileOpen(!profileOpen);
              setNotifyOpen(false);
            }}
          >
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 text-white flex items-center justify-center">
              <User size={16} />
            </div>
            <div className="hidden sm:block text-left">
              <p className="text-sm font-semibold text-slate-900 leading-tight">{userName}</p>
              <p className="text-[11px] text-slate-500 capitalize">{role === 'faculty' ? 'Faculty Member' : role === 'mentor' ? 'Academic Mentor' : 'Student User'}</p>
            </div>
          </button>
          {profileOpen && (
            <div className="absolute right-0 mt-2 w-56 card p-2 shadow-xl space-y-1">
              <div className="px-3 py-2 border-b border-slate-100">
                <p className="text-xs font-bold text-slate-900 truncate">{userName}</p>
                <p className="text-[11px] text-slate-500 truncate">{userEmail}</p>
              </div>
              <button
                type="button"
                className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-50 text-xs font-semibold text-slate-700 flex items-center gap-2"
                onClick={() => {
                  setProfileOpen(false);
                  setPage('settings');
                }}
              >
                <Settings size={14} /> Profile & Settings
              </button>
              <button
                type="button"
                className="w-full text-left px-3 py-2 rounded-lg hover:bg-rose-50 text-xs font-bold text-rose-600 flex items-center gap-2"
                onClick={() => {
                  setProfileOpen(false);
                  logout();
                }}
              >
                <LogOut size={14} /> Sign Out (Logout)
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

