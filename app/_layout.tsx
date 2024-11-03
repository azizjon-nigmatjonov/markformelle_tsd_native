import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import "react-native-reanimated";
import { PaperProvider, DefaultTheme } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuthStore } from "@/store/auth";
import { globalColors } from "@/components/UI/Colors";
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [userInfo, setUserInfo]: any = useState({});
  const { user_info } = useAuthStore();
  const [loaded] = useFonts({
    "Poppins-Black": require("../assets/fonts/Poppins-Black.ttf"),
    "Poppins-BlackItalic": require("../assets/fonts/Poppins-BlackItalic.ttf"),
    "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
    "Poppins-BoldItalic": require("../assets/fonts/Poppins-BoldItalic.ttf"),
    "Poppins-ExtraBold": require("../assets/fonts/Poppins-ExtraBold.ttf"),
    "Poppins-ExtraBoldItalic": require("../assets/fonts/Poppins-ExtraBoldItalic.ttf"),
    "Poppins-ExtraLight": require("../assets/fonts/Poppins-ExtraLight.ttf"),
    "Poppins-ExtraLightItalic": require("../assets/fonts/Poppins-ExtraLightItalic.ttf"),
    "Poppins-Italic": require("../assets/fonts/Poppins-Italic.ttf"),
    "Poppins-Light": require("../assets/fonts/Poppins-Light.ttf"),
    "Poppins-LightItalic": require("../assets/fonts/Poppins-LightItalic.ttf"),
    "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
    "Poppins-MediumItalic": require("../assets/fonts/Poppins-MediumItalic.ttf"),
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-SemiBoldItalic": require("../assets/fonts/Poppins-SemiBoldItalic.ttf"),
    "Poppins-Thin": require("../assets/fonts/Poppins-Thin.ttf"),
    "Poppins-ThinItalic": require("../assets/fonts/Poppins-ThinItalic.ttf"),
    "SpaceMono-Regular": require("../assets/fonts/SpaceMono-Regular.ttf"), // Extra font
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
        <Stack.Screen name="(login)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
    </PaperProvider>
  );
}
