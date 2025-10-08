import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import * as Localization from "expo-localization";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";

// Import translation files
import en from "../locales/en.json";
import ru from "../locales/ru.json";
import oz from "../locales/oz.json";

const LANGUAGE_STORAGE_KEY = "@app_language";

// Platform-aware storage adapter
const storage = {
  async getItem(key: string): Promise<string | null> {
    try {
      if (Platform.OS === "web") {
        // Check if we're in a browser environment
        if (typeof window !== "undefined" && window.localStorage) {
          return window.localStorage.getItem(key);
        }
        return null; // SSR - no storage available
      }
      return await AsyncStorage.getItem(key);
    } catch (error) {
      console.error("Error getting item from storage:", error);
      return null;
    }
  },
  async setItem(key: string, value: string): Promise<void> {
    try {
      if (Platform.OS === "web") {
        // Check if we're in a browser environment
        if (typeof window !== "undefined" && window.localStorage) {
          window.localStorage.setItem(key, value);
        }
        return; // SSR - skip storage
      }
      await AsyncStorage.setItem(key, value);
    } catch (error) {
      console.error("Error setting item in storage:", error);
    }
  },
};

// Language detector plugin
const languageDetector = {
  type: "languageDetector" as const,
  async: true,
  detect: async (callback: (lng: string) => void) => {
    try {
      // First, try to get the saved language from storage
      const savedLanguage = await storage.getItem(LANGUAGE_STORAGE_KEY);
      if (savedLanguage) {
        callback(savedLanguage);
        return;
      }

      // If no saved language, default to Russian
      callback("ru");
    } catch (error) {
      console.error("Error detecting language:", error);
      callback("ru"); // Fallback to Russian
    }
  },
  init: () => {},
  cacheUserLanguage: async (language: string) => {
    try {
      await storage.setItem(LANGUAGE_STORAGE_KEY, language);
    } catch (error) {
      console.error("Error caching language:", error);
    }
  },
};

// Initialize i18next
i18n
  .use(languageDetector as any)
  .use(initReactI18next)
  .init({
    compatibilityJSON: "v4", // Important for React Native
    resources: {
      en: { translation: en },
      ru: { translation: ru },
      oz: { translation: oz },
    },
    fallbackLng: "ru",
    interpolation: {
      escapeValue: false, // React already escapes values
    },
    react: {
      useSuspense: false, // Important for React Native
    },
  });

export default i18n;

// Export helper function to change language
export const changeLanguage = async (language: string) => {
  try {
    await i18n.changeLanguage(language);
    await storage.setItem(LANGUAGE_STORAGE_KEY, language);
  } catch (error) {
    console.error("Error changing language:", error);
  }
};

// Export function to get current language
export const getCurrentLanguage = () => i18n.language;

// Export available languages
export const availableLanguages = [
  { code: "ru", name: "Русский", flag: "🇷🇺" },
  { code: "en", name: "English", flag: "🇬🇧" },
  { code: "oz", name: "O'zbek", flag: "🇺🇿" },
];
