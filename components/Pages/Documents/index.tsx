import React from "react";
import { View, StyleSheet } from "react-native";
import CTable from "../../CElements/CTable";
import { BackButton } from "../../UI/BackButton";
import { useDocsStore } from "../../../store/docs";
import { globalStyles } from "@/components/UI/GlobalStyles";
import HeaderUI from "@/components/UI/Header";
import { ThemedView } from "@/components/ThemedView";

const DocumentList = () => {
  const { docs } = useDocsStore();

  return (
    <ThemedView>
      <HeaderUI place="Список документов" extra={<BackButton link="home" />} />
      {/* <Header place="Список документов" extra={<BackButton />} /> */}

      <View style={[globalStyles.container, styles.wrapper]}>
        {/* <CSearchInput handleChange={() => {}} /> */}
        <View>
          {docs.map((item: any) => (
            <View style={styles.documentItem}>
              <CTable element={item} list={item.rolls} />{" "}
            </View>
          ))}
        </View>
      </View>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    paddingVertical: 16, // Adjust padding as necessary
  },
  documentItem: {
    paddingBottom: 20, // Space between document items
  },
});

export default DocumentList;
