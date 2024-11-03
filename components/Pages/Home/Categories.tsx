import React from "react";
import { View, StyleSheet } from "react-native";
import { useListStore } from "../../../store/list";
import { useDocsStore } from "../../../store/docs";
import { ListHeader } from "./ListHeader";
import { ListTemplate } from "./ListTemplate";
import { GridTemplate } from "./GridTemplate";
import { globalStyles } from "@/components/UI/GlobalStyles";
import HeaderUI from "@/components/UI/Header";
import { useMobileStore } from "@/store/mobile";

interface Props {
  setScreen: (val: any) => void;
}

export const Categories = ({ setScreen }: Props) => {
  const { type, setType } = useListStore();
  const { docs } = useDocsStore();
  const { setPage } = useMobileStore();

  const CategoriesList = [
    {
      title: "Список документов",
      image: require("../../../assets/trash/list.png"),
      description: "Список всех документов",
      link: "documents",
    },
    {
      title: "Вязания",
      image: require("../../../assets/trash/knitting-machine.png"),
      description: "Создание документ Вязания",
      link: `document_create_kniting`,
    },
    {
      title: "Внутренний перемещение",
      image: require("../../../assets/trash/transfer.png"),
      description: "Создать документ внутреннего перемещения",
      link: `document_create_transfer`,
    },
  ];

  const hanldeClick = (val: string) => {
    setPage(val);
    switch (val) {
      case "document_create_kniting":
        setScreen({ type: val, doc_number: docs.length, doc_type: 1 });
      case "doc_2":
        setScreen({ type: val, doc_number: docs.length, doc_type: 2 });
        break;
      default:
        setScreen({ type: val });
        break;
    }
  };

  return (
    <>
      <HeaderUI />
      <View style={globalStyles.container}>
        <View style={styles.header}>
          <ListHeader type={type} setType={setType} />
        </View>
        {type === "list" ? (
          <ListTemplate list={CategoriesList} hanldeClick={hanldeClick} />
        ) : (
          <GridTemplate list={CategoriesList} />
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
  },
  header: {
    marginVertical: 15,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderRadius: 8,
    backgroundColor: "#fff",
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  image: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  text: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Categories;
