import { tv } from "tailwind-variants";

import { CheckIcon, LoaderIcon } from "../../assets/icons";

const Checkbox = ({ id, status, handleTaskStatusChange }) => {
  // O visual do checkbox representa o status atual da tarefa
  const backgroundColor = tv({
    base: "relative flex h-7 w-7 cursor-pointer items-center justify-center rounded-lg duration-300 hover:scale-105 hover:duration-300",
    variants: {
      status: {
        done: "bg-brand-primary text-brand-primary",
        in_progress: "bg-brand-process text-brand-white",
        not_started: "bg-brand-light-gray text-brand-light-gray",
      },
    },
    defaultVariants: {
      status: "not_started",
    },
  });

  return (
    <label className={backgroundColor({ status })}>
      <input
        type="checkbox"
        checked={status === "done"}
        className="absolute h-full w-full cursor-pointer opacity-0"
        onChange={() => handleTaskStatusChange(id)}
      />
      {/* O input real fica invisível; o ícone mostra o estado para o usuário */}
      {status === "done" && <CheckIcon />}
      {status === "in_progress" && <LoaderIcon className="animate-spin" />}
    </label>
  );
};

export default Checkbox;
