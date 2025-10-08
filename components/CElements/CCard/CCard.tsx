import { StyleSheet, View, Text } from "react-native";
import { useTheme } from "@/hooks/useTheme";

interface CardItem {
  [key: string]: string;
}

interface HeadColumn {
  id: string;
  title: string;
}

interface CCardProps {
  list: CardItem[];
  headColumns: HeadColumn[];
  headerInfo?: any;
}

export default function CCard({ list, headColumns, headerInfo }: CCardProps) {
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      {headerInfo?.title && (
        <Text style={[styles.title, { color: colors.text }]}>
          {headerInfo.title}
        </Text>
      )}
      {list.map((item, index) => (
        <View
          key={index}
          style={[
            styles.card,
            {
              backgroundColor: colors.cardBackground,
              borderColor: colors.border,
            },
          ]}
        >
          {headColumns.map((column) => {
            const value = item[column.id];
            // Only show if value exists and is not empty
            if (value && value.trim() !== "") {
              return (
                <View key={column.id} style={styles.row}>
                  <Text style={[styles.label, { color: colors.textSecondary }]}>
                    {column.title}:
                  </Text>
                  <Text style={[styles.value, { color: colors.text }]}>
                    {value}
                  </Text>
                </View>
              );
            }
            return null;
          })}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
  },
  card: {
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    gap: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  row: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    minWidth: 120,
    marginRight: 12,
  },
  value: {
    fontSize: 14,
    flex: 1,
    fontWeight: "400",
  },
});
