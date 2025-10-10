import { StyleSheet, View } from "react-native";
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
}

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
}: Props) {
  const [modalVisible, setModalVisible] = useState(false);

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
          },
        ]}
        headColumns={[
          { title: "Наименование", id: "name" },
          { title: "Артикул", id: "article" },
          { title: "Модель", id: "model" },
          { title: "Размер", id: "size" },
          { title: "Цвет / рисунок", id: "color" },
          { title: "Пл. кол-во", id: "plan_qty" },
        ]}
        footerUI={
          <GetProductUI
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
            clearFn={() => clearFn()}
            docData={docData}
            setDocData={setDocData}
            setMachineData={setMachineData}
            machineData={machineData}
          />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {},
});
