import React from "react";
import { View, Text } from "react-native";
import { ReactNode } from "react";
import { useAuthStore } from "../../store/auth"; // Adjust path as necessary
import { StyleSheet, ViewStyle, TextStyle } from "react-native";
import { globalColors } from "./Colors";

interface Props {
  place?: string;
  extra?: ReactNode;
}

const HeaderUI = ({ place = "", extra }: Props) => {
  const { user_info } = useAuthStore();

  return (
    <View style={styles.headerWrapper}>
      <View style={styles.header}>
        <View style={styles.container}>
          <View style={styles.userInfo}>
            <Text style={styles.userName}>{user_info.name}</Text>
            <View style={styles.locationWrapper}>
              <Text style={styles.boldText}>Вязание</Text>
              {place ? <Text style={styles.greyText}> / {place}</Text> : null}
            </View>
          </View>
          {extra}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerWrapper: {
    paddingBottom: 70,
  } as ViewStyle,
  header: {
    backgroundColor: globalColors.main,
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    zIndex: 99,
    height: 70,
    justifyContent: "center",
  } as ViewStyle,
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
  } as ViewStyle,
  userInfo: {
    justifyContent: "center",
  } as ViewStyle,
  userName: {
    color: "white",
    fontSize: 16,
    fontWeight: "500",
    letterSpacing: 0.5,
  } as TextStyle,
  locationWrapper: {
    flexDirection: "row",
    marginTop: 4,
  } as ViewStyle,
  boldText: {
    fontWeight: "500",
    marginRight: 4,
    color: "white",
  } as TextStyle,
  greyText: {
    color: "grey",
  } as TextStyle,
});

export default HeaderUI;
