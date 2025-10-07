import React from "react";
import { Pressable, Text, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { globalColors } from "./Colors";
import { useMobileStore } from "@/store/mobile";
import { router } from "expo-router";
import { t } from "i18next";

interface BackButtonProps {
  label?: string; // Optional prop for custom label
  link?: string;
}

export const BackButtonNavigate: React.FC<BackButtonProps> = ({
  label = "common.back",
  link = "",
}) => {
  return (
    <Pressable
      style={styles.button}
      onPress={() => (link ? router.push(link) : router.back())}
      accessibilityLabel={label} // Improves accessibility
      accessible
    >
      <MaterialIcons name="arrow-back" size={18} color={globalColors.grey20} />
      <Text style={styles.text}>{t(label)}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: globalColors.primary, // Define specific color if needed
    paddingHorizontal: 8,
    paddingRight: 12,
    height: 35,
    borderRadius: 12,
  },
  text: {
    color: globalColors.grey20,
    fontWeight: "500",
    marginLeft: 4,
  },
});
