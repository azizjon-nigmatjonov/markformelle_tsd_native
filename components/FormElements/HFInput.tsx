import { Controller } from "react-hook-form";
import { TextInput } from "react-native-paper";
import { StyleSheet } from "react-native";

interface Props {
  control: any;
  name: string;
  defaultValue?: any;
}

export const HFInput = ({ control, name = "", defaultValue = "" }: Props) => {
  return (
    <Controller
      name="login"
      control={control}
      defaultValue=""
      render={({ field: { onChange, value } }) => (
        <>
          <TextInput
            style={cls.input}
            placeholder="Введите штрих-код"
            keyboardType="numeric"
            value={value}
            onChangeText={onChange}
            autoFocus
          />
        </>
      )}
    />
  );
};

const cls = StyleSheet.create({
  input: {
    borderRadius: 12,
  },
});
