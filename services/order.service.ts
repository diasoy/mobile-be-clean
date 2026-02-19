import { api } from "@/lib/api";
import { ServiceResponse } from "@/types/order";

class OrderService {
  async getServices() {
    try {
      const response = await api.get<ServiceResponse>("/services");

      if (!response?.success) {
        throw new Error("Gagal mengambil data layanan");
      }

      return response;
    } catch (error) {
      console.error("Error fetching services:", error);
      throw error instanceof Error
        ? error
        : new Error("Terjadi kesalahan saat mengambil data layanan");
    }
  }
}

export const orderService = new OrderService();
