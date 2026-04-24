import { createPortal } from "react-dom";

const AddTaskModal = ({ isOpen }) => {
  if (!isOpen) return null;

  return createPortal(
    <div className="fixed top-0 left-0 flex h-screen w-screen items-center justify-center backdrop-blur-xs">
      <div className="w-85 rounded-xl bg-white p-5 text-center shadow">
        <h2 className="mb-1 text-xl font-semibold text-[#35383e]">
          Nova tarefa
        </h2>
        <p className="text-sm text-[#9a9c9f]">Insira as informações abaixo</p>
      </div>
    </div>,
    document.body
  );
};

export default AddTaskModal;
