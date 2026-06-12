import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";

export const useGetTasks = () => {
  return useQuery({
    queryKey: ["tasks"],
    // Busca a lista completa de tarefas
    queryFn: async () => {
      try {
        const { data: tasks } = await axios("http://localhost:3000/tasks");

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
