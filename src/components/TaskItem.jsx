import { tv } from "tailwind-variants";

import { DetailsIcon, TrashIcon } from "../assets/icons";
import Button from "./Button";
import Checkbox from "./form/Checkbox";

const TaskItem = ({
  id,
  title,
  status,
  handleTaskChkChange,
  handleTaskDelete,
}) => {
  const color = tv({
    base: "flex items-center justify-between gap-2 rounded-lg px-4 py-3 text-sm duration-300",
    variants: {
      status: {
        done: "bg-brand-primary/10 text-brand-primary",
        in_progress: "bg-brand-process/10 text-brand-process",
        not_started: "bg-brand-dark-blue/10 text-brand-dark-blue",
      },
    },
    defaultVariants: {
      status: "not_started",
    },
  });

  return (
    <li className={color({ status })}>
      <p className="flex items-center gap-3">
        <Checkbox
          id={id}
          status={status}
          handleTaskChkChange={handleTaskChkChange}
        />
        {title}
      </p>
      <p className="text-brand-dark-blue/70 flex items-center gap-3 duration-300">
        <Button color="ghost" onClick={() => handleTaskDelete(id)}>
          <TrashIcon />
        </Button>
        <a href="#" className="hover:text-brand-dark-blue hover:duration-300">
          <DetailsIcon />
        </a>
      </p>
    </li>
  );
};

export default TaskItem;
