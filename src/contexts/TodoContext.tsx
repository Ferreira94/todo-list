import { createContext, useState, useEffect } from "react";
import produce from "immer";

import {
  ITaskProps,
  ITodoContextProviderProps,
  ITodoContextType,
} from "../interfaces";

const TODO_LIST_TASKS_STORAGE_KEY = "todoList:tasks:1.0.0";
const TODO_LIST_COMPLETE_TASKS_COUNT_STORAGE_KEY =
  "todoList:tasksCompletCount:1.0.0";

export const TodoContext = createContext({} as ITodoContextType);

export function TodoContextProvider({ children }: ITodoContextProviderProps) {
  const [tasksCompleteCount, setTasksCompleteCount] = useState<number>(() => {
    const storagedTasksCompleteCount = localStorage.getItem(
      TODO_LIST_COMPLETE_TASKS_COUNT_STORAGE_KEY
    );

    if (storagedTasksCompleteCount) {
      return JSON.parse(storagedTasksCompleteCount);
    }

    return 0;
  });
  const [tasks, setTasks] = useState<ITaskProps[]>(() => {
    const storagedTasks = localStorage.getItem(TODO_LIST_TASKS_STORAGE_KEY);

    if (storagedTasks) {
      return JSON.parse(storagedTasks);
    }

    return [];
  });

  function addNewTask(task: ITaskProps) {
    const newTask = produce(tasks, (draft) => {
      draft.push(task);
    });

    setTasks(newTask);
  }

  function completeTask(taskId: number) {
    const newTodo = produce(tasks, (draft) => {
      const taskExistsInTodo = tasks.findIndex((item) => item.id === taskId);

      if (taskExistsInTodo >= 0) {
        if (tasks[taskExistsInTodo].isComplete) {
          draft[taskExistsInTodo].isComplete = false;
          setTasksCompleteCount((state) => state - 1);
        }

        if (!tasks[taskExistsInTodo].isComplete) {
          draft[taskExistsInTodo].isComplete = true;
          setTasksCompleteCount((state) => state + 1);
        }
      }
    });

    setTasks(newTodo);
  }

  function editTask(taskId: number, text: string) {
    const newTodo = produce(tasks, (draft) => {
      const taskExistsInTodo = tasks.findIndex((item) => item.id === taskId);

      if (taskExistsInTodo >= 0) {
        draft[taskExistsInTodo].text = text;
      }
    });

    setTasks(newTodo);
  }

  function removeTask(taskId: number) {
    const newTodo = produce(tasks, (draft) => {
      const taskExistsInTodo = tasks.findIndex((item) => item.id === taskId);

      if (taskExistsInTodo >= 0) {
        draft.splice(taskExistsInTodo, 1);

        if (tasks[taskExistsInTodo].isComplete) {
          setTasksCompleteCount((state) => state - 1);
        }
      }
    });

    setTasks(newTodo);
  }

  function cleanTodo() {
    setTasksCompleteCount(0);
    setTasks([]);
  }

  useEffect(() => {
    localStorage.setItem(TODO_LIST_TASKS_STORAGE_KEY, JSON.stringify(tasks));
    localStorage.setItem(
      TODO_LIST_COMPLETE_TASKS_COUNT_STORAGE_KEY,
      JSON.stringify(tasksCompleteCount)
    );
  }, [tasks]);

  return (
    <TodoContext.Provider
      value={{
        tasks,
        tasksCompleteCount,
        addNewTask,
        completeTask,
        removeTask,
        editTask,
        cleanTodo,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
}
