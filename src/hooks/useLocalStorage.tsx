import { useState, useEffect } from "react";

// Define the custom hook with types for key and initialValue
const getSavedValue = <T,>(key: string, initialValue: T | (() => T)): T => {
  // Get the saved value from localStorage and parse it
  const savedValue = localStorage.getItem(key);
  if (savedValue) return JSON.parse(savedValue);

  // If no saved value, use the initial value
  if (initialValue instanceof Function) {
    return (initialValue as () => T)();
  }
  return initialValue;
};

const useLocalStorage = <T,>(
  key: string,
  initialValue: T | (() => T)
): [T, React.Dispatch<React.SetStateAction<T>>] => {
  // Use the custom getSavedValue function to initialize the state
  const [value, setValue] = useState<T>(() => getSavedValue(key, initialValue));

  // Update localStorage whenever the state changes
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
};

export default useLocalStorage;
