import { DndContext, PointerSensor, closestCenter, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import KanbanColumn from './KanbanColumn';

const stages = ['todo', 'inprogress', 'done'];

export default function KanbanBoard({ tasks, onEdit, onDelete, onStageChange }) {
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 8 }
    })
  );

  const handleDragEnd = async (event) => {
    const { active, over } = event;

    if (!over) {
      return;
    }

    const activeTask = active.data.current?.task;
    const overStage = stages.includes(over.id) ? over.id : over.data.current?.stage;

    if (!activeTask || !overStage || activeTask.stage === overStage) {
      return;
    }

    await onStageChange(activeTask.id, { stage: overStage });
  };

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <div className="flex flex-col md:flex-row h-full gap-4 snap-x snap-mandatory pb-4">
        {stages.map((stage) => {
          const stageTasks = tasks.filter((task) => task.stage === stage);

          return (
            <SortableContext
              key={stage}
              items={stageTasks.map((task) => task.id)}
              strategy={verticalListSortingStrategy}
            >
              <KanbanColumn stage={stage} tasks={stageTasks} onEdit={onEdit} onDelete={onDelete} />
            </SortableContext>
          );
        })}
      </div>
    </DndContext>
  );
}
