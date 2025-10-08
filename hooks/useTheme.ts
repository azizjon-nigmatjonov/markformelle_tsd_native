import { useThemeStore } from "@/store/theme";
import { lightColors, darkColors, GlobalColors } from "@/components/UI/Colors";

export function useTheme() {
  const { theme, setTheme, toggleTheme } = useThemeStore();

  const colors: GlobalColors = theme === "light" ? lightColors : darkColors;

  return {
    theme,
    colors,
    setTheme,
    toggleTheme,
    isDark: theme === "dark",
    isLight: theme === "light",
  };
}
