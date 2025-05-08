/**
 * Custom react hook for searching
 * @param text - The Input string to debounce
 * @param delay - Debounce delay in milliseconds
 * @returns the debounced string
 */

import { useEffect, useState } from "react";

export default function useDebounce<T>(value: T, delay = 500) {
  const [debouncedText, setDebouncedText] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedText(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedText;
}
