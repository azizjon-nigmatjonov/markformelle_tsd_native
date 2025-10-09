/**
 * Example React Query Hook
 * Template for creating custom hooks for API services
 */

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  exampleService,
  ExampleItem,
  CreateExampleData,
} from "@/api/services/example.service";

// Query keys
export const exampleKeys = {
  all: ["examples"] as const,
  detail: (id: number) => ["examples", id] as const,
};

/**
 * Get all items
 */
export const useExamples = () => {
  return useQuery({
    queryKey: exampleKeys.all,
    queryFn: () => exampleService.getAll(),
  });
};

/**
 * Get item by ID
 */
export const useExample = (id: number) => {
  return useQuery({
    queryKey: exampleKeys.detail(id),
    queryFn: () => exampleService.getById(id),
    enabled: !!id, // Only fetch if id exists
  });
};

/**
 * Create item
 */
export const useCreateExample = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateExampleData) => exampleService.create(data),
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: exampleKeys.all });
    },
  });
};

/**
 * Update item
 */
export const useUpdateExample = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: number;
      data: Partial<CreateExampleData>;
    }) => exampleService.update(id, data),
    onSuccess: (data, variables) => {
      // Invalidate queries
      queryClient.invalidateQueries({ queryKey: exampleKeys.all });
      queryClient.invalidateQueries({
        queryKey: exampleKeys.detail(variables.id),
      });
    },
  });
};

/**
 * Delete item
 */
export const useDeleteExample = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => exampleService.delete(id),
    onSuccess: () => {
      // Invalidate queries
      queryClient.invalidateQueries({ queryKey: exampleKeys.all });
    },
  });
};
