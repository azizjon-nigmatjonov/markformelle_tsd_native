import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { globalColors } from "./Colors";
import { useMobileStore } from "@/store/mobile";

interface BackButtonProps {
  label?: string; // Optional prop for custom label
  link?: string;
}

export const BackButton: React.FC<BackButtonProps> = ({
  label = "Назад",
  link = "",
}) => {
  const { setPage, before } = useMobileStore();

  return (
    <TouchableOpacity
      style={styles.button}
      onPress={() => setPage(link || before)}
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
