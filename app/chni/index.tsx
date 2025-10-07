import { ThemedView } from "@/components/ThemedView";
import HeaderUI from "@/components/UI/Header";
import { Dimensions, Text, StyleSheet, View } from "react-native";
import CHNIHome from "@/components/Pages/CHNI/CHNIHome";
import { globalStyles } from "@/components/UI/GlobalStyles";

export default function CHNIIndexPage() {
  const { height: SCREEN_HEIGHT } = Dimensions.get("window");

  return (
    <ThemedView style={{ height: SCREEN_HEIGHT }}>
      <HeaderUI place="CHNI" />
      <View style={globalStyles.container}>
        <CHNIHome />
      </View>
    </ThemedView>
  );
}
