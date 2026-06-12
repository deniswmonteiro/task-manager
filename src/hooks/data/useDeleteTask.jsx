import { useMutation, useQueryClient } from "@tanstack/react-query";

import { api } from "../../lib/axios";

export const useDeleteTask = taskId => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["deleteTask", taskId],
    // Remove a tarefa no servidor usando o id recebido pelo hook
    mutationFn: async () => {
      try {
        const { data: deletedTask } = await api.delete(`/tasks/${taskId}`);

        return deletedTask;
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
    onSuccess: deletedTask => {
      // Remove do cache a mesma tarefa apagada no servidor
      queryClient.setQueryData(["tasks"], (tasksCache = []) => {
        return tasksCache.filter(task => task.id !== deletedTask.id);
      });
    },
    retry: false,
  });
};
