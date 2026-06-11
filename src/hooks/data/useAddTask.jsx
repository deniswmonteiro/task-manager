import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useAddTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: "addTask",
    mutationFn: async task => {
      try {
        const response = await fetch("http://localhost:3000/tasks", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(task),
        });

        if (!response.ok) throw new Error("Erro ao criar tarefa.");

        const newTask = await response.json();

        return newTask;
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
    onSuccess: newTask => {
      queryClient.setQueryData(["tasks"], (tasksCache = []) => {
        return [...tasksCache, newTask];
      });
    },
    retry: false,
  });
};
