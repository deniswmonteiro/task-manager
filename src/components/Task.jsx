import TaskItem from "./TaskItem";

const Task = ({ icon, title, tasks }) => {
  return (
    <div className="rounded-lg bg-white p-6">
      <div className="mb-3 border-b border-[#f4f4f5] pb-1.25">
        <div className="flex items-center gap-2 text-[#9a9c9f]">
          {icon}
          <p className="text-xs font-semibold">{title}</p>
        </div>
      </div>
      <ul className="space-y-3">
        {tasks.map(task => (
          <TaskItem task={task} key={task.id} />
        ))}
      </ul>
    </div>
  );
};

export default Task;
