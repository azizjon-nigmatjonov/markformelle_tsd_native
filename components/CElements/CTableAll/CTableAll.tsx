import { globalColors } from "@/components/UI/Colors";
import React from "react";
import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native";
import { t } from "i18next";
interface Props {
  list: Array<any>;
  headColumns: Array<any>;
  title?: string;
}

const CTableAll: React.FC<Props> = ({
  list = [],
  headColumns = [],
  title = "",
}) => {
  return (
    <View style={styles.wrapper}>
      {title && (
        <Pressable onPress={() => {}} style={styles.topHeader}>
          <Text> {t(title)}</Text>
        </Pressable>
      )}
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View>
          <View style={[styles.row, styles.header]}>
            {headColumns?.map((headCol: any) => (
              <View key={headCol.id} style={[styles.cell, { flex: 1 }]}>
                <Text style={styles.headerText}>{headCol.title}</Text>
              </View>
            ))}
          </View>

          {list.map((item, index) => (
            <View
              key={index}
              style={[
                styles.row,
                { borderBottomWidth: index === list.length - 1 ? 0 : 1 },
              ]}
            >
              {headColumns?.map((headCol: any, ind: any) => (
                <View key={ind} style={[styles.cell, { flex: 1 }]}>
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
    backgroundColor: "white",
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
  topHeader: {
    backgroundColor: globalColors.grey30,
    paddingVertical: 4,
    borderBottomColor: globalColors.border,
    borderBottomWidth: 1,
  },
  header: {
    zIndex: -1,
  },
  headerText: {
    color: globalColors.grey, // equivalent to var(--grey)
    fontWeight: "600",
    textTransform: "uppercase",
    fontSize: 12,
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

export default CTableAll;
