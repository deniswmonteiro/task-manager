import { HomeIcon, TasksIcon } from "../assets/icons";
import SidebarLink from "./SidebarLink";

const Sidebar = () => {
  return (
    <aside className="h-screen bg-white">
      <div className="after:bg-brand-primary w-75 min-w-75 space-y-4 px-8 py-6 after:mt-6 after:block after:h-px after:w-full">
        <h1 className="text-brand-primary text-xl font-semibold">
          <a href="/">Task Manager</a>
        </h1>
        <p>
          Um simples{" "}
          <span className="text-brand-primary font-medium">
            organizador de tarefas.
          </span>
        </p>
      </div>
      <div className="px-4 py-2">
        <nav>
          <ul className="grid gap-2">
            <SidebarLink to="/">
              <HomeIcon />
              Início
            </SidebarLink>
            <SidebarLink to="/tasks">
              <TasksIcon />
              Minhas tarefas
            </SidebarLink>
          </ul>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
