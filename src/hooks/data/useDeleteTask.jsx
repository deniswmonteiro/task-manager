import { useMutation, useQueryClient } from "@tanstack/react-query";

import { taskMutationKeys } from "../../keys/mutations";
import { taskQueryKeys } from "../../keys/queries";
import { api } from "../../lib/axios";

export const useDeleteTask = taskId => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: taskMutationKeys.delete(taskId),
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
    onSuccess: () => {
      // A resposta do DELETE pode vir vazia; o id confiável é o recebido pelo hook.
      queryClient.setQueryData(taskQueryKeys.getAll(), (tasksCache = []) => {
        return tasksCache.filter(task => String(task.id) !== String(taskId));
      });
      queryClient.removeQueries({ queryKey: taskQueryKeys.getOne(taskId) });
    },
    retry: false,
  });
};
