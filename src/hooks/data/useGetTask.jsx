import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useGetTask = ({ taskId, onSuccess }) => {
  return useQuery({
    queryKey: ["task", taskId],
    // Busca uma tarefa específica e sincroniza o formulário com o resultado
    queryFn: async () => {
      try {
        const { data: task } = await axios.get(
          `http://localhost:3000/tasks/${taskId}`
        );

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
