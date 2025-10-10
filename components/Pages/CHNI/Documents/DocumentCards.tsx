import { View, StyleSheet, ScrollView } from "react-native";
import CCard from "@/components/CElements/CCard/CCard";

interface DocumentCardProps {
  data: any[];
}

const DocumentCard = ({ data = [] }: DocumentCardProps) => {
  const list = data;

  const headColumns = [
    { title: "Наименование", id: "name" },
    { title: "Артикул", id: "article" },
    { title: "Модель", id: "model" },
    { title: "Размер", id: "size" },
    { title: "Цвет / рисунок", id: "color" },
    { title: "Пл. кол-во", id: "plan_qty" },
  ];

  return (
    <View style={styles.wrapper}>
      {list.map((item: any, index: number) => (
        <CCard
          key={`${item.id}-${index}`}
          headerInfo={{
            title: `Документ №${item.order_info?.order_name}`,
          }}
          list={[
            {
              name: item.order_info?.product_name,
              article: item.order_info?.artikul,
              model: item.order_info?.model,
              size: item.order_info?.size,
              color: item.order_info?.color,
              plan_qty: item.order_info?.plan_qty,
            },
          ]}
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
