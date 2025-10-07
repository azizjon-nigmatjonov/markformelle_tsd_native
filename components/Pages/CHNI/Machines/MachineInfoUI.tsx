import { t } from "i18next";
import { StyleSheet } from "react-native";
import { ClockIcon } from "@/components/UI/Icons";

const MachineInfoUI = () => {
  return (
    <div>
      <h1 style={styles.title}>{t("chni.machine")} 230</h1>
      <ul>
        <li style={styles.info}>
          <div>
            <span>Мощность машины</span>
            {/* here create clock icon inside icons folder */}
          </div>
          <p style={styles.infoText}>
            230 носков / час <ClockIcon />
          </p>
        </li>
      </ul>
    </div>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: "bold",
    margin: 0,
  },
  info: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  infoText: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 4,
    marginTop: 4,
    fontWeight: "semibold",
  },
});

export default MachineInfoUI;
