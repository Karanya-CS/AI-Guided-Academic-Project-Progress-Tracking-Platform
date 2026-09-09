import { useState, type FormEvent } from 'react';
import { User, Mail, Lock, Building, GraduationCap, Eye, EyeOff, Loader2, CheckCircle2, ArrowRight } from 'lucide-react';
import { useApp } from '../context';
import type { Role } from '../types';

export default function SignUpPage() {
  const { signup, setPage } = useApp();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState<Role>('student');
  const [department, setDepartment] = useState('');

  // Password visibility state
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  // Loading & error states
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const validateEmail = (val: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError('');

    if (!fullName.trim()) {
      setError('Please enter your full name.');
      return;
    }
    if (!email.trim() || !validateEmail(email.trim())) {
      setError('Please enter a valid email address.');
      return;
    }
    if (!department.trim()) {
      setError('Please enter your department or institution.');
      return;
    }
    if (!password) {
      setError('Please enter a password.');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match. Please verify your entries.');
      return;
    }

    setIsLoading(true);
    // Simulate brief loading transition
    window.setTimeout(() => {
      setIsLoading(false);
      signup(fullName.trim(), email.trim(), role, department.trim());
    }, 400);
  };

  return (
    <div className="min-h-screen w-full bg-slate-50 flex items-center justify-center p-4 sm:p-6 lg:p-8 font-sans selection:bg-indigo-500 selection:text-white">
      <div className="max-w-4xl w-full mx-auto grid lg:grid-cols-12 bg-white rounded-3xl shadow-xl border border-slate-200/80 overflow-hidden min-h-[600px]">
        {/* LEFT SIDE: Minimal Professional Branding Area (5 cols) */}
        <div className="lg:col-span-5 bg-gradient-to-br from-indigo-900 via-indigo-800 to-slate-900 text-white p-8 sm:p-10 flex flex-col justify-between relative overflow-hidden">
          {/* Subtle Background Geometric Glow */}
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

        {/* RIGHT SIDE: Clean Registration Card (7 cols) */}
        <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-center bg-white">
          <div className="max-w-md w-full mx-auto space-y-6">
            {/* Header Title */}
            <div>
              <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">Create Your Account</h2>
              <p className="text-xs text-slate-500 font-medium mt-1">
                Get started with your academic project workspace.
              </p>
            </div>

            {/* Error Feedback Message */}
            {error && (
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold animate-shake">
                {error}
              </div>
            )}

            {/* Registration Form */}
            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              {/* Full Name */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Full Name <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="input-field pl-10 text-xs py-2.5"
                    placeholder="e.g. Karanya"
                  />
                </div>
              </div>

              {/* Email Address */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Email Address <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="input-field pl-10 text-xs py-2.5"
                    placeholder="e.g. karanya104@gmail.com"
                  />
                </div>
              </div>

              {/* Role Selection */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Role: Student / Faculty / Mentor <span className="text-rose-500">*</span>
                </label>
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

              {/* Department / Institution */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Department / Institution <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <Building size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    required
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    className="input-field pl-10 text-xs py-2.5"
                    placeholder="e.g. Computer Science & Engineering"
                  />
                </div>
              </div>

              {/* Passwords (2 cols) */}
              <div className="grid sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Password <span className="text-rose-500">*</span>
                  </label>
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

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Confirm Password <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="input-field pl-10 pr-9 text-xs py-2.5"
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                      tabIndex={-1}
                    >
                      {showConfirmPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                    </button>
                  </div>
                </div>
              </div>

              {/* Primary Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="btn-primary w-full py-3 text-xs font-bold shadow-sm flex items-center justify-center gap-2 mt-2"
              >
                {isLoading ? (
                  <>
                    <Loader2 size={16} className="animate-spin" /> Creating Account...
                  </>
                ) : (
                  <>
                    Create Account <ArrowRight size={14} />
                  </>
                )}
              </button>
            </form>

            {/* Below Button Link */}
            <div className="pt-2 text-center text-xs text-slate-500 font-medium border-t border-slate-100">
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => setPage('login')}
                className="font-bold text-indigo-700 hover:underline ml-1"
              >
                Sign In
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
