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
import { useEffect, useState } from "react";
import "react-native-reanimated";
import { PaperProvider, DefaultTheme } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuthStore } from "@/store/auth";
import { globalColors } from "@/components/UI/Colors";
import "@/i18n/config"; // Initialize i18n
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [userInfo, setUserInfo]: any = useState({});
  const { user_info } = useAuthStore();
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
    },
  };

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        // Only try to access AsyncStorage on native or in browser environment
        if (typeof window === "undefined") {
          // Skip during SSR
          return;
        }
        const storedUserInfo = await AsyncStorage.getItem("user_info");
        if (storedUserInfo) {
          setUserInfo(JSON.parse(storedUserInfo)); // Parse the stored JSON string
        }
      } catch (error) {
        console.error("Error fetching user info from AsyncStorage", error);
      }
    };

    fetchUserInfo();

    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  return (
    <PaperProvider theme={theme}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name={user_info?.token ? "home" : "(login)"}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="chni" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
    </PaperProvider>
  );
}
