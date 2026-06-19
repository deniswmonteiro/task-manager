import DashboardCards from "../components/DashboardCards";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import TaskItem from "../components/TaskItem";
import { useGetTasks } from "../hooks/data/useGetTasks";

const HomePage = () => {
  const { data: tasks } = useGetTasks();

  if (!tasks) return;

  return (
    <div className="flex">
      <Sidebar />
      <main className="h-screen w-full space-y-6 overflow-y-auto px-8 py-16">
        <Header title="Dashboard" subtitle="Dashboard" />
        <DashboardCards tasks={tasks} />
        <section>
          <div className="bg-brand-white space-y-6 rounded-xl p-6">
            <div>
              <h2 className="text-brand-dark-blue text-xl font-semibold">
                Tarefas
              </h2>
              <span className="text-brand-dark-gray text-sm">
                Resumo das tarefas disponíveis
              </span>
            </div>
            <ul className="space-y-3">
              {tasks.map(task => {
                return (
                  <TaskItem
                    key={task.id}
                    id={task.id}
                    title={task.title}
                    status={task.status}
                  />
                );
              })}
            </ul>
          </div>
        </section>
      </main>
    </div>
  );
};

export default HomePage;
