import React from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { tv } from "tailwind-variants";

import { DetailsIcon, LoaderIcon, TrashIcon } from "../assets/icons";
import Button from "./Button";
import Checkbox from "./form/Checkbox";

const TaskItem = ({
  id,
  title,
  status,
  handleTaskChkChange,
  onDeleteTaskSuccess,
}) => {
  const [deleteIsLoading, setDeleteIsLoading] = React.useState(false);

  const backgroundColor = tv({
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

  const handleDeleteClick = async () => {
    setDeleteIsLoading(true);

    const response = await fetch(`http://localhost:3000/tasks/${id}`, {
      method: "DELETE",
    });

    if (!response) {
      setDeleteIsLoading(false);

      return toast.error("Erro ao excluir tarefa. Tente novamente.");
    }

    setDeleteIsLoading(false);
    onDeleteTaskSuccess(id);
  };

  return (
    <li className={backgroundColor({ status })}>
      <p className="flex items-center gap-3">
        <Checkbox
          id={id}
          status={status}
          handleTaskChkChange={handleTaskChkChange}
        />
        {title}
      </p>
      <p className="text-brand-dark-blue/70 flex items-center gap-3 duration-300">
        <Button
          color="ghost"
          onClick={() => handleDeleteClick(id)}
          disabled={deleteIsLoading}
        >
          {deleteIsLoading ? (
            <LoaderIcon className="text-brand-text-gray animate-spin" />
          ) : (
            <TrashIcon />
          )}
        </Button>
        <Link
          to={`/task/${id}`}
          className="hover:text-brand-dark-blue hover:duration-300"
        >
          <DetailsIcon />
        </Link>
      </p>
    </li>
  );
};

export default TaskItem;
