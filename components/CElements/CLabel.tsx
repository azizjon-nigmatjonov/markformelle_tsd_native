import React from "react";
import { Text, StyleSheet, TextStyle } from "react-native";
import { globalColors } from "../UI/Colors";

interface Props {
  title?: string;
  required?: boolean;
  styles?: TextStyle;
}

const CLabel = ({ title = "", required, styles = {} }: Props) => {
  return (
    <Text style={[cls.label, styles]}>
      {required && <Text style={cls.required}>*</Text>}
      {title}
    </Text>
  );
};

const cls = StyleSheet.create({
  label: {
    marginBottom: 2,
    fontWeight: "400",
    fontSize: 12,
    color: globalColors.black,
  },
  required: {
    color: globalColors.error,
    marginRight: 6,
  },
});

export default CLabel;
