import {
  useFonts,
  Inter_100Thin,
  Inter_200ExtraLight,
  Inter_300Light,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_800ExtraBold,
  Inter_900Black,
} from "@expo-google-fonts/inter";
import { Stack, useRouter, useSegments } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";
import { PaperProvider, DefaultTheme } from "react-native-paper";
import { useAuthStore } from "@/store/auth";
import { globalColors } from "@/components/UI/Colors";
// import { ToastProvider } from "@/components/UI/ToastProvider";
import { QueryProvider } from "@/providers/QueryProvider";
import "@/i18n/config"; // Initialize i18n
import { useSectionsStore } from "@/store/sections";
import ErrorBoundary from "@/components/ErrorBoundary";
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const { tokens, clearAuth } = useAuthStore();

  const segments = useSegments();
  const router = useRouter();
  const [loaded] = useFonts({
    Inter_100Thin,
    Inter_200ExtraLight,
    Inter_300Light,
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_800ExtraBold,
    Inter_900Black,
  });

  // Custom theme
  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: globalColors.primary,
      accent: "#03dac4",
      background: "#ffffff",
      text: "#fff",
      placeholder: globalColors.grey,
      outline: "#ab077e", // Input focus/outline color
      onSurfaceVariant: "#ab077e", // Input border color when focused
    },
  };

  // Auth guard - automatically logout users without valid token
  useEffect(() => {
    if (!loaded) return;

    const inAuthGroup = segments[0] === "(login)";
    const hasValidToken = tokens?.access_token;
    // If user doesn't have a valid token and not in login screen
    if (!hasValidToken && !inAuthGroup) {
      // Clear auth state and redirect to login
      clearAuth();
      router.replace("/(login)");
    }
  }, [loaded, tokens, segments]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ErrorBoundary>
      <QueryProvider>
        <PaperProvider theme={theme}>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="(login)" options={{ headerShown: false }} />
            <Stack.Screen name="home" options={{ headerShown: false }} />
            <Stack.Screen name="chni" options={{ headerShown: false }} />
            <Stack.Screen name="+not-found" />
          </Stack>
        </PaperProvider>
      </QueryProvider>
    </ErrorBoundary>
  );
}
