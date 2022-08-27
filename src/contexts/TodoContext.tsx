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

  //Função responsável por criar uma nova tarefa, ela recebe como parâmetro as informações da tarefa
  function addNewTask(task: ITaskProps) {
    const newTask = produce(tasks, (draft) => {
      draft.push(task);
    });

    setTasks(newTask);
  }

  //Função responsável por marcar ou desmarcar tarefa como concluída, ela recebe como parâmetro o id da tarefa que terá seu status alterado, a função verificará se a tarefa existe, após irá verificar se tarefa está concluída ou pendente e irá trocar seu status para o contrário do que está
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

  //Função responsável por editar a descrição de uma tarefa, ela recebe como parâmetro o id da tarefa que deverá ser editada e a nova descrição, a função verificará se a tarefa existe e após irá atualizar a descrição
  function editTask(taskId: number, text: string) {
    const newTodo = produce(tasks, (draft) => {
      const taskExistsInTodo = tasks.findIndex((item) => item.id === taskId);

      if (taskExistsInTodo >= 0) {
        draft[taskExistsInTodo].text = text;
      }
    });

    setTasks(newTodo);
  }

  //Função responsável por excluir uma tarefa, ela recebe como parâmetro o id da tarefa que será excluída, a função verificará se a tarefa existe e após irá excluir.
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

  //Função responsável por zerar o todo, todas as informações serão zeradas.
  function cleanTodo() {
    setTasksCompleteCount(0);
    setTasks([]);
  }

  //Função responsável por amarzenar as informações no localStorage, função será executada sempre que ocorrer alteração em alguma tarefa
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
