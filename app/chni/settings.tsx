import { StyleSheet } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import HeaderUI from "@/components/UI/Header";
import SettingsWrapper from "@/components/Pages/Settings";
import { useTranslation } from "react-i18next";

export default function CHNISettingsScreen() {
  const { t } = useTranslation();
  return (
    <ThemedView>
      <HeaderUI place={t("settings.firstTitle")} />
      <SettingsWrapper />
    </ThemedView>
  );
}
