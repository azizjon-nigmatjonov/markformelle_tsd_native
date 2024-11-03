import { Tabs } from "expo-router";
import React from "react";
import { Text, StyleSheet } from "react-native";
import { HomeIcon, InstructionIcon, SettingIcon } from "@/components/UI/Icons";
import { globalColors } from "@/components/UI/Colors";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Главная",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <HomeIcon
              color={focused ? globalColors.black : globalColors.grey}
            />
          ),
          tabBarLabel: ({ focused }) => (
            <Text
              style={[
                styles.tabBarLabel,
                { color: focused ? globalColors.black : globalColors.grey },
              ]}
            >
              Главная
            </Text>
          ),
        }}
      />
      <Tabs.Screen
        name="instruction"
        options={{
          title: "Инструкция",
          tabBarIcon: ({ focused }) => (
            <InstructionIcon
              color={focused ? globalColors.black : globalColors.grey}
            />
          ),
          tabBarLabel: ({ focused }) => (
            <Text
              style={[
                styles.tabBarLabel,
                { color: focused ? globalColors.black : globalColors.grey },
              ]}
            >
              Инструкция
            </Text>
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Настройки",
          tabBarIcon: ({ focused }) => (
            <SettingIcon
              color={focused ? globalColors.black : globalColors.grey}
            />
          ),
          tabBarLabel: ({ focused }) => (
            <Text
              style={[
                styles.tabBarLabel,
                { color: focused ? globalColors.black : globalColors.grey },
              ]}
            >
              Настройки
            </Text>
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBarLabel: {
    fontSize: 12,
    fontWeight: "bold",
  },
});
