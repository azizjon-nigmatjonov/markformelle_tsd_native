import React from "react";
import { View, Text, StyleSheet } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { globalColors } from "../UI/Colors";

interface Props {
  title: string;
}

export const CInfo: React.FC<Props> = ({ title = "" }) => {
  return (
    <View style={styles.container}>
      <AntDesign name="checksquare" size={56} color={globalColors.success} />
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 24, // Equivalent to 3xl in Tailwind
    fontWeight: "500",
    marginTop: 8,
    textAlign: "center",
  },
});

export default CInfo;
