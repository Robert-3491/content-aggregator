import styles from "./AppNavigation.module.css";

interface Props {
  navigationPage: "Browser" | "qBit";
  setNavigationPage: (selection: "Browser" | "qBit") => void;
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
          navigationPage === "qBit" ? styles.active : ""
        }`}
        onClick={() => setNavigationPage("qBit")}
      >
        qBit WebUI
      </div>
    </div>
  );
}
