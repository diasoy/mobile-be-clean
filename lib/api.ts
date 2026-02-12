import { Platform } from "react-native";

import { storage } from "./storage";

export class ApiError extends Error {
  status: number;
  data?: unknown;

  constructor(status: number, message: string, data?: unknown) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.data = data;
  }
}

function resolveApiBaseUrl(rawBaseUrl: string): string {
  const trimmed = rawBaseUrl.trim().replace(/\/+$/, "");

  // Android emulator can't reach host machine via localhost/127.0.0.1.
  if (Platform.OS === "android") {
    return trimmed.replace(
      /^http(s?):\/\/(localhost|127\.0\.0\.1)(?=[:/]|$)/i,
      "http$1://10.0.2.2",
    );
  }

  return trimmed;
}

function extractErrorMessage(errorData: unknown): string | undefined {
  if (!errorData) return undefined;

  if (typeof errorData === "string") return errorData;
  if (typeof errorData !== "object") return undefined;

  const data = errorData as Record<string, unknown>;

  if (typeof data.message === "string") return data.message;
  if (typeof data.error === "string") return data.error;
  if (typeof data.msg === "string") return data.msg;

  if (Array.isArray(data.errors) && data.errors.length > 0) {
    const first = data.errors[0] as unknown;
    if (first && typeof first === "object") {
      const maybe = first as Record<string, unknown>;
      if (typeof maybe.message === "string") return maybe.message;
    }
  }

  return undefined;
}

const API_BASE_URL = resolveApiBaseUrl(process.env.EXPO_PUBLIC_API_URL || "");

class ApiService {
  private async getAuthToken(): Promise<string | null> {
    try {
      return await storage.getToken();
    } catch {
      return null;
    }
  }

  private async request<T>(
    endpoint: string,
    options?: RequestInit,
  ): Promise<T> {
    if (!API_BASE_URL) {
      throw new Error(
        "Server API belum dikonfigurasi. Isi `EXPO_PUBLIC_API_URL` di file `.env`.",
      );
    }

    const normalizedEndpoint = endpoint.startsWith("/")
      ? endpoint
      : `/${endpoint}`;
    const url = `${API_BASE_URL}${normalizedEndpoint}`;

    const token = await this.getAuthToken();
    const config: RequestInit = {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options?.headers,
      },
    };

    try {
      const response = await fetch(url, config);

      if (!response.ok) {
        const contentType = response.headers.get("content-type") || "";
        const errorData = contentType.includes("application/json")
          ? await response.json().catch(() => null)
          : await response.text().catch(() => null);

        const message =
          extractErrorMessage(errorData) ||
          (response.status === 401
            ? "Unauthorized"
            : `Request gagal (${response.status})`);

        throw new ApiError(response.status, message, errorData);
      }

      return (await response.json()) as T;
    } catch (error) {
      if (
        error instanceof TypeError &&
        String(error.message).toLowerCase().includes("network request failed")
      ) {
        throw new Error(
          "Tidak dapat terhubung ke server. Pastikan API berjalan dan bisa diakses dari device/emulator.",
        );
      }

      throw error;
    }
  }

  async get<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: "GET" });
  }

  async post<T>(endpoint: string, data: unknown): Promise<T> {
    return this.request<T>(endpoint, {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async put<T>(endpoint: string, data: unknown): Promise<T> {
    return this.request<T>(endpoint, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  }

  async delete<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: "DELETE" });
  }
}

export const api = new ApiService();
