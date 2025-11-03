import { YTSquality } from "@/types/ytsMovies";
import styles from "./QualitiesList.module.css";

interface Props {
  qualities: YTSquality[];
}

export default function QualitiesList({ qualities }: Props) {
  return (
    <div className={styles.container}>
      {qualities && qualities.length > 0 ? (
        qualities.map((quality: YTSquality, index: number) => (
          <div key={index} className={styles.qualityItem}>
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
