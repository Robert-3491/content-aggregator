import { useAdressBook } from "@/context/AdressBookContext";
import { useEffect } from "react";
import SettingBox from "@/components/SharedComponets/SettingsBox/SettingBox";
import { parseAdressBook } from "@/types/AdressBook";

export default function SettingsPage() {
  const { setAdressBook } = useAdressBook();

  useEffect(() => {
    const fetchAdressBook = async () => {
      try {
        const response = await fetch("/api/adressbook");
        const data = await response.json();

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
      <SettingBox header="YTS Urls:" target="ytsUrls" />
      <SettingBox header="RARBG Urls:" target="rarbgUrls" />
      <SettingBox header="ThePirateBay Urls:" target="pirateBayUrls" />
      <SettingBox header="qBit Url:" target="qbitUrl" />
    </>
  );
}
