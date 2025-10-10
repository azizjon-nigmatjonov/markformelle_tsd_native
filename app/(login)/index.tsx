import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  StyleSheet,
  Pressable,
  Dimensions,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { ThemedView } from "@/components/ThemedView";
import { Button } from "react-native-paper";
import { buttonStyle } from "@/components/UI/GlobalStyles";
import CModal from "@/components/CElements/CModal";
import SupportList from "./SupportList";
import { globalColors } from "@/components/UI/Colors";
import { useLogin } from "@/hooks/useAuth";

interface LoginData {
  qr_code: string;
}

const Login: React.FC = () => {
  const { height: SCREEN_HEIGHT } = Dimensions.get("window");
  const [openModal, setOpenModal] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isManualFocus, setIsManualFocus] = useState(false);
  const inputRef = useRef<TextInput>(null);
  const previousValueRef = useRef<string>("");
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>({
    mode: "onSubmit",
  });
  // const { setPage } = useMobileStore();

  const { mutate: login, isPending } = useLogin();

  // Auto-focus every 1.5 seconds without opening keyboard
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isManualFocus && inputRef.current) {
        inputRef.current.focus();
      }
    }, 1500);

    return () => clearInterval(interval);
  }, [isManualFocus]);

  const onSubmit = (data: LoginData) => {
    if (!data?.qr_code?.length) {
      return;
    }
    
    const qr_code = data.qr_code.includes("USR")
      ? data.qr_code.substring(3)
      : data.qr_code;

    login({
      qr_code: qr_code,
    });
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
          Добро пожаловать в{"\n"}
          <Text style={styles.highlight}> ТСД</Text>
        </Text>

        <Controller
          name="qr_code"
          control={control}
          defaultValue=""
          render={({ field: { onChange, value } }) => {
            const handleTextChange = (newValue: string) => {
              const previousValue = previousValueRef.current;
              onChange(newValue);
              
              // Detect paste/scan: if more than 3 characters added at once, auto-submit
              if (newValue.length > 0 && newValue.length - previousValue.length > 3) {
                // This looks like a paste or scan, auto-submit
                setTimeout(() => {
                  handleSubmit(onSubmit)();
                }, 100);
              }
              
              previousValueRef.current = newValue;
            };

            return (
              <>
                <Pressable
                  onPress={() => {
                    setIsManualFocus(true);
                    inputRef.current?.focus();
                  }}
                  style={{ width: "100%" }}
                >
                  <TextInput
                    ref={inputRef}
                    style={[
                      styles.input,
                      errors?.qr_code && styles.errorInput,
                      isFocused && styles.focusOutline,
                    ]}
                    placeholder="Введите ваш пароль, пожалуйста"
                    value={value}
                    onChangeText={handleTextChange}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => {
                      setIsFocused(false);
                      setIsManualFocus(false);
                    }}
                    secureTextEntry={true}
                    showSoftInputOnFocus={isManualFocus}
                  />
                </Pressable>
                {errors?.qr_code && (
                  <Text style={styles.errorText}>{errors.qr_code?.message}</Text>
                )}
              </>
            );
          }}
        />

        <Button
          mode="contained"
          onPress={handleSubmit(onSubmit)}
          style={[buttonStyle.submit, styles.button]}
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
