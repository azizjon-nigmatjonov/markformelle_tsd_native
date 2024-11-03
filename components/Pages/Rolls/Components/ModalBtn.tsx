import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { IconButton, Switch, Modal } from "react-native-paper";
import AntDesign from "@expo/vector-icons/AntDesign";
import { globalColors } from "@/components/UI/Colors";
import CCloser from "@/components/CElements/CCloser";

interface Props {
  openModal: boolean;
  setOpenModal: (val: boolean) => void;
  customInputActions: string[];
  setCustomInputActions: (val: string[]) => void;
}

export const ModalBtn: React.FC<Props> = ({
  customInputActions = [],
  openModal,
  setOpenModal,
  setCustomInputActions,
}) => {
  const closeModal = () => {
    setOpenModal(false);
  };

  return (
    <>
      <TouchableOpacity
        onPress={() => setOpenModal(true)}
        style={styles.iconButton}
      >
        <AntDesign name="ellipsis1" size={24} color="black" />
      </TouchableOpacity>

      {openModal && (
        <View style={styles.modal}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.title}>Custom Actions</Text>
              <View style={styles.listContainer}>
                <TouchableOpacity
                  onPress={() => {
                    setCustomInputActions(
                      customInputActions.includes("open")
                        ? customInputActions.filter((el) => el !== "open")
                        : [...customInputActions, "open"]
                    );
                  }}
                  style={styles.listItem}
                >
                  <View style={styles.switchContainer}>
                    <Switch
                      value={customInputActions.includes("open")}
                      onValueChange={() => {
                        setCustomInputActions(
                          customInputActions.includes("open")
                            ? customInputActions.filter((el) => el !== "open")
                            : [...customInputActions, "open"]
                        );
                      }}
                    />
                    <Text style={styles.label}>Ручной вывод</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setCustomInputActions(
                      customInputActions.includes("delete")
                        ? customInputActions.filter((el) => el !== "delete")
                        : [...customInputActions, "delete"]
                    );
                  }}
                  style={styles.listItem}
                >
                  <View style={styles.switchContainer}>
                    <Switch
                      value={customInputActions.includes("delete")}
                      onValueChange={() => {
                        setCustomInputActions(
                          customInputActions.includes("delete")
                            ? customInputActions.filter((el) => el !== "delete")
                            : [...customInputActions, "delete"]
                        );
                      }}
                    />
                    <Text style={styles.labelError}>Режим удаления</Text>
                  </View>
                </TouchableOpacity>
              </View>
              {/* <IconButton icon="close" size={20} onPress={closeModal} /> */}
            </View>
          </View>
        </View>
      )}
      {openModal && <CCloser handleClick={() => closeModal()} />}
    </>
  );
};

const styles = StyleSheet.create({
  modal: {
    position: "absolute",
    right: 0,
    top: 44,
    zIndex: 99,
    borderWidth: 1,
    borderColor: globalColors.border,
    borderRadius: 12,
  },
  iconButton: {
    position: "relative",
  },
  modalContainer: {
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "rgba(0, 0, 0, 0.5)", // Background overlay
  },
  modalContent: {
    // width: "80%",
    backgroundColor: "white",
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 12,
    paddingBottom: 0,
    elevation: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  listContainer: {
    marginBottom: 10,
  },
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
    paddingTop: 5,
    zIndex: 99,
    // paddingVertical: 20,
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  label: {
    paddingLeft: 10,
  },
  labelError: {
    paddingLeft: 10,
    color: "red", // Change this to your error color
  },
});

export default ModalBtn;
