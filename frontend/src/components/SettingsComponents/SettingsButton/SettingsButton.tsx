import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import styles from "./SettingsButton.module.css";

export default function SettingsButton() {
  return (
    <div className={styles.settingsButton}>
      <IoIosCheckmarkCircleOutline className={styles.iconStyle} />
    </div>
  );
}
