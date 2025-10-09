import { View, StyleSheet, Text } from "react-native";

const DocumentCards = () => {
  const list = [
    {
      id: 1,
      title: "Document",
      description: "Document description",
    },
  ];
  return (
    <View style={styles.container}>
      <Text>DocumentCards</Text>
      {list.map((item) => (
        <View key={item.id}>
          <Text>{item.title}</Text>
          <Text>{item.description}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default DocumentCards;
