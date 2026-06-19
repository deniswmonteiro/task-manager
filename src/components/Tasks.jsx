import { CloudSunIcon, LoaderIcon, MoonIcon, SunIcon } from "../assets/icons";
import { useGetTasks } from "../hooks/data/useGetTasks";
import Header from "./Header";
import Task from "./Task";

const Tasks = () => {
  const { data: tasks = [], isLoading } = useGetTasks();

  // A tela exibe a mesma lista separada por período do dia
  const morningTasks = tasks.filter(task => task.time === "morning");
  const afternoonTasks = tasks.filter(task => task.time === "afternoon");
  const eveningTasks = tasks.filter(task => task.time === "evening");

  return (
    <main className="h-screen w-full space-y-6 overflow-y-auto px-8 py-16">
      <Header title="Minhas Tarefas" subtitle="Minhas Tarefas" />

      {/* Lista de tarefas */}
      <section className="grid gap-6 rounded-xl">
        {isLoading ? (
          <div className="bg-brand-white text-brand-primary flex items-center justify-center gap-2 rounded-lg p-6 text-sm">
            Carregando tarefas...
            <LoaderIcon className="animate-spin" />
          </div>
        ) : (
          <>
            <Task icon={<SunIcon />} title="Manhã" tasks={morningTasks} />
            <Task
              icon={<CloudSunIcon />}
              title="Tarde"
              tasks={afternoonTasks}
            />
            <Task icon={<MoonIcon />} title="Noite" tasks={eveningTasks} />
          </>
        )}
      </section>
    </main>
  );
};

export default Tasks;
