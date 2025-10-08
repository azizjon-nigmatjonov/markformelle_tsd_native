import React, { ReactNode } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useTheme } from "@/hooks/useTheme";

interface Props {
  icon?: ReactNode;
  title: string;
  last?: boolean;
  onClickAction?: () => void;
}

export const NavigateButton: React.FC<Props> = ({
  icon,
  title = "",
  last = false,
  onClickAction = () => {},
}) => {
  const { colors } = useTheme();

  return (
    <Pressable onPress={onClickAction} style={styles.button}>
      {icon && <View style={styles.iconContainer}>{icon}</View>}

      <View
        style={[
          styles.textContainer,
          !last && styles.borderBottom,
          !last && { borderBottomColor: colors.border },
        ]}
      >
        <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    width: "100%",
  },
  iconContainer: {
    width: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  textContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flex: 1,
    paddingVertical: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
  },
  borderBottom: {
    borderBottomWidth: 1,
  },
});
