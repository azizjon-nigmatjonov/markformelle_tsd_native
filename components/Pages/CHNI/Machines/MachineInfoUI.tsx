import { t } from "i18next";
import { StyleSheet, View, Text } from "react-native";
import { ClockIcon } from "@/components/UI/Icons";

const MachineInfoUI = () => {
  return (
    <View>
      <Text style={styles.title}>{t("chni.machine")} 230</Text>
      <View style={styles.list}>
        <View style={styles.info}>
          <View>
            <Text style={styles.label}>Мощность машины</Text>
          </View>
          <View style={styles.infoText}>
            <Text style={styles.infoValue}>230 носков / час</Text>
            <ClockIcon />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 12,
  },
  list: {
    marginTop: 8,
  },
  info: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 8,
  },
  label: {
    fontSize: 14,
    color: "#666",
  },
  infoText: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  infoValue: {
    fontSize: 14,
    fontWeight: "600",
  },
});

export default MachineInfoUI;
