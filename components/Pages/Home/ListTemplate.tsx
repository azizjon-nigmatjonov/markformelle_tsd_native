import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

interface Props {
  list: any;
  hanldeClick: (val: any) => void;
}

export const ListTemplate = ({ list, hanldeClick = () => {} }: Props) => {
  return (
    <View style={styles.container}>
      {list.map((item: any, index: number) => (
        <TouchableOpacity
          key={index}
          style={styles.itemContainer}
          onPress={() => {
            if (item?.link) {
              hanldeClick(item.link);
            }
          }}
        >
          {item?.image && (
            <View style={styles.imageContainer}>
              {/* If it's an actual image URI or require statement */}
              <Image source={item.image} style={styles.image} />
            </View>
          )}
          <View style={styles.textContainer}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.description}>{item.description}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

// React Native Stylesheet
const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // marginTop: 20,
    gap: 3,
  },
  itemContainer: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#e0e0e0", // Replace with your variable or constant color
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 16,
    height: 80,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  imageContainer: {
    marginRight: 10,
  },
  image: {
    width: 50,
    height: 50,
    resizeMode: "contain", // Ensure the image scales correctly
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  description: {
    color: "#888888", // Replace with your variable or constant color
    fontSize: 14,
  },
});
