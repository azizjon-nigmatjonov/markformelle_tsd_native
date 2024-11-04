import React, { useMemo, useState } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import CModal from "../CModal"; // Assuming CModal is also converted to React Native
import mergeList from "../../../utils/mergeList"; // Assuming this utility works as is
// import { EyeOpenIcon } from "../../UI/Icons"; // Assuming EyeOpenIcon is compatible
import { AllRolls } from "./AllRolls"; // Assuming AllRolls is also converted
import { globalColors } from "@/components/UI/Colors";
import AntDesign from "@expo/vector-icons/AntDesign";

interface Props {
  list: any;
}

export const CList: React.FC<Props> = ({ list = [] }) => {
  const [modalOpen, setModalOpen] = useState<any>([]);

  const newList = useMemo(() => {
    const { allObj } = mergeList(list);
    return allObj;
  }, [list]);

  const SummUp = useMemo(() => {
    const obj = {
      quantity: 0,
      weight: 0,
    };

    Object.entries(newList).forEach(([_, item]: any) => {
      for (let i = 0; i < item.length; i++) {
        const newObj = item[i];
        obj.quantity += 1; // Increment the quantity
        obj.weight += Number(newObj.NPROPER2); // Assuming NPROPER2 holds weight
      }
    });

    return obj;
  }, [newList]);

  return (
    <>
      <View style={styles.list}>
        <View style={styles.header}>
          <View style={[styles.cell, { width: "38%" }]}>
            <Text
              style={{
                textTransform: "uppercase",
                fontSize: 12,
                fontWeight: "500",
              }}
            >
              назания полотно
            </Text>
          </View>
          <View style={[styles.cell, { width: "17%" }]}>
            <Text
              style={{
                textTransform: "uppercase",
                fontSize: 12,
                fontWeight: "500",
              }}
            >
              Сорт
            </Text>
          </View>
          <View style={[styles.cell, { width: "27%" }]}>
            <Text
              style={{
                textTransform: "uppercase",
                fontSize: 12,
                fontWeight: "500",
              }}
            >
              Количество
            </Text>
          </View>
          <View style={[styles.cell, { width: "12%" }]}>
            <Text
              style={{
                textTransform: "uppercase",
                fontSize: 12,
                fontWeight: "500",
              }}
            >
              вэс
            </Text>
          </View>
          <View
            style={[styles.cell, { width: "6%", borderRightWidth: 0 }]}
          ></View>
        </View>

        <View style={styles.body}>
          {Object.entries(newList).map(([key, item]: any) => (
            <Pressable
              key={key}
              style={styles.row}
              onPress={() => setModalOpen(item)}
            >
              <View style={[styles.cell, { width: "38%" }]}>
                <Text>{item[0].ART}</Text>
                <Text style={styles.greyText}>{item[0].NAIM}</Text>
              </View>
              <View style={[styles.cell, { width: "17%" }]}>
                <Text>{item[0].NSORT}</Text>
              </View>
              <View style={[styles.cell, { width: "27%" }]}>
                <Text>{item.length}</Text>
              </View>
              <View style={[styles.cell, { width: "12%" }]}>
                <Text>
                  {parseInt(
                    item.reduce(
                      (acc: any, curr: any) => acc + Number(curr.KOL),
                      0
                    )
                  )}
                </Text>
              </View>
              <View
                style={[
                  styles.cell,
                  {
                    width: "6%",
                    borderRightWidth: 0,
                    paddingHorizontal: 0,
                    paddingLeft: 1,
                  },
                ]}
              >
                <AntDesign name="eyeo" size={18} color={globalColors.grey} />
              </View>
            </Pressable>
          ))}
          <View style={styles.row}>
            <View style={[styles.cell, { width: "38%" }]}>
              <Text style={[styles.font500, styles.uppercase]}>итого</Text>
            </View>
            <View style={[styles.cell, { width: "17%" }]} />
            <View style={[styles.cell, { width: "27%" }]}>
              <Text style={styles.font500}>{SummUp.quantity}</Text>
            </View>
            <View style={[styles.cell, { width: "12%" }]}>
              <Text style={styles.font500}>{SummUp.weight}</Text>
            </View>
            <View
              style={[
                styles.cell,
                { width: "6%", borderRightWidth: 0, paddingHorizontal: 0 },
              ]}
            ></View>
          </View>
        </View>
      </View>

      <CModal
        title="Роллы"
        open={modalOpen.length > 0}
        handleClose={() => setModalOpen([])}
        footerActive={false}
      >
        <AllRolls list={modalOpen} />
      </CModal>
    </>
  );
};

const styles = StyleSheet.create({
  list: {
    borderWidth: 1,
    borderColor: globalColors.border,
    borderRadius: 8,
  },
  header: {
    flexDirection: "row",
  },
  body: {
    // Add styles for body if needed
  },
  row: {
    flexDirection: "row",
    borderTopWidth: 1,
    borderTopColor: globalColors.border,
  },
  cell: {
    paddingVertical: 8,
    paddingHorizontal: 6,
    borderRightWidth: 1,
    borderRightColor: globalColors.border,
    flexDirection: "column",
    justifyContent: "center",
    fontSize: 12,
    // width: "30%",
  },
  font500: {
    fontWeight: "500",
  },
  greyText: {
    color: globalColors.grey,
    fontSize: 12,
  },
  uppercase: {
    textTransform: "uppercase",
    fontWeight: "500",
  },
});

export default CList;
