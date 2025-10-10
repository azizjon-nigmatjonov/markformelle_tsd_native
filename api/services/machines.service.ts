/**
 * Machines Service
 * All machines-related API calls
 */

import { api } from "../client";
import { AxiosResponse } from "axios";

// Types
export interface Machine {
  id: number;
  name: string;
  model?: string;
  serial_number?: string;
  status?: string;
  location?: string;
  [key: string]: any;
}

export interface MachinesResponse {
  count: number;
  data: Machine[];
}

export interface CreateMachineData {
  name: string;
  model?: string;
  serial_number?: string;
  status?: string;
  location?: string;
}

export interface MachineStatusData {
  machine_id?: number;
  user_id?: string;
  marsh_id?: number;
  status: string;
  start_time?: string;
  end_time?: string;
  notes?: string;
  shift_id?: number;
}

/**
 * Machines Service
 */
export const machinesService = {
  /**
   * Get all machines
   */
  getAll: async (): Promise<MachinesResponse> => {
    const response: AxiosResponse<MachinesResponse> = await api.get(
      "/s_oborud"
    );
    return response.data;
  },

  /**
   * Get machine by ID
   */
  getById: async (id: number): Promise<Machine> => {
    const response: AxiosResponse<Machine> = await api.get(`/s_oborud/${id}`);
    return response.data;
  },

  /**
   * Get single machine data by barcode/ID from s_oborud_podr endpoint
   */
  getSingle: async (machineId: string): Promise<Machine> => {
    const response: AxiosResponse<Machine> = await api.get(
      `/s_machine_status/machine/${machineId}`
    );
    return response.data;
  },

  /**
   * Create new machine
   */
  create: async (data: CreateMachineData): Promise<Machine> => {
    const response: AxiosResponse<Machine> = await api.post("/s_oborud", data);
    return response.data;
  },

  /**
   * Update machine
   */
  update: async (
    id: number,
    data: Partial<CreateMachineData>
  ): Promise<Machine> => {
    const response: AxiosResponse<Machine> = await api.put(
      `/machines/${id}`,
      data
    );
    return response.data;
  },

  /**
   * Delete machine
   */
  delete: async (id: number): Promise<void> => {
    await api.delete(`/s_oborud/${id}`);
  },

  /**
   * Update machine status
   */
  updateMachineStatus: async (data: MachineStatusData): Promise<any> => {
    const response: AxiosResponse<any> = await api.post(
      "/s_machine_status/",
      data
    );
    return response.data;
  },
};

export default machinesService;
