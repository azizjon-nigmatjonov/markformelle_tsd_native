import { ThemedView } from "@/components/ThemedView";
import HeaderUI from "@/components/UI/Header";
import {
  Dimensions,
  Text,
  StyleSheet,
  View,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { globalStyles } from "@/components/UI/GlobalStyles";
import { BackButtonNavigate } from "@/components/UI/BackButtonNavigate";
import DocumentCards from "@/components/Pages/CHNI/Documents/DocumentCards";
import { useQuery } from "@tanstack/react-query";
import { documentsService } from "@/api/services";

export default function DocumentsListPage() {
  const { height: SCREEN_HEIGHT } = Dimensions.get("window");

  const { data, isLoading, error } = useQuery({
    queryKey: ["documents"],
    queryFn: () => documentsService.getAll(),
  });

  return (
    <ThemedView style={{ height: SCREEN_HEIGHT }}>
      <HeaderUI
        place="Список документов"
        extra={<BackButtonNavigate link="/chni" />}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={[globalStyles.container, styles.content]}>
          <Text style={styles.title}>Список документов</Text>
          {isLoading ? (
            <ActivityIndicator size="large" style={styles.loader} />
          ) : error ? (
            <Text style={styles.error}>Ошибка загрузки документов</Text>
          ) : (
            <DocumentCards data={data?.data || []} />
          )}
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
  loader: {
    marginTop: 20,
  },
  error: {
    fontSize: 16,
    color: "red",
    textAlign: "center",
    marginTop: 20,
  },
});
