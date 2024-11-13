import { auth } from "@/firebase/auth";
import { User } from "firebase/auth";

export const getToday = () => {
  const today = new Date();

  const day = String(today.getDate()).padStart(2, "0");
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const year = today.getFullYear();

  return `${day}.${month}.${year}.`;
};

export const timestampToDateString = (timestamp: number): string => {
  const date = new Date(timestamp);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  return `${day}.${month}.${year}.`;
};

export const millisecondsToString = (milliseconds: number): string => {
  const hours = Math.floor(milliseconds / (1000 * 60 * 60));
  const minutes = Math.floor((milliseconds % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((milliseconds % (1000 * 60)) / 1000);

  return `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
};

export const timeStringToMilliseconds = (timeString: string | null): number => {
  if (timeString === null) return 0;

  const [hours, minutes, seconds] = timeString.split(":").map(Number);
  return (hours * 3600 + minutes * 60 + seconds) * 1000;
};

export const timestampToDate = (timestamp: number): Date => {
  return new Date(timestamp);
};

export const getCurrentUser = (): User => {
  const currentUser = auth.currentUser;
  if (!currentUser) throw new Error("User not authenticated!");

  return currentUser;
};
