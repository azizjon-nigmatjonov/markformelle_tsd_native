import { NavigateButton } from "@/components/UI/NavigateButton";
import React from "react";
import { View, Text } from "react-native";

const RuFlagIcon = () => (
  <View style={{ justifyContent: "center", alignItems: "center" }}>
    <Text style={{ fontSize: 24 }}>🇷🇺</Text>
  </View>
);

export const ProfileLanguage: React.FC = () => {
  return (
    <NavigateButton title="Язык системы" icon={<RuFlagIcon />} last={true} />
  );
};
