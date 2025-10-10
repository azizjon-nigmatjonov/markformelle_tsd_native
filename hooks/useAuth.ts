/**
 * Custom Auth Hook
 * React Query hook for authentication
 */

import { useMutation } from "@tanstack/react-query";
import { useAuthStore } from "@/store/auth";
import { authService, LoginCredentials, LoginResponse } from "@/api/services";
import { useRouter } from "expo-router";
import { useToast } from "@/components/UI/ToastProvider";
import { useSectionsStore } from "@/store/sections";

/**
 * Login mutation hook
 */
export const useLogin = () => {
  const { setAuth } = useAuthStore();
  const router = useRouter();
  const toast = useToast();

  return useMutation<LoginResponse, Error, LoginCredentials>({
    mutationFn: async (credentials: LoginCredentials) => {
      console.log("Login mutation started");
      return await authService.login(credentials);
    },
    onSuccess: async (data) => {
      try {
        console.log("Login successful, processing response");

        // Extract tokens
        const tokens = {
          access_token: data.access_token,
          refresh_token: data.refresh_token,
          token_type: data.token_type,
          expires_in: data.expires_in,
        };

        console.log("Saving auth to store");
        // Save to store (will auto-save to AsyncStorage via persist middleware)

        setAuth(data.user_info, tokens);
        console.log("Auth saved successfully");

        console.log("Showing success toast");
        // Show success message (removed emoji for Android compatibility)

        toast.success(`Добро пожаловать, ${data.user_info.fio}!`);

        // Navigate to home (you can add role-based navigation later)
        // get sections
        const sections: any = useSectionsStore.getState().sections;
        const podrId = data.user_info.podr_id;
        console.log(`User podr_id: ${podrId}, Available sections:`, sections);

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
  });
};

/**
 * Logout mutation hook
 */
export const useLogout = () => {
  const { clearAuth } = useAuthStore();
  const router = useRouter();
  const toast = useToast();

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
          toast.success("Вы вышли из системы");
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
          toast.error(
            "Не удалось выйти из системы на сервере, но вы вышли локально"
          );
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
