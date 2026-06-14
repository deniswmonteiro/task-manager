import { useMutation, useQueryClient } from "@tanstack/react-query";

import { taskQueryKeys } from "../../keys/queries";
import { api } from "../../lib/axios";

export const useUpdateTask = taskId => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["updateTask", taskId],
    // Atualiza os dados de uma tarefa a partir do seu id
    mutationFn: async task => {
      try {
        const { data: updatedTask } = await api.patch(`/tasks/${taskId}`, task);

        return updatedTask;
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
    onSuccess: updatedTask => {
      // Substitui no cache apenas a tarefa retornada pela API
      queryClient.setQueryData(taskQueryKeys.getAll(), (tasksCache = []) => {
        return tasksCache.map(task =>
          task.id === updatedTask.id ? updatedTask : task
        );
      });
    },
    retry: false,
  });
};
