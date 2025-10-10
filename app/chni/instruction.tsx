import { ThemedView } from "@/components/ThemedView";
import HeaderUI from "@/components/UI/Header";
import { Dimensions, View } from "react-native";
import { globalStyles } from "@/components/UI/GlobalStyles";
import { EmptyState } from "@/components/UI/EmptyState";
import { InstructionEmptyIcon } from "@/components/UI/Icons/InstructionEmptyIcon";
import { useTranslate } from "@/hooks/useTranslate";

export default function CHNIInstructionScreen() {
  const { height: SCREEN_HEIGHT } = Dimensions.get("window");
  const t = useTranslate();

  return (
    <ThemedView style={{ height: SCREEN_HEIGHT }}>
      <HeaderUI place={t("navigation.instruction")} />
      <View style={[globalStyles.container, { paddingTop: 50 }]}>
        <EmptyState
          icon={<InstructionEmptyIcon size={180} />}
          title={t("emptyState.instruction.title")}
          description={t("emptyState.instruction.description")}
        />
      </View>
    </ThemedView>
  );
}
