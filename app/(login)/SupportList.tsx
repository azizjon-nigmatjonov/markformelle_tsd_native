import React from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Pressable,
  Linking,
  Alert,
} from "react-native";
import { support_list } from "./Logic";

export const SupportList = () => {
  const openPhone = (phone: string) => {
    Linking.openURL(`tel:${phone}`).catch((err) =>
      Alert.alert(
        "Error",
        "Unable to make a call. Please check your device settings."
      )
    );
  };

  const openTelegram = (telegram: string) => {
    Linking.openURL(telegram);
  };

  const renderItem = ({ item, index }: any) => (
    <View
      style={[
        styles.listItem,
        index !== support_list.length - 1 && styles.borderBottom,
      ]}
    >
      <View>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.phone}>{item.phone}</Text>
      </View>
      <View style={styles.iconGroup}>
        <Pressable onPress={() => openPhone(item.phone)}>
          <Text style={{ fontSize: 20 }}>☎️</Text>
        </Pressable>
        <Pressable onPress={() => openTelegram(item.telegram)}>
          <Text style={{ fontSize: 20 }}>✉️</Text>
        </Pressable>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={support_list}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    maxHeight: 300,
    overflow: "hidden", // No need for overflow-y as in web, we can scroll naturally
  },
  listItem: {
    paddingVertical: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  borderBottom: {
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  name: {
    fontWeight: "600",
    fontSize: 16,
  },
  phone: {
    fontSize: 14,
    color: "#666",
  },
  iconGroup: {
    flexDirection: "row",
    gap: 12,
  },
});

export default SupportList;
