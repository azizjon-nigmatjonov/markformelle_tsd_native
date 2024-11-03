import React from "react";
import { useForm } from "react-hook-form";
import { globalStyles } from "@/components/UI/GlobalStyles";
import { Text, View, Button, StyleSheet } from "react-native";
import { useRoute } from "@react-navigation/native";
import { useAuthStore } from "@/store/auth";
import HFTextField from "@/components/FormElements/TextField";
import { useMobileStore } from "@/store/mobile";

const DocumentCreateForm = () => {
  const { setPage } = useMobileStore();
  const route: any = useRoute();
  const { id } = route.params;
  const { user_info } = useAuthStore();
  const { control, handleSubmit } = useForm({
    mode: "onSubmit",
  });

  const onSubmit = (data: any) => {
    console.log(data);
    setPage("scanning");
  };

  return (
    <View style={globalStyles.container}>
      <View style={{ paddingVertical: 10 }}>
        <Text style={{ color: "blue" }}>Заполните информацию о документе!</Text>
      </View>
      <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 10 }}>
        Форма документа {id}
      </Text>
      <View style={[cls.form]}>
        <HFTextField name="number_document" control={control} />

        <Button
          title=" Создать документ"
          // mode="contained"
          onPress={handleSubmit(onSubmit)}
          // style={{ marginTop: 16 }}
        ></Button>
      </View>
    </View>
  );
};

const cls = StyleSheet.create({
  form: {
    minHeight: 500,
  },
});

export default DocumentCreateForm;
