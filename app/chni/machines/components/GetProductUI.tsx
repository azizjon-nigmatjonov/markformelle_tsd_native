import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
} from "react-native";
import { Button } from "react-native-paper";
import { useTranslation } from "react-i18next";
import { buttonStyle } from "@/components/UI/GlobalStyles";
import { globalColors } from "@/components/UI/Colors";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useToast } from "@/components/UI/ToastProvider";

interface ProductFormData {
  quantity: string;
}

const GetProductUI = () => {
  const { t } = useTranslation();
  const toast = useToast();
  const [modalVisible, setModalVisible] = useState(false);
  const { control, handleSubmit, reset } = useForm<ProductFormData>({
    defaultValues: {
      quantity: "",
    },
  });

  const onSubmit = (data: ProductFormData) => {
    if (!data.quantity || parseInt(data.quantity) <= 0) {
      toast.error("Пожалуйста, введите корректное количество");
      return;
    }

    try {
      console.log("Product quantity:", data.quantity);
      // Handle the form submission here

      // Show success toast
      toast.success(`Продукт успешно получен! Количество: ${data.quantity}`);

      setModalVisible(false);
      reset();
    } catch (error) {
      toast.error("Не удалось получить продукт. Попробуйте еще раз.");
    }
  };

  return (
    <>
      <View style={styles.wrapper}>
        <Button
          mode="contained"
          onPress={() => setModalVisible(true)}
          style={[buttonStyle.submit]}
        >
          {t("chni.get_product")}
        </Button>
      </View>

      <Modal
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{t("chni.get_product")}</Text>

            <View style={styles.formContainer}>
              <Text style={styles.label}>{t("common.quantity")}</Text>
              <Controller
                control={control}
                name="quantity"
                rules={{
                  required: true,
                  pattern: /^[0-9]+$/,
                }}
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    style={styles.input}
                    placeholder={t("common.enter_quantity")}
                    keyboardType="numeric"
                    value={value}
                    onChangeText={onChange}
                  />
                )}
              />
            </View>

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.submitButton}
                onPress={handleSubmit(onSubmit)}
              >
                <Text style={styles.submitButtonText}>{t("common.save")}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => {
                  setModalVisible(false);
                  reset();
                }}
              >
                <Text style={styles.closeButtonText}>{t("common.cancel")}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginTop: 8,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    width: "85%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: globalColors.primary,
  },
  formContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
    color: "#333",
  },
  input: {
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  submitButton: {
    backgroundColor: globalColors.primary,
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    flex: 1,
  },
  submitButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  closeButton: {
    backgroundColor: globalColors.grey,
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    flex: 1,
  },
  closeButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 10,
  },
});

export default GetProductUI;
