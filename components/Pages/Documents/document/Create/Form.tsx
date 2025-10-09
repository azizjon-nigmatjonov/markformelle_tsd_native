import React from "react";
import { useForm } from "react-hook-form";
import { buttonStyle, globalStyles } from "@/components/UI/GlobalStyles";
import { Text, View, StyleSheet } from "react-native";
import { useRoute } from "@react-navigation/native";
import { useAuthStore } from "@/store/auth";
import HFTextField from "@/components/FormElements/TextField";
import { useMobileStore } from "@/store/mobile";
import { Button } from "react-native-paper";
import { AlertUI } from "@/components/UI/Alert";

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
  console.log("pageData", pageData);

  return (
    <View style={globalStyles.container}>
      <View style={{ paddingBottom: 12, paddingTop: 20 }}>
        <AlertUI title="Заполните информацию о документе!" type="info" />
      </View>
      <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 10 }}>
        Форма документа {pageData.doc_number}
      </Text>
      <View>
        <View style={cls.wrapper}>
          <View style={cls.gridItem}>
            <HFTextField
              name="date_document"
              control={control}
              label="Дата документа"
              placeholder="Дата документа"
              required={true}
              defaultValue="04.11.2024"
            />
          </View>
          <View style={cls.gridItem}>
            <HFTextField
              name="doc_number"
              control={control}
              placeholder="Номер документа"
              label="Номер документа"
              required={true}
              defaultValue={"" + pageData?.doc_number}
            />
          </View>
          <View style={cls.gridItem}>
            <HFTextField
              name="type"
              control={control}
              label="Тип документа"
              required={true}
              placeholder="Выбирать"
              defaultValue={
                pageData?.doc_type == 1 ? "Вязания" : "Внутренний перемещение"
              }
            />
          </View>
          <View style={cls.gridItem}>
            <HFTextField
              name="name"
              control={control}
              placeholder="Выбирать"
              required={true}
              label="Подраздиления"
              defaultValue={user_info?.fio}
            />
          </View>
        </View>
        <View>
          <HFTextField
            name="description"
            control={control}
            placeholder="Написать..."
            label="Примечания"
            required={true}
          />
        </View>

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

const cls = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  gridItem: {
    width: "48%", // Approximately half the width to fit two items per row
    marginBottom: 15,
  },
});

export default DocumentCreateForm;
