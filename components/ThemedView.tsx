import { View, type ViewProps } from "react-native";
import { useTheme } from "@/hooks/useTheme";

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
};

export function ThemedView({
  style,
  lightColor,
  darkColor,
  ...otherProps
}: ThemedViewProps) {
  const { theme, colors } = useTheme();
  const backgroundColor =
    lightColor && theme === "light"
      ? lightColor
      : darkColor && theme === "dark"
      ? darkColor
      : colors.background;

  return <View style={[{ backgroundColor }, style]} {...otherProps} />;
}
