import React from "react";
import { View, Text } from "react-native";
import { ReactNode } from "react";
import { useAuthStore } from "../../store/auth";
import { StyleSheet, ViewStyle, TextStyle } from "react-native";
import { useTheme } from "@/hooks/useTheme";
import { LinearGradient } from "expo-linear-gradient";
import { useTranslation } from "react-i18next";
import { useSectionsStore } from "@/store/sections";

interface Props {
  place?: string;
  extra?: ReactNode;
}

const HeaderUI = ({ place = "", extra }: Props) => {
  const { user_info } = useAuthStore();
  const { colors } = useTheme();
  const { t } = useTranslation();
  const sections: any = useSectionsStore.getState().sections;
  return (
    <View style={styles.headerWrapper}>
      <LinearGradient
        colors={["rgba(171, 7, 126, 1)", "rgba(142, 188, 238, 1)"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        <View style={styles.container}>
          <View style={styles.userInfo}>
            <Text style={styles.userName}>{user_info?.spec_naim}</Text>
            <Text style={styles.userName}>
              {user_info?.fio?.split(" ")[0] +
                " " +
                user_info?.fio?.split(" ")[1]}
            </Text>
            <View style={styles.locationWrapper}>
              <Text style={styles.boldText}>
                {t(
                  sections[user_info?.podr_id as keyof typeof sections] +
                    ".title"
                )}
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
    fontSize: 14,
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
