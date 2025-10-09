import { useEffect, useRef, useState } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { useTranslate } from "@/hooks/useTranslate";
import { useToast } from "@/components/UI/ToastProvider";
import { machinesService } from "@/api/services/machines.service";

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
  setDocData?: (val: any) => void;
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
}: Props) => {
  const toast = useToast();
  const t = useTranslate();
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
      const machineData = await machinesService.getSingle(
        text.substring(text.indexOf("-") + 1)
      );

      setMachineData(machineData);
      setMachineId(text);
      setAlertInfo({
        type: "info",
        title: t("chni.scan_document"),
      });
      setDocData({});
      clearFn();
      toast.success("Машина успешно скандирована");
    } catch (error) {
      setAlertInfo({
        type: "error",
        title: t("chni.machine_not_found"),
      });
      clearFn();
      toast.error("Ошибка при загрузке данных машины");
    }
  };

  const documentSubmit = (text: string) => {
    setDocId("");
    setAlertInfo({});
    clearFn();
    setTimeout(() => {
      setDocId(text);
    }, 500);
    toast.success("Маршрут успешно скандировален");
  };

  const onSubmit = (text: string) => {
    setTextValue(text);
    if (text?.includes(machineRefix) || text[0] === machineRefix[0]) {
      if (text.length >= 11) {
        if (machineId === text) {
          setAlertInfo({
            type: "error",
            title: t("chni.you_already_scanned_this_machine"),
          });
          clearFn();
        } else {
          machineSubmit(text);
        }
      }
    } else {
      if (text.length >= 13) {
        if (docId === text) {
          setAlertInfo({
            type: "error",
            title: t("chni.you_already_scanned_this_document"),
          });
          clearFn();
        } else {
          if (machineId) {
            if (text.length >= 13) {
              documentSubmit(text);
            }
          } else {
            setAlertInfo({
              type: "error",
              title: t("chni.itsnot_machine_qr_code"),
            });
            if (text.length >= 13) {
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
        { height: customInputActions.includes("open") ? 60 : 0 },
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
