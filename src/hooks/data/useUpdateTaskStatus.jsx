import { useMutation, useQueryClient } from "@tanstack/react-query";

import { taskQueryKeys } from "../../keys/queries";
import { api } from "../../lib/axios";

export const useUpdateTaskStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["updateTaskStatus"],
    // Atualiza o status da tarefa
    mutationFn: async task => {
      const { data: updatedTask } = await api.patch(`/tasks/${task.id}`, task);

      return updatedTask;
    },
    onMutate: async updatedTask => {
      // Evita que um refetch em andamento sobrescreva a atualização otimista
      await queryClient.cancelQueries({ queryKey: taskQueryKeys.getAll() });

      // Guarda o estado anterior para restaurar se a requisição falhar
      const previousTasks = queryClient.getQueryData(taskQueryKeys.getAll());

      // Atualiza a tela imediatamente, antes da resposta do servidor
      queryClient.setQueryData(taskQueryKeys.getAll(), (tasksCache = []) => {
        return tasksCache.map(task =>
          task.id === updatedTask.id ? updatedTask : task
        );
      });

      return { previousTasks };
    },
    onError: (_error, _updatedTask, context) => {
      // Desfaz a atualização otimista quando a API rejeita a mudança
      queryClient.setQueryData(taskQueryKeys.getAll(), context.previousTasks);
    },
    onSuccess: updatedTask => {
      // Garante que o cache fique igual ao registro salvo pela API
      queryClient.setQueryData(taskQueryKeys.getAll(), (tasksCache = []) => {
        return tasksCache.map(task =>
          task.id === updatedTask.id ? updatedTask : task
        );
      });
    },
    retry: false,
  });
};
