import styles from "./SearchToggle.module.css";

interface Props {
  label: string;
  boolValue: boolean;
  setBoolValue: (value: boolean) => void;
  firstOption: string;
  secondOption: string;
}

function SearchToggle({
  boolValue,
  setBoolValue,
  firstOption,
  secondOption,
  label,
}: Props) {
  return (
    <div className={styles.containerToggle}>
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
          {firstOption}
        </div>
        <div
          className={[
            styles.button,
            styles.right,
            !boolValue && styles.active,
          ].join(" ")}
          onClick={() => setBoolValue(false)}
        >
          {secondOption}
        </div>
      </div>
    </div>
  );
}

export default SearchToggle;
