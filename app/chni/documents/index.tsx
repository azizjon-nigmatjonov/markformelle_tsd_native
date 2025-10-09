import { ThemedView } from "@/components/ThemedView";
import HeaderUI from "@/components/UI/Header";
import { Dimensions, Text, StyleSheet, View, ScrollView } from "react-native";
import { globalStyles } from "@/components/UI/GlobalStyles";
import { BackButtonNavigate } from "@/components/UI/BackButtonNavigate";
import DocumentCards from "@/components/Pages/CHNI/Documents/DocumentCards";

export default function DocumentsListPage() {
  const { height: SCREEN_HEIGHT } = Dimensions.get("window");

  return (
    <ThemedView style={{ height: SCREEN_HEIGHT }}>
      <HeaderUI
        place="Список документов"
        extra={<BackButtonNavigate link="/chni" />}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={[globalStyles.container, styles.content]}>
          <Text style={styles.title}>Список всех документов</Text>
          <DocumentCards />
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
});
