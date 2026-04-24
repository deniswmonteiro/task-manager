import { DetailsIcon, TrashIcon } from "../assets/icons";
import Checkbox from "./form/Checkbox";

const TaskItem = ({ task, handleTaskChkChange, handleTaskDelete }) => {
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
      className={`flex items-center justify-between gap-2 rounded-lg px-4 py-3 text-sm duration-300 ${getStatusClasses()}`}
    >
      <p className="flex items-center gap-3">
        <Checkbox task={task} handleTaskChkChange={handleTaskChkChange} />
        {task.title}
      </p>
      <p className="flex items-center gap-3 text-[#9A9C9F] duration-300">
        <button
          type="button"
          className="cursor-pointer hover:text-[#2b2d42] hover:duration-300"
          onClick={() => handleTaskDelete(task.id)}
        >
          <TrashIcon />
        </button>
        <a href="#" className="hover:text-[#2b2d42] hover:duration-300">
          <DetailsIcon />
        </a>
      </p>
    </li>
  );
};

export default TaskItem;
