import { globalColors } from "@/components/UI/Colors";
import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
// import { MaterialIcons } from "@expo/vector-icons"; // Import from @expo/vector-icons

interface ProfileModeProps {
  onPress: () => void; // Function to handle button press
}

export const ProfileMode: React.FC<ProfileModeProps> = ({ onPress }) => {
  return (
    <Pressable style={styles.navigateButton} onPress={onPress}>
      <View style={styles.iconContainer}>
        <Text style={{ fontSize: 24 }}>☀️</Text>
      </View>
      <Text style={styles.title}>Режим системы</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  navigateButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderBottomWidth: 1,
    borderColor: globalColors.border,
  },
  iconContainer: {
    width: 50,
  },
  title: {
    fontSize: 16,
    fontWeight: "500",
  },
});
