import { StyleSheet } from "react-native";
import { ThemedView } from "@/components/ThemedView";

export default function TabFourScreen() {
  return <ThemedView></ThemedView>;
}

const styles = StyleSheet.create({
  headerImage: {
    color: "#808080",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
  titleContainer: {
    flexDirection: "row",
    gap: 8,
  },
});
