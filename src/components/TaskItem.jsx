import Checkbox from "./form/Checkbox";
import DetailsIcon from "../assets/icons/details.svg?react";

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
      className={`flex items-center justify-between gap-2 rounded-lg px-4 py-3 text-sm ${getStatusClasses()}`}
    >
      <p className="flex items-center gap-3">
        <Checkbox taskStatus={task.status} />
        {task.title}
      </p>
      <a
        href="#"
        className="text-[#9A9C9F] duration-300 hover:text-[#2b2d42] hover:duration-300"
      >
        <DetailsIcon />
      </a>
    </li>
  );
};

export default TaskItem;
