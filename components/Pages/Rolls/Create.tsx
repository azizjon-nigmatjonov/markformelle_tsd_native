import { BackButton } from "@/components/UI/BackButton";
import { globalColors } from "@/components/UI/Colors";
import { buttonStyle, globalStyles } from "@/components/UI/GlobalStyles";
import HeaderUI from "@/components/UI/Header";
import { useEffect, useRef, useState } from "react";
import { StyleSheet, View, Text, TextInput } from "react-native";
import { Button } from "react-native-paper";
import ModalBtn from "./Components/ModalBtn";
import CList from "@/components/CElements/CList";
import { ScanLogic } from "./Logic";
import { useDocsStore } from "@/store/docs";
import { useMobileStore } from "@/store/mobile";
import CModal from "@/components/CElements/CModal";
import CInfo from "@/components/CElements/CInfo";
import { AlertUI } from "@/components/UI/Alert";

export const RollCreateScreen = () => {
  const inputRef: any = useRef(null);
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [open, setOpen] = useState(false);
  const [customInputActions, setCustomInputActions] = useState([""]);
  const [alertInfo, setAlertInfo] = useState({
    type: "info",
    title: "Сканируйте рулоны.",
  });
  const [rollObjects, setRollObjects]: any = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const { ScanRoll, DeleteRoll } = ScanLogic();
  const [textValue, setTextValue] = useState("");
  const [rolls, setRolls] = useState([]);
  const { setDocs, docs } = useDocsStore();
  const { pageData, setPageData, setPage } = useMobileStore();
  const docId = pageData?.doc_number;

  const handleFocus = () => {
    if (inputRef.current) inputRef.current.focus();
  };

  useEffect(() => {
    setOpenModal(false);
  }, [customInputActions.length]);

  const clearFn = () => {
    setTextValue("");
    setLoading(false);
    if (inputRef.current) inputRef.current.clear();
  };

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

  const handleScanDocs = () => {
    const filteredDocs = docs.filter((doc: any) => doc.id !== docId);
    const updatedDoc = { id: docId, rolls: rollObjects };

    setDocs([...filteredDocs, updatedDoc]);
  };

  useEffect(() => {
    handleFocus();
    const interval = setInterval(() => {
      handleFocus();
    }, 1500);

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    initializeRolls();
  }, [docs, docId]);

  const FinishScanning = () => {
    setPage("home");
    setPageData({});
  };

  const onSubmit = (text: string) => {
    const value = text;

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
    <View style={styles.wrapper}>
      <HeaderUI extra={<BackButton />} place="Рулонное сканирование" />
      <View style={globalStyles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.title}>Документ {docId}</Text>
          <ModalBtn
            setCustomInputActions={setCustomInputActions}
            customInputActions={customInputActions}
            openModal={openModal}
            setOpenModal={setOpenModal}
          />
        </View>
        <AlertUI
          title={
            loading ? "Идет загрузка, пожалуйста, подождите!" : alertInfo.title
          }
          type={loading ? "info" : alertInfo.type}
        ></AlertUI>

        <View style={{ zIndex: -1, marginTop: 20 }}>
          <View
            style={[
              styles.inputContainer,
              { height: customInputActions.includes("open") ? 60 : 0 },
            ]}
          >
            <TextInput
              ref={inputRef}
              placeholder="Введите штрих-код"
              style={styles.input}
              onChangeText={(text) => onSubmit(text)} // Calls `onSubmit` with the current text value as the user types
              autoFocus
              value={textValue}
              showSoftInputOnFocus={customInputActions.includes("open")}
            />
            {customInputActions.includes("open") && (
              <Text style={styles.label}>KNA</Text>
            )}
          </View>

          <CList list={rollObjects} />

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
              style={[buttonStyle.submit]}
            >
              Завершить сканирование
            </Button>
          </View>
        </View>
      </View>

      <CModal
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
      </CModal>

      <CModal
        open={open}
        handleClose={() => {
          setOpen(false);
        }}
        footerActive={false}
      >
        {open && (
          <>
            <CInfo title="Завершено успешно" />
            <Button
              mode="contained"
              style={[buttonStyle.submit, { marginTop: 12 }]}
              onPress={() => FinishScanning()}
            >
              Понятно, спасибо!
            </Button>
          </>
        )}
      </CModal>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {},
  container: {
    padding: 20,
  },
  headerContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 20,
  },
  title: {
    fontSize: 18,
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
    backgroundColor: "transparent",
    height: 40,
    borderWidth: 1,
    borderRadius: 8,
  },
  label: {
    position: "absolute",
    top: 11,
    left: 14,
    fontWeight: "500",
  },
  button: {
    backgroundColor: globalColors.error,
  },
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
