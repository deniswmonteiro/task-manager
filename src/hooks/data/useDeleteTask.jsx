import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteTask = taskId => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["deleteTask", taskId],
    // Remove a tarefa no servidor usando o id recebido pelo hook
    mutationFn: async () => {
      try {
        const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
          method: "DELETE",
        });

        if (!response.ok) throw new Error("Erro ao excluir a tarefa.");

        const deletedTask = await response.json();

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
