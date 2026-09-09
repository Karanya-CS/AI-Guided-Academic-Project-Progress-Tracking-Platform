import Header from './components/Header';
import Sidebar from './components/Sidebar';
import ToastStack from './components/ToastStack';
import ProjectBlueprint from './components/ProjectBlueprint';
import { AppProvider, useApp } from './context';
import AIAgents from './pages/AIAgents';
import AIAnalysis from './pages/AIAnalysis';
import CreateProject from './pages/CreateProject';
import Dashboard from './pages/Dashboard';
import DocumentationPage from './pages/DocumentationPage';
import FacultyDashboard from './pages/FacultyDashboard';
import LoginPage from './pages/LoginPage';
import MentorshipPage from './pages/MentorshipPage';
import MyProjects from './pages/MyProjects';
import ProgressPage from './pages/ProgressPage';
import SettingsPage from './pages/SettingsPage';
import SignUpPage from './pages/SignUpPage';

function Shell() {
  const { page, isAuthenticated } = useApp();

  // If not authenticated, render Login or SignUp pages
  if (!isAuthenticated) {
    if (page === 'signup') {
      return (
        <>
          <SignUpPage />
          <ToastStack />
        </>
      );
    }
    return (
      <>
        <LoginPage />
        <ToastStack />
      </>
    );
  }

  const view = () => {
    switch (page) {
      case 'dashboard':
        return <Dashboard />;
      case 'create-project':
        return <CreateProject />;
      case 'my-projects':
        return <MyProjects />;
      case 'ai-agents':
        return <AIAgents />;
      case 'ai-analysis':
        return <AIAnalysis />;
      case 'blueprint':
        return <ProjectBlueprint />;
      case 'progress':
        return <ProgressPage />;
      case 'documentation':
        return <DocumentationPage />;
      case 'mentorship':
        return <MentorshipPage />;
      case 'faculty':
        return <FacultyDashboard />;
      case 'settings':
        return <SettingsPage />;
      case 'login':
        return <LoginPage />;
      case 'signup':
        return <SignUpPage />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex h-full min-h-0 bg-slate-50 overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0 min-h-0">
        <Header />
        <main className="flex-1 overflow-y-auto overflow-x-hidden">{view()}</main>
      </div>
      <ToastStack />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <Shell />
    </AppProvider>
  );
}

