import { ThemedView } from "@/components/ThemedView";
import HeaderUI from "@/components/UI/Header";
import { Dimensions, Text, StyleSheet, View, Image } from "react-native";
import { globalStyles } from "@/components/UI/GlobalStyles";
import { BackButtonNavigate } from "@/components/UI/BackButtonNavigate";
import MachineInfoUI from "@/components/Pages/CHNI/Machines/MachineInfoUI";
import DocInfoUI from "./components/DocInfoUI/DocInfoUI";
import GetProductUI from "./components/GetProductUI";
import { useEffect, useState } from "react";
import ScanningUI from "./components/ScanningUI";
import { useTranslate } from "@/hooks/useTranslate";
import ScanningDocUI from "./components/ScanningDocUI";

export default function MachinePage() {
  const { height: SCREEN_HEIGHT } = Dimensions.get("window");
  const t = useTranslate();
  const [machineId, setMachineId] = useState("");
  const [docId, setDocId] = useState("");
  const [alertInfo, setAlertInfo] = useState<any>({
    type: "info",
    title: t("chni.scan_machine"),
  });
  const [customInputActions, setCustomInputActions] = useState<string[]>([]);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    if (machineId) {
      setAlertInfo({
        type: "info",
        title: t("chni.scan_document"),
      });
    }
  }, [machineId]);
  console.log("123", docId, machineId);

  return (
    <ThemedView style={{ height: SCREEN_HEIGHT }}>
      <HeaderUI place={"chni.machine"} extra={<BackButtonNavigate />} />
      {machineId ? (
        <View style={[globalStyles.container, styles.content]}>
          <MachineInfoUI
            setCustomInputActions={setCustomInputActions}
            customInputActions={customInputActions}
            openModal={openModal}
            setOpenModal={setOpenModal}
            docId={docId}
            alertInfo={alertInfo}
            setMachineId={setMachineId}
            machineId={machineId}
            setDocId={setDocId}
            setAlertInfo={setAlertInfo}
          />
        </View>
      ) : (
        <ScanningUI
          alertInfo={alertInfo}
          setCustomInputActions={setCustomInputActions}
          customInputActions={customInputActions}
          openModal={openModal}
          setOpenModal={setOpenModal}
          setAlertInfo={setAlertInfo}
          docId={docId}
          setDocId={setDocId}
          setMachineId={setMachineId}
          machineId={machineId}
        />
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: 16,
  },
});
