import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from "@firebase/firestore";
import { firestore } from "../config";
import { Task } from "@/types";
import { firestoreCollection, firestoreTasksCollection } from "@/constants";
import { getCurrentUser } from "@/utils";

export const getTasks = async (): Promise<Task[] | null> => {
  const currentUser = getCurrentUser();

  try {
    const collectionRef = collection(firestore, firestoreCollection.tasks);
    const userTasksQuery = query(
      collectionRef,
      where(firestoreTasksCollection.userId, "==", currentUser.uid)
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

export const getHistoryTasks = async (): Promise<Task[] | null> => {
  const currentUser = getCurrentUser();

  try {
    const collectionRef = collection(firestore, firestoreCollection.tasks);
    const userHistoryTasksQuery = query(
      collectionRef,
      where(firestoreTasksCollection.userId, "==", currentUser.uid),
      where(firestoreTasksCollection.isStopped, "==", true)
    );
    const snapshot = await getDocs(userHistoryTasksQuery);
    const tasks = snapshot.docs.map((task) => {
      const data = task.data();

      return {
        timestamp: data.timestamp,
        description: data.description,
        time: data.time,
      };
    }) as Task[];

    return tasks;
  } catch (e) {
    console.error(e);
  }

  return null;
};

export const addNewTask = async (task: Task): Promise<void> => {
  const currentUser = getCurrentUser();

  try {
    const collectionRef = collection(firestore, firestoreCollection.tasks);
    const taskQuery = query(
      collectionRef,
      where(firestoreTasksCollection.description, "==", task.description),
      where(firestoreTasksCollection.userId, "==", currentUser.uid)
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

export const updateTaskTime = async (task: {
  id: string;
  time: number;
}): Promise<void> => {
  getCurrentUser();
  const documentRef = doc(firestore, firestoreCollection.tasks, task.id);

  try {
    await updateDoc(documentRef, {
      time: task.time,
    });
  } catch (e) {
    console.error("Error updating task:", e);
    alert("Failed to update task!");
  }
};

export const updateTaskDescription = async (task: {
  id: string;
  description: string;
}): Promise<void> => {
  getCurrentUser();
  const documentRef = doc(firestore, firestoreCollection.tasks, task.id);

  try {
    await updateDoc(documentRef, {
      description: task.description,
    });
  } catch (e) {
    console.error("Error updating task:", e);
    alert("Failed to update task!");
  }
};

export const deleteTask = async (taskId: string): Promise<void> => {
  getCurrentUser();
  const documentRef = doc(firestore, firestoreCollection.tasks, taskId);

  try {
    await deleteDoc(documentRef);
  } catch (e) {
    console.error("Error updating task:", e);
    alert("Failed to delete task!");
  }
};

export const stopTask = async (task: {
  id: string;
  time: number;
}): Promise<void> => {
  getCurrentUser();
  const documentRef = doc(firestore, firestoreCollection.tasks, task.id);

  try {
    await updateDoc(documentRef, {
      time: task.time,
      isStopped: true,
    });
  } catch (e) {
    console.error("Error stopping task:", e);
    alert("Failed to stop task!");
  }
};
