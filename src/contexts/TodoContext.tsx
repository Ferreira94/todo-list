import produce from "immer";
import { createContext, ReactNode, useState, useEffect } from "react";

interface ITaskProps {
  id: number;
  text: string;
  isComplete: boolean;
}

interface ITodoContextType {
  tasks: ITaskProps[];
  tasksCompleteCount: number;
  addNewTask: (task: ITaskProps) => void;
  handleRemoveTask: (taskId: number) => void;
  handleTaskComplete: (taskId: number) => void;
  cleanTodo: () => void;
}

interface ITodoContextProviderProps {
  children: ReactNode;
}

const TODO_LIST_TASKS_STORAGE_KEY = "todoList:tasks:1.0.0";
const TODO_LIST_TASKS_COMPLETE_COUNT_STORAGE_KEY =
  "todoList:tasksCompletCount:1.0.0";

export const TodoContext = createContext({} as ITodoContextType);

export function TodoContextProvider({ children }: ITodoContextProviderProps) {
  const [tasksCompleteCount, setTasksCompleteCount] = useState<number>(() => {
    const storagedTasksCompleteCount = localStorage.getItem(
      TODO_LIST_TASKS_COMPLETE_COUNT_STORAGE_KEY
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

  function handleTaskComplete(taskId: number) {
    const newTodo = produce(tasks, (draft) => {
      const taskExistsInTodo = tasks.findIndex((item) => item.id === taskId);

      if (taskExistsInTodo >= 0) {
        draft[taskExistsInTodo].isComplete = true;
      }
    });

    setTasks(newTodo);
    setTasksCompleteCount((state) => state + 1);
  }

  function handleRemoveTask(taskId: number) {
    const newTodo = produce(tasks, (draft) => {
      const taskExistsInTodo = tasks.findIndex((item) => item.id === taskId);

      if (taskExistsInTodo >= 0) {
        draft.splice(taskExistsInTodo, 1);
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
      TODO_LIST_TASKS_COMPLETE_COUNT_STORAGE_KEY,
      JSON.stringify(tasksCompleteCount)
    );
  }, [tasks]);

  return (
    <TodoContext.Provider
      value={{
        tasks,
        tasksCompleteCount,
        addNewTask,
        handleTaskComplete,
        handleRemoveTask,
        cleanTodo,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
}
