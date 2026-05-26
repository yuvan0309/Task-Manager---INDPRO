import { useDroppable } from '@dnd-kit/core';
import TaskCard from './TaskCard';

function getAccentClasses(stage) {
  switch (stage) {
    case 'inprogress':
      return 'border-l-amber-500';
    case 'done':
      return 'border-l-emerald-500';
    default:
      return 'border-l-sky-500';
  }
}

function getTitle(stage) {
  switch (stage) {
    case 'inprogress':
      return 'In Progress';
    case 'done':
      return 'Done';
    default:
      return 'Todo';
  }
}

export default function KanbanColumn({ stage, tasks, onEdit, onDelete }) {
  const { setNodeRef, isOver } = useDroppable({
    id: stage,
    data: { stage }
  });

  return (
    <section
      ref={setNodeRef}
      className={`flex min-h-[22rem] flex-col rounded-2xl border border-gray-800 border-l-4 bg-gray-950/80 p-4 shadow-lg shadow-black/20 transition ${
        isOver ? 'bg-gray-900/90 ring-2 ring-violet-500/40' : ''
      } ${getAccentClasses(stage)}`}
    >
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-bold text-white">{getTitle(stage)}</h2>
          <p className="text-xs text-gray-500">Drag tasks into this column</p>
        </div>
        <span className="rounded-full bg-gray-900 px-3 py-1 text-sm font-semibold text-gray-200">
          {tasks.length}
        </span>
      </div>

      <div className="space-y-3">
        {tasks.length === 0 ? (
          <div className="rounded-xl border border-dashed border-gray-800 px-4 py-10 text-center text-sm text-gray-500">
            No tasks yet
          </div>
        ) : (
          tasks.map((task) => (
            <TaskCard key={task.id} task={task} onEdit={onEdit} onDelete={onDelete} />
          ))
        )}
      </div>
    </section>
  );
}
