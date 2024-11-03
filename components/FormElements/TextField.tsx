import { Controller } from "react-hook-form";
import { View, StyleSheet } from "react-native";
import { TextInput } from "react-native-paper";

interface Props {
  control: any;
  name: string;
  defaultValue?: any;
}

const HFTextField = ({ control, name = "", defaultValue = "" }: Props) => {
  return (
    <Controller
      control={control}
      name={name}
      defaultValue={defaultValue}
      render={({ field: { onChange, value } }) => (
        <View style={{ marginBottom: 10 }}>
          <TextInput
            label="Номер документа"
            mode="outlined"
            value={value}
            onChangeText={onChange}
            style={cls.input}
          />
        </View>
      )}
    />
  );
};

const cls = StyleSheet.create({
  input: {
    borderRadius: 12,
    borderColor: "red",
  },
});

export default HFTextField;
