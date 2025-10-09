import { ThemedView } from "@/components/ThemedView";
import HeaderUI from "@/components/UI/Header";
import { Dimensions, Text, StyleSheet, View, ScrollView } from "react-native";
import { globalStyles } from "@/components/UI/GlobalStyles";
import { BackButtonNavigate } from "@/components/UI/BackButtonNavigate";
import MachineCard from "@/components/Pages/CHNI/Machines/MachineCards";

export default function MachinesListPage() {
  const { height: SCREEN_HEIGHT } = Dimensions.get("window");

  return (
    <ThemedView style={{ height: SCREEN_HEIGHT }}>
      <HeaderUI
        place="Список машин"
        extra={<BackButtonNavigate link="/chni" />}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={[globalStyles.container, styles.content]}>
          <Text style={styles.title}>Список ваших машин</Text>
          <MachineCard />
        </View>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
  },
});
