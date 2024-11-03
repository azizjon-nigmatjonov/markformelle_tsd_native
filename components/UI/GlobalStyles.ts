import { StyleSheet } from "react-native";

const FONT_SIZES = {
  small: 12,
  medium: 16,
  large: 20,
  extraLarge: 24,
};

const SPACING = {
  tiny: 4,
  small: 8,
  medium: 16,
  large: 24,
  extraLarge: 32,
};

const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    paddingRight: SPACING.medium,
    paddingLeft: SPACING.medium,
  },
});

const buttonStyle = StyleSheet.create({
  submit: {
    // width: "100%",
    // backgroundColor: "#3559c7",
    // borderRadius: 12,
    // // height: 50,
    // display: "flex",
    // alignItems: "center",
    // justifyContent: "center",
  },
});

export { globalStyles, FONT_SIZES, buttonStyle, SPACING };
