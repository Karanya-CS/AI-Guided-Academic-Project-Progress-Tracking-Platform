import { useApp } from '../context';

export default function ToastStack() {
  const { toasts, dismissToast } = useApp();
  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 z-[80] flex flex-col gap-2 w-[min(100%-2rem,360px)]">
      {toasts.map((t) => (
        <button
          key={t.id}
          type="button"
          onClick={() => dismissToast(t.id)}
          className={`text-left rounded-xl px-4 py-3 text-sm font-medium shadow-lg border ${
            t.type === 'success'
              ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
              : t.type === 'error'
                ? 'bg-rose-50 border-rose-200 text-rose-900'
                : 'bg-white border-slate-200 text-slate-800'
          }`}
        >
          {t.message}
        </button>
      ))}
    </div>
  );
}
