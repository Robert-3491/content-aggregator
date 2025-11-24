import Select, { components, SingleValue } from "react-select";
import { MdDelete } from "react-icons/md";
import { useState, useEffect } from "react";
import { useAdressBook } from "@/context/AdressBookContext";
import {
  stringifyAdressBook,
  parseAdressBook,
  UrlEntry,
} from "@/types/AdressBook";
import styles from "./DropDown.module.css";

type OptionType = { value: string; label: string };

const CustomOption = (props: any) => {
  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    props.selectProps.onDeleteOption?.(props.data);
  };

  return (
    <components.Option {...props}>
      <div className={styles.deleteButtonContainer}>
        <span>{props.label}</span>
        <button onClick={handleDelete} className={styles.deleteButton}>
          <MdDelete className={styles.deleteIcon} />
        </button>
      </div>
    </components.Option>
  );
};

interface Props {
  target: string;
}

export default function DropDown({ target }: Props) {
  const { adressBook, setAdressBook } = useAdressBook();
  const [options, setOptions] = useState<OptionType[]>([]);
  const [selected, setSelected] = useState<OptionType | null>(null);

  useEffect(() => {
    if (!adressBook) return;

    let urlEntries: UrlEntry[] = [];
    if (target === "ytsUrls" && adressBook.ytsUrls)
      urlEntries = adressBook.ytsUrls;
    if (target === "rarbgUrls" && adressBook.rarbgUrls)
      urlEntries = adressBook.rarbgUrls;
    if (target === "pirateBayUrls" && adressBook.pirateBayUrls)
      urlEntries = adressBook.pirateBayUrls;

    setOptions(urlEntries.map((e) => ({ value: e.url, label: e.url })));

    const active = urlEntries.find((e) => e.active);
    setSelected(active ? { value: active.url, label: active.url } : null);
  }, [adressBook, target]);

  const handleChange = async (newValue: SingleValue<OptionType>) => {
    if (!adressBook || !newValue) return;

    const updated = { ...adressBook };

    if (target === "ytsUrls" && updated.ytsUrls) {
      updated.ytsUrls = updated.ytsUrls.map((e) => ({
        ...e,
        active: e.url === newValue.value,
      }));
    } else if (target === "rarbgUrls" && updated.rarbgUrls) {
      updated.rarbgUrls = updated.rarbgUrls.map((e) => ({
        ...e,
        active: e.url === newValue.value,
      }));
    } else if (target === "pirateBayUrls" && updated.pirateBayUrls) {
      updated.pirateBayUrls = updated.pirateBayUrls.map((e) => ({
        ...e,
        active: e.url === newValue.value,
      }));
    }

    const res = await fetch("http://localhost:5000/api/AdressBook", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(stringifyAdressBook(updated)),
    });

    const result = await res.json();
    setAdressBook(parseAdressBook(result));
  };

  const handleDelete = async (option: OptionType) => {
    if (!adressBook) return;

    const updated = { ...adressBook };

    if (target === "ytsUrls" && updated.ytsUrls) {
      updated.ytsUrls = updated.ytsUrls.filter((e) => e.url !== option.value);
    } else if (target === "rarbgUrls" && updated.rarbgUrls) {
      updated.rarbgUrls = updated.rarbgUrls.filter(
        (e) => e.url !== option.value
      );
    } else if (target === "pirateBayUrls" && updated.pirateBayUrls) {
      updated.pirateBayUrls = updated.pirateBayUrls.filter(
        (e) => e.url !== option.value
      );
    }

    const res = await fetch("http://localhost:5000/api/AdressBook", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(stringifyAdressBook(updated)),
    });

    const result = await res.json();
    setAdressBook(parseAdressBook(result));
  };

  return (
    <Select
      options={options}
      value={selected}
      onChange={handleChange}
      components={{ Option: CustomOption }}
      placeholder="Select active URL..."
      classNames={{
        control: () => styles.control,
        menu: () => styles.menu,
        option: () => styles.option,
        singleValue: () => styles.singleValue,
        input: () => styles.input,
        placeholder: () => styles.placeholder,
      }}
      {...({ onDeleteOption: handleDelete } as any)}
    />
  );
}
