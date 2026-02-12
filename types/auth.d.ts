// User Types
export interface User {
  id: string;
  username: string;
  fullName: string;
}

// Auth Request Types
export interface LoginPayload {
  username: string;
  password: string;
}

// Auth Response Types
export interface LoginResponse {
  success: boolean;
  message: string;
  data: {
    token: string;
    user: {
      id: string;
      username: string;
      fullName: string;
    };
  };
}

export interface AuthResponse {
  user: User;
  token: string;
}

// Auth State Types
export interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

// Auth Context Types
export interface AuthContextType extends AuthState {
  login: (credentials: LoginPayload) => Promise<void>;
  logout: () => Promise<void>;
}
