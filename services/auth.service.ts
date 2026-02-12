import { ApiError, api } from "@/lib/api";
import { AuthResponse, LoginPayload, LoginResponse } from "@/types/auth";

class AuthService {
  /**
   * Login user with credentials
   * @param credentials - User login credentials
   * @returns AuthResponse with user data and tokens
   */
  async login(credentials: LoginPayload): Promise<AuthResponse> {
    try {
      const response = await api.post<LoginResponse>("/auth/login", credentials);

      if (!response?.success) {
        throw new Error(response?.message || "Login gagal");
      }

      return {
        token: response.data.token,
        user: response.data.user,
      };
    } catch (error) {
      if (error instanceof ApiError && error.status === 401) {
        const message =
          error.message && !/unauthorized/i.test(error.message)
            ? error.message
            : "Username atau password salah.";
        throw new Error(message);
      }

      throw error;
    }
  }

  /**
   * Logout user (optional: call backend to invalidate token)
   */
  async logout(): Promise<void> {
    try {
      // Uncomment if you have logout endpoint
      // await api.post("/auth/logout", {});
    } catch (error) {
      console.error("Logout error:", error);
      // Don't throw error, allow local logout to proceed
    }
  }
}

export const authService = new AuthService();
