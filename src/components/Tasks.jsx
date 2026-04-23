import React from "react";
import TrashIcon from "../assets/icons/trash.svg?react";
import AddIcon from "../assets/icons/add.svg?react";
import SunIcon from "../assets/icons/sun.svg?react";
import CloudSunIcon from "../assets/icons/cloud-sun.svg?react";
import MoonIcon from "../assets/icons/moon.svg?react";
import Button from "./Button";
import Task from "./Task";
import TasksData from "../data/TasksData";

const Tasks = () => {
  const [tasks, setTasks] = React.useState(TasksData);
  const morningTasks = tasks.filter(task => task.time === "morning");
  const afternoonTasks = tasks.filter(task => task.time === "afternoon");
  const eveningTasks = tasks.filter(task => task.time === "evening");

  const handleTaskChkChange = taskId => {
    const newTask = tasks.map(task => {
      if (task.id !== taskId) return task;

      if (task.status === "not_stated") {
        return { ...task, status: "in_progress" };
      }

      if (task.status === "in_progress") {
        return { ...task, status: "done" };
      }

      if (task.status === "done") {
        return { ...task, status: "not_stated" };
      }

      return task;
    });

    setTasks(newTask);
  };

  return (
    <main className="h-screen w-full overflow-y-auto px-8 py-16">
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
        <Task
          icon={<SunIcon />}
          title="Manhã"
          tasks={morningTasks}
          handleTaskChkChange={handleTaskChkChange}
        />
        <Task
          icon={<CloudSunIcon />}
          title="Tarde"
          tasks={afternoonTasks}
          handleTaskChkChange={handleTaskChkChange}
        />
        <Task
          icon={<MoonIcon />}
          title="Noite"
          tasks={eveningTasks}
          handleTaskChkChange={handleTaskChkChange}
        />
      </section>
    </main>
  );
};

export default Tasks;
