import React from "react";
import { View, StyleSheet, TouchableWithoutFeedback } from "react-native";

interface CloserProps {
  handleClick: () => void; // Add a prop to handle the close action
}

const CCloser: React.FC<CloserProps> = ({ handleClick }) => {
  return (
    <TouchableWithoutFeedback onPress={handleClick}>
      <View style={styles.container} />
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    width: "100%",
    height: "100%",
    left: 0,
    top: 0,
    zIndex: 90,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
});

export default CCloser;
