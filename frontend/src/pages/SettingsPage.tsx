import { useAdressBook } from "@/context/AdressBookContext";
import { useEffect, useState } from "react";
import styles from "@/styles/SettingsPage.module.css";
import SettingsInput from "@/components/SettingsComponents/SettingsInput/SettingsInput";
import SettingsButton from "@/components/SettingsComponents/SettingsButton/SettingsButton";

export default function SettingsPage() {
  const { adressBook, setAdressBook } = useAdressBook();

  useEffect(() => {
    const fetchAdressBook = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/adressbook");
        const data = await response.json();
        setAdressBook(data);
      } catch (error) {
        console.error("Failed to fetch watchlist:", error);
        setTimeout(setAdressBook, 2000);
      }
    };
    fetchAdressBook();
  }, []);

  return (
    <>
      <div className={styles.settingContainer}>
        <h3>qBit Url</h3>
        <div className={styles.flex}>
          <SettingsInput />
          <SettingsButton />
        </div>
      </div>
    </>
  );
}
