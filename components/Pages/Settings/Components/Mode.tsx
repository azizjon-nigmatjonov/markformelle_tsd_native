import { useTheme } from "@/hooks/useTheme";
import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";

export const ProfileMode: React.FC = () => {
  const { theme, colors, toggleTheme } = useTheme();

  return (
    <Pressable
      style={[styles.navigateButton, { borderColor: colors.border }]}
      onPress={toggleTheme}
    >
      <View style={styles.iconContainer}>
        <Text style={{ fontSize: 24 }}>{theme === "light" ? "☀️" : "🌙"}</Text>
      </View>
      <Text style={[styles.title, { color: colors.text }]}>
        {theme === "light" ? "Светлая тема" : "Темная тема"}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  navigateButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderBottomWidth: 1,
  },
  iconContainer: {
    width: 50,
  },
  title: {
    fontSize: 16,
    fontWeight: "500",
  },
});
