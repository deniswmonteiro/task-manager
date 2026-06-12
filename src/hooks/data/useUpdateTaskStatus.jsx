import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpdateTaskStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["updateTaskStatus"],
    // Atualiza o status da tarefa
    mutationFn: async task => {
      const response = await fetch(`http://localhost:3000/tasks/${task.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: task.status }),
      });

      if (!response.ok) throw new Error("Erro ao atualizar status da tarefa.");

      const updatedTask = await response.json();

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
