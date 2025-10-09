import { ThemedView } from "@/components/ThemedView";
import HeaderUI from "@/components/UI/Header";
import { Dimensions, Text, StyleSheet, View, ScrollView } from "react-native";
import { globalStyles } from "@/components/UI/GlobalStyles";
import { BackButtonNavigate } from "@/components/UI/BackButtonNavigate";
import MachineInfoUI from "@/components/Pages/CHNI/Machines/MachineInfoUI";
import { useEffect, useState, useRef } from "react";
import ScanningUI from "./components/ScanningUI";
import { useTranslate } from "@/hooks/useTranslate";
import { AlertUI } from "@/components/UI/Alert";

export default function MachinePage() {
  const { height: SCREEN_HEIGHT } = Dimensions.get("window");
  const t = useTranslate();
  const [machineId, setMachineId] = useState("");
  const [machineData, setMachineData] = useState<any>({});
  const [docId, setDocId] = useState("");
  const [docData, setDocData] = useState<any>({});
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
    if (!machineId && !docId) {
      setAlertInfo({
        type: "info",
        title: t("chni.scan_machine"),
      });
    } else {
      setAlertInfo({});
    }
  }, [machineId, docId]);

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
      <ScrollView
        style={{
          overflow: "scroll",
          flex: flex ? 1 : 6,
          paddingBottom: flex,
          height: flex ? SCREEN_HEIGHT : 1000,
        }}
        showsVerticalScrollIndicator={false}
      >
        <HeaderUI
          place={
            machineData.NUMBER_ID
              ? t("chni.machine") + " / " + machineData.NUMBER_ID
              : t("chni.machine")
          }
          extra={<BackButtonNavigate link="/chni" />}
        />

        {alertInfo?.type && (
          <View style={styles.alert}>
            <AlertUI title={alertInfo.title} type={alertInfo.type}></AlertUI>
          </View>
        )}
        {machineId ? (
          <View style={[globalStyles.container, styles.content]}>
            <MachineInfoUI
              setCustomInputActions={setCustomInputActions}
              customInputActions={customInputActions}
              openModal={openModal}
              setOpenModal={setOpenModal}
              docId={docId}
              setMachineId={setMachineId}
              machineId={machineId}
              setDocId={setDocId}
              setAlertInfo={setAlertInfo}
              clearFn={clearFn}
              machineData={machineData}
              docData={docData}
              setDocData={setDocData}
              setMachineData={setMachineData}
            />
          </View>
        ) : (
          <ScanningUI
            setCustomInputActions={setCustomInputActions}
            customInputActions={customInputActions}
            openModal={openModal}
            setOpenModal={setOpenModal}
            setAlertInfo={setAlertInfo}
            docId={docId}
            setDocId={setDocId}
            setMachineId={setMachineId}
            machineId={machineId}
            setMachineData={setMachineData}
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
    padding: 12,
  },
  alert: {
    marginTop: 12,
    paddingHorizontal: 12,
  },
});
