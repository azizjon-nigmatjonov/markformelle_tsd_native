import React, { useState } from "react";
import { Text, View, StyleSheet } from "react-native";
// import Icon from "react-native-vector-icons/MaterialIcons";
import CModal from "@/components/CElements/CModal";
import { useAuthStore } from "@/store/auth";
import { NavigateButton } from "@/components/UI/NavigateButton";
import { useTheme } from "@/hooks/useTheme";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useRouter } from "expo-router";
import { useMobileStore } from "@/store/mobile";

export const ProfileLogout = () => {
  const [open, setOpen] = useState(false);
  const router: any = useRouter();
  const { colors } = useTheme();
  const { setPage, setPageData } = useMobileStore();
  const { setUserInfo } = useAuthStore();

  const handleLogout = () => {
    setOpen(false);
    setUserInfo({});
    setPageData({});
    setPage("login");
    setUserInfo({});
    router.push(`(login)`);

    // navigation.navigate("Home"); // Adjust route as needed
  };

  return (
    <View
      style={{
        paddingLeft: 16,
        borderTopWidth: 1,
        borderTopColor: colors.border,
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <View style={{ width: 45 }}>
        <AntDesign name="arrowleft" size={24} color={colors.text} />
      </View>
      <NavigateButton
        title="Выход из системы"
        last={true}
        onClickAction={() => setOpen(true)}
      />

      <CModal
        open={open}
        handleClose={() => setOpen(false)}
        textSaveBtn="Да"
        textDeleteBtn="Нет"
        handleSave={() => handleLogout()}
      >
        <Text style={[styles.modalTitle, { color: colors.text }]}>
          Вы хотите выйти из системы?
        </Text>
      </CModal>
    </View>
  );
};

const styles = StyleSheet.create({
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
  },
});
