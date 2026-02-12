import { storage } from "@/lib/storage";
import { authService } from "@/services/auth.service";
import { AuthContextType, AuthState, LoginPayload } from "@/types/auth";
import { useQueryClient } from "@tanstack/react-query";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

// Create Auth Context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Auth Provider Props
interface AuthProviderProps {
  children: ReactNode;
}

// Auth Provider Component
export function AuthProvider({ children }: AuthProviderProps) {
  const queryClient = useQueryClient();
  const [state, setState] = useState<AuthState>({
    user: null,
    token: null,
    isLoading: true,
    isAuthenticated: false,
  });

  // Load auth state from storage on mount
  useEffect(() => {
    loadAuthState();
  }, []);

  const loadAuthState = async () => {
    try {
      const token = await storage.getToken();
      const user = await storage.getUser();

      if (token && user) {
        setState({
          user,
          token,
          isLoading: false,
          isAuthenticated: true,
        });
      } else {
        setState({
          user: null,
          token: null,
          isLoading: false,
          isAuthenticated: false,
        });
      }
    } catch (error) {
      console.error("Error loading auth state:", error);
      setState({
        user: null,
        token: null,
        isLoading: false,
        isAuthenticated: false,
      });
    }
  };

  const login = async (credentials: LoginPayload) => {
    try {
      const response = await authService.login(credentials);

      // Save to secure storage
      await storage.setToken(response.token);
      await storage.setUser(response.user);

      setState({
        user: response.user,
        token: response.token,
        isLoading: false,
        isAuthenticated: true,
      });
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    // Optionally call logout endpoint when available.
    try {
      await authService.logout();
    } catch (error) {
      console.error("Logout endpoint error:", error);
    }

    try {
      await queryClient.cancelQueries();
    } catch (error) {
      console.error("Error cancelling queries during logout:", error);
    }

    try {
      queryClient.clear();
    } catch (error) {
      console.error("Error clearing query cache during logout:", error);
    }

    try {
      await storage.clearAuth();
    } catch (error) {
      console.error("Error clearing auth storage during logout:", error);
    }

    setState({
      user: null,
      token: null,
      isLoading: false,
      isAuthenticated: false,
    });
  };

  const value: AuthContextType = {
    ...state,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Custom hook to use auth context
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
