import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function debounce<T extends (...args: any[]) => void>(
  func: T,
  delay: number,
) {
  let timeout: ReturnType<typeof setTimeout>;

  const debounced = (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), delay);
  };

  debounced.cancel = () => {
    clearTimeout(timeout);
  };

  return debounced;
}
