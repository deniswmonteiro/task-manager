import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export const useUpdateTaskStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["updateTaskStatus"],
    // Atualiza o status da tarefa
    mutationFn: async task => {
      const { data: updatedTask } = await axios.patch(
        `http://localhost:3000/tasks/${task.id}`,
        task
      );

      return updatedTask;
    },
    onMutate: async updatedTask => {
      // Evita que um refetch em andamento sobrescreva a atualização otimista
      await queryClient.cancelQueries({ queryKey: ["tasks"] });

      // Guarda o estado anterior para restaurar se a requisição falhar
      const previousTasks = queryClient.getQueryData(["tasks"]);

      // Atualiza a tela imediatamente, antes da resposta do servidor
      queryClient.setQueryData(["tasks"], (tasksCache = []) => {
        return tasksCache.map(task =>
          task.id === updatedTask.id ? updatedTask : task
        );
      });

      return { previousTasks };
    },
    onError: (_error, _updatedTask, context) => {
      // Desfaz a atualização otimista quando a API rejeita a mudança
      queryClient.setQueryData(["tasks"], context.previousTasks);
    },
    onSuccess: updatedTask => {
      // Garante que o cache fique igual ao registro salvo pela API
      queryClient.setQueryData(["tasks"], (tasksCache = []) => {
        return tasksCache.map(task =>
          task.id === updatedTask.id ? updatedTask : task
        );
      });
    },
    retry: false,
  });
};
