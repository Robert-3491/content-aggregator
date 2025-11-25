import { useState } from "react";
import AppNavigation from "./components/AppNavigation/AppNavigation";
import IndexPage from "./pages/IndexPage";
import { AppProvider } from "./context/AppProvider";
import styles from "./App.module.css";
import SettingsPage from "./pages/SettingsPage";
import DownloadModal from "./pages/DownloadModal";

function App() {
  const [navigationPage, setNavigationPage] = useState<"Browser" | "Settings">(
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
              navigationPage === "Browser" && styles.active
            }`}
          >
            <IndexPage />
          </div>

          <div
            className={`${styles.page} ${
              navigationPage === "Settings" && styles.active
            }`}
          >
            <SettingsPage />
          </div>

          <DownloadModal />
        </div>
      </AppProvider>
    </>
  );
}

export default App;
