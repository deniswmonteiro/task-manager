import { useMutation, useQueryClient } from "@tanstack/react-query";

import { taskQueryKeys } from "../../keys/queries";
import { api } from "../../lib/axios";

export const useAddTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: "addTask",
    // Envia a nova tarefa para a API
    mutationFn: async task => {
      try {
        const { data: newTask } = await api.post("/tasks", task);

        return newTask;
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
    onSuccess: newTask => {
      // Mantém a lista atualizada no cache sem precisar buscar todas as tarefas de novo
      queryClient.setQueryData(taskQueryKeys.getAll(), (tasksCache = []) => {
        return [...tasksCache, newTask];
      });
    },
    retry: false,
  });
};
