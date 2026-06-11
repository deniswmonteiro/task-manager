import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

export const useGetTasks = () => {
  return useQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      try {
        const response = await fetch("http://localhost:3000/tasks");

        if (!response.ok) throw new Error("Erro ao carregar tarefas.");

        const result = await response.json();

        return result;
      } catch (error) {
        console.error(error);
        toast.error("Erro ao carregar tarefas. Tente novamente.");
        return [];
      }
    },
    retry: false,
  });
};
