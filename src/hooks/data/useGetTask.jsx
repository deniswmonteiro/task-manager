import { useQuery } from "@tanstack/react-query";

export const useGetTask = ({ taskId, onSuccess }) => {
  return useQuery({
    queryKey: ["task", taskId],
    queryFn: async () => {
      try {
        const response = await fetch(`http://localhost:3000/tasks/${taskId}`);

        if (!response.ok) throw new Error("Erro ao buscar tarefa.");

        const task = await response.json();

        onSuccess(task);

        return task;
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
    retry: false,
  });
};
