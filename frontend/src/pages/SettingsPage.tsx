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

// const updateAdressBook = async (data: AdressBook) => {
//   try {
//     const response = await fetch("http://localhost:5000/api/AdressBook", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(data),
//     });

//     const result = await response.json();
//     setAdressBook(result);
//     console.log("Saved successfully!");
//   } catch (error) {
//     console.error("Failed to save:", error);
//   }
// };

// // Example usage in your component:
// const handleSave = () => {
//   updateAdressBook({
//     id: adressBook?.id || 0,
//     ytsUrls: ["https://yts.mx"],
//     rarbgUrls: ["https://rarbg.to"],
//     pirateBayUrls: ["https://thepiratebay.org"],
//     qbitUrl: "http://localhost:8080",
//     seriesDirectories: ["/media/series"]
//   });
// };
