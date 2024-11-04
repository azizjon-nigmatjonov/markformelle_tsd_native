import React, { FC, ReactNode } from "react";
import { Modal, Portal, Card, Button, IconButton } from "react-native-paper";
import { View, StyleSheet, Text } from "react-native";
import { buttonStyle } from "../UI/GlobalStyles";
// import { useTranslation } from "react-i18next";

interface Props {
  title?: string;
  textSaveBtn?: string;
  textDeleteBtn?: string;
  minWidth?: any | number;
  maxWidth?: any | number;
  minHeight?: any;
  padding?: any;
  children?: ReactNode;
  footerActive?: boolean;
  open: boolean;
  classes?: string;
  titleCenter?: boolean;
  closable?: boolean;
  handleSave?: (val?: any) => void;
  handleClose?: (val?: any) => void;
}

const CModal: FC<Props> = ({
  title = "",
  textSaveBtn = "Да",
  textDeleteBtn = "Нет",
  minWidth = "120px",
  maxWidth = 700,
  minHeight = "",
  padding = "10px",
  children,
  footerActive = true,
  open = false,
  handleSave = () => {},
  handleClose,
  closable = true,
  titleCenter = true,
}) => {
  return (
    <Portal>
      <Modal
        visible={open}
        onDismiss={handleClose}
        contentContainerStyle={styles.modal}
      >
        <Card style={[styles.card, { padding }]}>
          <View style={styles.header}>
            {titleCenter && <View />}
            <View style={styles.cardTitle}>
              <Button>{title}</Button>
            </View>
            <View>
              {handleClose && (
                <IconButton
                  icon="close"
                  size={20}
                  onPress={handleClose}
                  style={styles.closeButton}
                />
              )}
            </View>
          </View>

          <View style={[styles.body, { minHeight, minWidth, maxWidth }]}>
            {children}
          </View>

          {footerActive && (
            <View style={styles.footer}>
              {textDeleteBtn && (
                <Button
                  mode="text"
                  onPress={handleClose}
                  style={[buttonStyle.cancel, { width: "46%" }]}
                >
                  <Text style={{ color: "white" }}>{textDeleteBtn}</Text>
                </Button>
              )}
              {textSaveBtn && (
                <Button
                  mode="contained"
                  onPress={handleSave}
                  style={[buttonStyle.submit, { marginLeft: 12, width: "47%" }]}
                >
                  <Text style={{ color: "white" }}>{textSaveBtn}</Text>
                </Button>
              )}
            </View>
          )}
        </Card>
      </Modal>
    </Portal>
  );
};

const styles = StyleSheet.create({
  modal: {
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    width: "90%",
    maxWidth: 700,
    borderRadius: 8,
    backgroundColor: "white",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cardTitle: {
    alignItems: "center",
    justifyContent: "center",
  },
  body: {
    padding: 12,
  },
  footer: {
    flexDirection: "row",
    paddingTop: 12,
    paddingBottom: 12,
    paddingRight: 12,
    marginLeft: "auto",
  },
  closeButton: {
    alignSelf: "flex-end",
  },
});

export default CModal;
