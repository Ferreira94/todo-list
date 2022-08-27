import { ReactNode } from "react";

export interface ITaskProps {
  id: number;
  text: string;
  isComplete: boolean;
}

export interface ITodoContextType {
  tasks: ITaskProps[];
  tasksCompleteCount: number;
  addNewTask: (task: ITaskProps) => void;
  removeTask: (taskId: number) => void;
  completeTask: (taskId: number) => void;
  editTask: (taskId: number, text: string) => void;
  cleanTodo: () => void;
}

export interface ITodoContextProviderProps {
  children: ReactNode;
}

export interface ISelectTextProps {
  isActive: boolean;
}

export interface IIsActiveSelectProps {
  isActiveSelect: string;
}
