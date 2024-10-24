import React from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Linking,
} from "react-native";
import { support_list } from "./Logic";
import { PhoneIcon, TelegramIcon } from "@/components/UI/Icons";
import { globalColors } from "@/components/UI/Colors";

export const SupportList = () => {
  const openPhone = (phone: string) => {
    Linking.openURL(`tel:${phone}`);
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
        <TouchableOpacity onPress={() => openPhone(item.phone)}>
          <PhoneIcon color={globalColors.primary} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => openTelegram(item.telegram)}>
          <TelegramIcon color={globalColors.primary} />
        </TouchableOpacity>
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
