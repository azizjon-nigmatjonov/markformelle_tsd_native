import { Tabs } from "expo-router";
import React, { useState } from "react";
import { Text, StyleSheet, Pressable } from "react-native";
import { HomeIcon, InstructionIcon, SettingIcon } from "@/components/UI/Icons";
import { globalColors } from "@/components/UI/Colors";
import { useMobileStore } from "@/store/mobile";
// import { useTabContext } from "@/path/to/TabContext";

export default function TabLayout() {
  const [selectedTab, setSelectedTab] = useState("");
  const { setPage, setPageData } = useMobileStore();

  const ClearPages = () => {
    setPage("");
    setPageData({});
  };

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          height: 60,
          paddingBottom: 10,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Главная",
          tabBarButton: (props) => (
            <Pressable
              {...props}
              onPress={(e) => {
                setSelectedTab("index");
                ClearPages();
                props.onPress && props.onPress(e);
              }}
            >
              <HomeIcon
                color={
                  selectedTab === "index"
                    ? globalColors.black
                    : globalColors.grey
                }
              />
              <Text
                style={[
                  styles.tabBarLabel,
                  {
                    color:
                      selectedTab === "index"
                        ? globalColors.black
                        : globalColors.grey,
                  },
                ]}
              >
                Главная
              </Text>
            </Pressable>
          ),
        }}
      />
      <Tabs.Screen
        name="instruction"
        options={{
          title: "Инструкция",
          tabBarButton: (props) => (
            <Pressable
              {...props}
              onPress={(e) => {
                setSelectedTab("instruction");
                ClearPages();
                props.onPress && props.onPress(e);
              }}
            >
              <InstructionIcon
                color={
                  selectedTab === "instruction"
                    ? globalColors.black
                    : globalColors.grey
                }
              />
              <Text
                style={[
                  styles.tabBarLabel,
                  {
                    color:
                      selectedTab === "instruction"
                        ? globalColors.black
                        : globalColors.grey,
                  },
                ]}
              >
                Инструкция
              </Text>
            </Pressable>
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Настройки",
          tabBarButton: (props) => (
            <Pressable
              {...props}
              onPress={(e) => {
                setSelectedTab("settings");
                ClearPages();
                props.onPress && props.onPress(e);
              }}
            >
              <SettingIcon
                color={
                  selectedTab === "settings"
                    ? globalColors.black
                    : globalColors.grey
                }
              />
              <Text
                style={[
                  styles.tabBarLabel,
                  {
                    color:
                      selectedTab === "settings"
                        ? globalColors.black
                        : globalColors.grey,
                  },
                ]}
              >
                Настройки
              </Text>
            </Pressable>
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
