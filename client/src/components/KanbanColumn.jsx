import { useDroppable } from '@dnd-kit/core';
import TaskCard from './TaskCard';

export default function KanbanColumn({ stage, tasks, onEdit, onDelete }) {
  const { setNodeRef, isOver } = useDroppable({
    id: stage,
    data: { stage }
  });

  const getTitle = (s) => {
    switch (s) {
      case 'inprogress': return 'In Progress';
      case 'done': return 'Done';
      default: return 'Todo';
    }
  };

  const getBarStyles = (s) => {
    switch (s) {
      case 'inprogress': return { background: 'linear-gradient(90deg, #f59e0b, #fbbf2444)', boxShadow: '0 0 12px rgba(245, 158, 11, 0.3)' };
      case 'done': return { background: 'linear-gradient(90deg, #22c55e, #4ade8044)', boxShadow: '0 0 12px rgba(34, 197, 94, 0.3)' };
      default: return { background: 'linear-gradient(90deg, #3b82f6, #60a5fa44)', boxShadow: '0 0 12px rgba(59, 130, 246, 0.3)' };
    }
  };

  const getDotStyles = (s) => {
    switch (s) {
      case 'inprogress': return { background: '#f59e0b', boxShadow: '0 0 6px rgba(245,158,11,0.5)' };
      case 'done': return { background: '#22c55e', boxShadow: '0 0 6px rgba(34,197,94,0.5)' };
      default: return { background: '#3b82f6', boxShadow: '0 0 6px rgba(59,130,246,0.5)' };
    }
  };

  const getBadgeStyles = (s) => {
    switch (s) {
      case 'inprogress': return { color: '#fbbf24', background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.2)' };
      case 'done': return { color: '#4ade80', background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.2)' };
      default: return { color: '#60a5fa', background: 'rgba(59,130,246,0.08)', border: '1px solid rgba(59,130,246,0.2)' };
    }
  };

  return (
    <div
      ref={setNodeRef}
      className="flex-1 w-full md:min-w-72 md:max-w-sm shrink-0 snap-center flex flex-col transition-all duration-200"
      style={{
        background: '#111113',
        border: '1px solid #1e1e21',
        borderRadius: '16px',
        overflow: 'hidden',
        boxShadow: isOver ? '0 0 0 2px rgba(124, 58, 237, 0.5)' : 'none'
      }}
    >
      {/* Top accent bar */}
      <div 
        style={{
          height: '3px',
          width: '100%',
          borderRadius: 0,
          ...getBarStyles(stage)
        }}
      />
      
      {/* Header row */}
      <div 
        style={{
          padding: '16px 16px 12px 16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div 
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              ...getDotStyles(stage)
            }}
          />
          <h2
            style={{
              fontSize: '13px',
              fontWeight: 600,
              color: '#e4e4e7',
              letterSpacing: '0.01em',
              margin: 0
            }}
          >
            {getTitle(stage)}
          </h2>
        </div>
        <span
          style={{
            fontSize: '11px',
            fontFamily: "'JetBrains Mono', monospace",
            borderRadius: '20px',
            padding: '1px 8px',
            ...getBadgeStyles(stage)
          }}
        >
          {tasks.length}
        </span>
      </div>

      {/* Column body */}
      <div className="flex flex-col gap-3 flex-1 h-full px-4 pb-4">
        {tasks.length === 0 ? (
          <div
            style={{
              border: '1px dashed #1e1e21',
              borderRadius: '12px',
              padding: '32px 16px',
              textAlign: 'center',
              color: '#3f3f46',
              fontSize: '12px',
              marginTop: '4px'
            }}
          >
            <div style={{ opacity: 0.3, color: getDotStyles(stage).background, marginBottom: '8px', display: 'flex', justifyContent: 'center' }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: '24px', height: '24px' }}>
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
              </svg>
            </div>
            No tasks yet.<br/>
            <span style={{ fontSize: '11px', opacity: 0.7 }}>Drag tasks here or create one</span>
          </div>
        ) : (
          tasks.map((task) => (
            <TaskCard key={task.id} task={task} onEdit={onEdit} onDelete={onDelete} />
          ))
        )}
      </div>
    </div>
  );
}
