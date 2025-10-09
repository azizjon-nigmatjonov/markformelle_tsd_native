import React from "react";
import { View, Text } from "react-native";
import { ReactNode } from "react";
import { useAuthStore } from "../../store/auth";
import { StyleSheet, ViewStyle, TextStyle } from "react-native";
import { useTheme } from "@/hooks/useTheme";
import { LinearGradient } from "expo-linear-gradient";
import { useTranslation } from "react-i18next";

interface Props {
  place?: string;
  extra?: ReactNode;
}

const HeaderUI = ({ place = "", extra }: Props) => {
  const { user_info } = useAuthStore();
  const { colors } = useTheme();
  const { t } = useTranslation();
  return (
    <View style={styles.headerWrapper}>
      <LinearGradient
        colors={["rgba(171, 7, 126, 1)", "rgba(142, 188, 238, 1)"]} // Set the gradient colors
        start={{ x: 0, y: 0 }} // Starting point
        end={{ x: 1, y: 1 }} // Ending point
        style={styles.header} // Apply gradient as a style
      >
        <View style={styles.container}>
          <View style={styles.userInfo}>
            <Text style={styles.userName}>{user_info?.name}</Text>
            <View style={styles.locationWrapper}>
              <Text style={styles.boldText}>
                {t(user_info?.role + ".title")}
              </Text>
              {place ? (
                <Text style={[styles.greyText, { color: colors.grey20 }]}>
                  / {t(place)}
                </Text>
              ) : null}
            </View>
          </View>
          {extra}
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  headerWrapper: {
    // paddingBottom: 75,
    // paddingTop: 20,
  } as ViewStyle,
  header: {
    width: "100%",
    height: 100,
    justifyContent: "center",
  } as ViewStyle,
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 12,
    marginTop: 30,
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
    // color will be applied dynamically
  } as TextStyle,
});

export default HeaderUI;
