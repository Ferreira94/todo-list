import { useEffect, useState } from "react";
import { ClipboardText } from "phosphor-react";

import { useTodo } from "../../hooks/useTodo";
import { Task } from "../Task";
import { IIsActiveSelectProps, ITaskProps } from "../../interfaces";

import { TasksContainer, EmptyContainer, ButtonContainer } from "./style";

export function ListTasksContainer({ isActiveSelect }: IIsActiveSelectProps) {
  const [selectTasks, setSelectTasks] = useState<ITaskProps[]>([]);
  const { addNewTask, tasks, tasksCompleteCount, cleanTodo } = useTodo();

  useEffect(() => {
    if (isActiveSelect === "pending") {
      const filteredTasks = tasks.filter((item) => {
        return item.isComplete === false;
      });

      setSelectTasks(filteredTasks);

      return;
    }

    if (isActiveSelect === "completed") {
      const filteredTasks = tasks.filter((item) => {
        return item.isComplete === true;
      });

      setSelectTasks(filteredTasks);

      return;
    }

    setSelectTasks(tasks);
  }, [isActiveSelect, tasksCompleteCount, addNewTask]);

  return (
    <TasksContainer>
      {selectTasks.length === 0 ? (
        <EmptyContainer>
          <ClipboardText />
          {isActiveSelect === "pending" && (
            <p>Você não tem tarefas pendentes</p>
          )}
          {isActiveSelect === "completed" && (
            <p>Você não tem tarefas concluídas</p>
          )}
          {isActiveSelect === "all" && (
            <>
              <p>Você não tem tarefas criadas</p>
              <p>Crie tarefas e organize seus itens a fazer</p>
            </>
          )}
        </EmptyContainer>
      ) : (
        <>
          {selectTasks.map((item) => {
            return (
              <Task
                key={item.id}
                id={item.id}
                text={item.text}
                isComplete={item.isComplete}
              />
            );
          })}
        </>
      )}

      {selectTasks.length !== 0 && (
        <ButtonContainer>
          <button onClick={cleanTodo}>Limpar Todo</button>
        </ButtonContainer>
      )}
    </TasksContainer>
  );
}
