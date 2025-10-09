import { View, StyleSheet, ScrollView } from "react-native";
import CCard from "@/components/CElements/CCard/CCard";

const DocumentCard = () => {
  const list = [
    {
      id: 1,
      machine_no: "101",
      status: "В работе",
      power: "230 носков / час",
      doc_id: "1234567890",
      machine_id: "1234567890",
      created_at: "2021-01-01",
      updated_at: "2021-01-01",
      articul: "102C1310.co",
      name: "НОСКИ ЖЕНСКИЕ",
      article: "25369KY",
      model: "369K-1676",
      size: "23-25",
      color: "св.серый меланж / рис.1676",
      quantity: "1",
      tableNumber: "",
      planNumber: "",
      masterNumber: "",
      autoNumber: "",
    },
    {
      id: 1,
      machine_no: "101",
      status: "В работе",
      power: "230 носков / час",
      doc_id: "1234567890",
      machine_id: "1234567890",
      created_at: "2021-01-01",
      updated_at: "2021-01-01",
      articul: "102C1310.co",
      name: "НОСКИ ЖЕНСКИЕ",
      article: "25369KY",
      model: "369K-1676",
      size: "23-25",
      color: "св.серый меланж / рис.1676",
      quantity: "1",
    },
  ];

  const headColumns = [
    { title: "Производительность", id: "power" },
    { title: "ID документа", id: "doc_id" },
    { title: "ID машины", id: "machine_id" },
    { title: "Дата создания", id: "created_at" },
    { title: "Дата обновления", id: "updated_at" },
    { title: "Наименование", id: "name" },
    { title: "Артикул", id: "articul" },
    { title: "Модель", id: "model" },
    { title: "Размер", id: "size" },
    { title: "Цвет / рисунок", id: "color" },
    { title: "Кол. пар.", id: "quantity" },
  ];

  return (
    <View style={styles.wrapper}>
      {list.map((item: any, index: number) => (
        <CCard
          key={`${item.id}-${index}`}
          headerInfo={{
            title: `Машина №${item.machine_no}`,
          }}
          list={[item]}
          headColumns={headColumns}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    gap: 12,
    paddingBottom: 100,
  },
});

export default DocumentCard;
