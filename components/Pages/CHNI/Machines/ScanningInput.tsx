import { useEffect, useRef, useState } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { useTranslate } from "@/hooks/useTranslate";

interface Props {
  customInputActions: string[];
  setAlertInfo: (val: any) => void;
  docId: string;
  setDocId: (val: string) => void;
  setMachineId: (val: string) => void;
  machineId: string;
  stopFocus: boolean;
}

export const ScanningInput = ({
  customInputActions,
  setAlertInfo = () => {},
  docId,
  setDocId = () => {},
  setMachineId = () => {},
  machineId,
  stopFocus = false,
}: Props) => {
  const t = useTranslate();
  const inputRef: any = useRef(null);
  const [textValue, setTextValue] = useState("");
  const machineRefix = "M";
  const handleFocus = () => {
    if (inputRef.current) inputRef.current.focus();
  };

  const machineSubmit = (text: string) => {
    setMachineId(text);
    setAlertInfo({
      type: "info",
      title: t("chni.scan_document"),
    });
  };

  const documentSubmit = (text: string) => {
    setDocId(text);
    setAlertInfo({
      type: "info",
      title: t("chni.scan_machine"),
    });
  };

  const clearFn = () => {
    setTextValue("");
    if (inputRef.current) inputRef.current.clear();
  };

  const onSubmit = (text: string) => {
    if (text.includes(machineRefix)) {
      if (text.length >= 11) {
        machineSubmit(text);
      }
    } else {
      if (text.length >= 13) {
        documentSubmit(text);
      }
    }

    setTextValue(text);
    // clearFn();
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
      <TextInput
        ref={inputRef}
        placeholder="Введите штрих-код"
        style={styles.input}
        onChangeText={(text) => onSubmit(text)} // Calls `onSubmit` with the current text value as the user types
        autoFocus
        value={textValue}
        showSoftInputOnFocus={customInputActions.includes("open")}
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
