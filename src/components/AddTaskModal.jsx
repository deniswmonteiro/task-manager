import { createPortal } from "react-dom";

import Button from "./Button";
import Input from "./form/Input";

const AddTaskModal = ({ modalIsOpen, handleModalClose }) => {
  if (!modalIsOpen) return null;

  return createPortal(
    <div className="fixed top-0 left-0 flex h-screen w-screen items-center justify-center backdrop-blur-xs">
      <div className="w-85 space-y-5 rounded-xl bg-white p-5 text-center shadow">
        <div>
          <h2 className="mb-1 text-xl font-semibold text-[#35383e]">
            Nova tarefa
          </h2>
          <p className="text-sm text-[#9a9c9f]">Insira as informações abaixo</p>
        </div>
        <div className="space-y-4">
          <Input id="title" label="Título" placeholder="Título da tarefa" />
          <Input
            id="description"
            label="Descrição"
            placeholder="Descreva a tarefa"
          />
        </div>
        <div className="flex items-center justify-center gap-3">
          <Button
            variant="secondary"
            size="lg"
            onClick={() => handleModalClose(false)}
          >
            Cancelar
          </Button>
          <Button variant="primary" size="lg">
            Salvar
          </Button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default AddTaskModal;
