import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import { ArrowIcon, TrashIcon } from "../assets/icons";
import { ChevronIcon } from "../assets/icons";
import Button from "../components/Button";
import Input from "../components/form/Input";
import Select from "../components/form/Select";
import Sidebar from "../components/Sidebar";

const TaskDetailsPage = () => {
  const [task, setTask] = React.useState(null);
  const { taskId } = useParams();
  const navigate = useNavigate();

  React.useEffect(() => {
    const fetchTask = async () => {
      const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
        method: "GET",
      });
      const data = await response.json();

      setTask(data);
    };

    fetchTask();
  }, [taskId]);

  if (!task) {
    return <div>Tarefa não encontrada</div>;
  }

  return (
    <div className="flex">
      <Sidebar />
      <main className="h-screen w-full space-y-6 overflow-y-auto px-8 py-16">
        <div className="flex w-full items-end justify-between">
          <div className="flex flex-col">
            <Link
              to={"/"}
              className="bg-brand-primary text-brand-white hover:shadow-brand-primary mb-3 flex h-7 w-7 items-center justify-center rounded-full duration-300 hover:shadow-sm hover:transition-all hover:duration-300"
            >
              <ArrowIcon />
            </Link>
            <div className="mb-1.5 flex items-center gap-1.5 text-xs">
              <Link
                to={"/"}
                className="text-brand-text-gray hover:text-brand-dark-gray duration-300 hover:transition-all hover:duration-300"
              >
                Minhas tarefas
              </Link>
              <ChevronIcon className="text-brand-text-gray h-1.5 w-0.75" />
              <span className="text-brand-primary font-semibold">
                {task.title}
              </span>
            </div>
            <h1 className="text-brand-dark-blue text-xl font-semibold">
              {task.title}
            </h1>
          </div>

          <Button color="danger">
            <TrashIcon />
            Deletar tarefa
          </Button>
        </div>
        <div>
          <form>
            <div className="bg-brand-white space-y-6 rounded-xl p-6">
              <Input
                id="name"
                label={"Nome"}
                value={task.title}
                // ref={titleRef}
                // disabled={deleteIsLoading}
              />

              <Select
                id="time"
                label={"Horário"}
                defaultValue={task.time}
                options={[
                  {
                    value: "",
                    label: "Selecione o horário",
                    disabled: true,
                  },
                  { value: "morning", label: "Manhã" },
                  { value: "afternoon", label: "Tarde" },
                  { value: "evening", label: "Noite" },
                ]}
                // ref={timeRef}
                // disabled={deleteIsLoading}
              />

              <Input
                id="description"
                label={"Descrição"}
                value={task.description}
                // ref={descriptionRef}
                // disabled={deleteIsLoading}
              />
            </div>

            <div className="mt-9 flex items-center justify-end gap-3">
              <Button color="secondary" size="lg" onClick={() => navigate("/")}>
                Cancelar
              </Button>
              <Button color="primary" size="lg">
                Salvar
              </Button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default TaskDetailsPage;
