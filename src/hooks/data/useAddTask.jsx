import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export const useAddTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: "addTask",
    // Envia a nova tarefa para a API
    mutationFn: async task => {
      try {
        const { data: newTask } = await axios.post(
          "http://localhost:3000/tasks",
          task
        );

        return newTask;
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
    onSuccess: newTask => {
      // Mantém a lista atualizada no cache sem precisar buscar todas as tarefas de novo
      queryClient.setQueryData(["tasks"], (tasksCache = []) => {
        return [...tasksCache, newTask];
      });
    },
    retry: false,
  });
};
