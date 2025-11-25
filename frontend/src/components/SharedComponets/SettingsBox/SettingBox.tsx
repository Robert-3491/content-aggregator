import {
  IoIosCheckmarkCircleOutline,
  IoIosAddCircleOutline,
} from "react-icons/io";
import styles from "./SettingBox.module.css";
import { useState, useEffect } from "react";
import { useAdressBook } from "@/context/AdressBookContext";
import DropDown from "../DropDown/DropDown";
import { stringifyAdressBook, parseAdressBook } from "@/types/AdressBook";

interface Props {
  title?: string;
  target: string;
}

export default function SettingBox({ title, target }: Props) {
  const { adressBook, setAdressBook } = useAdressBook();
  const [inputText, setInputText] = useState("");

  useEffect(() => {
    if (target === "qbitUrl" && adressBook?.qbitUrl) {
      setInputText(adressBook.qbitUrl);
    }
  }, [adressBook, target]);

  const updateAdressBook = async () => {
    if (!adressBook || !inputText.trim()) return;

    const updatedAdressBook = { ...adressBook };

    if (target === "qbitUrl") {
      updatedAdressBook.qbitUrl = inputText.trim();
    } else if (target === "ytsUrls") {
      updatedAdressBook.ytsUrls = [
        { url: inputText.trim(), active: false },
        ...(updatedAdressBook.ytsUrls || []),
      ];
    } else if (target === "rarbgUrls") {
      updatedAdressBook.rarbgUrls = [
        { url: inputText.trim(), active: false },
        ...(updatedAdressBook.rarbgUrls || []),
      ];
    } else if (target === "pirateBayUrls") {
      updatedAdressBook.pirateBayUrls = [
        { url: inputText.trim(), active: false },
        ...(updatedAdressBook.pirateBayUrls || []),
      ];
    }

    try {
      const response = await fetch("http://localhost:5000/api/AdressBook", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(stringifyAdressBook(updatedAdressBook)),
      });

      if (!response.ok) return;

      const result = await response.json();
      setAdressBook(parseAdressBook(result));
      setInputText("");
    } catch (error) {
      console.error("Failed to save:", error);
    }
  };

  const isDirectory = (): boolean => {
    return target === "seriesDirectories" ? true : false;
  };

  return (
    <div
      className={`${styles.settingContainer} ${
        isDirectory() ? styles.seriesContainer : ""
      }`}
    >
      {title && <h3>{title}</h3>}

      <div className={styles.flex}>
        <input
          placeholder={isDirectory() ? "Add folder" : "Add URL"}
          className={`${styles.settingsInput} ${
            isDirectory() ? styles.seriesInput : ""
          }`}
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />

        <div className={styles.settingsButton} onClick={updateAdressBook}>
          {target === "qbitUrl" ? (
            <IoIosCheckmarkCircleOutline className={styles.iconStyle} />
          ) : (
            <IoIosAddCircleOutline className={styles.iconStyle} />
          )}
        </div>
      </div>

      {target !== "qbitUrl" && <DropDown target={target} />}
    </div>
  );
}
