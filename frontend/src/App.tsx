import { useState } from "react";
import AppNavigation from "./components/AppNavigation/AppNavigation";
import Index from "./components/index/Index";
import { AppProvider } from "./context/AppProvider";
import styles from "@/styles/App.module.css";

function App() {
  const [navigationPage, setNavigationPage] = useState<"Browser" | "qBit">(
    "Browser"
  );

  return (
    <>
      <AppProvider>
        <AppNavigation
          navigationPage={navigationPage}
          setNavigationPage={setNavigationPage}
        />
        <div className={styles.pageContainer}>
          <div
            className={`${styles.page} ${
              navigationPage === "Browser" ? styles.active : ""
            }`}
          >
            <Index />
          </div>
        </div>
      </AppProvider>
    </>
  );
}

export default App;
