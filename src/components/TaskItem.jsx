const TaskItem = ({ task }) => {
  const getStatusClasses = () => {
    switch (task.status) {
      case "done":
        return "bg-[#00adb5]/10 text-[#00adb5]";
      case "in_progress":
        return "bg-[#ffaa04]/10 text-[#ffaa04]";
      case "not_started":
        return "bg-[#2b2d42]/10 text-[#2b2d42]";
      default:
        return "bg-[#2b2d42]/10 text-[#2b2d42]";
    }
  };

  return (
    <li
      className={`flex items-center gap-2 rounded-lg px-4 py-3 text-sm ${getStatusClasses()}`}
    >
      {task.title}
    </li>
  );
};

export default TaskItem;
