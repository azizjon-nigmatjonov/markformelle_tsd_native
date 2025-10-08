import React, { useEffect, useState } from "react";
import { View, TextInput, Pressable, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons"; // Use expo vector icons or react-native-vector-icons
import useDebounce from "../../../hooks/useDebounce";

interface Props {
  handleChange: (val: any) => void;
  delay?: number;
  defaultValue?: string | number;
  handleSubmit?: (val: any) => void;
}

const CSearchInput = ({
  handleChange = () => {},
  delay = 0,
  defaultValue = "",
  handleSubmit = () => {},
}: Props) => {
  const [value, setValue] = useState<any>(defaultValue || "");
  const debounce: any = useDebounce((search: any) => {
    setValue(search);
    handleChange(search);
  }, delay);

  useEffect(() => {
    setValue(defaultValue as string);
  }, [defaultValue]);

  const handleKeyPress = (event: any) => {
    if (event.nativeEvent.key === "Enter" && value) {
      handleSubmit(value);
    }
  };

  return (
    <View
      style={[
        styles.container,
        value ? styles.activeBorder : styles.inactiveBorder,
      ]}
    >
      <MaterialIcons
        name="search"
        size={20}
        style={[styles.icon, { color: value ? "#ab077e" : "gray" }]} // Adjust color as per your theme
      />
      <TextInput
        value={value}
        onChangeText={(text) => debounce(text)}
        onKeyPress={handleKeyPress}
        placeholder={"search"}
        style={styles.input}
        returnKeyType="search"
      />
      {value.length > 0 && (
        <Pressable
          onPress={() => {
            setValue("");
            handleChange("");
          }}
        >
          <MaterialIcons name="close" size={20} />
        </Pressable>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 12,
    paddingHorizontal: 15,
    height: 50,
  },
  input: {
    flex: 1,
    height: "100%",
    backgroundColor: "transparent",
    paddingLeft: 25, // Space for the icon
    color: "black", // Adjust as per your theme
  },
  icon: {
    position: "absolute",
    left: 10,
  },
  activeBorder: {
    borderColor: "#ab077e", // Focus color
    borderWidth: 1,
  },
  inactiveBorder: {
    borderColor: "lightgray", // Adjust as per your theme
    borderWidth: 1,
  },
});

export default CSearchInput;
