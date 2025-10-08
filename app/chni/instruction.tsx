import { ThemedView } from "@/components/ThemedView";
import HeaderUI from "@/components/UI/Header";
import { Dimensions, View } from "react-native";
import { globalStyles } from "@/components/UI/GlobalStyles";

export default function CHNIInstructionScreen() {
  const { height: SCREEN_HEIGHT } = Dimensions.get("window");
  return (
    <ThemedView style={{ height: SCREEN_HEIGHT }}>
      <HeaderUI place="Инструкция" />
      <View style={globalStyles.container}>
        <ThemedView style={{ padding: 12 }}>Пока нет инструкции</ThemedView>
      </View>
    </ThemedView>
  );
}
