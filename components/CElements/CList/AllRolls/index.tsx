import { globalColors } from "@/components/UI/Colors";
import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

interface Props {
  list: Array<any>;
}

export const AllRolls: React.FC<Props> = ({ list = [] }) => {
  const HeadColumns = [
    { title: "Naim", id: "NAIM", width: 195 },
    { title: "MODEL", id: "MODEL" },
    { title: "ART", id: "ART" },
    { title: "NSORT", id: "NSORT" },
    { title: "KEDIZM", id: "KEDIZM" },
    { title: "KOL", id: "KOL" },
    { title: "NPROPER1", id: "NPROPER1", width: 150 },
    { title: "NPROPER2", id: "NPROPER2" },
    { title: "NPROPER3", id: "NPROPER3", width: 250 },
  ];

  return (
    <View style={styles.wrapper}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {/* Header Row */}
        <View>
          <View style={[styles.row, styles.header]}>
            {HeadColumns.map((headCol) => (
              <View
                key={headCol.id}
                style={[styles.cell, { minWidth: headCol.width || 100 }]}
              >
                <Text style={styles.headerText}>{headCol.title}</Text>
              </View>
            ))}
          </View>

          {/* Data Rows */}
          {list.map((item, index) => (
            <View
              key={index}
              style={[
                styles.row,
                { borderBottomWidth: index === list.length - 1 ? 0 : 1 },
              ]}
            >
              {HeadColumns.map((headCol, ind) => (
                <View
                  key={ind}
                  style={[styles.cell, { minWidth: headCol.width || 100 }]}
                >
                  <Text style={styles.cellText}>{item[headCol.id]}</Text>
                </View>
              ))}
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    borderWidth: 1,
    borderColor: globalColors.border, // equivalent to var(--border)
    borderRadius: 8,
  },
  scrollContainer: {
    paddingBottom: 18,
    flexGrow: 0,
  },
  row: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: globalColors.border,
  },
  header: {
    backgroundColor: globalColors.grey30, // or another suitable background for headers
  },
  headerText: {
    color: globalColors.grey, // equivalent to var(--grey)
    fontWeight: "600",
    textTransform: "uppercase",
  },
  cell: {
    paddingVertical: 8,
    paddingHorizontal: 6,
    borderRightWidth: 1,
    borderColor: globalColors.border,
    justifyContent: "center",
  },
  cellText: {
    fontSize: 12,
  },
});

export default AllRolls;
