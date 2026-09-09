import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';
import { DEMO_PROJECTS } from './data/demo';
import type {
  CreateProjectForm,
  PageId,
  Project,
  Role,
  ToastItem,
} from './types';

interface AppState {
  page: PageId;
  setPage: (page: PageId) => void;
  role: Role;
  setRole: (role: Role) => void;
  userName: string;
  setUserName: (name: string) => void;
  userEmail: string;
  userDepartment: string;
  isAuthenticated: boolean;
  login: (email: string, role: Role, name?: string, dept?: string) => void;
  signup: (name: string, email: string, role: Role, dept?: string) => void;
  logout: () => void;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  projects: Project[];
  selectedProjectId: string | null;
  setSelectedProjectId: (id: string | null) => void;
  selectedProject: Project | undefined;
  addProject: (form: CreateProjectForm) => Project;
  updateProject: (id: string, patch: Partial<Project>) => void;
  toasts: ToastItem[];
  toast: (message: string, type?: ToastItem['type']) => void;
  dismissToast: (id: string) => void;
  notifyOpen: boolean;
  setNotifyOpen: (open: boolean) => void;
  profileOpen: boolean;
  setProfileOpen: (open: boolean) => void;
}

const AppContext = createContext<AppState | null>(null);

const PAGE_TITLES: Record<PageId, string> = {
  login: 'Sign In',
  signup: 'Create Account',
  dashboard: 'Dashboard',
  'create-project': 'New Project',
  'my-projects': 'My Projects',
  'ai-agents': 'AI Agents',
  'ai-analysis': 'AI Project Analysis',
  blueprint: 'Project Blueprint',
  progress: 'Progress Tracking',
  documentation: 'Documentation',
  mentorship: 'AI Mentorship',
  faculty: 'Faculty Dashboard',
  settings: 'Settings',
};

export function pageTitle(page: PageId) {
  return PAGE_TITLES[page] || 'Dashboard';
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [page, setPageState] = useState<PageId>('login');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState<Role>('student');
  const [userName, setUserName] = useState('Karanya');
  const [userEmail, setUserEmail] = useState('karanya104@gmail.com');
  const [userDepartment, setUserDepartment] = useState('Computer Science & Engineering');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [projects, setProjects] = useState<Project[]>(DEMO_PROJECTS);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>('p1');
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const [notifyOpen, setNotifyOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const setPage = useCallback((next: PageId) => {
    setPageState(next);
    setSidebarOpen(false);
    setNotifyOpen(false);
    setProfileOpen(false);
  }, []);

  const toast = useCallback((message: string, type: ToastItem['type'] = 'info') => {
    const id = crypto.randomUUID();
    setToasts((prev) => [...prev, { id, message, type }]);
    window.setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3200);
  }, []);

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const login = useCallback(
    (email: string, selectedRole: Role, name?: string, dept?: string) => {
      setIsAuthenticated(true);
      setUserEmail(email);
      setRole(selectedRole);
      if (name) setUserName(name);
      if (dept) setUserDepartment(dept);

      if (selectedRole === 'faculty' || selectedRole === 'mentor') {
        setPage('faculty');
      } else {
        setPage('dashboard');
      }
      const roleLabel = selectedRole === 'student' ? 'Student' : selectedRole === 'faculty' ? 'Faculty' : 'Mentor';
      toast(`Signed in as ${roleLabel}`, 'success');
    },
    [setPage, toast],
  );

  const signup = useCallback(
    (name: string, email: string, selectedRole: Role, dept?: string) => {
      setIsAuthenticated(true);
      setUserName(name);
      setUserEmail(email);
      setRole(selectedRole);
      if (dept) setUserDepartment(dept);

      if (selectedRole === 'faculty' || selectedRole === 'mentor') {
        setPage('faculty');
      } else {
        setPage('dashboard');
      }
      toast(`Account created successfully! Welcome, ${name}.`, 'success');
    },
    [setPage, toast],
  );

  const logout = useCallback(() => {
    setIsAuthenticated(false);
    setPage('login');
    toast('Logged out successfully.', 'info');
  }, [setPage, toast]);

  const addProject = useCallback(
    (form: CreateProjectForm) => {
      const project: Project = {
        id: crypto.randomUUID(),
        name: form.projectName,
        domain: form.domain,
        problemStatement: form.problemStatement,
        idea: form.projectIdea,
        teamSize: form.teamSize,
        duration: form.expectedDuration,
        progress: 8,
        currentMilestone: 'Problem Identification',
        status: 'ON TRACK',
        lastUpdated: '1 Sep 2026',
        team: 'Your Team',
        student: userName,
        hasAnalysis: true,
        milestones: [
          'Problem Identification',
          'Requirement Gathering',
          'Literature Survey',
          'System Architecture',
          'Development',
          'AI Integration',
          'Testing',
          'Deployment',
          'Documentation',
        ].map((label, i) => ({
          id: `${i}-${label}`,
          label,
          status: i === 0 ? 'in-progress' : 'pending',
        })),
      };
      setProjects((prev) => [project, ...prev]);
      setSelectedProjectId(project.id);
      return project;
    },
    [userName],
  );

  const updateProject = useCallback((id: string, patch: Partial<Project>) => {
    setProjects((prev) => prev.map((p) => (p.id === id ? { ...p, ...patch, lastUpdated: '1 Sep 2026' } : p)));
  }, []);

  const selectedProject = useMemo(
    () => projects.find((p) => p.id === selectedProjectId) ?? projects[0],
    [projects, selectedProjectId],
  );

  const value: AppState = {
    page,
    setPage,
    role,
    setRole,
    userName,
    setUserName,
    userEmail,
    userDepartment,
    isAuthenticated,
    login,
    signup,
    logout,
    sidebarOpen,
    setSidebarOpen,
    searchQuery,
    setSearchQuery,
    projects,
    selectedProjectId,
    setSelectedProjectId,
    selectedProject,
    addProject,
    updateProject,
    toasts,
    toast,
    dismissToast,
    notifyOpen,
    setNotifyOpen,
    profileOpen,
    setProfileOpen,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}

