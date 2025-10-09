import { StyleSheet, View } from "react-native";
import CCard from "@/components/CElements/CCard/CCard";
import { t } from "i18next";
import { useState } from "react";
import { ScanningInput } from "@/components/Pages/CHNI/Machines/ScanningInput";
import { AlertUI } from "@/components/UI/Alert";
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
        placeholder="Введите штрих-код документа"
        setMachineData={setMachineData}
        setDocData={setDocData}
      />

      <CCard
        headerInfo={{
          title: "Маршрутный лист №13955.004 от 03.06.2025",
        }}
        list={[
          {
            name: "НОСКИ ЖЕНСКИЕ",
            article: "25369KY",
            model: "369K-1676",
            size: "23-25",
            color: "св.серый меланж / рис.1676",
            quantity: "1",
            tableNumber: "",
            planNumber: "",
            masterNumber: "",
            autoNumber: "",
          },
        ]}
        headColumns={[
          { title: "Наименование", id: "name" },
          { title: "Артикул", id: "article" },
          { title: "Модель", id: "model" },
          { title: "Размер", id: "size" },
          { title: "Цвет / рисунок", id: "color" },
          { title: "Кол. пар.", id: "quantity" },
          { title: "Таб. №", id: "tableNumber" },
          { title: "N план", id: "planNumber" },
          { title: "N п/маст.", id: "masterNumber" },
          { title: "N авт.", id: "autoNumber" },
        ]}
        footerUI={
          <GetProductUI
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
            clearFn={() => clearFn()}
          />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {},
});
