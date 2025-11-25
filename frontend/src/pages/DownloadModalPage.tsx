import { useDownloadModal } from "@/context/DownloadModalContext";
import styles from "./DownloadModalPage.module.css";
import ModalSwitch from "@/components/DownloadModalComponents/ModalSwitch/ModalSwitch";
import SettingBox from "@/components/SharedComponets/SettingsBox/SettingBox";
import { useSearchMode } from "@/context/SearchModeContext";
import { MdDownloadForOffline } from "react-icons/md";

export default function DownloadModalPage() {
  const { isVisible, url, setIsVisible, title } = useDownloadModal();
  const { isMovieSearch } = useSearchMode();

  return (
    <div
      className={`${styles.modal} ${isVisible ? styles.active : ""}`}
      onClick={() => setIsVisible(false)}
    >
      <div
        className={styles.modalContentWrapper}
        onClick={(e) => e.stopPropagation()}
      >
        <ModalSwitch />
        <div className={styles.modalContentContainer}>
          {isMovieSearch && <h3>{title}</h3>}

          {!isMovieSearch && (
            <SettingBox target="seriesDirectories" seriesTitle={title} />
          )}
        </div>

        <div className={styles.downloadButton}>
          <MdDownloadForOffline className={styles.downloadButtonIcon} />
        </div>
      </div>
    </div>
  );
}
