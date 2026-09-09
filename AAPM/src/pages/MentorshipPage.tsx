import MentorshipPanel from '../components/MentorshipPanel';
import { useApp } from '../context';

export default function MentorshipPage() {
  const { selectedProject } = useApp();
  return (
    <div className="page-wrap max-w-3xl">
      <div>
        <p className="text-[10px] sm:text-[11px] uppercase tracking-wider text-indigo-600 font-extrabold mb-1">
          AI-Guided Academic Project Progress Tracking Platform with Planning &amp; Mentorship Assistance
        </p>
        <h1 className="section-title">AI Project Mentor</h1>
        <p className="section-subtitle">
          Get guidance based on your current project and progress. Active project: {selectedProject?.name}.
        </p>
      </div>
      <MentorshipPanel full />
    </div>
  );
}
