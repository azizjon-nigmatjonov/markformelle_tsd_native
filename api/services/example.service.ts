/**
 * Example Service
 * Template for creating additional API services
 */

import { api } from "../client";
import { AxiosResponse } from "axios";

// Types for this service
export interface ExampleItem {
  id: number;
  name: string;
  description?: string;
}

export interface CreateExampleData {
  name: string;
  description?: string;
}

/**
 * Example Service
 * Copy this template to create new services
 */
export const exampleService = {
  /**
   * Get all items
   */
  getAll: async (): Promise<ExampleItem[]> => {
    const response: AxiosResponse<ExampleItem[]> = await api.get("/examples");
    return response.data;
  },

  /**
   * Get item by ID
   */
  getById: async (id: number): Promise<ExampleItem> => {
    const response: AxiosResponse<ExampleItem> = await api.get(
      `/examples/${id}`
    );
    return response.data;
  },

  /**
   * Create new item
   */
  create: async (data: CreateExampleData): Promise<ExampleItem> => {
    const response: AxiosResponse<ExampleItem> = await api.post(
      "/examples",
      data
    );
    return response.data;
  },

  /**
   * Update item
   */
  update: async (
    id: number,
    data: Partial<CreateExampleData>
  ): Promise<ExampleItem> => {
    const response: AxiosResponse<ExampleItem> = await api.put(
      `/examples/${id}`,
      data
    );
    return response.data;
  },

  /**
   * Delete item
   */
  delete: async (id: number): Promise<void> => {
    await api.delete(`/examples/${id}`);
  },
};

export default exampleService;
