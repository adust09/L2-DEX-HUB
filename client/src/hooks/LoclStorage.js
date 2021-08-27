import { useState } from "react";

export default function useLocalStorage(key, initialValue, ttl) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = localStorage.getItem(key);
      const parsedItem = item ? JSON.parse(item) : initialValue;

      if (
        typeof parsedItem === "object" &&
        parsedItem !== null &&
        "expair" in parsedItem &&
        "value" in parsedItem
      ) {
        const now = new Date();
        if (ttl && now.getTime() > parsedItem.expair) {
          window.localStorage.removeItem(key);
          return initialValue;
        }
        return parsedItem.value;
      }
      return parsedItem;
    } catch (e) {
      console.log(e);
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);

      if (ttl) {
        const now = new Date();
        const item = {
          value: valueToStore,
          expair: now.getTime() + ttl,
        };
        window.localStorage.setItem(key, JSON.stringify(item));
      } else {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (e) {
      console.log(e);
    }
  };

  return [valueToStore, setValue];
}
