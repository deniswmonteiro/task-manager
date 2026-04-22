const Task = ({ icon, title }) => {
  return (
    <div className="rounded-lg bg-white p-6">
      <div className="mb-3 border-b border-[#f4f4f5] pb-1.25">
        <div className="flex items-center gap-2 text-[#9a9c9f]">
          {icon}
          <p className="text-xs font-semibold">{title}</p>
        </div>
      </div>
      <div>
        <p>Nenhuma tarefa</p>
      </div>
    </div>
  );
};

export default Task;
