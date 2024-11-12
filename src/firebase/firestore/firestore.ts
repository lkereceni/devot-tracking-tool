import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from "@firebase/firestore";
import { firestore } from "../config";
import { Task } from "@/types";
import { auth } from "../auth";

export const getTasks = async (): Promise<Task[] | null> => {
  const currentUser = auth.currentUser;

  if (!currentUser) throw new Error("User not authenticated!");

  try {
    const collectionRef = collection(firestore, "tasks");
    const userTasksQuery = query(
      collectionRef,
      where("userId", "==", currentUser.uid)
    );
    const snapshot = await getDocs(userTasksQuery);
    const tasks = snapshot.docs.map((task) => {
      const data = task.data();

      return {
        time: data.time,
        description: data.description,
      };
    }) as Task[];

    return tasks;
  } catch (e) {
    console.error(e);
  }

  return null;
};

export const addNewTask = async (task: Task): Promise<void> => {
  const currentUser = auth.currentUser;

  if (!currentUser) throw new Error("User not authenticated!");

  try {
    const collectionRef = collection(firestore, "tasks");
    const taskQuery = query(
      collectionRef,
      where("description", "==", task.description),
      where("userId", "==", currentUser.uid)
    );
    const querySnapshot = await getDocs(taskQuery);

    if (!querySnapshot.empty) return;

    const newDocRef = doc(collectionRef);

    await setDoc(newDocRef, {
      ...task,
      userId: currentUser.uid,
      id: newDocRef.id,
    });
  } catch (e) {
    console.error("Error adding task:", e);
    alert("Failed to add new task!");
  }
};

export const updateTask = async (task: {
  id: string;
  time: number;
  description: string;
}): Promise<void> => {
  const currentUser = auth.currentUser;

  if (!currentUser) throw new Error("User not authenticated!");

  const documentRef = doc(firestore, "tasks", task.id);

  try {
    await updateDoc(documentRef, {
      time: task.time,
      description: task.description,
    });
  } catch (e) {
    console.error("Error updating task:", e);
    alert("Failed to update task!");
  }
};
