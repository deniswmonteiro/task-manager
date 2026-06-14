import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

import { taskQueryKeys } from "../../keys/queries";
import { api } from "../../lib/axios";

export const useGetTasks = () => {
  return useQuery({
    queryKey: taskQueryKeys.getAll(),
    // Busca a lista completa de tarefas
    queryFn: async () => {
      try {
        const { data: tasks } = await api.get("/tasks");

        return tasks;
      } catch (error) {
        console.error(error);
        toast.error("Erro ao carregar tarefas. Tente novamente.");
        return [];
      }
    },
    retry: false,
  });
};
