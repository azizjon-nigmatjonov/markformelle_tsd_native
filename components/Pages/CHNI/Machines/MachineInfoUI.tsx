import { StyleSheet, View, Text } from "react-native";
import { ModalBtn } from "../../Rolls/Components/ModalBtn";
import StatusUI from "@/app/chni/machines/components/StatusUI";
import ScanningDocUI from "@/app/chni/machines/components/ScanningDocUI";
import DocInfoUI from "@/app/chni/machines/components/DocInfoUI/DocInfoUI";
import { useTheme } from "@/hooks/useTheme";
import { useState } from "react";

const MachineInfoUI = ({
  setCustomInputActions,
  customInputActions,
  openModal,
  setOpenModal,
  docId,
  setMachineId,
  machineId,
  setDocId,
  setAlertInfo,
  clearFn,
  machineData,
  docData = {},
  setDocData,
  setMachineData,
}: {
  setCustomInputActions: (val: string[]) => void;
  customInputActions: string[];
  openModal: boolean;
  setOpenModal: (val: boolean) => void;
  setMachineId: (val: string) => void;
  machineId: string;
  setDocId: (val: string) => void;
  docId: string;
  setAlertInfo: (val: any) => void;
  clearFn: () => void;
  machineData: any;
  docData: any;
  setDocData: (val: any) => void;
  setMachineData: (val: any) => void;
}) => {
  const { colors } = useTheme();
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View>
      <View
        style={[
          styles.card,
          {
            backgroundColor: colors.cardBackground,
            borderColor: colors.border,
          },
        ]}
      >
        <View style={styles.header}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>
              {machineData?.machine_info?.NUMBER_ID}
            </Text>
            <Text style={styles.infoText}>
              {machineData?.machine_info?.OBORUD_NAIM}
            </Text>
          </View>
          <ModalBtn
            setCustomInputActions={setCustomInputActions}
            customInputActions={customInputActions}
            openModal={openModal}
            setOpenModal={(v) => {
              setOpenModal(v)
              setModalVisible(v)
            }}
          />
        </View>
        <StatusUI
          machineData={machineData}
          docData={docData}
          setMachineData={setMachineData}
        />
      </View>
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
            clearFn={() => clearFn()}
            docData={docData}
            setMachineData={setMachineData}
            setDocData={setDocData}
            machineData={machineData}
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
          />
        </View>
      ) : (
        <ScanningDocUI
          customInputActions={customInputActions}
          setAlertInfo={setAlertInfo}
          docId={docId}
          setDocId={setDocId}
          setMachineId={setMachineId}
          machineId={machineId}
          openModal={openModal}
          setDocData={setDocData}
          setMachineData={setMachineData}
          machineData={machineData}
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
  card: {
    borderRadius: 16,
    borderWidth: 1,
    // overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
    padding: 10,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    // height: 35,
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
    fontSize: 16,
    color: "#666",
  },
  infoText: {
    fontSize: 18,
    letterSpacing: -0.5,
  },
});

export default MachineInfoUI;
