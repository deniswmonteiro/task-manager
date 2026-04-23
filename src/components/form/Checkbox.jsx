import CheckIcon from "../../assets/icons/check.svg?react";
import LoaderCircleIcon from "../../assets/icons/loader-circle.svg?react";

const Checkbox = ({ taskStatus }) => {
  const getStatusClasses = () => {
    switch (taskStatus) {
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
        checked={`${taskStatus === "done"}`}
        className="absolute h-full w-full cursor-pointer opacity-0"
      />
      {taskStatus === "done" && <CheckIcon />}
      {taskStatus === "in_progress" && (
        <LoaderCircleIcon className="animate-spin" />
      )}
    </label>
  );
};

export default Checkbox;
