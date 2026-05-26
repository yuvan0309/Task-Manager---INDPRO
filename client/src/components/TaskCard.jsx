import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

function getPriorityClasses(priority) {
  switch (priority) {
    case 'low':
      return 'bg-green-500/10 text-green-400 border-green-500/20';
    case 'high':
      return 'bg-red-500/10 text-red-400 border-red-500/20';
    default:
      return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
  }
}

function getStageName(stage) {
  switch (stage) {
    case 'inprogress':
      return 'In Progress';
    case 'done':
      return 'Done';
    default:
      return 'Todo';
  }
}

function getStageColor(stage) {
  switch (stage) {
    case 'inprogress':
      return 'text-amber-500';
    case 'done':
      return 'text-green-500';
    default:
      return 'text-blue-500';
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
      return new Intl.RelativeTimeFormat('en', { numeric: 'auto', style: 'narrow' }).format(amount, unit);
    }
  }

  return 'just now';
}

function PencilIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z" />
    </svg>
  );
}

function TrashIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M3 6h18" />
      <path d="M8 6V4h8v2" />
      <path d="M19 6l-1 14H6L5 6" />
      <path d="M10 11v6" />
      <path d="M14 11v6" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"></circle>
      <polyline points="12 6 12 12 16 14"></polyline>
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
      className={`glass group relative rounded-xl p-4 cursor-grab active:cursor-grabbing fade-in transition-all duration-200 border border-border hover:border-borderLight hover:-translate-y-0.5 ${
        isDragging ? 'dragging' : ''
      }`}
      {...attributes}
      {...listeners}
    >
      <div className="absolute top-1 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity text-muted/30 text-[10px] leading-none pointer-events-none pb-1">
        ⠿
      </div>

      <div className="flex items-start justify-between gap-3 min-h-6">
        <span
          className={`shrink-0 rounded-full border px-2 py-0.5 text-[10px] mono tracking-wide ${getPriorityClasses(
            task.priority
          )}`}
        >
          {task.priority}
        </span>
        
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              onEdit(task);
            }}
            className="p-1 text-muted hover:text-primary transition-colors focus:outline-none rounded"
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
            className="p-1 text-muted hover:text-red-400 transition-colors focus:outline-none rounded"
            aria-label="Delete task"
          >
            <TrashIcon />
          </button>
        </div>
      </div>

      <h3 className="mt-2 text-sm font-medium leading-snug text-primary" style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
        {task.title}
      </h3>

      {task.description && (
        <p className="mt-1 text-xs leading-relaxed text-muted line-clamp-2" style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
          {task.description}
        </p>
      )}

      <div className="mt-3 flex items-center justify-between gap-3">
        <div className="flex items-center gap-1 text-xs text-muted mono">
          <ClockIcon />
          <span>Updated {formatRelativeTime(task.updated_at)}</span>
        </div>
        
        <span className={`text-[10px] font-medium tracking-wide ${getStageColor(task.stage)}`}>
          {getStageName(task.stage)}
        </span>
      </div>
    </article>
  );
}
