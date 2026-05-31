import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

import { ArrowIcon, LoaderIcon, TrashIcon } from "../assets/icons";
import { ChevronIcon } from "../assets/icons";
import Button from "../components/Button";
import Input from "../components/form/Input";
import Select from "../components/form/Select";
import Sidebar from "../components/Sidebar";

const TaskDetailsPage = () => {
  const [task, setTask] = React.useState(null);
  const [title, setTitle] = React.useState(null);
  const [time, setTime] = React.useState(null);
  const [description, setDescription] = React.useState(null);
  const [deleteIsLoading, setDeleteIsLoading] = React.useState(false);
  const [updateIsLoading, setUpdateIsLoading] = React.useState(false);
  const { taskId } = useParams();
  const navigate = useNavigate();

  React.useEffect(() => {
    const fetchTask = async () => {
      const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
        method: "GET",
      });
      const data = await response.json();

      setTask(data);
      setTitle(data.title);
      setTime(data.time);
      setDescription(data.description);
    };

    fetchTask();
  }, [taskId]);

  const handleSubmit = async () => {
    setUpdateIsLoading(true);

    if (!title.trim() || !time.trim() || !description.trim()) {
      setUpdateIsLoading(false);
      return toast.error("Preencha todos os campos.");
    }

    const task = {
      title,
      time,
      description,
    };

    const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(task),
    });

    if (!response) {
      setUpdateIsLoading(false);
      return toast.error("Erro ao atualizar tarefa. Tente novamente.");
    }

    setUpdateIsLoading(false);
    navigate("/");
  };

  const handleDelete = async () => {
    setDeleteIsLoading(true);

    const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
      method: "DELETE",
    });

    if (!response) {
      setDeleteIsLoading(false);
      return toast.error("Erro ao excluir tarefa. Tente novamente.");
    }

    setDeleteIsLoading(false);
    navigate("/");
  };

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

          <Button
            color="danger"
            onClick={handleDelete}
            disabled={deleteIsLoading}
          >
            {deleteIsLoading ? (
              <>
                <LoaderIcon className="text-brand-text-white animate-spin" />{" "}
                Deletando
              </>
            ) : (
              <>
                <TrashIcon />
                Deletar tarefa
              </>
            )}
          </Button>
        </div>
        <div>
          <form>
            <div className="bg-brand-white space-y-6 rounded-xl p-6">
              <Input
                id="name"
                label={"Nome"}
                defaultValue={title}
                onChange={e => setTitle(e.target.value)}
                disabled={updateIsLoading}
              />

              <Select
                id="time"
                label={"Horário"}
                defaultValue={time}
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
                onChange={e => setTime(e.target.value)}
                disabled={updateIsLoading}
              />

              <Input
                id="description"
                label={"Descrição"}
                defaultValue={description}
                onChange={e => setDescription(e.target.value)}
                disabled={updateIsLoading}
              />
            </div>

            <div className="mt-9 flex items-center justify-end gap-3">
              <Button
                color="primary"
                size="lg"
                onClick={handleSubmit}
                disabled={updateIsLoading}
              >
                {updateIsLoading ? (
                  <>
                    Salvando{" "}
                    <LoaderIcon className="text-brand-text-white animate-spin" />
                  </>
                ) : (
                  "Salvar"
                )}
              </Button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default TaskDetailsPage;
