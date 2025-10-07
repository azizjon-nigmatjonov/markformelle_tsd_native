import { ThemedView } from "@/components/ThemedView";
import KnittingHomeWrapper from "@/components/Pages/Knitting/Home";
import { useAuthStore } from "@/store/auth";
import CHNIPage from "@/components/Pages/CHNI/CHNIPage";

export default function HomeScreen() {
  // get user info
  const { user_info } = useAuthStore();
  console.log(user_info);
  return (
    <ThemedView>
      {user_info.role === "knitting" && <KnittingHomeWrapper />}
      {user_info.role === "chni" && <CHNIPage />}
    </ThemedView>
  );
}
