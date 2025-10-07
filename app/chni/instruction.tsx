import { ThemedView } from "@/components/ThemedView";
import HeaderUI from "@/components/UI/Header";
import { Dimensions } from "react-native";

export default function CHNIInstructionScreen() {
  const { height: SCREEN_HEIGHT } = Dimensions.get("window");
  return (
    <ThemedView>
      <HeaderUI place="Инструкция" />
      <ThemedView style={{ height: SCREEN_HEIGHT, padding: 12 }}>
        Пока нет инструкции
      </ThemedView>
    </ThemedView>
  );
}
