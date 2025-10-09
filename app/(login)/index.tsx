import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  StyleSheet,
  Pressable,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { ThemedView } from "@/components/ThemedView";
import { Button } from "react-native-paper";
import { buttonStyle } from "@/components/UI/GlobalStyles";
import CModal from "@/components/CElements/CModal";
import SupportList from "./SupportList";
import { globalColors } from "@/components/UI/Colors";
import { useMobileStore } from "@/store/mobile";
import { useLogin } from "@/hooks/useAuth";

interface LoginData {
  login: string;
  password?: string;
}

const Login: React.FC = () => {
  const { height: SCREEN_HEIGHT } = Dimensions.get("window");
  const [openModal, setOpenModal] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>({
    mode: "onSubmit",
  });
  const { setPage } = useMobileStore();

  // Use the login mutation hook
  const { mutate: login, isPending } = useLogin();

  const onSubmit = (data: LoginData) => {
    // Call the login mutation
    login({
      login: data.login,
      password: data.password || data.login, // You can adjust this based on your API requirements
    });

    setPage("home");
  };

  return (
    <ThemedView style={[styles.container, { height: SCREEN_HEIGHT }]}>
      <Image
        source={require("../../assets/images/logo.png")}
        style={styles.logo}
        resizeMode="contain"
      />
      <View style={styles.form}>
        <Text style={styles.title}>
          Добро пожаловать на{"\n"}
          <Text style={styles.highlight}>универсальную платформу</Text>
        </Text>

        <Controller
          name="login"
          control={control}
          defaultValue=""
          render={({ field: { onChange, value } }) => (
            <>
              <TextInput
                style={[
                  styles.input,
                  errors?.login && styles.errorInput,
                  isFocused && styles.focusOutline,
                ]}
                placeholder="Введите ваш пароль, пожалуйста"
                keyboardType="numeric"
                value={value}
                onChangeText={onChange}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
              />
              {errors?.login && (
                <Text style={styles.errorText}>{errors.login?.message}</Text>
              )}
            </>
          )}
        />

        <Button
          mode="contained"
          onPress={handleSubmit(onSubmit)}
          style={[buttonStyle.submit, styles.button]}
          disabled={isPending}
          loading={isPending}
        >
          {isPending ? "Вход..." : "Войти"}
        </Button>
        <Pressable onPress={() => setOpenModal(true)}>
          <Text style={styles.forgotPassword}>Забыл пароль</Text>
        </Pressable>
      </View>

      <CModal
        title="Список технической поддержки"
        open={openModal}
        handleClose={() => setOpenModal(false)}
        footerActive={false}
      >
        <SupportList />
      </CModal>
    </ThemedView>
  );
};

export default Login;

const styles = StyleSheet.create({
  gradient: {
    backgroundColor: globalColors.main,
    width: "100%",
    height: 80,
  },
  container: {
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  logo: {
    width: 200,
    height: 200,
    marginTop: -100,
  },
  form: {
    width: "100%",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 20,
  },
  highlight: {
    color: "#4A90E2",
    textTransform: "capitalize",
  },
  button: {
    marginTop: 10,
    width: "100%",
    // paddingVertical: 6,
    backgroundColor: globalColors.primary,
    borderRadius: 12,
  },
  input: {
    width: "100%",
    height: 50,
    borderColor: globalColors.border,
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  focusOutline: {
    borderColor: "#ab077e",
  },
  errorInput: {
    borderColor: "red",
  },
  errorText: {
    color: "red",
    marginBottom: 10,
  },
  forgotPassword: {
    marginTop: 10,
    color: "#4A90E2",
    fontSize: 16,
    fontWeight: "600",
  },
});
