import { useQuery } from "@tanstack/react-query";
import { apiService } from "../../app/services/api/ApiService";
import { Profile } from "../../features/models/Profile";

interface Project {
  id: string;
  name: string;
}

export function useGetProjects() {
  {
    return useQuery({
      queryKey: ["projects"],
      queryFn: async () => {
        const response = await apiService.get<Project[]>({
          url: "/projects",
        });
        return response.data;
      },
    });
  }
}

export type TaskStatus = "create";

interface Task {
  title: string;
  startDate: string;
  endDate: string;
  profile: Omit<Profile, "email">;
  project: Project;
  status: TaskStatus;
}

interface TaskFilters {
  username?: string;
  projectId?: string;
}

export function useGetMyTasks(filtres?: TaskFilters) {
  return useQuery({
    queryKey: ["tasks", filtres],
    queryFn: async () => {
      const response = await apiService.get<Task[]>({
        url: "/tasks/my",
      });
      return response.data;
    },
  });
}
