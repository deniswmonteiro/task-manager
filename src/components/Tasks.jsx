import Button from "./Button";
import TrashIcon from "../assets/icons/trash.svg?react";
import AddIcon from "../assets/icons/Add.svg?react";

const Tasks = () => {
  return (
    <main className="w-full px-8 py-16">
      <div className="flex w-full justify-between">
        <div>
          <span className="text-xs font-semibold text-[#00adb5]">
            Tarefas diárias
          </span>
          <h2 className="text-xl font-semibold">Minhas tarefas</h2>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="secondary">
            Limpar tarefas
            <TrashIcon />
          </Button>
          <Button variant="primary">
            Nova tarefa
            <AddIcon />
          </Button>
        </div>
      </div>
    </main>
  );
};

export default Tasks;
