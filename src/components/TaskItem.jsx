import { DetailsIcon, TrashIcon } from "../assets/icons";
import Checkbox from "./form/Checkbox";

const TaskItem = ({ task, handleTaskChkChange, handleTaskDelete }) => {
  const getStatusClasses = () => {
    switch (task.status) {
      case "done":
        return "bg-brand-primary/10 text-brand-primary";
      case "in_progress":
        return "bg-brand-process/10 text-brand-process";
      case "not_started":
        return "bg-brand-dark-blue/10 text-brand-dark-blue";
      default:
        return "bg-brand-dark-blue/10 text-brand-dark-blue";
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
      <p className="text-brand-dark-blue/70 flex items-center gap-3 duration-300">
        <button
          type="button"
          className="hover:text-brand-dark-blue cursor-pointer hover:duration-300"
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
