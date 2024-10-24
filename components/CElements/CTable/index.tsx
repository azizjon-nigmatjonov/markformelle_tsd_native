import { useMemo } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { AllRolls } from "../CList/AllRolls";
import mergeList from "../../../utils/mergeList";
import { useRouter } from "expo-router";

interface Props {
  list: any;
  element: any;
}

const CTable = ({ list = [], element = {} }: Props) => {
  const router = useRouter();

  const newList = useMemo(() => {
    const { allObj } = mergeList(list);
    const arr: any = [];
    Object.entries(allObj).forEach(([_, el]: any) => {
      arr.push(el[0]);
    });
    return arr;
  }, [list]);

  return (
    <TouchableOpacity
      style={styles.container}
      // onPress={() => router.push(`/product/create/${element.id}`)}
    >
      <View style={styles.header}>
        <Text style={styles.headerText}>Документ {element.id}</Text>
        <Text style={styles.rollCount}>{list.length} рулон</Text>
      </View>
      <View style={styles.body}>
        <AllRolls list={newList} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: "var(--border)", // Adjust color as necessary
    borderRadius: 8,
    overflow: "hidden",
    marginBottom: 10,
  },
  header: {
    padding: 10,
    backgroundColor: "var(--white)", // Adjust color as necessary
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    fontWeight: "500",
  },
  headerText: {
    fontWeight: "bold",
  },
  rollCount: {
    fontSize: 14, // Adjust size as necessary
  },
  body: {
    padding: 10,
  },
});

export default CTable;
