import { globalStyles } from "@/components/UI/GlobalStyles";
import { Dimensions, View } from "react-native";
import { ProfileLanguage } from "./Components/Laguage";
import { ProfileMode } from "./Components/Mode";
import { ProfileLogout } from "./Components/Logout";

const SettingsWrapper = () => {
  const { height: SCREEN_HEIGHT } = Dimensions.get("window");
  return (
    <View style={{ height: SCREEN_HEIGHT }}>
      <ProfileMode onPress={() => {}} />
      <ProfileLanguage />
      <ProfileLogout />
    </View>
  );
};

export default SettingsWrapper;
