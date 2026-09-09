import { useState, type FormEvent } from 'react';
import { User, Mail, Lock, GraduationCap, Eye, EyeOff, Loader2, CheckCircle2, ArrowRight } from 'lucide-react';
import { useApp } from '../context';
import type { Role } from '../types';

export default function LoginPage() {
  const { login, setPage, toast } = useApp();
  const [email, setEmail] = useState('karanya104@gmail.com');
  const [password, setPassword] = useState('password123');
  const [role, setRole] = useState<Role>('student');

  // Password visibility state
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const validateEmail = (val: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email.trim() || !validateEmail(email.trim())) {
      setError('Please enter a valid email address.');
      return;
    }
    if (!password) {
      setError('Please enter your password.');
      return;
    }

    setIsLoading(true);
    window.setTimeout(() => {
      setIsLoading(false);
      const demoName = role === 'faculty' ? 'Dr. Rajesh Kumar' : role === 'mentor' ? 'Prof. Priya Sharma' : 'Karanya';
      const demoDept = role === 'student' ? 'Computer Science & Engineering' : 'Department of Computer Science';
      login(email.trim(), role, demoName, demoDept);
    }, 400);
  };

  const handleGuestAccess = () => {
    const demoName = role === 'faculty' ? 'Guest Faculty' : role === 'mentor' ? 'Guest Mentor' : 'Karanya';
    const demoEmail = role === 'faculty' ? 'faculty.guest@university.edu' : role === 'mentor' ? 'mentor.guest@university.edu' : 'karanya104@gmail.com';
    login(demoEmail, role, demoName, 'Academic Department');
  };

  return (
    <div className="min-h-screen w-full bg-slate-50 flex items-center justify-center p-4 sm:p-6 lg:p-8 font-sans selection:bg-indigo-500 selection:text-white">
      <div className="max-w-4xl w-full mx-auto grid lg:grid-cols-12 bg-white rounded-3xl shadow-xl border border-slate-200/80 overflow-hidden min-h-[560px]">
        {/* LEFT SIDE: Minimal Professional Branding Area (5 cols) */}
        <div className="lg:col-span-5 bg-gradient-to-br from-indigo-900 via-indigo-800 to-slate-900 text-white p-8 sm:p-10 flex flex-col justify-between relative overflow-hidden">
          {/* Background Ambient Glow */}
          <div className="absolute -right-16 -bottom-16 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -left-16 -top-16 w-64 h-64 bg-violet-500/20 rounded-full blur-3xl pointer-events-none" />

          {/* Top Logo Mark */}
          <div className="relative z-10 flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/10 backdrop-blur border border-white/20 text-white flex items-center justify-center font-bold text-lg shadow-inner">
              <GraduationCap size={22} className="text-indigo-300" />
            </div>
            <span className="text-sm font-extrabold tracking-wider uppercase text-indigo-200">
              Academic Platform
            </span>
          </div>

          {/* Main Welcome Heading */}
          <div className="relative z-10 my-auto py-8 space-y-4">
            <h1 className="text-xl sm:text-2xl font-black leading-tight tracking-tight text-white">
              AI-Guided Academic Project Progress Tracking Platform with Planning &amp; Mentorship Assistance
            </h1>
            <p className="text-xs sm:text-sm text-indigo-100/90 leading-relaxed font-normal">
              Plan, track and manage your academic projects with intelligent guidance.
            </p>
            <div className="pt-4 space-y-2">
              <div className="flex items-center gap-2.5 text-xs text-indigo-200">
                <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
                <span>Structured Project Blueprint &amp; Requirements</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-indigo-200">
                <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
                <span>Real-Time Academic Milestone Tracking</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-indigo-200">
                <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
                <span>Dual-Role Student &amp; Faculty/Mentor Workspace</span>
              </div>
            </div>
          </div>

          {/* Footer Copy */}
          <div className="relative z-10 text-[11px] text-indigo-300/70">
            &copy; AI-Guided Academic Project Progress Tracking Platform with Planning &amp; Mentorship Assistance
          </div>
        </div>

        {/* RIGHT SIDE: Clean Sign In Card (7 cols) */}
        <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-center bg-white">
          <div className="max-w-md w-full mx-auto space-y-6">
            {/* Header Title */}
            <div>
              <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">Welcome Back</h2>
              <p className="text-xs text-slate-500 font-medium mt-1">
                Sign in to continue to your academic project workspace.
              </p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold">
                {error}
              </div>
            )}

            {/* Role Selection */}
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-700">Select Role: Student / Faculty / Mentor</label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setRole('student')}
                  className={`flex items-center justify-center gap-1.5 p-2.5 rounded-xl border text-xs font-bold transition-all ${
                    role === 'student'
                      ? 'border-indigo-600 bg-indigo-50 text-indigo-800 shadow-xs'
                      : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <User size={14} /> Student
                </button>
                <button
                  type="button"
                  onClick={() => setRole('faculty')}
                  className={`flex items-center justify-center gap-1.5 p-2.5 rounded-xl border text-xs font-bold transition-all ${
                    role === 'faculty'
                      ? 'border-indigo-600 bg-indigo-50 text-indigo-800 shadow-xs'
                      : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <GraduationCap size={14} /> Faculty
                </button>
                <button
                  type="button"
                  onClick={() => setRole('mentor')}
                  className={`flex items-center justify-center gap-1.5 p-2.5 rounded-xl border text-xs font-bold transition-all ${
                    role === 'mentor'
                      ? 'border-indigo-600 bg-indigo-50 text-indigo-800 shadow-xs'
                      : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <GraduationCap size={14} /> Mentor
                </button>
              </div>
            </div>

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address</label>
                <div className="relative">
                  <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="input-field pl-10 text-xs py-2.5"
                    placeholder="e.g. john.doe@university.edu"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-semibold text-slate-700">Password</label>
                  <button
                    type="button"
                    onClick={() => toast('Password reset link sent to your email.', 'info')}
                    className="text-[11px] font-semibold text-indigo-600 hover:underline"
                  >
                    Forgot Password?
                  </button>
                </div>
                <div className="relative">
                  <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="input-field pl-10 pr-9 text-xs py-2.5"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    tabIndex={-1}
                  >
                    {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="btn-primary w-full py-3 text-xs font-bold shadow-sm flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <Loader2 size={16} className="animate-spin" /> Signing In...
                  </>
                ) : (
                  <>
                    Sign In <ArrowRight size={14} />
                  </>
                )}
              </button>
            </form>

            {/* Single Guest Access Bar */}
            <div className="pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={handleGuestAccess}
                className="btn-outline w-full py-2.5 px-3 text-xs justify-center font-semibold hover:border-indigo-300 hover:bg-indigo-50/50 flex items-center gap-2"
              >
                <User size={14} className="text-indigo-600" /> Continue as Guest
              </button>
            </div>

            {/* Below Button Link */}
            <div className="pt-2 text-center text-xs text-slate-500 font-medium">
              Don't have an account?{' '}
              <button
                type="button"
                onClick={() => setPage('signup')}
                className="font-bold text-indigo-700 hover:underline ml-1"
              >
                Create Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
