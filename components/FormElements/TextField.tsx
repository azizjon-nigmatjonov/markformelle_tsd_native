import { Controller } from "react-hook-form";
import { StyleSheet, TextInput } from "react-native";
import CLabel from "../CElements/CLabel";

interface Props {
  control: any;
  name: string;
  defaultValue?: any;
  label?: string;
  required?: boolean;
  placeholder?: string;
}

const HFTextField = ({
  control,
  label,
  name = "",
  defaultValue = "",
  required,
  placeholder = "",
}: Props) => {
  return (
    <Controller
      control={control}
      name={name}
      defaultValue={defaultValue}
      render={({ field: { onChange, value } }) => (
        <>
          {label && <CLabel title={label} required={required} />}
          <TextInput
            placeholder={placeholder}
            style={cls.hfinput}
            onChangeText={onChange}
            value={value}
            defaultValue={defaultValue}
          />
        </>
      )}
    />
  );
};

const cls = StyleSheet.create({
  hfinput: {
    backgroundColor: "transparent",
    height: 40,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    fontSize: 12,
  },
});

export default HFTextField;
