import { StyleSheet, View, Text } from "react-native";
import CCard from "@/components/CElements/CCard/CCard";
import { useState } from "react";
import { ScanningInput } from "@/components/Pages/CHNI/Machines/ScanningInput";
import GetProductUI from "../GetProductUI";

interface Props {
  setAlertInfo: (val: any) => void;
  docId: string;
  setDocId: (val: string) => void;
  setMachineId: (val: string) => void;
  machineId: string;
  customInputActions: string[];
  openModal: boolean;
  clearFn: () => void;
  docData: any;
  setMachineData: (val: any) => void;
  setDocData: (val: any) => void;
  machineData: any;
  modalVisible: boolean;
  setModalVisible: (val: boolean) => void;
}

const ProgressBar = ({
  factQty,
  planQty,
}: {
  factQty: number;
  planQty: number;
}) => {
  const percentage = planQty > 0 ? Math.min((factQty / planQty) * 100, 100) : 0;
  const isComplete = factQty >= planQty;
  const isOverflow = factQty > planQty;

  // Determine color based on progress
  const getProgressColor = () => {
    if (isOverflow) return "#FF9800"; // Orange for overflow
    if (isComplete) return "#4CAF50"; // Green for complete
    if (percentage >= 75) return "#2196F3"; // Blue for good progress
    if (percentage >= 50) return "#FFC107"; // Yellow for moderate progress
    return "#FF5252"; // Red for low progress
  };

  return (
    <View style={progressStyles.container}>
      <View style={progressStyles.header}>
        <Text style={progressStyles.label}>Прогресс выполнения</Text>
        <Text
          style={[progressStyles.percentage, { color: getProgressColor() }]}
        >
          {percentage.toFixed(1)}%
        </Text>
      </View>

      <View style={progressStyles.barContainer}>
        <View style={progressStyles.barBackground}>
          <View
            style={[
              progressStyles.barFill,
              {
                width: `${percentage}%`,
                backgroundColor: getProgressColor(),
              },
            ]}
          />
        </View>
      </View>
    </View>
  );
};

export default function DocInfoUI({
  setAlertInfo,
  docId,
  setDocId,
  setMachineId,
  machineId,
  customInputActions,
  openModal,
  clearFn,
  docData,
  setMachineData,
  setDocData,
  machineData,
  modalVisible,
  setModalVisible,
}: Props) {


  return (
    <View style={styles.wrapper}>
      <ScanningInput
        customInputActions={customInputActions}
        setAlertInfo={setAlertInfo}
        docId={docId}
        setDocId={setDocId}
        setMachineId={setMachineId}
        machineId={machineId}
        stopFocus={openModal || modalVisible}
        placeholder="Введите штрих-код"
        setMachineData={setMachineData}
        setDocData={setDocData}
        machineData={machineData}
      />

      <CCard
        headerInfo={{
          title: `№${docData.order_info?.order_name} от ${
            docData.order_info?.plan_start_time?.split("T")[0]
          }`,
        }}
        list={[
          {
            name: docData.order_info?.product_name,
            article: docData.order_info?.artikul,
            model: docData.order_info?.model,
            size: docData.order_info?.size,
            color: docData.order_info?.color,
            plan_qty: docData.order_info?.plan_qty,
            fact_qty: docData.order_info?.fact_qty,
          },
        ]}
        headColumns={[
          { title: "Наименование", id: "name" },
          { title: "Артикул", id: "article" },
          { title: "Модель", id: "model" },
          { title: "Размер", id: "size" },
          { title: "Цвет / рисунок", id: "color" },
          { title: "Факт. кол-во", id: "fact_qty" },
          { title: "Пл. кол-во", id: "plan_qty" },
        ]}
        footerUI={
          <View style={styles.footerContainer}>
            <ProgressBar
              factQty={docData.order_info?.fact_qty || 0}
              planQty={docData.order_info?.plan_qty || 0}
            />
            <GetProductUI
              modalVisible={modalVisible}
              setModalVisible={setModalVisible}
              clearFn={() => clearFn()}
              docData={docData}
              setDocData={setDocData}
              setMachineData={setMachineData}
              machineData={machineData}
            />
          </View>
        }
      />
    </View>
  );
}

const progressStyles = StyleSheet.create({
  container: {
    backgroundColor: "#F8F9FA",
    borderRadius: 12,
    gap: 12,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#37474F",
    letterSpacing: 0.2,
  },
  percentage: {
    fontSize: 18,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
  barContainer: {
  },
  barBackground: {
    height: 12,
    backgroundColor: "#E0E0E0",
    borderRadius: 100,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  barFill: {
    height: "100%",
    borderRadius: 100,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
});

const styles = StyleSheet.create({
  wrapper: {},
  footerContainer: {
    gap: 16,
  },
});
