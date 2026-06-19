import {
  GlassWaterIcon,
  LayoutListIcon,
  LoaderIcon,
  TasksIcon,
} from "../assets/icons";
import DashboardCard from "../components/DashboardCard";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { useGetTasks } from "../hooks/data/useGetTasks";

const HomePage = () => {
  const { data: tasks } = useGetTasks();

  const allTasks = tasks && tasks.length;
  const completedTasks =
    tasks && tasks.filter(task => task.status === "done").length;
  const inProgressTasks =
    tasks && tasks.filter(task => task.status === "in_progress").length;

  if (!tasks) return;

  return (
    <div className="flex">
      <Sidebar />
      <main className="h-screen w-full space-y-6 overflow-y-auto px-8 py-16">
        <Header title="Dashboard" subtitle="Dashboard" />

        <section className="grid grid-cols-4 gap-9">
          <DashboardCard
            icon={<LayoutListIcon />}
            value={allTasks}
            description="Tarefas disponíveis"
          />
          <DashboardCard
            icon={<TasksIcon />}
            value={completedTasks}
            description="Tarefas concluídas"
          />
          <DashboardCard
            icon={<LoaderIcon />}
            value={inProgressTasks}
            description="Tarefas em andamento"
          />
          <DashboardCard
            icon={<GlassWaterIcon />}
            value="40"
            description="Água"
          />
        </section>
      </main>
    </div>
  );
};

export default HomePage;
