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
          <div className="pointer-events-auto flex items-center gap-3 rounded-2xl border border-gray-800 bg-gray-900 px-4 py-3 text-sm text-gray-200 shadow-xl shadow-black/30">
            <span>Task deleted</span>
            <button
              type="button"
              className="rounded-lg bg-violet-600 px-3 py-1.5 font-semibold text-white transition hover:bg-violet-500"
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

  return (
    <div className="min-h-screen bg-slate-950">
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-3xl font-extrabold tracking-tight text-white">Your Board</h2>
            <p className="mt-1 text-sm text-gray-400">Drag cards between stages to keep work moving.</p>
          </div>
          <button
            type="button"
            onClick={openCreateModal}
            className="inline-flex items-center justify-center rounded-xl bg-violet-600 px-4 py-2.5 font-semibold text-white shadow-lg shadow-violet-950/30 transition hover:bg-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-400"
          >
            + New Task
          </button>
        </div>

        {error ? (
          <div className="mb-6 rounded-xl border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-300">
            {error}
          </div>
        ) : null}

        {loading ? (
          <div className="grid gap-5 lg:grid-cols-3">
            {[0, 1, 2].map((column) => (
              <div key={column} className="space-y-3 rounded-2xl border border-gray-800 bg-gray-950/80 p-4">
                <div className="h-7 w-24 rounded bg-gray-800" />
                <div className="h-4 w-36 rounded bg-gray-800" />
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
      </main>

      <button
        type="button"
        onClick={openCreateModal}
        className="fixed bottom-6 right-6 z-40 inline-flex h-14 w-14 items-center justify-center rounded-full bg-violet-600 text-2xl font-bold text-white shadow-xl shadow-violet-950/40 transition hover:bg-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-400"
        aria-label="Create task"
      >
        +
      </button>

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
