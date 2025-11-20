import styles from "./AppNavigation.module.css";
import { IoOpenOutline } from "react-icons/io5";

interface Props {
  navigationPage: "Browser" | "Settings";
  setNavigationPage: (selection: "Browser" | "Settings") => void;
}

export default function AppNavigation({
  navigationPage,
  setNavigationPage,
}: Props) {
  return (
    <div className={styles.navigationContainer}>
      <div
        className={`${styles.navigationCell} ${
          navigationPage === "Browser" ? styles.active : ""
        }`}
        onClick={() => setNavigationPage("Browser")}
      >
        Browser
      </div>
      <div
        className={`${styles.navigationCell} ${
          navigationPage === "Settings" ? styles.active : ""
        }`}
        onClick={() => setNavigationPage("Settings")}
      >
        Settings
      </div>
      <div
        className={styles.navigationCell}
        onClick={() => window.open("", "_blank")}
      >
        qBit
        <IoOpenOutline className={styles.icon} />
      </div>
    </div>
  );
}
