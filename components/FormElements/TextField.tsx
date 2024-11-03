import { Controller } from "react-hook-form";
import { StyleSheet } from "react-native";
import { TextInput } from "react-native-paper";
import { globalColors } from "../UI/Colors";

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
        <>
          <TextInput
            label="Номер документа"
            mode="outlined"
            value={value}
            onChangeText={onChange}
            style={{ borderColor: "red" }}
            activeOutlineColor={globalColors.primary}
            textColor={globalColors.black}
            cursorColor={globalColors.main}
          />
        </>
      )}
    />
  );
};

const cls = StyleSheet.create({
  hfinput: {
    borderRadius: 22,
  },
});

export default HFTextField;
