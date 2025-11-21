import { useAdressBook } from "@/context/AdressBookContext";
import { useEffect } from "react";
import SettingBox from "@/components/SettingsComponents/SettingBox";

export default function SettingsPage() {
  const { setAdressBook } = useAdressBook();

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
      <h2>Settings</h2>
      <SettingBox title="qBit Url:" target="qbit" />
      <SettingBox title="YTS Urls:" target="" />
      <SettingBox title="RARBG Urls:" target="" />
      <SettingBox title="ThePirateBay Urls:" target="" />
    </>
  );
}
