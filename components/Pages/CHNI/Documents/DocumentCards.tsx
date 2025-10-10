import { View, StyleSheet, ScrollView, Text } from "react-native";
import CCard from "@/components/CElements/CCard/CCard";

interface DocumentCardProps {
  data: any[];
}

const ProgressBar = ({
  factQty,
  planQty,
}: {
  factQty: number;
  planQty: number;
}) => {
  const percentage = planQty > 0 ? Math.min((factQty / planQty) * 100, 100) : 0;
  const isComplete = factQty >= planQty;
  const isOverflow = factQty > planQty;

  // Determine color based on progress
  const getProgressColor = () => {
    if (isOverflow) return "#FF9800"; // Orange for overflow
    if (isComplete) return "#4CAF50"; // Green for complete
    if (percentage >= 75) return "#2196F3"; // Blue for good progress
    if (percentage >= 50) return "#FFC107"; // Yellow for moderate progress
    return "#FF5252"; // Red for low progress
  };

  return (
    <View style={progressStyles.container}>
      <View style={progressStyles.header}>
        <Text style={progressStyles.label}>Прогресс выполнения</Text>
        <Text
          style={[progressStyles.percentage, { color: getProgressColor() }]}
        >
          {percentage.toFixed(1)}%
        </Text>
      </View>

      <View style={progressStyles.barContainer}>
        <View style={progressStyles.barBackground}>
          <View
            style={[
              progressStyles.barFill,
              {
                width: `${percentage}%`,
                backgroundColor: getProgressColor(),
              },
            ]}
          />
        </View>
      </View>

      {/* <View style={progressStyles.footer}>
        <Text style={progressStyles.footerText}>
          <Text style={progressStyles.footerValue}>{factQty}</Text>
          {" из "}
          <Text style={progressStyles.footerValue}>{planQty}</Text>
          {" выполнено"}
        </Text>
        {isOverflow && (
          <Text style={progressStyles.overflowBadge}>Превышение</Text>
        )}
        {isComplete && !isOverflow && (
          <Text style={progressStyles.completeBadge}>Завершено</Text>
        )}
      </View> */}
    </View>
  );
};

const DocumentCard = ({ data = [] }: DocumentCardProps) => {
  const list = data;

  const headColumns = [
    { title: "Наименование", id: "name" },
    { title: "Артикул", id: "article" },
    { title: "Модель", id: "model" },
    { title: "Размер", id: "size" },
    { title: "Цвет / рисунок", id: "color" },
    { title: "Факт. кол-во", id: "fact_qty" },
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
              fact_qty: item.order_info?.fact_qty,
            },
          ]}
          headColumns={headColumns}
          footerUI={
            <ProgressBar
              factQty={item.order_info?.fact_qty || 0}
              planQty={item.order_info?.plan_qty || 0}
            />
          }
        />
      ))}
    </View>
  );
};

const progressStyles = StyleSheet.create({
  container: {
    // paddingVertical: 16,
    // paddingHorizontal: 16,
    backgroundColor: "#F8F9FA",
    borderRadius: 12,
    gap: 12,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    // marginBottom: 4,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#37474F",
    letterSpacing: 0.2,
  },
  percentage: {
    fontSize: 18,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
  barContainer: {
    // marginVertical: 4,
  },
  barBackground: {
    height: 12,
    backgroundColor: "#E0E0E0",
    borderRadius: 100,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  barFill: {
    height: "100%",
    borderRadius: 100,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 4,
  },
  footerText: {
    fontSize: 13,
    color: "#546E7A",
    fontWeight: "400",
  },
  footerValue: {
    fontSize: 14,
    fontWeight: "700",
    color: "#263238",
  },
  completeBadge: {
    fontSize: 11,
    fontWeight: "600",
    color: "#4CAF50",
    backgroundColor: "#E8F5E9",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    overflow: "hidden",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  overflowBadge: {
    fontSize: 11,
    fontWeight: "600",
    color: "#FF9800",
    backgroundColor: "#FFF3E0",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    overflow: "hidden",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
});

const styles = StyleSheet.create({
  wrapper: {
    gap: 12,
    paddingBottom: 100,
  },
});

export default DocumentCard;
