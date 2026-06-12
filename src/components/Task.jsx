import TaskItem from "./TaskItem";

const Task = ({
  icon,
  title,
  tasks,
  handleTaskChkChange,
  onDeleteTaskSuccess,
}) => {
  return (
    <div className="rounded-lg bg-white p-6">
      <div className="border-brand-light-gray/70 mb-3 border-b border-solid pb-1.25">
        <div className="text-brand-text-gray flex items-center gap-2">
          {icon}
          <p className="text-xs font-semibold">{title}</p>
        </div>
      </div>
      <ul className="space-y-3">
        {/* Mantém o grupo visível mesmo quando não há tarefas naquele período. */}
        {tasks && tasks.length === 0 ? (
          <p className="text-brand-text-gray text-center text-xs">
            Nenhuma tarefa cadastrada
          </p>
        ) : (
          tasks.map(task => (
            <TaskItem
              key={task.id}
              id={task.id}
              title={task.title}
              status={task.status}
              handleTaskChkChange={handleTaskChkChange}
              onDeleteTaskSuccess={onDeleteTaskSuccess}
            />
          ))
        )}
      </ul>
    </div>
  );
};

export default Task;
