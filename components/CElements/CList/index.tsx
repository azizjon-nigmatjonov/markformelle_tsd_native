import React, { useMemo, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import CModal from "../CModal"; // Assuming CModal is also converted to React Native
import mergeList from "../../../utils/mergeList"; // Assuming this utility works as is
// import { EyeOpenIcon } from "../../UI/Icons"; // Assuming EyeOpenIcon is compatible
import { AllRolls } from "./AllRolls"; // Assuming AllRolls is also converted
import { globalColors } from "@/components/UI/Colors";

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
          <View style={[styles.cell, { width: "40%" }]}>
            <Text>назания полотно</Text>
          </View>
          <View style={[styles.cell, { width: "17%" }]}>
            <Text>Сорт</Text>
          </View>
          <View style={[styles.cell, { width: "19%" }]}>
            <Text>Количество</Text>
          </View>
          <View style={[styles.cell, { width: "14%" }]}>
            <Text>вэс</Text>
          </View>
          <View
            style={[styles.cell, { width: "10%", borderRightWidth: 0 }]}
          ></View>
        </View>

        <View style={styles.body}>
          {Object.entries(newList).map(([key, item]: any) => (
            <TouchableOpacity
              key={key}
              style={styles.row}
              onPress={() => setModalOpen(item)}
            >
              <View style={[styles.cell, { width: "40%" }]}>
                <Text style={styles.fontBold}>{item[0].ART}</Text>
                <Text style={styles.greyText}>{item[0].NAIM}</Text>
              </View>
              <View style={[styles.cell, { width: "17%" }]}>
                <Text>{item[0].NSORT}</Text>
              </View>
              <View style={[styles.cell, { width: "19%" }]}>
                <Text>{item.length}</Text>
              </View>
              <View style={[styles.cell, { width: "14%" }]}>
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
                style={[styles.cell, { width: "10%", borderRightWidth: 0 }]}
              >
                <View style={styles.iconContainer}>
                  {/* <EyeOpenIcon /> */}
                </View>
              </View>
            </TouchableOpacity>
          ))}
          <View style={styles.row}>
            <View style={[styles.cell, { width: "40%" }]}>
              <Text style={[styles.fontBold, styles.uppercase]}>итого</Text>
            </View>
            <View style={[styles.cell, { width: "17%" }]} />
            <View style={[styles.cell, { width: "19%" }]}>
              <Text style={styles.fontBold}>{SummUp.quantity}</Text>
            </View>
            <View style={[styles.cell, { width: "14%" }]}>
              <Text style={styles.fontBold}>{SummUp.weight}</Text>
            </View>
            <View
              style={[styles.cell, { width: "10%", borderRightWidth: 0 }]}
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
  fontBold: {
    fontWeight: "600",
  },
  greyText: {
    color: "var(--grey)",
  },
  uppercase: {
    textTransform: "uppercase",
  },
  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default CList;
