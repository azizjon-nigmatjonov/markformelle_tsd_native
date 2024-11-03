import React from "react";
import { useForm } from "react-hook-form";
import { buttonStyle, globalStyles } from "@/components/UI/GlobalStyles";
import { Text, View, StyleSheet } from "react-native";
import { useRoute } from "@react-navigation/native";
import { useAuthStore } from "@/store/auth";
import HFTextField from "@/components/FormElements/TextField";
import { useMobileStore } from "@/store/mobile";
import { Button } from "react-native-paper";

const DocumentCreateForm = () => {
  const { setPage, pageData } = useMobileStore();
  const route: any = useRoute();
  const { user_info } = useAuthStore();
  const { control, handleSubmit } = useForm({
    mode: "onSubmit",
  });

  const onSubmit = (data: any) => {
    console.log(data);
    setPage("scanning");
    // setPageData({ ...pageData });
  };

  console.log(pageData);

  return (
    <View style={globalStyles.container}>
      <View style={{ paddingVertical: 10 }}>
        <Text style={{ color: "blue" }}>Заполните информацию о документе!</Text>
      </View>
      <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 10 }}>
        Форма документа {pageData.doc_number}
      </Text>
      <View>
        <HFTextField name="number_document" control={control} />

        <Button
          onPress={handleSubmit(onSubmit)}
          style={[buttonStyle.submit, { marginTop: 12 }]}
        >
          <Text style={{ color: "#fff" }}>Создать документ</Text>
        </Button>
      </View>
    </View>
  );
};

const cls = StyleSheet.create({});

export default DocumentCreateForm;
