import React from "react";

import { AddIcon, TrashIcon } from "../assets/icons";
import AddTaskModal from "./AddTaskModal";
import Button from "./Button";

const Header = ({ title, subtitle }) => {
  const [addTaskModalIsOpen, setAddTaskModalIsOpen] = React.useState(false);

  return (
    <>
      <section className="flex w-full justify-between">
        <div>
          <span className="text-brand-primary text-xs font-semibold">
            {subtitle}
          </span>
          <h2 className="text-xl font-semibold">{title}</h2>
        </div>
        <div className="flex items-center gap-3">
          <Button color="ghost">
            Limpar tarefas
            <TrashIcon />
          </Button>
          <Button color="primary" onClick={() => setAddTaskModalIsOpen(true)}>
            Nova tarefa
            <AddIcon />
          </Button>
        </div>
      </section>

      <AddTaskModal
        modalIsOpen={addTaskModalIsOpen}
        handleModalClose={() => setAddTaskModalIsOpen(false)}
      />
    </>
  );
};

export default Header;
