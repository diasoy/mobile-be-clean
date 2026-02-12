import { User } from "@/types/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";

// Use SecureStore for sensitive data on mobile, AsyncStorage for web
const isWeb = Platform.OS === "web";

export const storage = {
  // Save token securely
  async setToken(token: string) {
    if (isWeb) {
      await AsyncStorage.setItem("auth_token", token);
    } else {
      await SecureStore.setItemAsync("auth_token", token);
    }
  },

  async getToken(): Promise<string | null> {
    if (isWeb) {
      return await AsyncStorage.getItem("auth_token");
    } else {
      return await SecureStore.getItemAsync("auth_token");
    }
  },

  async removeToken() {
    if (isWeb) {
      await AsyncStorage.removeItem("auth_token");
    } else {
      await SecureStore.deleteItemAsync("auth_token");
    }
  },

  // Save refresh token
  async setRefreshToken(token: string) {
    if (isWeb) {
      await AsyncStorage.setItem("refresh_token", token);
    } else {
      await SecureStore.setItemAsync("refresh_token", token);
    }
  },

  async getRefreshToken(): Promise<string | null> {
    if (isWeb) {
      return await AsyncStorage.getItem("refresh_token");
    } else {
      return await SecureStore.getItemAsync("refresh_token");
    }
  },

  async removeRefreshToken() {
    if (isWeb) {
      await AsyncStorage.removeItem("refresh_token");
    } else {
      await SecureStore.deleteItemAsync("refresh_token");
    }
  },

  // Save user data
  async setUser(user: User) {
    await AsyncStorage.setItem("user_data", JSON.stringify(user));
  },

  async getUser(): Promise<User | null> {
    const userData = await AsyncStorage.getItem("user_data");
    return userData ? JSON.parse(userData) : null;
  },

  async removeUser() {
    await AsyncStorage.removeItem("user_data");
  },

  // Clear all auth data
  async clearAuth() {
    await this.removeToken();
    await this.removeRefreshToken();
    await this.removeUser();
  },
};
