import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

function getPriorityClasses(priority) {
  switch (priority) {
    case 'low':
      return 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30';
    case 'high':
      return 'bg-rose-500/15 text-rose-300 border-rose-500/30';
    default:
      return 'bg-amber-500/15 text-amber-300 border-amber-500/30';
  }
}

function formatRelativeTime(dateString) {
  const date = new Date(dateString);
  const diffSeconds = Math.round((date.getTime() - Date.now()) / 1000);
  const absSeconds = Math.abs(diffSeconds);

  const units = [
    ['year', 60 * 60 * 24 * 365],
    ['month', 60 * 60 * 24 * 30],
    ['day', 60 * 60 * 24],
    ['hour', 60 * 60],
    ['minute', 60],
    ['second', 1]
  ];

  for (const [unit, value] of units) {
    if (absSeconds >= value || unit === 'second') {
      const amount = Math.round(diffSeconds / value);
      return new Intl.RelativeTimeFormat('en', { numeric: 'auto' }).format(amount, unit);
    }
  }

  return 'just now';
}

function PencilIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z" />
    </svg>
  );
}

function TrashIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M3 6h18" />
      <path d="M8 6V4h8v2" />
      <path d="M19 6l-1 14H6L5 6" />
      <path d="M10 11v6" />
      <path d="M14 11v6" />
    </svg>
  );
}

export default function TaskCard({ task, onEdit, onDelete }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: task.id,
    data: { stage: task.stage, task }
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  };

  return (
    <article
      ref={setNodeRef}
      style={style}
      className={`rounded-xl border border-gray-800 bg-gray-900 p-4 shadow-lg shadow-black/20 transition ${
        isDragging ? 'scale-[1.02] opacity-60' : 'hover:border-gray-700 hover:shadow-violet-950/20'
      }`}
      {...attributes}
      {...listeners}
    >
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-base font-semibold leading-snug text-white">{task.title}</h3>
        <span
          className={`shrink-0 rounded-full border px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide ${getPriorityClasses(
            task.priority
          )}`}
        >
          {task.priority}
        </span>
      </div>

      {task.description ? (
        <p
          className="mt-3 text-sm leading-6 text-gray-400"
          style={{
            display: '-webkit-box',
            WebkitBoxOrient: 'vertical',
            WebkitLineClamp: 2,
            overflow: 'hidden'
          }}
        >
          {task.description}
        </p>
      ) : (
        <p className="mt-3 text-sm text-gray-500">No description provided.</p>
      )}

      <div className="mt-4 flex items-center justify-between gap-3">
        <span className="text-xs text-gray-500">Updated {formatRelativeTime(task.updated_at)}</span>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              onEdit(task);
            }}
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-gray-800 bg-gray-950 text-gray-300 transition hover:border-violet-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-violet-500"
            aria-label="Edit task"
          >
            <PencilIcon />
          </button>
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              onDelete(task);
            }}
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-gray-800 bg-gray-950 text-gray-300 transition hover:border-rose-500 hover:text-rose-300 focus:outline-none focus:ring-2 focus:ring-rose-500"
            aria-label="Delete task"
          >
            <TrashIcon />
          </button>
        </div>
      </div>
    </article>
  );
}
