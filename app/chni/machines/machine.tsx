import { ThemedView } from "@/components/ThemedView";
import HeaderUI from "@/components/UI/Header";
import { Dimensions, Text, StyleSheet, View, ScrollView } from "react-native";
import { globalStyles } from "@/components/UI/GlobalStyles";
import { BackButtonNavigate } from "@/components/UI/BackButtonNavigate";
import MachineInfoUI from "@/components/Pages/CHNI/Machines/MachineInfoUI";
import { useEffect, useState, useRef } from "react";
import ScanningUI from "./components/ScanningUI";
import { useTranslate } from "@/hooks/useTranslate";

export default function MachinePage() {
  const { height: SCREEN_HEIGHT } = Dimensions.get("window");
  const t = useTranslate();
  const scrollViewRef = useRef<ScrollView>(null);
  const [machineId, setMachineId] = useState("");
  const [docId, setDocId] = useState("");
  const [alertInfo, setAlertInfo] = useState<any>({});
  const [customInputActions, setCustomInputActions] = useState<string[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [flex, setFlex] = useState(100);
  useEffect(() => {
    if (machineId) {
      setAlertInfo({
        type: "info",
        title: t("chni.scan_document"),
      });
    }
  }, [machineId]);

  useEffect(() => {
    if (openModal || customInputActions.includes("open")) {
      setTimeout(() => {
        setFlex(0);
      }, 500);
    } else {
      setTimeout(() => {
        setFlex(100);
      }, 500);
    }
  }, [customInputActions, openModal]);

  useEffect(() => {
    if (!machineId) {
      setAlertInfo({
        type: "info",
        title: t("chni.scan_machine"),
      });
    }
  }, [machineId]);

  const clearFn = () => {
    setTimeout(() => {
      setMachineId("");
      setDocId("");
      setAlertInfo({});
      setCustomInputActions([]);
      setOpenModal(false);
    }, 500);
  };

  return (
    <ThemedView style={{ height: SCREEN_HEIGHT }}>
      <HeaderUI
        place={"chni.machine"}
        extra={<BackButtonNavigate link="/chni" />}
      />
      <ScrollView
        style={{
          overflow: "scroll",
          flex: flex ? 1 : 6,
          paddingBottom: flex,
          height: flex ? SCREEN_HEIGHT : 1000,
        }}
        showsVerticalScrollIndicator={false}
      >
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
              clearFn={clearFn}
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
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    padding: 16,
  },
});
