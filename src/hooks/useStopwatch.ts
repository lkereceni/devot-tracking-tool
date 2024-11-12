import { updateTask } from "@/firebase/firestore/firestore";
import { Task } from "@/types";
import { Dispatch, SetStateAction, useCallback, useRef, useState } from "react";

const useStopwatch = (setTasks: Dispatch<SetStateAction<Task[] | null>>) => {
  const stopwatchIntervals = useRef<{ [key: string]: NodeJS.Timeout }>({});
  const [stopwatchStates, setStopwatchStates] = useState<{
    [key: string]: boolean;
  }>({});

  const toggleStopwatch = useCallback(
    (id: string) => {
      setStopwatchStates((prevStates) => {
        const isRunning = prevStates[id] || false;

        if (isRunning) {
          clearInterval(stopwatchIntervals.current[id]);
          delete stopwatchIntervals.current[id];
        } else if (!stopwatchIntervals.current[id]) {
          stopwatchIntervals.current[id] = setInterval(() => {
            setTasks((prevTasks) => {
              if (!prevTasks) return [];

              return prevTasks.map((task) => {
                if (task.id === id) {
                  const newTime = task.time + 1000;

                  if (newTime % 10000 === 0) {
                    updateTask({
                      ...task,
                      time: newTime,
                    });
                  }
                  return { ...task, time: newTime };
                }

                return task;
              });
            });
          }, 1000);
        }

        return { ...prevStates, [id]: !isRunning };
      });
    },
    [setTasks]
  );

  return { toggleStopwatch, stopwatchStates };
};

export default useStopwatch;
