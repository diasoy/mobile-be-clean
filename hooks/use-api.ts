import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

/**
 * Example: Fetch user profile
 */
export const useUserProfile = (userId?: string) => {
  return useQuery({
    queryKey: ["user", userId],
    queryFn: async () => {
      const response = await fetch(`https://api.example.com/users/${userId}`);
      if (!response.ok) throw new Error("Failed to fetch user");
      return response.json();
    },
    enabled: !!userId, // Only run query if userId exists
  });
};

/**
 * Example: Login mutation
 */
export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (credentials: { email: string; password: string }) => {
      const response = await fetch("https://api.example.com/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });
      if (!response.ok) throw new Error("Login failed");
      return response.json();
    },
    onSuccess: (data) => {
      // Invalidate and refetch user queries after successful login
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });
};

/**
 * Example: Fetch posts list
 */
export const usePosts = () => {
  return useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const response = await fetch("https://api.example.com/posts");
      if (!response.ok) throw new Error("Failed to fetch posts");
      return response.json();
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

/**
 * Example: Create post mutation
 */
export const useCreatePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (post: { title: string; content: string }) => {
      const response = await fetch("https://api.example.com/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(post),
      });
      if (!response.ok) throw new Error("Failed to create post");
      return response.json();
    },
    onSuccess: () => {
      // Invalidate posts query to refetch the list
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
};
