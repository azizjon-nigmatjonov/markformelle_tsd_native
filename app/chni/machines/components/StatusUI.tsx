import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Modal,
  ScrollView,
} from "react-native";
import { globalColors } from "@/components/UI/Colors";
import { useTranslation } from "react-i18next";
import { useState } from "react";

const statusList = [
  { key: "working", color: globalColors.success },
  { key: "stopped", color: "#FF6B6B" },
  { key: "no_connection", color: "#FFA500" },
  { key: "no_plan", color: "#9B59B6" },
  { key: "no_fixing", color: "#E74C3C" },
];

const StatusUI = () => {
  const { t } = useTranslation();
  const [modalVisible, setModalVisible] = useState(false);
  const [status, setStatus] = useState("working");

  const handleStatusChange = (statusKey: string) => {
    setStatus(statusKey);
    setModalVisible(false);
  };

  const currentStatus =
    statusList.find((s) => s.key === status) || statusList[0];

  return (
    <>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: currentStatus.color }]}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.buttonText}>{t("common.status")}:</Text>
        <Text style={styles.buttonText}>{t(`common.${status}`)}</Text>
      </TouchableOpacity>

      <Modal
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{t("common.status")}</Text>

            <ScrollView style={styles.statusList}>
              {statusList.map((statusItem) => (
                <TouchableOpacity
                  key={statusItem.key}
                  style={[
                    styles.statusItem,
                    status === statusItem.key && styles.selectedStatus,
                  ]}
                  onPress={() => handleStatusChange(statusItem.key)}
                >
                  <View
                    style={[
                      styles.statusIndicator,
                      { backgroundColor: statusItem.color },
                    ]}
                  />
                  <Text
                    style={[
                      styles.statusName,
                      status === statusItem.key && styles.selectedStatusText,
                    ]}
                  >
                    {t(`common.${statusItem.key}`)}
                  </Text>
                  {status === statusItem.key && (
                    <Text style={styles.checkmark}>✓</Text>
                  )}
                </TouchableOpacity>
              ))}
            </ScrollView>

            <TouchableOpacity
              style={styles.closeButton}
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
  button: {
    gap: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 8,
    borderRadius: 12,
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "white",
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
    color: globalColors.primary,
  },
  statusList: {
    marginBottom: 15,
  },
  statusItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    backgroundColor: "#f5f5f5",
  },
  selectedStatus: {
    backgroundColor: globalColors.primary + "20",
    borderWidth: 2,
    borderColor: globalColors.primary,
  },
  statusIndicator: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginRight: 15,
  },
  statusName: {
    fontSize: 18,
    flex: 1,
    color: "#333",
  },
  selectedStatusText: {
    fontWeight: "600",
    color: globalColors.primary,
  },
  checkmark: {
    fontSize: 24,
    color: globalColors.primary,
    fontWeight: "bold",
  },
  closeButton: {
    backgroundColor: globalColors.grey,
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  closeButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default StatusUI;
