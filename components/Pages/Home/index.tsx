import { View } from "react-native";
import Categories from "./Categories";
import { useState } from "react";
import DocumentList from "../Documents";
import DocumentCreateScreen from "../Documents/document/Create";
import { useMobileStore } from "@/store/mobile";
import { RollCreateScreen } from "../Rolls/Create";

const HomeScreenWrapper = () => {
  const [screen, setScreen] = useState({ type: "category" });
  const { page } = useMobileStore();

  const DrawUI = (type: string) => {
    switch (type) {
      case "scanning":
        return <RollCreateScreen />;
      case "document_create_kniting":
        return <DocumentCreateScreen />;
      case "documents":
        return <DocumentList />;
      case "home":
        return <Categories setScreen={setScreen} />;
      default:
        return "";
    }
  };

  return <View>{DrawUI(page)}</View>;
};

export default HomeScreenWrapper;
