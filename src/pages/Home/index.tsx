import { useState, useEffect } from "react";
import { ClipboardText, PlusCircle } from "phosphor-react";

import { Task } from "../../components";
import { useTodo } from "../../hooks/useTodo";

import {
  FormContainer,
  CountTaskContainer,
  HomeContainer,
  TasksContainer,
  EmptyContainer,
  ButtonContainer,
  SelectContainer,
  SelectText,
} from "./style";

interface ITaskProps {
  id: number;
  text: string;
  isComplete: boolean;
}

export function Home() {
  const [selectTasks, setSelectTasks] = useState<ITaskProps[]>([]);
  const [newTaskText, setNewTaskText] = useState("");
  const [isActiveSelect, setIsActiveSelect] = useState("all");
  const { addNewTask, tasks, tasksCompleteCount, cleanTodo } = useTodo();

  function handleCreateNewTask() {
    const task = {
      id: Math.random(),
      text: newTaskText,
      isComplete: false,
    };

    addNewTask(task);
    setNewTaskText("");
  }

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
    <HomeContainer>
      <FormContainer>
        <input
          placeholder="Adicione uma nova tarefa"
          value={newTaskText}
          onChange={(event) => setNewTaskText(event.target.value)}
          maxLength={120}
        />
        <button disabled={!newTaskText} onClick={handleCreateNewTask}>
          <div>
            Criar
            <PlusCircle size={18} />
          </div>
        </button>
      </FormContainer>

      <main>
        <CountTaskContainer>
          <div>
            <p>Tarefas criadas</p>
            <span>{tasks.length}</span>
          </div>
          <div>
            <p>Concluídas</p>
            {tasksCompleteCount == 0 ? (
              <span>{tasksCompleteCount}</span>
            ) : (
              <span>
                {tasksCompleteCount} de {tasks.length}
              </span>
            )}
          </div>
        </CountTaskContainer>

        {tasks.length !== 0 && (
          <SelectContainer>
            <SelectText
              isActive={isActiveSelect === "all" ? true : false}
              onClick={() => setIsActiveSelect("all")}
            >
              Todas /
            </SelectText>
            <SelectText
              isActive={isActiveSelect === "pending" ? true : false}
              onClick={() => setIsActiveSelect("pending")}
            >
              Pendentes /
            </SelectText>
            <SelectText
              isActive={isActiveSelect === "completed" ? true : false}
              onClick={() => setIsActiveSelect("completed")}
            >
              Concluídas
            </SelectText>
          </SelectContainer>
        )}

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
        </TasksContainer>
        {selectTasks.length !== 0 && (
          <ButtonContainer>
            <button onClick={cleanTodo}>Limpar Todo</button>
          </ButtonContainer>
        )}
      </main>
    </HomeContainer>
  );
}
