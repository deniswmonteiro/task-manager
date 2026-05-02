import "./AddTaskModal.css";

import React from "react";
import { createPortal } from "react-dom";
import { CSSTransition } from "react-transition-group";
import { v4 } from "uuid";

import Button from "./Button";
import Input from "./form/Input";
import Select from "./form/Select";

const AddTaskModal = ({
  modalIsOpen,
  handleModalClose,
  handleAddTaskSubmit,
}) => {
  const [title, setTitle] = React.useState("");
  const [time, setTime] = React.useState("");
  const [description, setDescription] = React.useState("");

  const nodeRef = React.useRef();

  const resetForm = () => {
    setTitle("");
    setTime("");
    setDescription("");
  };

  const handleClose = () => {
    resetForm();
    handleModalClose();
  };

  const handleSubmit = () => {
    handleAddTaskSubmit({
      id: v4(),
      title,
      time,
      description,
      status: "not_started",
    });

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
                <h2 className="mb-1 text-xl font-semibold text-[#35383e]">
                  Nova tarefa
                </h2>
                <p className="text-sm text-[#9a9c9f]">
                  Insira as informações abaixo
                </p>
              </div>
              <div className="space-y-4">
                <Input
                  id="title"
                  label={"Título"}
                  placeholder="Título da tarefa"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
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
                  value={time}
                  onChange={e => setTime(e.target.value)}
                />
                <Input
                  id="description"
                  label="Descrição"
                  placeholder="Descreva a tarefa"
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                />
              </div>
              <div className="flex items-center justify-center gap-3">
                <Button variant="secondary" size="lg" onClick={handleClose}>
                  Cancelar
                </Button>
                <Button variant="primary" size="lg" onClick={handleSubmit}>
                  Salvar
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
