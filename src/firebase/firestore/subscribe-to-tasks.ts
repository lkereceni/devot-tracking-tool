import { Task } from "@/types";
import { Dispatch, SetStateAction } from "react";
import { auth } from "../auth";
import { collection, onSnapshot, query, where } from "@firebase/firestore";
import { firestore } from "../config";

export const subscribeToTasks = (
  setTasks: Dispatch<SetStateAction<Task[] | null>>
) => {
  const currentUser = auth.currentUser;

  if (!currentUser) throw new Error("User not authenticated");

  const collectionRef = collection(firestore, "tasks");
  const userTasksQuery = query(
    collectionRef,
    where("userId", "==", currentUser.uid)
  );

  const unsubscribe = onSnapshot(userTasksQuery, (snapshot) => {
    const tasks = snapshot.docs.map((task) => {
      const data = task.data();

      return {
        id: data.id,
        time: data.time,
        description: data.description,
        date: data.date,
      } as Task;
    }) as Task[];

    setTasks(tasks);
  });

  return unsubscribe;
};
