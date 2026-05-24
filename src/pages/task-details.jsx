import React from "react";
import { useParams } from "react-router-dom";

const TaskDetailsPage = () => {
  const [task, setTask] = React.useState(null);
  const { taskId } = useParams();

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
    <div>
      <p>{task.title}</p>
      <p>{task.status}</p>
    </div>
  );
};

export default TaskDetailsPage;
