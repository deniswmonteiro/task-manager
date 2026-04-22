import SidebarButton from "./SidebarButton";
import HomeIcon from "../assets/icons/home.svg?react";
import TaskIcon from "../assets/icons/tasks.svg?react";

const Sidebar = () => {
  return (
    <aside className="h-screen w-68 bg-white">
      <div className="space-y-4 px-8 py-6 after:mt-6 after:block after:h-px after:w-full after:bg-[#00adb5]">
        <h1 className="text-xl font-semibold text-[#00adb5]">
          <a href="/">Task Manager</a>
        </h1>
        <p>
          Um simples{" "}
          <span className="font-medium text-[#00adb5]">
            organizador de tarefas.
          </span>
        </p>
      </div>
      <div className="px-4 py-2">
        <nav>
          <ul className="grid gap-2">
            <SidebarButton>
              <HomeIcon />
              Início
            </SidebarButton>
            <SidebarButton variant="active">
              <TaskIcon />
              Minhas tarefas
            </SidebarButton>
          </ul>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
