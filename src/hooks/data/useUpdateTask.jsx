import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpdateTask = taskId => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["updateTask", taskId],
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
      queryClient.setQueryData(["tasks"], (tasksCache = []) => {
        return tasksCache.map(task =>
          task.id === updatedTask.id ? updatedTask : task
        );
      });
    },
    retry: false,
  });
};
