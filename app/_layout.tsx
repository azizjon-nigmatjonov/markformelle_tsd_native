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
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";
import { PaperProvider, DefaultTheme } from "react-native-paper";
import { useAuthStore } from "@/store/auth";
import { globalColors } from "@/components/UI/Colors";
import { ToastProvider } from "@/components/UI/ToastProvider";
import { QueryProvider } from "@/providers/QueryProvider";
import "@/i18n/config"; // Initialize i18n
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const { user_info, isAuthenticated } = useAuthStore();
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

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <QueryProvider>
      <PaperProvider theme={theme}>
        <ToastProvider maxToasts={3}>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen
              name={isAuthenticated && user_info?.token ? "home" : "(login)"}
              options={{ headerShown: false }}
            />
            <Stack.Screen name="chni" options={{ headerShown: false }} />
            <Stack.Screen name="+not-found" />
          </Stack>
        </ToastProvider>
      </PaperProvider>
    </QueryProvider>
  );
}
