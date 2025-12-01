import { useEffect, useState } from "react";
import styles from "./BackendStatus.module.css";

export default function BackendStatus() {
  const [backendStatus, setBackendStatus] = useState<boolean>(false);

  useEffect(() => {
    const checkBackend = async () => {
      try {
        const response = await fetch("/api/status");
        const data = await response.json();
        setBackendStatus(data.message);
      } catch (error) {
        console.log("Backend not reachable:", error);
        setBackendStatus(false);
        // Retry after 1 second
        setTimeout(checkBackend, 1000);
      }
    };

    checkBackend();
  }, []);

  return <p id={styles.backendStatus}>{backendStatus ? "🟢" : "🔴"}</p>;
}
