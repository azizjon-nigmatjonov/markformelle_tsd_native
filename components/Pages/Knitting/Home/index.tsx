import { View, StyleSheet } from "react-native";
import Categories from "./Categories";
import DocumentList from "../../Documents";
import DocumentCreateScreen from "../../Documents/document/Create";
import { useMobileStore } from "@/store/mobile";
import { RollCreateScreen } from "../../Rolls/Create";
import { Dimensions } from "react-native";

const KnittingHomeWrapper = () => {
  const { page, setPageData } = useMobileStore();
  const { height: SCREEN_HEIGHT } = Dimensions.get("window");

  const hanldeScreenData = (data: any) => setPageData(data);

  const DrawUI = (type: string) => {
    switch (type) {
      case "scanning":
        return <RollCreateScreen />;
      case "document_create_kniting":
        return <DocumentCreateScreen />;
      case "document_create_transfer":
        return <DocumentCreateScreen />;
      case "documents":
        return <DocumentList />;
      case "home":
        return <Categories setScreen={hanldeScreenData} />;
      default:
        return <Categories setScreen={hanldeScreenData} />;
    }
  };

  return (
    <View style={[cls.wrapper, { height: SCREEN_HEIGHT }]}>{DrawUI(page)}</View>
  );
};

const cls = StyleSheet.create({
  wrapper: {},
});

export default KnittingHomeWrapper;
