import {
  IoIosCheckmarkCircleOutline,
  IoIosAddCircleOutline,
} from "react-icons/io";
import styles from "./SettingBox.module.css";
import { useEffect, useState } from "react";
import { useAdressBook } from "@/context/AdressBookContext";

interface Props {
  title: string;
  target: string;
}

export default function SettingBox({ title, target }: Props) {
  const { adressBook, setAdressBook } = useAdressBook();

  const [inputText, setInputText] = useState("");

  // Update input when adressBook loads
  useEffect(() => {
    if (target === "qbit" && adressBook?.qbitUrl) {
      setInputText(adressBook.qbitUrl);
    }
  }, [adressBook, target]);

  // Update function
  const updateAdressBook = async () => {
    if (!adressBook) return;

    const updatedAdressBook = {
      ...adressBook,
      qbitUrl: target === "qbit" ? inputText : adressBook.qbitUrl,
    };

    try {
      const response = await fetch("http://localhost:5000/api/AdressBook", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedAdressBook),
      });

      const result = await response.json();
      setAdressBook(result);
      console.log("Saved successfully!");
    } catch (error) {
      console.error("Failed to save:", error);
    }
  };

  return (
    <div className={styles.settingContainer}>
      <h3>{title}</h3>
      <div className={styles.flex}>
        <input
          className={styles.settingsInput}
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />

        <div
          className={styles.settingsButton}
          onClick={() => updateAdressBook()}
        >
          {target === "qbit" ? (
            <IoIosCheckmarkCircleOutline className={styles.iconStyle} />
          ) : (
            <IoIosAddCircleOutline className={styles.iconStyle} />
          )}
        </div>
      </div>
    </div>
  );
}
