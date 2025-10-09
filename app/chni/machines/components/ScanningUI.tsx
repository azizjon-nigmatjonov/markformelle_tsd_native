import { View } from "react-native";
import { globalStyles } from "@/components/UI/GlobalStyles";
import { AlertUI } from "@/components/UI/Alert";
import { Text, StyleSheet, Image } from "react-native";
import { useEffect, useState } from "react";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
  Easing,
  withSpring,
} from "react-native-reanimated";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTheme } from "@/hooks/useTheme";
import { useTranslate } from "@/hooks/useTranslate";
import ModalBtn from "@/components/Pages/Rolls/Components/ModalBtn";
import { ScanningInput } from "@/components/Pages/CHNI/Machines/ScanningInput";

interface Props {
  setCustomInputActions: (val: string[]) => void;
  customInputActions: string[];
  openModal: boolean;
  setOpenModal: (val: boolean) => void;
  setAlertInfo: (val: any) => void;
  docId: string;
  setDocId: (val: string) => void;
  setMachineId: (val: string) => void;
  machineId: string;
  setMachineData: (val: any) => void;
}

const ScanningUI = ({
  setCustomInputActions,
  customInputActions,
  openModal,
  setOpenModal,
  setAlertInfo,
  docId,
  setDocId,
  setMachineId,
  machineId,
  setMachineData,
}: Props) => {
  const { colors } = useTheme();
  const t = useTranslate();
  // Pulse animation for the outer circle
  const pulseScale = useSharedValue(1);
  const pulseOpacity = useSharedValue(0.6);

  // Breathing animation for the icon
  const breatheScale = useSharedValue(1);

  // Scanning line animation
  const scanLineY = useSharedValue(-100);

  useEffect(() => {
    // Pulse animation - creates expanding circles
    pulseScale.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 0 }),
        withTiming(1.5, { duration: 1500, easing: Easing.out(Easing.ease) })
      ),
      -1,
      false
    );

    pulseOpacity.value = withRepeat(
      withSequence(
        withTiming(0.5, { duration: 0 }),
        withTiming(0, { duration: 1500, easing: Easing.out(Easing.ease) })
      ),
      -1,
      false
    );

    // Breathing animation - makes icon gently scale
    breatheScale.value = withRepeat(
      withSequence(
        withTiming(1.1, { duration: 1200, easing: Easing.inOut(Easing.ease) }),
        withTiming(1, { duration: 1200, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      false
    );

    // Scanning line animation
    scanLineY.value = withRepeat(
      withSequence(
        withTiming(-100, { duration: 0 }),
        withTiming(100, { duration: 2000, easing: Easing.linear })
      ),
      -1,
      false
    );
  }, []);

  const pulseAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pulseScale.value }],
    opacity: pulseOpacity.value,
  }));

  const breatheAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: breatheScale.value }],
  }));

  const scanLineAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: scanLineY.value }],
  }));

  return (
    <View style={[globalStyles.container, styles.content]}>
      <View style={styles.headerContainer}>
        <Text style={[styles.title, { color: colors.text }]}>
          {t("chni.machine_not_sellected")}
        </Text>
        <ModalBtn
          setCustomInputActions={setCustomInputActions}
          customInputActions={customInputActions}
          openModal={openModal}
          setOpenModal={setOpenModal}
        />
      </View>

      <ScanningInput
        customInputActions={customInputActions}
        setAlertInfo={setAlertInfo}
        docId={docId}
        setDocId={setDocId}
        setMachineId={setMachineId}
        machineId={machineId}
        stopFocus={openModal}
        placeholder="chni.write_machine"
        setMachineData={setMachineData}
      />

      <View style={styles.scanContainer}>
        {/* Animated pulsing circles */}
        <Animated.View
          style={[
            styles.pulseCircle,
            { backgroundColor: colors.primary + "20" },
            pulseAnimatedStyle,
          ]}
        />
        <Animated.View
          style={[
            styles.pulseCircle,
            {
              backgroundColor: colors.primary + "30",
              width: 160,
              height: 160,
            },
            pulseAnimatedStyle,
          ]}
        />

        {/* Main icon container with breathing animation */}
        <Animated.View style={[styles.iconWrapper, breatheAnimatedStyle]}>
          <View
            style={[
              styles.iconContainer,
              {
                backgroundColor: colors.primary + "15",
                borderColor: colors.primary + "30",
              },
            ]}
          >
            {/* Scanning line effect */}
            <Animated.View
              style={[
                styles.scanLine,
                { backgroundColor: colors.primary },
                scanLineAnimatedStyle,
              ]}
            />

            <MaterialCommunityIcons
              name="qrcode-scan"
              size={80}
              color={colors.primary}
            />
          </View>
        </Animated.View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    padding: 16,
    flex: 1,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    zIndex: 9999,
    position: "relative",
  },
  scanContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    height: 200,
    position: "relative",
  },
  pulseCircle: {
    position: "absolute",
    width: 180,
    height: 180,
    borderRadius: 90,
  },
  iconWrapper: {
    position: "relative",
    zIndex: 10,
  },
  iconContainer: {
    width: 140,
    height: 140,
    borderRadius: 80,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 3,
    overflow: "hidden",
    position: "relative",
  },
  scanLine: {
    position: "absolute",
    width: "100%",
    height: 3,
    opacity: 0.6,
    shadowColor: "#3559c7",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 8,
    elevation: 5,
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    lineHeight: 24,
    marginBottom: 32,
  },
  barcodeHintContainer: {
    alignItems: "center",
    marginTop: 16,
    padding: 16,
    borderRadius: 12,
    backgroundColor: "rgba(128, 128, 128, 0.05)",
  },
  barcodeLines: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginBottom: 8,
  },
  barcodeLine: {
    height: 40,
    borderRadius: 1,
  },
  barcodeHintText: {
    fontSize: 12,
    fontWeight: "500",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
});

export default ScanningUI;
