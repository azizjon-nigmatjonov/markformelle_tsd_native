import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  Pressable,
  ScrollView,
} from "react-native";
// import { CList } from "../../components/CElements/CList";
// import CModal from "../../components/CElements/CModal";
// import { CButton } from "../../components/CElements/CButtons/Custom";
// import { CInfo } from "../../components/CElements/CInfo";
// import usePageRouter from "../../hooks/useObjectRouter";
import { ScanLogic } from "./Logic";
// import { useDocsStore } from "../../store/docs";
// import Header from "../../components/UI/Header"; // Make sure Header is adapted for RN
// import ModalBtn from "./Components/Modal"; // Ensure ModalBtn is compatible with RN
import HeaderUI from "@/components/UI/Header";
import { BackButton } from "@/components/UI/BackButton";
import { Button } from "react-native-paper";
import { buttonStyle } from "@/components/UI/GlobalStyles";
import { useDocsStore } from "@/store/docs";

export const RollCreateScreen = () => {
  const inputRef: any = useRef(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const docId = "1";
  const [customInputActions, setCustomInputActions] = useState([""]);
  const [openModal, setOpenModal] = useState(false);
  const { ScanRoll, DeleteRoll } = ScanLogic();
  const { setDocs, docs } = useDocsStore();
  const [rollObjects, setRollObjects]: any = useState([]);
  const [rolls, setRolls] = useState([]);
  const [loading, setLoading] = useState(false);
  const [inputType, setInputType] = useState("text");
  const [alertInfo, setAlertInfo] = useState({
    type: "info",
    title: "Сканируйте рулоны.",
  });

  const initializeRolls = () => {
    let currentDoc = { rolls: [] };
    const rollBarcodes: any = [];

    docs.forEach((doc: any) => {
      if (doc.id === docId) currentDoc = doc;
      doc.rolls.forEach((roll: any) => rollBarcodes.push(roll.BARCODE));
    });

    setRolls(rollBarcodes);
    setRollObjects(currentDoc.rolls);
  };

  useEffect(() => {
    initializeRolls();
  }, [docs, docId]);

  const handleScanDocs = () => {
    const filteredDocs = docs.filter((doc: any) => doc.id !== docId);
    const updatedDoc = { id: docId, rolls: rollObjects };

    setDocs([...filteredDocs, updatedDoc]);
  };

  const clearFn = () => {
    if (inputRef.current) inputRef.current.clear();
    setLoading(false);
  };

  const onSubmit = () => {
    const value = inputRef.current.value;

    if (value) {
      if (customInputActions.includes("delete")) {
        DeleteRoll({
          value,
          rolls,
          setRolls,
          setAlertInfo,
          setRollObjects,
          rollObjects,
          docId,
          clearFn,
          setLoading,
        });
      } else {
        ScanRoll({
          value,
          rolls,
          setRolls,
          setAlertInfo,
          setRollObjects,
          rollObjects,
          docId,
          clearFn,
          setLoading,
        });
      }
    }
  };

  return (
    <ScrollView style={styles.container}>
      <HeaderUI extra={<BackButton />} place="Рулонное сканирование" />

      <View style={styles.headerContainer}>
        <Text style={styles.title}>Документ {docId}</Text>
        {/* <ModalBtn
          setCustomInputActions={setCustomInputActions}
          customInputActions={customInputActions}
          openModal={openModal}
          setOpenModal={setOpenModal}
        /> */}
      </View>

      <View style={styles.alertContainer}>
        <Text style={styles.alertText}>
          {loading ? "Идет загрузка, пожалуйста, подождите!" : alertInfo.title}
        </Text>
      </View>

      <View
        style={[
          styles.inputContainer,
          { height: customInputActions.includes("open") ? 40 : 0 },
        ]}
      >
        <TextInput
          ref={inputRef}
          onChangeText={(text) => setInputType(text)}
          keyboardType={
            customInputActions.includes("open") ? "numeric" : "default"
          }
          placeholder="Введите штрих-код"
          style={[
            styles.input,
            {
              borderColor: customInputActions.includes("open")
                ? "#000"
                : "transparent",
            },
          ]}
          onSubmitEditing={onSubmit} // Trigger on submit
          returnKeyType="done"
          autoFocus
        />
        {customInputActions.includes("open") && (
          <Text style={styles.label}>KNA</Text>
        )}
      </View>

      {/* <CList list={rollObjects} /> */}

      <View style={styles.buttonContainer}>
        <Button
          mode="contained"
          onPress={() => {
            if (!rollObjects.length) {
              setAlertInfo({
                type: "error",
                title:
                  "Рулоны не сканируются, отсканируйте рулон и попробуйте еще раз!",
              });
            } else {
              setModalOpen(true);
            }
          }}
          style={[buttonStyle.submit, styles.button]}
        >
          Завершить сканирование
        </Button>
      </View>

      {/* <CModal
        open={modalOpen}
        handleClose={() => setModalOpen(false)}
        handleSave={() => {
          setOpen(true);
          setModalOpen(false);
          handleScanDocs();
        }}
      >
        <Text style={styles.modalText}>
          Хотите вы создавать документ перемещения на ГП с использованием тех же
          рулонов?
        </Text>
      </CModal> */}

      {/* <CModal
        open={open}
        handleClose={() => {
          setOpen(false);
        //   router.push("/");
        }}
        footerActive={false}
      >
        <CInfo title="Завершено успешно" />
        <Pressable
          style={styles.doneButton}
          onPress={() => router.push("/")}
        >
          <Text style={styles.doneButtonText}>Понятно, спасибо!</Text>
        </Pressable>
      </CModal> */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    zIndex: -1,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  alertContainer: {
    paddingVertical: 10,
  },
  alertText: {
    fontSize: 18,
    color: "#000",
  },
  inputContainer: {
    position: "relative",
    overflow: "hidden",
  },
  input: {
    paddingLeft: 50,
    height: 40,
    borderWidth: 1,
    borderRadius: 4,
    padding: 10,
  },
  label: {
    position: "absolute",
    top: "50%",
    left: 10,
    transform: [{ translateY: -50 }],
    fontWeight: "500",
  },
  button: {},
  buttonContainer: {
    marginTop: 20,
  },
  modalText: {
    fontSize: 18,
  },
  doneButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#007BFF",
    borderRadius: 5,
  },
  doneButtonText: {
    color: "#FFF",
    textAlign: "center",
  },
});
