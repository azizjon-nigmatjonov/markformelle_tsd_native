import { View, Text, StyleSheet } from "react-native";
import { globalColors } from "./Colors";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useMemo } from "react";
interface Props {
  title: string;
  type: string;
}

export const AlertUI = ({ title = "", type = "info" }: Props) => {
  const BackColor = useMemo(() => {
    switch (type) {
      case "info":
        return globalColors.primary60;
      case "error":
        return "#fdeded";
      case "success":
        return "#e5f6fd";
      case "warn":
        return "#fff4e5";
      default:
        return globalColors.primary60;
    }
  }, [type]);

  const Color = useMemo(() => {
    switch (type) {
      case "info":
        return globalColors.primary;
      case "error":
        return globalColors.error;
      case "success":
        return globalColors.success;
      case "warn":
        return globalColors.yellow;
      default:
        return globalColors.primary;
    }
  }, [type]);
  return (
    <View style={[styles.wrapper, { backgroundColor: BackColor }]}>
      <AntDesign name="exclamationcircleo" size={20} color={Color} />
      <Text style={[styles.text, { color: Color }]}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: globalColors.primary60,
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 12,
    paddingRight: 20,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    zIndex: -1,
  },
  text: {
    color: globalColors.black,
    fontSize: 18,
    marginLeft: 10,
    fontWeight: "500",
    letterSpacing: -0.5,
  },
});
