import { LayoutListIcon, LoaderIcon, TasksIcon } from "../assets/icons";
import DashboardCard from "../components/DashboardCard";

const DashboardCards = ({ tasks }) => {
  const allTasks = tasks && tasks.length;
  const notStartedTasks =
    tasks && tasks.filter(task => task.status === "not_started").length;
  const inProgressTasks =
    tasks && tasks.filter(task => task.status === "in_progress").length;
  const completedTasks =
    tasks && tasks.filter(task => task.status === "done").length;

  return (
    <section className="grid grid-cols-4 gap-8">
      <DashboardCard
        icon={<LayoutListIcon />}
        value={allTasks}
        description="Tarefas totais"
      />
      <DashboardCard
        icon={<LayoutListIcon />}
        value={notStartedTasks}
        description="Tarefas não iniciadas"
      />
      <DashboardCard
        icon={<LoaderIcon />}
        value={inProgressTasks}
        description="Tarefas em andamento"
      />
      <DashboardCard
        icon={<TasksIcon />}
        value={completedTasks}
        description="Tarefas concluídas"
      />
    </section>
  );
};

export default DashboardCards;
