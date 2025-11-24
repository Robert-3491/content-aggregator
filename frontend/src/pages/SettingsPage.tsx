import { useAdressBook } from "@/context/AdressBookContext";
import { useEffect } from "react";
import SettingBox from "@/components/SettingsComponents/SettingBox";
import { parseAdressBook } from "@/types/AdressBook";

export default function SettingsPage() {
  const { setAdressBook } = useAdressBook();

  useEffect(() => {
    const fetchAdressBook = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/adressbook");
        const data = await response.json();
        console.log(data);
        console.log(parseAdressBook(data));

        setAdressBook(parseAdressBook(data));
      } catch (error) {
        console.error("Failed to fetch:", error);
      }
    };
    fetchAdressBook();
  }, []);

  return (
    <>
      <h2>Settings</h2>
      <SettingBox title="qBit Url:" target="qbitUrl" />
      <SettingBox title="YTS Urls:" target="ytsUrls" />
      <SettingBox title="RARBG Urls:" target="rarbgUrls" />
      <SettingBox title="ThePirateBay Urls:" target="pirateBayUrls" />
    </>
  );
}
