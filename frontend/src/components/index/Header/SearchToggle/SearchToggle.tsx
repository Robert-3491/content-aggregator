import styles from "./SearchToggle.module.css";

interface Props {
  label: string;
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
  label,
}: Props) {
  return (
    <div className={styles.container}>
      <p className={styles.label}>{label}</p>
      <div style={{ display: "flex" }}>
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
    </div>
  );
}

export default SearchToggle;
