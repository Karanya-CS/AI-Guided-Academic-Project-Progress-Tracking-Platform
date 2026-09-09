import type { ProjectStatus } from '../types';

const styles: Record<ProjectStatus, string> = {
  'ON TRACK': 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200',
  'AT RISK': 'bg-amber-50 text-amber-800 ring-1 ring-amber-200',
  DELAYED: 'bg-rose-50 text-rose-700 ring-1 ring-rose-200',
  COMPLETED: 'bg-indigo-50 text-indigo-700 ring-1 ring-indigo-200',
};

export default function StatusBadge({ status }: { status: ProjectStatus }) {
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-bold tracking-wide ${styles[status]}`}>
      {status}
    </span>
  );
}
