import { ThemedView } from "@/components/ThemedView";
import HeaderUI from "@/components/UI/Header";
import Categories from "../../components/Pages/Home/Categories";

export default function HomeScreen() {
  return (
    <ThemedView>
      <HeaderUI />
      <Categories />
    </ThemedView>
  );
}
