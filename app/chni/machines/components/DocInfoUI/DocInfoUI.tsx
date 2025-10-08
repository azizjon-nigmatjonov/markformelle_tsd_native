import { StyleSheet, View } from "react-native";
import CTableAll from "@/components/CElements/CTableAll/CTableAll";
import { t } from "i18next";
import { useEffect, useState } from "react";
import { AlertUI } from "@/components/UI/Alert";
export default function DocInfoUI() {
  const [alertInfo, setAlertInfo] = useState<any>({});
  useEffect(() => {
    //info
    setAlertInfo({
      type: "",
      title: "Сканируйте рулоны.",
    });
  }, []);
  return (
    <View style={styles.wrapper}>
      {alertInfo?.type && (
        <AlertUI title={alertInfo.title} type={alertInfo.type}></AlertUI>
      )}
      <CTableAll
        title={t("chni.document") + " по машине 230"}
        list={[
          {
            name: "НОСКИ МУЖСКИЕ",
            article: "25001KBY",
            model: "001K-000",
            size: "25-27",
            color: "черный / рис.000",
            quantity: "1",
            tableNumber: "",
            planNumber: "",
            masterNumber: "",
            autoNumber: "",
          },
        ]}
        headColumns={[
          { title: "Наименование", id: "name" },
          { title: "Артикул", id: "article" },
          { title: "Модель", id: "model" },
          { title: "Размер", id: "size" },
          { title: "Цвет / рисунок", id: "color" },
          { title: "Кол. пар.", id: "quantity" },
          { title: "Таб. №", id: "tableNumber" },
          { title: "N план", id: "planNumber" },
          { title: "N п/маст.", id: "masterNumber" },
          { title: "N авт.", id: "autoNumber" },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginTop: 20,
  },
});
