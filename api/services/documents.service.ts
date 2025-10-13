/**
 * Documents Service
 * All documents-related API calls
 */

import { api } from "../client";
import { AxiosResponse } from "axios";

// Types
export interface Document {
  id: number;
  doc_id: string;
  title?: string;
  status?: string;
  created_at?: string;
  updated_at?: string;
  [key: string]: any;
}

export interface DocumentsResponse {
  count: number;
  data: Document[];
}

/**
 * Documents Service
 */
export const documentsService = {
  /**
   * Get all documents
   */
  getAll: async (): Promise<DocumentsResponse> => {
    const response: AxiosResponse<DocumentsResponse> = await api.get(
      `/s_order_marsh_paper/?limit=30&offset=0`
    );
    return response.data;
  },

  /**
   * Get document by doc_id (barcode/QR code)
   */
  getByDocId: async (docId: string): Promise<Document> => {
    const response: AxiosResponse<Document> = await api.get(
      `/s_order_marsh_paper/barcode/${docId}`
    );
    return response.data;
  },
  getByMarshId: async (marshId: string): Promise<Document> => {
    const response: AxiosResponse<Document> = await api.get(
      `/s_order_marsh_paper/${marshId}`
    );
    return response.data;
  },

  /**
   * Submit order marsh paper with quantity
   */
  submitOrderMarshPaper: async (data: {
    fact_qty: string | number;
    barcode: string;
  }): Promise<any> => {
    const response: AxiosResponse = await api.post(
      `/s_order_marsh_paper/update-production`,
      data
    );
    return response.data;
  },
};

export default documentsService;
