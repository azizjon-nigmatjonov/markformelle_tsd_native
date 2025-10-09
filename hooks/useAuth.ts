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
    mutationFn: (credentials: LoginCredentials) =>
      authService.login(credentials),
    onSuccess: (data) => {
      // Extract tokens
      const tokens = {
        access_token: data.access_token,
        refresh_token: data.refresh_token,
        token_type: data.token_type,
        expires_in: data.expires_in,
      };

      // Save to store (will auto-save to AsyncStorage via persist middleware)
      setAuth(data.user_info, tokens);

      // Show success message
      toast.success(`Добро пожаловать, ${data.user_info.fio}! 👋`);

      // Navigate to home (you can add role-based navigation later)
      // get sections
      const sections: any = useSectionsStore.getState().sections;
      if (data.user_info.podr_id) {
        router.push(sections[data.user_info.podr_id]);
      } else {
        router.push("/home");
      }
    },
    onError: (error: any) => {
      const errorMessage =
        error?.response?.data?.message ||
        error?.message ||
        "Произошла ошибка при входе. Попробуйте еще раз.";

      toast.error(errorMessage);
      console.error("Login error:", error);
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
    mutationFn: () => authService.logout(),
    onSuccess: () => {
      // Clear auth store
      clearAuth();

      // Show success message
      toast.success("Вы вышли из системы");

      // Navigate to login
      setTimeout(() => {
        router.replace("/");
      }, 300);
    },
    onError: (error: any) => {
      // Still clear auth locally even if API call fails
      clearAuth();
      router.replace("/");

      console.error("Logout error:", error);
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
