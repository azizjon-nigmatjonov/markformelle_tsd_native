import { ThemedView } from "@/components/ThemedView";
import HeaderUI from "@/components/UI/Header";
import { Dimensions, Text, StyleSheet, View } from "react-native";
import { globalStyles } from "@/components/UI/GlobalStyles";
import { BackButtonNavigate } from "@/components/UI/BackButtonNavigate";
import MachineInfoUI from "@/components/Pages/CHNI/Machines/MachineInfoUI";
import DocInfoUI from "./components/DocInfoUI/DocInfoUI";
import StatusUI from "./components/StatusUI";
import GetProductUI from "./components/GetProductUI";

export default function MachinePage() {
  const { height: SCREEN_HEIGHT } = Dimensions.get("window");

  return (
    <ThemedView style={{ height: SCREEN_HEIGHT }}>
      <HeaderUI place={"chni.machine"} extra={<BackButtonNavigate />} />
      <View style={[globalStyles.container, styles.content]}>
        <MachineInfoUI />
        <StatusUI />
        <DocInfoUI />
        <GetProductUI />
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
  },
});
