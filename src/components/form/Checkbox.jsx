import { CheckIcon, LoaderIcon } from "../../assets/icons";

const Checkbox = ({ task, handleTaskChkChange }) => {
  const getStatusClasses = () => {
    switch (task.status) {
      case "done":
        return "bg-[#00adb5] text-[#00adb5]";
      case "in_progress":
        return "bg-[#ffaa04] text-[#ffaa04]";
      case "not_started":
        return "bg-[#2b2d42]/20 text-[#2b2d42]";
      default:
        return "bg-[#2b2d42]/20 text-[#2b2d42]";
    }
  };

  return (
    <label
      className={`relative flex h-7 w-7 cursor-pointer items-center justify-center rounded-lg duration-300 ${getStatusClasses()} hover:scale-105 hover:duration-300`}
    >
      <input
        type="checkbox"
        checked={task.status === "done"}
        className="absolute h-full w-full cursor-pointer opacity-0"
        onChange={() => handleTaskChkChange(task.id)}
      />
      {task.status === "done" && <CheckIcon />}
      {task.status === "in_progress" && <LoaderIcon className="animate-spin" />}
    </label>
  );
};

export default Checkbox;
