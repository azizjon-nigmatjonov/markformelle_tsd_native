import HeaderUI from "@/components/UI/Header";
import { View, Dimensions } from "react-native";
import CHNIHome from "./CHNIHome";
import { ThemedView } from "@/components/ThemedView";
import { globalStyles } from "@/components/UI/GlobalStyles";

const CHNIPage = () => {
  const { height: SCREEN_HEIGHT } = Dimensions.get("window");

  return (
    <View style={[{ height: SCREEN_HEIGHT }]}>
      <HeaderUI place={"navigation.home"} />
      <ThemedView style={globalStyles.container}>
        <CHNIHome />
      </ThemedView>
    </View>
  );
};

export default CHNIPage;
