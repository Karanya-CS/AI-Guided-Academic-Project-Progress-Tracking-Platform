import { LogOut, User, Mail, GraduationCap, Building } from 'lucide-react';
import { useApp } from '../context';

export default function SettingsPage() {
  const { role, setRole, userName, setUserName, userEmail, userDepartment, logout, toast, setPage } = useApp();

  return (
    <div className="page-wrap max-w-xl space-y-6">
      <div>
        <p className="text-[10px] sm:text-[11px] uppercase tracking-wider text-indigo-600 font-extrabold mb-1">
          AI-Guided Academic Project Progress Tracking Platform with Planning &amp; Mentorship Assistance
        </p>
        <span className="badge-primary px-3 py-1 text-xs font-bold uppercase tracking-wider mb-2">
          Account Profile &amp; System Settings
        </span>
        <h1 className="section-title">Settings</h1>
        <p className="section-subtitle">Manage profile information, active role, and system settings for this session.</p>
      </div>

      <div className="card p-6 space-y-5 border-slate-200 shadow-sm">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
            Display Name
          </label>
          <div className="relative">
            <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input className="input-field pl-10 text-xs" value={userName} onChange={(e) => setUserName(e.target.value)} />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
            Email Address
          </label>
          <div className="relative">
            <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input className="input-field pl-10 text-xs bg-slate-50" value={userEmail} disabled />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
            Department / Institution
          </label>
          <div className="relative">
            <Building size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input className="input-field pl-10 text-xs bg-slate-50" value={userDepartment} disabled />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
            Active Navigation Role
          </label>
          <div className="grid grid-cols-3 gap-2">
            {(['student', 'faculty', 'mentor'] as const).map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => {
                  setRole(r);
                  const label = r === 'faculty' ? 'Faculty' : r === 'mentor' ? 'Mentor' : 'Student';
                  toast(`Switched to ${label} role view`, 'success');
                  if (r === 'faculty' || r === 'mentor') setPage('faculty');
                  else setPage('dashboard');
                }}
                className={`flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl text-xs font-bold border transition-all ${
                  role === r
                    ? 'border-indigo-600 bg-indigo-50 text-indigo-800 shadow-sm'
                    : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                }`}
              >
                {r === 'student' ? <User size={14} /> : <GraduationCap size={14} />}
                {r === 'faculty' ? 'Faculty' : r === 'mentor' ? 'Mentor' : 'Student'}
              </button>
            ))}
          </div>
        </div>

        <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            type="button"
            className="btn-primary text-xs w-full sm:w-auto"
            onClick={() => toast('Settings saved for this browser session.', 'success')}
          >
            Save Settings
          </button>

          <button
            type="button"
            className="btn-outline text-xs text-rose-600 border-rose-200 hover:bg-rose-50 w-full sm:w-auto"
            onClick={logout}
          >
            <LogOut size={14} /> Sign Out (Logout)
          </button>
        </div>
      </div>
    </div>
  );
}

