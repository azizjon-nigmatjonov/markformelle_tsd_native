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
import { useMemo, useState } from "react";
import { machinesService } from "@/api/services/machines.service";
import { useAuthStore } from "@/store/auth";
import { useToast } from "@/components/UI/ToastProvider";

const statusList = [
  { key: "PRODUCING", color: globalColors.success },
  { key: "MAINTENANCE", color: "#FF6B6B" },
  { key: "ERROR", color: "#FFA500" },
  { key: "BREAK", color: "#9B59B6" },
  { key: "EMPTY", color: "#E74C3C" },
];

const StatusUI = ({
  machineData = {},
  docData = {},
  setMachineData,
}: {
  machineData: any;
  docData: any;
  setMachineData: (val: any) => void;
}) => {
  const { t } = useTranslation();
  const [modalVisible, setModalVisible] = useState(false);
  const { user_info } = useAuthStore();
  const toast = useToast();

  const handleStatusChange = async (statusKey: string) => {
    setModalVisible(false);

    const res = await machinesService.updateMachineStatus({
      machine_id: machineData.machine_id,
      user_id: user_info?.item_id,
      marsh_id: docData.marsh_id || null,
      status: statusKey,
      start_time: new Date().toISOString(),
    });
    toast.success("Статус успешно измененен!");
    setMachineData(res);
  };

  const currentStatus = useMemo(() => {
    return (
      statusList.find((s) => s.key === machineData.status.replace(/\s/g, "")) ||
      statusList[0]
    );
  }, [machineData.status]);

  return (
    <>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: currentStatus.color }]}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.buttonText}>{t("common.status")}:</Text>
        <Text style={styles.buttonText}>
          {t(`common.${currentStatus.key}`)}
        </Text>
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
    marginTop: 8,
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
