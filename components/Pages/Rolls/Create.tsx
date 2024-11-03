import { BackButton } from "@/components/UI/BackButton";
import { globalStyles } from "@/components/UI/GlobalStyles";
import HeaderUI from "@/components/UI/Header";
import { useRef, useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { TextInput } from "react-native-paper";

export const RollCreateScreen = () => {
  const inputRef: any = useRef(null);
  const [loading, setLoading] = useState(false);
  const [inputType, setInputType] = useState("text");
  const [customInputActions, setCustomInputActions] = useState(["open"]);
  const [alertInfo, setAlertInfo] = useState({
    type: "info",
    title: "Сканируйте рулоны.",
  });
  const docId = "1";

  const onSubmit = () => {};
  return (
    <View style={styles.wrapper}>
      <HeaderUI extra={<BackButton />} place="Рулонное сканирование" />
      <View style={globalStyles.container}>
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
            {loading
              ? "Идет загрузка, пожалуйста, подождите!"
              : alertInfo.title}
          </Text>
        </View>

        <View
          style={[
            styles.inputContainer,
            { height: customInputActions.includes("open") ? 70 : 0 },
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
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    minHeight: 500,
  },
  container: {
    flex: 1,
    padding: 20,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 20,
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
    paddingLeft: 35,
    backgroundColor: "transparent",
    // height: 40,
    borderWidth: 1,
    borderRadius: 4,
  },
  label: {
    position: "absolute",
    top: 20,
    left: 14,
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
