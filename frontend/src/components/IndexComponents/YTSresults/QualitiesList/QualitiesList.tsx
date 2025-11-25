import { YTSquality } from "@/types/YtsMovies";
import styles from "./QualitiesList.module.css";
import { useDownloadModal } from "@/context/DownloadModalContext";

interface Props {
  qualities: YTSquality[];
}

export default function QualitiesList({ qualities }: Props) {
  const { setUrl, setIsVisible } = useDownloadModal();
  return (
    <div className={styles.container}>
      {qualities && qualities.length > 0 ? (
        qualities.map((quality: YTSquality, index: number) => (
          <div
            key={index}
            className={styles.qualityItem}
            onClick={() => {
              setUrl(quality.magnetURL);
              setIsVisible(true);
            }}
          >
            <div>
              {quality.qualityType}
              <br />
              {quality.quality} {quality.size}
            </div>
          </div>
        ))
      ) : (
        <p>No results found</p>
      )}
    </div>
  );
}
