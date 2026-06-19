import { useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

import { ArrowIcon, LoaderIcon, TrashIcon } from "../assets/icons";
import { ChevronIcon } from "../assets/icons";
import Button from "../components/Button";
import Input from "../components/form/Input";
import Select from "../components/form/Select";
import Sidebar from "../components/Sidebar";
import { useDeleteTask } from "../hooks/data/useDeleteTask";
import { useGetTask } from "../hooks/data/useGetTask";
import { useUpdateTask } from "../hooks/data/useUpdateTask";

const TaskDetailsPage = () => {
  const navigate = useNavigate();
  const { taskId } = useParams();

  // O reset será usado para preencher o formulário depois que a tarefa carregar
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      title: "",
      time: "",
      description: "",
    },
  });

  const { data: task } = useGetTask({ taskId, onSuccess: reset });
  const { mutate: mutateUpdate, isPending: isUpdatePending } =
    useUpdateTask(taskId);
  const { mutate: mutateDelete, isPending: isDeletePending } =
    useDeleteTask(taskId);

  const handleSave = async data => {
    // Remove espaços extras antes de enviar os campos editáveis
    const task = {
      title: data.title.trim(),
      time: data.time.trim(),
      description: data.description.trim(),
    };

    mutateUpdate(task, {
      onSuccess: () => {
        toast.success("Tarefa atualizada com sucesso.");
        navigate("/tasks");
      },
      onError: () => {
        toast.error("Erro ao atualizar a tarefa. Tente novamente.");
      },
    });
  };

  const handleDelete = async () => {
    // A exclusão volta para a lista para evitar permanecer em uma rota inválida
    mutateDelete(undefined, {
      onSuccess: () => {
        toast.success("Tarefa excluída com sucesso.");
        navigate("/tasks");
      },
      onError: () => {
        toast.error("Erro ao excluir tarefa. Tente novamente.");
      },
    });
  };

  if (!task) return <div>Tarefa não encontrada</div>;

  return (
    <div className="flex">
      <Sidebar />
      <main className="h-screen w-full space-y-6 overflow-y-auto px-8 py-16">
        <div className="flex w-full items-end justify-between">
          <div className="flex flex-col">
            <Link
              to={"/tasks"}
              className="bg-brand-primary text-brand-white hover:shadow-brand-primary mb-3 flex h-7 w-7 items-center justify-center rounded-full duration-300 hover:shadow-sm hover:transition-all hover:duration-300"
            >
              <ArrowIcon />
            </Link>
            <div className="mb-1.5 flex items-center gap-1.5 text-xs">
              <Link
                to={"/tasks"}
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
            disabled={isDeletePending}
          >
            {isDeletePending ? (
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
          <form onSubmit={handleSubmit(handleSave)}>
            <div className="bg-brand-white space-y-6 rounded-xl p-6">
              <Input
                id="title"
                label={"Título"}
                disabled={isUpdatePending}
                {...register("title", {
                  required: "O Título é obrigatório.",
                  validate: value =>
                    !value.trim() ? "O Título não pode ser vazio." : true,
                })}
                error={errors?.title?.message}
              />

              <Select
                id="time"
                label={"Horário"}
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
                disabled={isUpdatePending}
                {...register("time", {
                  required: "O Horário é obrigatório.",
                  validate: value =>
                    !value.trim() ? "O Horário não pode ser vazio." : true,
                })}
                error={errors?.time?.message}
              />

              <Input
                id="description"
                label={"Descrição"}
                disabled={isUpdatePending}
                {...register("description", {
                  required: "A Descrição é obrigatória.",
                  validate: value =>
                    !value.trim() ? "A Descrição não pode ser vazia." : true,
                })}
                error={errors?.description?.message}
              />
            </div>

            <div className="mt-9 flex items-center justify-end gap-3">
              <Button
                type="submit"
                color="primary"
                size="lg"
                disabled={isUpdatePending || isDeletePending}
              >
                {isUpdatePending ? (
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
