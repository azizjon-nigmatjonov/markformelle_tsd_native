import { View, StyleSheet, ScrollView } from "react-native";
import CCard from "@/components/CElements/CCard/CCard";
import { Machine } from "@/api/services/machines.service";

interface MachineCardProps {
  machines: any[];
}

const MachineCard = ({ machines = [] }: MachineCardProps) => {
  // Map API data to the format expected by CCard

  const list = machines;

  const headColumns = [
    { title: "Производительность", id: "power" },
    { title: "ID документа", id: "doc_id" },
    { title: "ID машины", id: "ITEM_ID" },
    { title: "Наименование", id: "NAIM" },
    { title: "Модель", id: "USERV" },
  ];

  return (
    <View style={styles.wrapper}>
      {list.map((item: any, index: number) => (
        <CCard
          key={`${item.id}-${index}`}
          headerInfo={{
            title: `Машина №${item.ITEM_ID}`,
            badge: item.status,
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

export default MachineCard;
