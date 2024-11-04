import { useMemo } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { AllRolls } from "../CList/AllRolls";
import mergeList from "../../../utils/mergeList";
import { useMobileStore } from "@/store/mobile";
import { globalColors } from "@/components/UI/Colors";
import { ScrollView } from "react-native";

interface Props {
  list: any;
  element: any;
}

const CTable = ({ list = [], element = {} }: Props) => {
  const { setPage, setPageData } = useMobileStore();

  const newList = useMemo(() => {
    const { allObj } = mergeList(list);
    const arr: any = [];
    Object.entries(allObj).forEach(([_, el]: any) => {
      arr.push(el[0]);
    });
    return arr;
  }, [list]);

  return (
    <ScrollView style={styles.wrapper}>
      <Pressable
        onPress={() => {
          setPage("scanning");
          setPageData({ doc_number: element.id });
        }}
        style={styles.header}
      >
        <Text style={styles.headerText}>Документ {element.id}</Text>
        <Text style={styles.rollCount}>{list.length} рулон</Text>
      </Pressable>
      <View style={styles.body}>
        <AllRolls list={newList} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    borderWidth: 1,
    borderColor: globalColors.border, // Adjust color as necessary
    borderRadius: 8,
    overflow: "hidden",
    // marginBottom: 10,
  },
  header: {
    paddingHorizontal: 10,
    paddingTop: 10,
    backgroundColor: "white", // Adjust color as necessary
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    fontWeight: "500",
    borderRadius: 8,
  },
  headerText: {
    fontWeight: "500",
  },
  rollCount: {
    fontSize: 14, // Adjust size as necessary
    fontWeight: "500",
    color: globalColors.primary,
  },
  body: {
    padding: 10,
  },
});

export default CTable;
