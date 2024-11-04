import { StyleSheet } from "react-native";

const FONT_SIZES = {
  small: 12,
  medium: 16,
  large: 20,
  extraLarge: 24,
};

const SPACING = {
  tiny: 4,
  small: 12,
  medium: 16,
  large: 24,
  extraLarge: 32,
};

const globalStyles = StyleSheet.create({
  container: {
    paddingRight: SPACING.small,
    paddingLeft: SPACING.small,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

const buttonStyle = StyleSheet.create({
  submit: {
    backgroundColor: "#3559c7",
    borderRadius: 12,
    // paddingVertical: 6,
    color: "#fff",
    // width: "100%",
    // backgroundColor: "#3559c7",
    // borderRadius: 12,
    // // height: 50,
    // display: "flex",
    // alignItems: "center",
    // justifyContent: "center",
  },
  cancel: {
    backgroundColor: "#9092a3",
    borderRadius: 12,
    // paddingVertical: 6,
    color: "#fff",
  },
});

export { globalStyles, FONT_SIZES, buttonStyle, SPACING };
