import React from "react";
import { View, StyleSheet } from "react-native";
import CSearchInput from "../../components/CElements/CSearchInput"; // Ensure this is compatible with React Native
import CTable from "../../components/CElements/CTable";
import { BackButton } from "../../components/UI/BackButton";
import Header from "../../components/UI/Header";
import { useDocsStore } from "../../store/docs";
import { globalStyles } from "@/components/UI/GlobalStyles";

const DocumentList = () => {
  const { docs } = useDocsStore();

  return (
    <>
      <Header place="Список документов" extra={<BackButton />} />

      <View style={[globalStyles.container, styles.wrapper]}>
        {/* <CSearchInput handleChange={() => {}} /> */}
        <View>
          {docs.map((item: any) => (
            <View key={item.id} style={styles.documentItem}>
              <CTable element={item} list={item.rolls} />{" "}
            </View>
          ))}
        </View>
      </View>
    </>
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
