import { useDownloadModal } from "@/context/DownloadModalContext";
import styles from "./DownloadModal.module.css";
import ModalSwitch from "@/components/DownloadModalComponents/ModalSwitch/ModalSwitch";

export default function DownloadModal() {
  const { isVisible, url, setIsVisible } = useDownloadModal();

  return (
    <div className={`${styles.modal} ${isVisible ? styles.active : ""}`}>
      <div className={styles.modalContentContainer}>
        <ModalSwitch />
        <p>{url}</p>
        <button onClick={() => setIsVisible(false)}>Close</button>
      </div>
    </div>
  );
}
