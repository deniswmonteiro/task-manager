import React from "react";
import TrashIcon from "../assets/icons/trash.svg?react";
import AddIcon from "../assets/icons/Add.svg?react";
import SunIcon from "../assets/icons/sun.svg?react";
import CloudSunIcon from "../assets/icons/cloud-sun.svg?react";
import MoonIcon from "../assets/icons/moon.svg?react";
import Button from "./Button";
import Task from "./Task";
import TasksData from "../data/TasksData";

const Tasks = () => {
  const [tasks] = React.useState(TasksData);
  const morningTasks = tasks.filter(task => task.time === "morning");
  const afternoonTasks = tasks.filter(task => task.time === "afternoon");
  const eveningTasks = tasks.filter(task => task.time === "evening");

  return (
    <main className="w-full px-8 py-16">
      {/* Ações */}
      <section className="flex w-full justify-between">
        <div>
          <span className="text-xs font-semibold text-[#00adb5]">
            Minhas tarefas
          </span>
          <h2 className="text-xl font-semibold">Minhas tarefas</h2>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="ghost">
            Limpar tarefas
            <TrashIcon />
          </Button>
          <Button variant="primary">
            Nova tarefa
            <AddIcon />
          </Button>
        </div>
      </section>

      {/* Lista de tarefas */}
      <section className="mt-6 grid gap-6 rounded-xl">
        <Task icon={<SunIcon />} title="Manhã" tasks={morningTasks} />
        <Task icon={<CloudSunIcon />} title="Tarde" tasks={afternoonTasks} />
        <Task icon={<MoonIcon />} title="Noite" tasks={eveningTasks} />
      </section>
    </main>
  );
};

export default Tasks;
