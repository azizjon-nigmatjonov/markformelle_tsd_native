/**
 * Machines React Query Hook
 * Custom hooks for machines API operations
 */

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  machinesService,
  Machine,
  MachinesResponse,
  CreateMachineData,
} from "@/api/services/machines.service";

// Query keys
export const machinesKeys = {
  all: ["machines"] as const,
  detail: (id: number) => ["machines", id] as const,
};

/**
 * Get all machines
 */
export const useMachines = () => {
  return useQuery({
    queryKey: machinesKeys.all,
    queryFn: () => machinesService.getAll(),
  });
};

/**
 * Get machine by ID
 */
export const useMachine = (id: number) => {
  return useQuery({
    queryKey: machinesKeys.detail(id),
    queryFn: () => machinesService.getById(id),
    enabled: !!id, // Only fetch if id exists
  });
};

/**
 * Create machine
 */
export const useCreateMachine = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateMachineData) => machinesService.create(data),
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: machinesKeys.all });
    },
  });
};

/**
 * Update machine
 */
export const useUpdateMachine = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: number;
      data: Partial<CreateMachineData>;
    }) => machinesService.update(id, data),
    onSuccess: (data, variables) => {
      // Invalidate queries
      queryClient.invalidateQueries({ queryKey: machinesKeys.all });
      queryClient.invalidateQueries({
        queryKey: machinesKeys.detail(variables.id),
      });
    },
  });
};

/**
 * Delete machine
 */
export const useDeleteMachine = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => machinesService.delete(id),
    onSuccess: () => {
      // Invalidate queries
      queryClient.invalidateQueries({ queryKey: machinesKeys.all });
    },
  });
};
