import { NavigateButton } from "@/components/UI/NavigateButton";
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ScrollView,
} from "react-native";
import { useTranslation } from "react-i18next";
import {
  changeLanguage,
  availableLanguages,
  getCurrentLanguage,
} from "@/i18n/config";
import { useTheme } from "@/hooks/useTheme";

const LanguageFlagIcon = ({ flag }: { flag: string }) => (
  <View style={{ justifyContent: "center", alignItems: "center" }}>
    <Text style={{ fontSize: 24 }}>{flag}</Text>
  </View>
);

export const ProfileLanguage: React.FC = () => {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const [modalVisible, setModalVisible] = useState(false);
  const [currentLang, setCurrentLang] = useState(getCurrentLanguage());

  const handleLanguageChange = async (languageCode: string) => {
    await changeLanguage(languageCode);
    setCurrentLang(languageCode);
    setModalVisible(false);
  };

  const currentLanguage =
    availableLanguages.find((lang) => lang.code === currentLang) ||
    availableLanguages[0];

  return (
    <>
      <NavigateButton
        title={t("settings.systemLanguage")}
        icon={<LanguageFlagIcon flag={currentLanguage.flag} />}
        last={true}
        onClickAction={() => setModalVisible(true)}
      />

      <Modal
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View
            style={[
              styles.modalContent,
              { backgroundColor: colors.cardBackground },
            ]}
          >
            <Text style={[styles.modalTitle, { color: colors.primary }]}>
              {t("settings.language")}
            </Text>

            <ScrollView style={styles.languageList}>
              {availableLanguages.map((language) => (
                <TouchableOpacity
                  key={language.code}
                  style={[
                    styles.languageItem,
                    { backgroundColor: colors.grey30 },
                    currentLang === language.code && {
                      backgroundColor: colors.primary30,
                      borderWidth: 2,
                      borderColor: colors.primary,
                    },
                  ]}
                  onPress={() => handleLanguageChange(language.code)}
                >
                  <Text style={styles.languageFlag}>{language.flag}</Text>
                  <Text
                    style={[
                      styles.languageName,
                      { color: colors.text },
                      currentLang === language.code && {
                        color: colors.primary,
                      },
                    ]}
                  >
                    {language.name}
                  </Text>
                  {currentLang === language.code && (
                    <Text style={[styles.checkmark, { color: colors.primary }]}>
                      ✓
                    </Text>
                  )}
                </TouchableOpacity>
              ))}
            </ScrollView>

            <TouchableOpacity
              style={[styles.closeButton, { backgroundColor: colors.grey }]}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>{t("common.cancel")}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    borderRadius: 20,
    padding: 20,
    width: "85%",
    maxHeight: "70%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    fontFamily: "Inter_700Bold",
  },
  languageList: {
    marginBottom: 15,
  },
  languageItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  languageFlag: {
    fontSize: 32,
    marginRight: 15,
  },
  languageName: {
    fontSize: 18,
    flex: 1,
    fontFamily: "Inter_400Regular",
  },
  checkmark: {
    fontSize: 24,
    fontWeight: "bold",
  },
  closeButton: {
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  closeButtonText: {
    color: "white",
    fontSize: 16,
    fontFamily: "Inter_600SemiBold",
  },
});
