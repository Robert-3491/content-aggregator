import styles from "./SearchToggle.module.css";

interface Props {
  boolValue: boolean;
  setBoolValue: (value: boolean) => void;
  firstString: string;
  secondString: string;
}

function SearchToggle({
  boolValue,
  setBoolValue,
  firstString,
  secondString,
}: Props) {
  return (
    <div className={styles.container}>
      <div
        className={[
          styles.button,
          styles.left,
          boolValue && styles.active,
        ].join(" ")}
        onClick={() => setBoolValue(true)}
      >
        {firstString}
      </div>
      <div
        className={[
          styles.button,
          styles.right,
          !boolValue && styles.active,
        ].join(" ")}
        onClick={() => setBoolValue(false)}
      >
        {secondString}
      </div>
    </div>
  );
}

export default SearchToggle;
