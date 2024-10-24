import React, { FC, ReactNode } from "react";
import { Modal, Portal, Card, Button, IconButton } from "react-native-paper";
import { View, StyleSheet } from "react-native";
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
  textSaveBtn = "yes",
  textDeleteBtn = "no",
  minWidth = "280px",
  maxWidth = 700,
  minHeight = "",
  padding = "20px",
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
                <Button mode="text" onPress={handleClose}>
                  {textDeleteBtn}
                </Button>
              )}
              {textSaveBtn && (
                <Button mode="contained" onPress={handleSave}>
                  {textSaveBtn}
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
    width: "90%", // You can adjust according to the screen size
    maxWidth: 700,
    borderRadius: 8,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cardTitle: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  body: {
    padding: 20,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 20,
  },
  closeButton: {
    alignSelf: "flex-end",
  },
});

export default CModal;
