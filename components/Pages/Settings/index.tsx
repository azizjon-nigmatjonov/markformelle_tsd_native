import { globalStyles } from "@/components/UI/GlobalStyles";
import { Dimensions, View } from "react-native";
import { ProfileLanguage } from "./Components/Laguage";
import { ProfileMode } from "./Components/Mode";
import { ProfileLogout } from "./Components/Logout";
import { useTheme } from "@/hooks/useTheme";

const SettingsWrapper = () => {
  const { height: SCREEN_HEIGHT } = Dimensions.get("window");
  const { colors } = useTheme();

  return (
    <View style={{ height: SCREEN_HEIGHT, backgroundColor: colors.background }}>
      <ProfileMode />
      <ProfileLanguage />
      <ProfileLogout />
    </View>
  );
};

export default SettingsWrapper;
