/**
 * Custom Auth Hook
 * React Query hook for authentication
 */

import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { useAuthStore } from "@/store/auth";
import { authService, LoginCredentials, LoginResponse } from "@/api/services";
import { useRouter } from "expo-router";
import { useToast } from "@/components/UI/ToastProvider";

/**
 * Login mutation hook
 */
export const useLogin = () => {
  const { setUserInfo } = useAuthStore();
  const router = useRouter();
  const toast = useToast();

  return useMutation<LoginResponse, Error, LoginCredentials>({
    mutationFn: (credentials: LoginCredentials) =>
      authService.login(credentials),
    onSuccess: (data) => {
      // Combine user data with token
      const userInfo = {
        ...data.user,
        token: data.token,
      };

      // Save to store (will auto-save to AsyncStorage via persist middleware)
      setUserInfo(userInfo);

      // Show success message
      toast.success(`Добро пожаловать, ${data.user.name}! 👋`);

      // Navigate based on role
      setTimeout(() => {
        if (data.user.role === "chni") {
          router.push("/chni");
        } else {
          router.push("/home");
        }
      }, 300);
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
        router.replace("/(login)");
      }, 300);
    },
    onError: (error: any) => {
      // Still clear auth locally even if API call fails
      clearAuth();
      router.replace("/(login)");

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
