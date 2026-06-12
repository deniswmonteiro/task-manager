import React from "react";
import { toast } from "sonner";

import {
  AddIcon,
  CloudSunIcon,
  LoaderIcon,
  MoonIcon,
  SunIcon,
  TrashIcon,
} from "../assets/icons";
import { useGetTasks } from "../hooks/data/useGetTasks";
import { useUpdateTaskStatus } from "../hooks/data/useUpdateTaskStatus";
import AddTaskModal from "./AddTaskModal";
import Button from "./Button";
import Task from "./Task";

const Tasks = () => {
  const { data: tasks = [], isLoading } = useGetTasks();

  const [addTaskModalIsOpen, setAddTaskModalIsOpen] = React.useState(false);
  const { mutate: mutateUpdateTaskStatus } = useUpdateTaskStatus();

  // A tela exibe a mesma lista separada por período do dia
  const morningTasks = tasks.filter(task => task.time === "morning");
  const afternoonTasks = tasks.filter(task => task.time === "afternoon");
  const eveningTasks = tasks.filter(task => task.time === "evening");

  const handleTaskChkChange = taskId => {
    const task = tasks.find(task => task.id === taskId);

    if (!task) return;

    let status = "not_started";

    // Ciclo de status: não iniciada -> em progresso -> concluída -> não iniciada
    if (task.status === "not_started") {
      status = "in_progress";
      toast.success("Tarefa iniciada com sucesso.");
    }

    if (task.status === "in_progress") {
      status = "done";
      toast.success("Tarefa concluída com sucesso.");
    }

    if (task.status === "done") {
      status = "not_started";
      toast.success("Tarefa reiniciada com sucesso.");
    }

    // O hook aplica atualização otimista para refletir a mudança em tempo real
    mutateUpdateTaskStatus({ ...task, status });
  };

  return (
    <main className="h-screen w-full overflow-y-auto px-8 py-16">
      {/* Ações */}
      <section className="flex w-full justify-between">
        <div>
          <span className="text-brand-primary text-xs font-semibold">
            Minhas tarefas
          </span>
          <h2 className="text-xl font-semibold">Minhas tarefas</h2>
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

      {/* Lista de tarefas */}
      <section className="mt-6 grid gap-6 rounded-xl">
        {isLoading ? (
          <div className="bg-brand-white text-brand-primary flex items-center justify-center gap-2 rounded-lg p-6 text-sm">
            Carregando tarefas
            <LoaderIcon className="animate-spin" />
          </div>
        ) : (
          <>
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
          </>
        )}
      </section>

      <AddTaskModal
        modalIsOpen={addTaskModalIsOpen}
        handleModalClose={() => setAddTaskModalIsOpen(false)}
      />
    </main>
  );
};

export default Tasks;
