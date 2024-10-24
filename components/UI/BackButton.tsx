import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  AccessibilityInfo,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { globalColors } from "./Colors";

interface BackButtonProps {
  label?: string; // Optional prop for custom label
}

export const BackButton: React.FC<BackButtonProps> = ({ label = "Назад" }) => {
  const router = useRouter();

  return (
    <TouchableOpacity
      style={styles.button}
      onPress={() => router.back()}
      accessibilityLabel={label} // Improves accessibility
      accessible
    >
      <MaterialIcons name="arrow-back" size={18} color={globalColors.grey20} />
      <Text style={styles.text}>{label}</Text>
    </TouchableOpacity>
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
