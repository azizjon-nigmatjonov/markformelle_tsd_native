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
import MachineCard from "@/components/Pages/CHNI/Machines/MachineCards";
import { useMachines } from "@/hooks/useMachines";
import { EmptyState } from "@/components/UI/EmptyState";

export default function MachinesListPage() {
  const { height: SCREEN_HEIGHT } = Dimensions.get("window");
  const { data: machines, isLoading, error } = useMachines();

  return (
    <ThemedView style={{ height: SCREEN_HEIGHT }}>
      <HeaderUI
        place="Список машин"
        extra={<BackButtonNavigate link="/chni" />}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={[globalStyles.container, styles.content]}>
          <Text style={styles.title}>Список ваших машин</Text>

          {isLoading && (
            <View style={styles.centerContainer}>
              <ActivityIndicator size="large" color="#007AFF" />
              <Text style={styles.loadingText}>Загрузка машин...</Text>
            </View>
          )}

          {error && (
            <EmptyState
              icon="alert-circle-outline"
              title="Ошибка загрузки"
              description="Не удалось загрузить список машин"
            />
          )}

          {!isLoading && !error && machines && machines.data.length === 0 && (
            <EmptyState
              icon="cube-outline"
              title="Нет машин"
              description="Список машин пуст"
            />
          )}

          {!isLoading && !error && machines && machines.data.length > 0 && (
            <MachineCard machines={machines.data} />
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
  subtitle: {
    fontSize: 16,
    color: "#666",
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 40,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: "#666",
  },
});
