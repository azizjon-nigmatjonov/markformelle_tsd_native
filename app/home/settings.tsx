import { StyleSheet } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import HeaderUI from "@/components/UI/Header";
import SettingsWrapper from "@/components/Pages/Settings";

export default function TabFourScreen() {
  return (
    <ThemedView>
      <HeaderUI place="Личный кабинет" />
      <SettingsWrapper />
    </ThemedView>
  );
}
