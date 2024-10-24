import { useRouter } from "expo-router";
import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

const menuList = [
  {
    title: "Архив",
    icon: require("../../assets/trash/archiv.png"), // Update the path as necessary
    link: "/document/list",
    type: "archive",
  },
  {
    title: "Создать документ",
    icon: require("../../assets/trash/document.png"), // Update the path as necessary
    link: "/document/type",
    type: "document",
  },
];

export const Menus = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {menuList.map((item) => (
        <TouchableOpacity
          key={item.title}
          onPress={() => {
            router.push(item.link);
          }}
          style={styles.menuItem}
        >
          <Image source={item.icon} style={styles.icon} />
          <Text style={styles.title}>{item.title}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 10, // Adjust as necessary
  },
  menuItem: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#fff", // Replace with the appropriate color if needed
    borderColor: "var(--border)", // Update this as per your color scheme
    borderWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
    height: 80,
    marginBottom: 10,
  },
  icon: {
    width: 34,
    height: undefined, // Set height to auto by keeping this undefined
    aspectRatio: 1, // Maintain aspect ratio
  },
  title: {
    fontWeight: "500", // Medium font weight
    marginTop: 8, // Space between icon and text
  },
});

export default Menus;
