"use client";

import { useState, useSyncExternalStore } from "react";

const subscribe = () => () => {};
const getServerDate = () => "";

const getLocalDate = () => {
  const today = new Date();

  return [
    today.getFullYear(),
    String(today.getMonth() + 1).padStart(2, "0"),
    String(today.getDate()).padStart(2, "0"),
  ].join("-");
};

type TodayDateInputProps = {
  name?: string;
};

export default function TodayDateInput({ name = "purchaseDate" }: TodayDateInputProps) {
  const today = useSyncExternalStore(subscribe, getLocalDate, getServerDate);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  return (
    <input
      name={name}
      onChange={(event) => setSelectedDate(event.target.value)}
      required
      type="date"
      value={selectedDate ?? today}
    />
  );
}
