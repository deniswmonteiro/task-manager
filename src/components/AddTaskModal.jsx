import "./AddTaskModal.css";

import React from "react";
import { createPortal } from "react-dom";
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
  /** Controlled Components */
  // const [title, setTitle] = React.useState("");
  // const [time, setTime] = React.useState("");
  // const [description, setDescription] = React.useState("");
  const [createIsLoading, setCreateIsLoading] = React.useState(false);

  const nodeRef = React.useRef(null);

  /** Uncontrolled Components */
  const titleRef = React.useRef(null);
  const timeRef = React.useRef(null);
  const descriptionRef = React.useRef(null);

  // const resetForm = () => {
  //   setTitle("");
  //   setTime("");
  //   setDescription("");
  // };

  const handleClose = () => {
    // resetForm();
    handleModalClose();
  };

  const handleSubmit = async () => {
    setCreateIsLoading(true);

    const title = titleRef.current.value;
    const time = timeRef.current.value;
    const description = descriptionRef.current.value;

    if (!title.trim() || !time.trim() || !description.trim()) {
      setCreateIsLoading(false);
      return toast.error("Preencha todos os campos.");
    }

    const task = {
      id: v4(),
      title,
      time,
      description,
      status: "not_started",
    };

    const response = await fetch("http://localhost:3000/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(task),
    });

    if (!response) {
      setCreateIsLoading(false);
      return toast.error("Erro ao criar tarefa. Tente novamente.");
    }

    setCreateIsLoading(false);
    handleAddTaskSubmit(task);
    handleClose();
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
            <div className="w-85 space-y-5 rounded-xl bg-white p-5 text-center shadow">
              <div>
                <h2 className="text-brand-dark-blue mb-1 text-xl font-semibold">
                  Nova tarefa
                </h2>
                <p className="text-brand-text-gray text-sm">
                  Insira as informações abaixo
                </p>
              </div>
              <form className="space-y-4">
                <Input
                  id="title"
                  label={"Título"}
                  placeholder="Título da tarefa"
                  // value={title}
                  // onChange={e => setTitle(e.target.value)}
                  ref={titleRef}
                  disabled={createIsLoading}
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
                  // value={time}
                  // onChange={e => setTime(e.target.value)}
                  ref={timeRef}
                  disabled={createIsLoading}
                />
                <Input
                  id="description"
                  label="Descrição"
                  placeholder="Descreva a tarefa"
                  // value={description}
                  // onChange={e => setDescription(e.target.value)}
                  ref={descriptionRef}
                  disabled={createIsLoading}
                />
              </form>
              <div className="flex items-center justify-center gap-3">
                <Button color="secondary" size="lg" onClick={handleClose}>
                  Cancelar
                </Button>
                <Button
                  color="primary"
                  size="lg"
                  onClick={handleSubmit}
                  disabled={createIsLoading}
                >
                  {createIsLoading ? (
                    <>
                      Salvando{" "}
                      <LoaderIcon className="text-brand-text-white animate-spin" />
                    </>
                  ) : (
                    "Salvar"
                  )}
                </Button>
              </div>
            </div>
          </div>,
          document.body
        )}
      </div>
    </CSSTransition>
  );
};

export default AddTaskModal;
