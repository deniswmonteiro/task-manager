import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpdateTask = taskId => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["updateTask", taskId],
    // Atualiza os dados de uma tarefa a partir do seu id
    mutationFn: async task => {
      try {
        const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(task),
        });

        if (!response.ok) throw new Error("Erro ao atualizar a tarefa.");

        const updatedTask = await response.json();

        return updatedTask;
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
    onSuccess: updatedTask => {
      // Substitui no cache apenas a tarefa retornada pela API
      queryClient.setQueryData(["tasks"], (tasksCache = []) => {
        return tasksCache.map(task =>
          task.id === updatedTask.id ? updatedTask : task
        );
      });
    },
    retry: false,
  });
};
