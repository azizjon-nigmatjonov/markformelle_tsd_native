import React, { useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import CModal from "@/components/CElements/CModal";
import { NavigateButton } from "@/components/UI/NavigateButton";
import { useTheme } from "@/hooks/useTheme";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useRouter } from "expo-router";
import { useMobileStore } from "@/store/mobile";
import { useLogout } from "@/hooks/useAuth";

export const ProfileLogout = () => {
  const [open, setOpen] = useState(false);
  const router: any = useRouter();
  const { colors } = useTheme();
  const { setPage, setPageData } = useMobileStore();
  const logoutMutation = useLogout();

  const handleLogout = () => {
    setOpen(false);
    setPageData({});
    setPage("login");
    logoutMutation.mutate();
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
