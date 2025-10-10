import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";
import { StateStorage } from "zustand/middleware";

/**
 * Cross-platform storage adapter that works with:
 * - localStorage on web
 * - AsyncStorage on native platforms
 * - Handles SSR gracefully (returns null when window is not available)
 */
export const crossPlatformStorage: StateStorage = {
  getItem: async (name: string): Promise<string | null> => {
    try {
      if (Platform.OS === "web") {
        // Check if we're in a browser environment (not SSR)
        if (typeof window !== "undefined" && window.localStorage) {
          return window.localStorage.getItem(name);
        }
        return null; // SSR - no storage available
      }
      const value = await AsyncStorage.getItem(name);
      console.log(`Storage getItem: ${name} = ${value ? "found" : "null"}`);
      return value;
    } catch (error) {
      console.error(`Error getting item "${name}" from storage:`, error);
      return null;
    }
  },
  setItem: async (name: string, value: string): Promise<void> => {
    try {
      if (Platform.OS === "web") {
        // Check if we're in a browser environment (not SSR)
        if (typeof window !== "undefined" && window.localStorage) {
          window.localStorage.setItem(name, value);
        }
        return; // SSR - skip storage
      }
      console.log(`Storage setItem: ${name}`);
      await AsyncStorage.setItem(name, value);
      console.log(`Storage setItem successful: ${name}`);
    } catch (error) {
      console.error(`Error setting item "${name}" in storage:`, error);
      // DON'T re-throw - let the app continue even if storage fails
      // The auth state will still be in memory for the current session
    }
  },
  removeItem: async (name: string): Promise<void> => {
    try {
      if (Platform.OS === "web") {
        // Check if we're in a browser environment (not SSR)
        if (typeof window !== "undefined" && window.localStorage) {
          window.localStorage.removeItem(name);
        }
        return; // SSR - skip storage
      }
      console.log(`Storage removeItem: ${name}`);
      await AsyncStorage.removeItem(name);
    } catch (error) {
      console.error(`Error removing item "${name}" from storage:`, error);
    }
  },
};
