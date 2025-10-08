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
  headerInfo?: {
    title?: string;
    subtitle?: string;
    badge?: string;
  };
}

export default function CCard({ list, headColumns, headerInfo }: CCardProps) {
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
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
          {/* Card Header Section */}
          {headerInfo &&
            (headerInfo.title || headerInfo.subtitle || headerInfo.badge) && (
              <View style={styles.cardHeader}>
                <View style={styles.headerContent}>
                  {headerInfo.title && (
                    <Text style={[styles.headerTitle, { color: colors.text }]}>
                      {headerInfo.title}
                    </Text>
                  )}
                </View>
                {headerInfo.badge && (
                  <View
                    style={[styles.badge, { backgroundColor: colors.success }]}
                  >
                    <Text style={styles.badgeText}>{headerInfo.badge}</Text>
                  </View>
                )}
              </View>
            )}

          {/* Card Content Section */}
          <View style={styles.cardContent}>
            {headColumns.map((column) => {
              const value = item[column.id];
              // Only show if value exists and is not empty
              if (value && value.trim() !== "") {
                return (
                  <View key={column.id} style={styles.row}>
                    <Text
                      style={[styles.label, { color: colors.textSecondary }]}
                    >
                      {column.title}
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
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 12,
  },
  card: {
    borderRadius: 16,
    borderWidth: 1,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 10,
  },
  headerContent: {
    flex: 1,
    gap: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
    letterSpacing: 0.3,
  },

  badge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    alignSelf: "flex-start",
  },
  badgeText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },

  cardContent: {
    padding: 16,
    gap: 16,
  },
  row: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    minWidth: 110,
    lineHeight: 13,
    letterSpacing: 0.1,
  },
  value: {
    fontSize: 14,
    flex: 1,
    fontWeight: "500",
    lineHeight: 13,
    textAlign: "right",
  },
});
