import { useEffect, useRef, useState } from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { useTranslate } from "@/hooks/useTranslate";
// import { useToast } from "@/components/UI/ToastProvider";
import { machinesService } from "@/api/services/machines.service";
import { documentsService } from "@/api/services/documents.service";
import { useAuthStore } from "@/store/auth";

interface Props {
  customInputActions: string[];
  setAlertInfo: (val: any) => void;
  docId: string;
  setDocId: (val: string) => void;
  setMachineId: (val: string) => void;
  machineId: string;
  stopFocus: boolean;
  placeholder: string;
  setMachineData: (val: any) => void;
  setDocData: (val: unknown) => void;
  machineData: any;
}

export const ScanningInput = ({
  customInputActions,
  setAlertInfo = () => {},
  docId,
  setDocId = () => {},
  setMachineId = () => {},
  machineId,
  stopFocus = false,
  placeholder = "Введите штрих-код",
  setMachineData = () => {},
  setDocData = () => {},
  machineData = {},
}: Props) => {
  // const toast = useToast();
  const t = useTranslate();
  const { user_info } = useAuthStore();
  const inputRef: any = useRef(null);
  const [textValue, setTextValue] = useState("");
  const machineRefix = "MACH";
  const handleFocus = () => {
    if (inputRef.current) inputRef.current.focus();
  };

  const clearFn = () => {
    setTextValue("");
    if (inputRef.current) inputRef.current.clear();
  };

  const machineSubmit = async (text: string) => {
    try {
      const responseData = await machinesService.getSingle(
        text.substring(text.indexOf("-") + 1)
      );

      // Update machine status
      if (user_info && !responseData.marsh_id) {
        try {
          const newMachineData = await machinesService.updateMachineStatus({
            machine_id: responseData.machine_id,
            user_id: user_info.item_id,
            status: "EMPTY",
          });
          setMachineData(newMachineData);
          setMachineId(text);
          setAlertInfo({
            type: "info",
            title: t("chni.scan_document"),
          });
          setDocData({});
          // toast.success("Машина успешно скандирована");
        } catch (statusError) {
          setAlertInfo({
            type: "error",
            title: t("chni.machine_not_found"),
          });
          clearFn();
          // toast.error("Ошибка при загрузке данных машины");
        }
      } else {
        setMachineData(responseData);
        setMachineId(text);
        setAlertInfo({});
        // toast.success("Машина успешно скандирована");
        const responseDocData = await documentsService.getByMarshId(
          responseData.marsh_id
        );

        setDocData(responseDocData);
        setDocId(responseDocData.marsh_id);
      }
    } catch (error) {
      setAlertInfo({
        type: "error",
        title: t("chni.machine_not_found"),
      });
    }
  };

  const documentSubmit = async (text: string) => {
    try {
      const docData = await documentsService.getByDocId(text);

      if (user_info && docData.marsh_id) {
        try {
          const currentTime = new Date().toISOString();
          const resMachine = await machinesService.updateMachineStatus({
            machine_id: machineData.machine_id,
            user_id: user_info.item_id,
            marsh_id: docData.marsh_id,
            status: "PRODUCING",
            start_time: currentTime,
          });
          setMachineData(resMachine);
          setAlertInfo({});
          setDocId(text);
          setDocData(docData);
          // toast.success("Маршрут успешно скандировален");
        } catch (statusError) {
          setAlertInfo({
            type: "error",
            title: t("chni.document_not_found"),
          });
          clearFn();
          // toast.error("Ошибка при загрузке данных документа");
        }
      }
    } catch (error) {
      setAlertInfo({
        type: "error",
        title: t("chni.document_not_found"),
      });
      clearFn();
      // toast.error("Ошибка при загрузке данных документа");
    }
  };

  const onSubmit = (text: string) => {
    setTextValue(text);
    if (text?.includes(machineRefix) || text[0] === machineRefix[0]) {
      if (text.length >= 11) {
        if (machineId === text) {
          setAlertInfo({
            type: "info",
            title: t("chni.you_already_scanned_this_machine"),
          });
          clearFn();
        } else {
          machineSubmit(text);
        }
      }
    } else {
      if (text.length === 13) {
        const newVal = text.substring(5, text.length - 1);
        console.log("newVal", newVal);

        if (docId === newVal) {
          setAlertInfo({
            type: "info",
            title: t("chni.you_already_scanned_this_document"),
          });
          clearFn();
        } else {
          if (machineId) {
            if (newVal.length >= 7) {
              documentSubmit(newVal);
            }
          } else {
            setAlertInfo({
              type: "error",
              title: t("chni.itsnot_machine_qr_code"),
            });
            if (newVal.length >= 7) {
              clearFn();
            }
          }
        }
      }
    }
  };

  useEffect(() => {
    if (stopFocus) return;
    handleFocus();
    const interval = setInterval(() => {
      handleFocus();
    }, 1500);

    return () => {
      clearInterval(interval);
    };
  }, [stopFocus]);

  return (
    <View
      style={[
        styles.inputContainer,
        { height: customInputActions.includes("open") ? 52 : 0 },
      ]}
    >
      {/* {machineId} */}
      <TextInput
        ref={inputRef}
        placeholder={t(placeholder)}
        style={styles.input}
        onChangeText={(text) => onSubmit(text)}
        autoFocus
        value={textValue}
        showSoftInputOnFocus={customInputActions.includes("open")}
        keyboardType={
          customInputActions.includes("open") ? "numeric" : "default"
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    position: "relative",
    overflow: "hidden",
    marginTop: 12,
  },
  input: {
    backgroundColor: "transparent",
    height: 40,
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
  },
});
