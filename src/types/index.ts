import { modalType } from "@/constants";

export type Task = {
  id: string;
  time: number;
  description: string;
  timestamp: number;
  isStopped: boolean;
};

export type ModalType = (typeof modalType)[keyof typeof modalType];
