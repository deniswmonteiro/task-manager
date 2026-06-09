import "./AddTaskModal.css";

import React from "react";
import { createPortal } from "react-dom";
import { useForm } from "react-hook-form";
import { CSSTransition } from "react-transition-group";
import { toast } from "sonner";
import { v4 } from "uuid";

import { LoaderIcon } from "../assets/icons";
import Button from "./Button";
import Input from "./form/Input";
import Select from "./form/Select";

const AddTaskModal = ({
  modalIsOpen,
  handleModalClose,
  handleAddTaskSubmit,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      title: "",
      time: "",
      description: "",
    },
  });

  const nodeRef = React.useRef(null);

  const handleClose = () => {
    handleModalClose();
  };

  const handleSave = async data => {
    const task = {
      id: v4(),
      title: data.title.trim(),
      time: data.time.trim(),
      description: data.description.trim(),
      status: "not_started",
    };

    const response = await fetch("http://localhost:3000/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(task),
    });

    if (!response) return toast.error("Erro ao criar tarefa. Tente novamente.");

    handleAddTaskSubmit(task);
    handleClose();
    reset({
      title: "",
      time: "",
      description: "",
    });
  };

  // createPortal - é uma forma de renderizar um componente em qualquer lugar do DOM
  // CSSTransition - é uma forma de adicionar transições CSS ao componente
  return (
    <CSSTransition
      nodeRef={nodeRef}
      in={modalIsOpen}
      timeout={300}
      classNames="add-task-modal"
      unmountOnExit
    >
      <div>
        {createPortal(
          <div
            ref={nodeRef}
            className="fixed top-0 left-0 flex h-screen w-screen items-center justify-center backdrop-blur-xs"
          >
            <form
              onSubmit={handleSubmit(handleSave)}
              className="w-85 space-y-5 rounded-xl bg-white p-5 text-center shadow"
            >
              <div>
                <h2 className="text-brand-dark-blue mb-1 text-xl font-semibold">
                  Nova tarefa
                </h2>
                <p className="text-brand-text-gray text-sm">
                  Insira as informações abaixo
                </p>
              </div>
              <div className="space-y-4">
                <Input
                  id="title"
                  label={"Título"}
                  placeholder="Título da tarefa"
                  disabled={isSubmitting}
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
                  defaultValue=""
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
                  disabled={isSubmitting}
                  {...register("time", {
                    required: "O Horário é obrigatório.",
                    validate: value =>
                      !value.trim() ? "O Horário não pode ser vazio." : true,
                  })}
                  error={errors?.time?.message}
                />
                <Input
                  id="description"
                  label="Descrição"
                  placeholder="Descreva a tarefa"
                  disabled={isSubmitting}
                  {...register("description", {
                    required: "A Descrição é obrigatória.",
                    validate: value =>
                      !value.trim() ? "A Descrição não pode ser vazia." : true,
                  })}
                  error={errors?.description?.message}
                />
              </div>
              <div className="flex items-center justify-center gap-3">
                <Button
                  type="button"
                  color="secondary"
                  size="lg"
                  onClick={handleClose}
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  color="primary"
                  size="lg"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
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
          </div>,
          document.body
        )}
      </div>
    </CSSTransition>
  );
};

export default AddTaskModal;
