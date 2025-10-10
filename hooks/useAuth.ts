/**
 * Custom Auth Hook
 * React Query hook for authentication
 */

import { useMutation } from "@tanstack/react-query";
import { useAuthStore } from "@/store/auth";
import { authService, LoginCredentials, LoginResponse } from "@/api/services";
import { useRouter } from "expo-router";
import { useSectionsStore } from "@/store/sections";

/**
 * Login mutation hook
 */
export const useLogin = () => {
  const { setAuth } = useAuthStore();
  const router = useRouter();
  // const toast = useToast();

  return useMutation<LoginResponse, Error, LoginCredentials>({
    mutationFn: async (credentials: LoginCredentials) => {
      console.log("🔵 [DEBUG] Login mutation started");
      console.log("🔵 [DEBUG] Credentials:", credentials);
      try {
        const result = await authService.login(credentials);
        console.log("🔵 [DEBUG] Auth service returned:", result);
        return result;
      } catch (error) {
        console.log("🔴 [DEBUG] Auth service error:", error);
        throw error;
      }
    },
    onSuccess: async (data) => {
      try {
        console.log("🟢 [DEBUG] Login successful, processing response");
        console.log("🟢 [DEBUG] Data received:", data);

        // Extract tokens
        const tokens = {
          access_token: data.access_token,
          refresh_token: data.refresh_token,
          token_type: data.token_type,
          expires_in: data.expires_in,
        };

        // Save to store (will auto-save to AsyncStorage via persist middleware)
        try {
          setAuth(data.user_info, tokens);
          console.log("🟢 [DEBUG] Auth saved successfully to store");
        } catch (storeError) {
          console.log("🔴 [DEBUG] Error saving to store:", storeError);
          throw storeError;
        }

        console.log("🟢 [DEBUG] Showing success toast");
        // Show success message (removed emoji for Android compatibility)
        try {
          // toast.success(`Добро пожаловать, ${data.user_info.fio}!`);
          console.log("🟢 [DEBUG] Toast shown successfully");
        } catch (toastError) {
          console.log("🔴 [DEBUG] Error showing toast:", toastError);
          throw toastError;
        }

        // Navigate to home (you can add role-based navigation later)
        // get sections
        console.log("🟢 [DEBUG] Getting sections from store");
        let sections: any;
        let podrId: string;
        try {
          sections = useSectionsStore.getState().sections;
          podrId = data.user_info.podr_id;
          console.log(
            `🟢 [DEBUG] User podr_id: ${podrId}, Available sections:`,
            sections
          );
        } catch (sectionsError) {
          console.log("🔴 [DEBUG] Error getting sections:", sectionsError);
          throw sectionsError;
        }

        // Use setTimeout to ensure navigation happens after state updates
        setTimeout(() => {
          try {
            console.log("Navigating after login");
            if (podrId && sections[podrId]) {
              const route = sections[podrId];
              console.log(`Navigating to: /${route}`);
              if (route === "chni") {
                router.replace("/chni");
              } else if (route === "knitting") {
                router.replace("/home"); // or "/knitting" if you have that route
              } else {
                console.log("Unknown route, navigating to /home");
                router.replace("/home");
              }
            } else {
              console.log("No matching section, navigating to /home");
              router.replace("/home");
            }
          } catch (navError) {
            console.error("Error during navigation:", navError);
            // Last resort fallback
            try {
              router.replace("/home");
            } catch (fallbackError) {
              console.error("Even fallback navigation failed:", fallbackError);
            }
          }
        }, 150);
      } catch (error) {
        console.error("Error in login success handler:", error);
        // Fallback navigation with additional error handling
        setTimeout(() => {
          try {
            router.replace("/home");
          } catch (navError) {
            console.error("Fallback navigation error:", navError);
          }
        }, 150);
      }
    },
    onError: (error: any) => {
      try {
        console.error("Login error:", error);

        // Extract user-friendly error message
        const errorMessage =
          error?.response?.data?.message ||
          error?.response?.data?.detail ||
          error?.message ||
          "Произошла ошибка при входе";

        console.log("Showing error toast:", errorMessage);

        // Try to show toast
        try {
          // toast.error(errorMessage);
        } catch (toastError) {
          console.error("Failed to show error toast:", toastError);
          // Fallback to alert if toast fails
          try {
            alert(errorMessage);
          } catch (alertError) {
            console.error("Failed to show alert:", alertError);
            // Ultimate fallback - just log to console
            console.log("🔴 LOGIN ERROR:", errorMessage);
          }
        }
      } catch (handlerError) {
        console.error("Error in login error handler:", handlerError);
        // Ultimate fallback
        try {
          // toast.error("Произошла ошибка при входе");
        } catch {
          try {
            alert("Произошла ошибка при входе");
          } catch {
            console.error("All error notification methods failed");
          }
        }
      }
    },
  });
};

/**
 * Logout mutation hook
 */
export const useLogout = () => {
  const { clearAuth } = useAuthStore();
  const router = useRouter();
  // const toast = useToast();

  return useMutation({
    mutationFn: async () => {
      try {
        return await authService.logout();
      } catch (error) {
        console.error("Logout API error:", error);
        // Continue with local logout even if API fails
        throw error;
      }
    },
    onSuccess: () => {
      try {
        // Clear auth store
        clearAuth();

        // Show success message
        try {
          // toast.success("Вы вышли из системы");
        } catch (toastError) {
          console.error("Failed to show logout toast:", toastError);
        }

        // Navigate to login
        setTimeout(() => {
          try {
            router.replace("/");
          } catch (navError) {
            console.error("Failed to navigate after logout:", navError);
          }
        }, 300);
      } catch (error) {
        console.error("Error in logout success handler:", error);
        // Ensure navigation happens
        try {
          router.replace("/");
        } catch (navError) {
          console.error("Fallback navigation failed:", navError);
        }
      }
    },
    onError: (error: any) => {
      try {
        console.error("Logout error:", error);

        // Still clear auth locally even if API call fails
        try {
          clearAuth();
        } catch (clearError) {
          console.error("Failed to clear auth:", clearError);
        }

        // Show error toast
        try {
          // toast.error(
          //   "Не удалось выйти из системы на сервере, но вы вышли локально"
          // );
        } catch (toastError) {
          console.error("Failed to show error toast:", toastError);
        }

        // Navigate to login
        try {
          router.replace("/");
        } catch (navError) {
          console.error("Failed to navigate after logout error:", navError);
        }
      } catch (handlerError) {
        console.error("Error in logout error handler:", handlerError);
        // Ultimate fallback - just navigate
        try {
          router.replace("/");
        } catch {
          console.error("All logout fallbacks failed");
        }
      }
    },
  });
};

/**
 * Get current user authentication state
 */
export const useAuth = () => {
  const { user_info, isAuthenticated, isLoading, clearAuth } = useAuthStore();

  return {
    user: user_info,
    isAuthenticated,
    isLoading,
    logout: clearAuth,
  };
};
