import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import styles from "../SharedComponets/SettingsBox/SettingBox.module.css";

export default function UsernamePassBox() {
  return (
    <div className={styles.settingContainer}>
      <h3>qBit Username & Password</h3>

      <div className={styles.flex}>
        <input
          type="password"
          className={styles.settingsInput}
          placeholder="Username"
        />
        <div className={styles.settingsButton}>
          <IoIosCheckmarkCircleOutline className={styles.iconStyle} />
        </div>
      </div>

      <div className={styles.flex} style={{ marginTop: "8px" }}>
        <input
          type="password"
          className={styles.settingsInput}
          placeholder="Password"
        />
        <div className={styles.settingsButton}>
          <IoIosCheckmarkCircleOutline className={styles.iconStyle} />
        </div>
      </div>
    </div>
  );
}
