import { addDoc, collection, getDocs, query, where } from "@firebase/firestore";
import { firestore } from "../config";
import { TaskInProgress } from "@/types";
import { auth } from "../auth";

export const getTasksInProgress = async (): Promise<
  TaskInProgress[] | null
> => {
  const currentUser = auth.currentUser;

  if (!currentUser) throw new Error("User not authenticated!");

  try {
    const collectionRef = collection(firestore, "tasks-in-progress");
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
    }) as TaskInProgress[];

    return tasks;
  } catch (e) {
    console.error(e);
  }

  return null;
};

export const addTaskInProgress = async (
  task: TaskInProgress
): Promise<void> => {
  const currentUser = auth.currentUser;

  if (!currentUser) throw new Error("User not authenticated!");

  try {
    const collectionRef = collection(firestore, "tasks-in-progress");
    const taskQuery = query(
      collectionRef,
      where("description", "==", task.description),
      where("userId", "==", currentUser.uid)
    );
    const querySnapshot = await getDocs(taskQuery);

    if (!querySnapshot.empty) return;

    const id = crypto.randomUUID();
    await addDoc(collectionRef, {
      userId: currentUser.uid,
      id: id,
      ...task,
    });
  } catch (e) {
    console.error(e);
  }
};
