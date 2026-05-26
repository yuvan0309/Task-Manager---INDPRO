import { useState } from 'react';
import toast from 'react-hot-toast';
import Navbar from '../components/Navbar';
import KanbanBoard from '../components/KanbanBoard';
import SkeletonCard from '../components/SkeletonCard';
import TaskModal from '../components/TaskModal';
import useTasks from '../hooks/useTasks';

export default function Dashboard() {
  const { tasks, loading, error, createTask, updateTask, deleteTask } = useTasks();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [saving, setSaving] = useState(false);

  const openCreateModal = () => {
    setEditingTask(null);
    setIsModalOpen(true);
  };

  const openEditModal = (task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    if (!saving) {
      setIsModalOpen(false);
      setEditingTask(null);
    }
  };

  const handleSubmit = async (formData) => {
    setSaving(true);

    try {
      if (editingTask) {
        await updateTask(editingTask.id, formData);
        toast.success('Task updated');
      } else {
        await createTask(formData);
        toast.success('Task created');
      }
      setIsModalOpen(false);
      setEditingTask(null);
    } catch (requestError) {
      toast.error(requestError.response?.data?.message || 'Failed to save task');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (task) => {
    try {
      await deleteTask(task.id);

      toast.custom(
        (toastState) => (
          <div className="pointer-events-auto flex items-center justify-between gap-4 rounded-xl border border-border bg-surface p-3 text-sm text-primary shadow-xl shadow-black/40">
            <span>Task deleted</span>
            <button
              type="button"
              className="rounded-lg bg-surface2 px-3 py-1 font-semibold text-primary border border-borderLight transition-all hover:bg-border focus:outline-none"
              onClick={async () => {
                toast.dismiss(toastState.id);
                try {
                  await createTask({
                    title: task.title,
                    description: task.description,
                    stage: task.stage,
                    priority: task.priority
                  });
                  toast.success('Task restored');
                } catch (requestError) {
                  toast.error(requestError.response?.data?.message || 'Failed to restore task');
                }
              }}
            >
              Undo
            </button>
          </div>
        ),
        { duration: 5000 }
      );
    } catch (requestError) {
      toast.error(requestError.response?.data?.message || 'Failed to delete task');
    }
  };

  const dateStr = new Date().toLocaleDateString('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  return (
    <div className="relative min-h-screen bg-background">
      {/* Subtle dot grid pattern behind the board */}
      <div className="pointer-events-none absolute inset-0 z-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, #27272a 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>

      <div className="relative z-10 flex flex-col h-screen">
        <Navbar taskCount={tasks ? tasks.length : 0} />
        
        <main className="flex-1 flex flex-col mx-auto w-full max-w-7xl overflow-hidden">
          {/* Dashboard Header */}
          <div className="flex-shrink-0 px-6 pt-6 pb-4 sm:flex sm:items-end sm:justify-between">
            <div className="mb-4 sm:mb-0">
              <h2 className="text-2xl font-semibold text-primary">My Board</h2>
              <p className="mt-1 text-sm text-muted">{dateStr}</p>
            </div>
            <button
              type="button"
              onClick={openCreateModal}
              className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl px-4 py-2 text-sm font-medium text-white transition-all duration-200 active:translate-y-0 hover:-translate-y-[1px] hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-accentLight/50 focus:ring-offset-2 focus:ring-offset-background"
              style={{ background: 'linear-gradient(135deg, #7c3aed, #6d28d9)' }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M5 12h14"/></svg>
              New Task
            </button>
          </div>

          {error ? (
            <div className="mx-6 mb-4 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
              {error}
            </div>
          ) : null}

          {/* Board Area */}
          <div className="flex-1 px-6 pb-6 overflow-x-auto min-h-0">
            {loading ? (
              <div className="flex flex-col md:flex-row h-full gap-4 snap-x snap-mandatory">
                {[0, 1, 2].map((column) => (
                  <div key={column} className="flex-1 w-full md:min-w-72 md:max-w-sm shrink-0 snap-center bg-surface rounded-2xl border border-border p-4 flex flex-col gap-3 min-h-96">
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                         <div className="h-2 w-2 rounded-full shimmer" />
                         <div className="shimmer h-4 w-24 rounded" />
                      </div>
                      <div className="shimmer h-5 w-8 rounded-full" />
                    </div>
                    <SkeletonCard />
                    <SkeletonCard />
                    <SkeletonCard />
                  </div>
                ))}
              </div>
            ) : (
              <KanbanBoard
                tasks={tasks}
                onEdit={openEditModal}
                onDelete={handleDelete}
                onStageChange={updateTask}
              />
            )}
          </div>
        </main>
      </div>

      <TaskModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSubmit={handleSubmit}
        initialTask={editingTask}
        loading={saving}
      />
    </div>
  );
}
