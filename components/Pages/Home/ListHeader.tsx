import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { GridIcon, ListIcon } from "@/components/UI/Icons";
import { globalColors } from "@/components/UI/Colors";

interface Props {
  type: string;
  setType: (val: string) => void;
}

export const ListHeader = ({ type = "list", setType = () => {} }: Props) => {
  return (
    <TouchableOpacity
      onPress={() => setType(type === "list" ? "grid" : "list")}
      style={styles.container}
    >
      <Text style={styles.title}>Главное меню</Text>

      <View style={styles.buttonContainer}>
        <View style={styles.icon}>
          <GridIcon
            color={type === "grid" ? globalColors.grey : globalColors.black}
          />
        </View>

        <View style={styles.icon}>
          <ListIcon
            color={type === "list" ? globalColors.grey : globalColors.black}
          />
        </View>

        <View
          style={[
            styles.toggleIndicator,
            type === "list" ? styles.leftToggle : styles.rightToggle,
          ]}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: globalColors.black,
  },
  icon: {
    paddingHorizontal: 5,
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#d3d3d3",
    borderRadius: 10,
    overflow: "hidden",
    height: 30,
    width: 60,
  },

  toggleIndicator: {
    position: "absolute",
    top: 0,
    bottom: 0,
    width: "50%",
    backgroundColor: "#d3d3d3",
    zIndex: -1,
    borderRadius: 8,
  },
  leftToggle: {
    left: 0,
  },
  rightToggle: {
    right: 0,
  },
});
