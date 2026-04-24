import React from "react";
import { toast } from "sonner";

import {
  AddIcon,
  CloudSunIcon,
  MoonIcon,
  SunIcon,
  TrashIcon,
} from "../assets/icons";
import TasksData from "../data/TasksData";
import AddTaskModal from "./AddTaskModal";
import Button from "./Button";
import Task from "./Task";

const Tasks = () => {
  const [tasks, setTasks] = React.useState(TasksData);
  const [addTaskModalIsOpen, setAddTaskModalIsOpen] = React.useState(false);

  const morningTasks = tasks.filter(task => task.time === "morning");
  const afternoonTasks = tasks.filter(task => task.time === "afternoon");
  const eveningTasks = tasks.filter(task => task.time === "evening");

  const handleTaskChkChange = taskId => {
    const newTask = tasks.map(task => {
      if (task.id !== taskId) return task;

      if (task.status === "not_started") {
        toast.success("Tarefa iniciada com sucesso.");
        return { ...task, status: "in_progress" };
      }

      if (task.status === "in_progress") {
        toast.success("Tarefa concluída com sucesso.");
        return { ...task, status: "done" };
      }

      if (task.status === "done") {
        toast.success("Tarefa reiniciada com sucesso.");
        return { ...task, status: "not_started" };
      }

      return task;
    });

    setTasks(newTask);
  };

  const handleTaskDelete = taskId => {
    const newTask = tasks.filter(task => task.id !== taskId);

    setTasks(newTask);
    toast.success("Tarefa excluída com sucesso.");
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
          <Button variant="primary" onClick={() => setAddTaskModalIsOpen(true)}>
            Nova tarefa
            <AddIcon />
          </Button>

          <AddTaskModal isOpen={addTaskModalIsOpen} />
        </div>
      </section>

      {/* Lista de tarefas */}
      <section className="mt-6 grid gap-6 rounded-xl">
        <Task
          icon={<SunIcon />}
          title="Manhã"
          tasks={morningTasks}
          handleTaskChkChange={handleTaskChkChange}
          handleTaskDelete={handleTaskDelete}
        />
        <Task
          icon={<CloudSunIcon />}
          title="Tarde"
          tasks={afternoonTasks}
          handleTaskChkChange={handleTaskChkChange}
          handleTaskDelete={handleTaskDelete}
        />
        <Task
          icon={<MoonIcon />}
          title="Noite"
          tasks={eveningTasks}
          handleTaskChkChange={handleTaskChkChange}
          handleTaskDelete={handleTaskDelete}
        />
      </section>
    </main>
  );
};

export default Tasks;
