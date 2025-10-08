import { t } from "i18next";
import { StyleSheet, View, Text } from "react-native";
import { ClockIcon } from "@/components/UI/Icons";
import { ModalBtn } from "../../Rolls/Components/ModalBtn";
import StatusUI from "@/app/chni/machines/components/StatusUI";
import ScanningDocUI from "@/app/chni/machines/components/ScanningDocUI";
import DocInfoUI from "@/app/chni/machines/components/DocInfoUI/DocInfoUI";
import GetProductUI from "@/app/chni/machines/components/GetProductUI";

const MachineInfoUI = ({
  setCustomInputActions,
  customInputActions,
  openModal,
  setOpenModal,
  docId,
  alertInfo,
  setMachineId,
  machineId,
  setDocId,
  setAlertInfo,
}: {
  setCustomInputActions: (val: string[]) => void;
  customInputActions: string[];
  openModal: boolean;
  setOpenModal: (val: boolean) => void;
  alertInfo: any;
  setMachineId: (val: string) => void;
  machineId: string;
  setDocId: (val: string) => void;
  docId: string;
  setAlertInfo: (val: any) => void;
}) => {
  return (
    <View>
      <View style={styles.header}>
        <Text style={styles.title}>{t("chni.machine")} 230</Text>
        <ModalBtn
          setCustomInputActions={setCustomInputActions}
          customInputActions={customInputActions}
          openModal={openModal}
          setOpenModal={setOpenModal}
        />
      </View>
      <View style={styles.infoContainer}>
        <View style={styles.info}>
          <View>
            <Text style={styles.label}>Мощность машины</Text>
          </View>
          <View style={styles.infoText}>
            <Text style={styles.infoValue}>230 носков / час</Text>
            <ClockIcon />
          </View>
        </View>
      </View>
      <StatusUI />
      {docId ? (
        <View>
          <DocInfoUI
            setAlertInfo={setAlertInfo}
            docId={docId}
            setDocId={setDocId}
            setMachineId={setMachineId}
            machineId={machineId}
            customInputActions={customInputActions}
            openModal={openModal}
          />
          <GetProductUI />
        </View>
      ) : (
        <ScanningDocUI
          alertInfo={alertInfo}
          customInputActions={customInputActions}
          setAlertInfo={setAlertInfo}
          docId={docId}
          setDocId={setDocId}
          setMachineId={setMachineId}
          machineId={machineId}
          openModal={openModal}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    position: "relative",
    zIndex: 9999,
    elevation: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  infoContainer: {
    position: "relative",
    zIndex: 1,
  },
  info: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  label: {
    fontSize: 14,
    color: "#666",
  },
  infoText: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  infoValue: {
    fontSize: 14,
    fontWeight: "600",
  },
});

export default MachineInfoUI;
