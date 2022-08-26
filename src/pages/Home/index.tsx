import { ChangeEvent, FormEvent, InvalidEvent, useState } from "react";
import { ClipboardText, PlusCircle } from "phosphor-react";

import {
  CountTaskContainer,
  HomeContainer,
  TasksContainer,
  EmptyContainer,
} from "./style";
import { Task } from "../../components";

interface ITaskProps {
  id: number;
  text: string;
  isComplete: boolean;
}

export function Home() {
  const [tasks, setTasks] = useState<ITaskProps[]>([]);
  const [newTaskText, setNewTaskText] = useState("");
  const [countTasks, setCountTasks] = useState(0);
  const [countComplete, setCountComplete] = useState(0);

  function handleCreateNewTask(event: FormEvent) {
    event.preventDefault();

    const newTask = {
      id: Math.random(),
      text: newTaskText,
      isComplete: false,
    };

    setTasks((oldState) => [...oldState, newTask]);
    setCountTasks(countTasks + 1);
    setNewTaskText("");
  }

  function handleNewTaskChange(event: ChangeEvent<HTMLInputElement>) {
    event.target.setCustomValidity("");
    setNewTaskText(event.target.value);
  }

  function handleNewTaskInvalid(event: InvalidEvent<HTMLInputElement>) {
    event.target.setCustomValidity("Esse campo é obrigatório!");
  }

  function deleteTask(id: number) {
    const commentsWithoutDeleteOne = tasks.filter((item) => {
      return item.id !== id;
    });

    setTasks(commentsWithoutDeleteOne);
    setCountTasks(countTasks - 1);
  }

  function completeTask(id: number) {
    const statusTasks = tasks.map((item) =>
      item.id === id ? { ...item, isComplete: !item.isComplete } : item
    );

    setTasks(statusTasks);
    setCountComplete(countComplete + 1);
  }

  return (
    <HomeContainer>
      <form onSubmit={handleCreateNewTask}>
        <input
          placeholder="Adicione uma nova tarefa"
          value={newTaskText}
          onChange={handleNewTaskChange}
          onInvalid={handleNewTaskInvalid}
          maxLength={120}
        />
        <button disabled={!newTaskText}>
          <div>
            Criar
            <PlusCircle size={18} />
          </div>
        </button>
      </form>

      <main>
        <CountTaskContainer>
          <div>
            <p>Tarefas criadas</p>
            <span>{countTasks}</span>
          </div>
          <div>
            <p>Concluídas</p>
            {countComplete == 0 ? (
              <span>{countComplete}</span>
            ) : (
              <span>
                {countComplete} de {countTasks}
              </span>
            )}
          </div>
        </CountTaskContainer>

        <TasksContainer>
          {!countTasks ? (
            <EmptyContainer>
              <ClipboardText />
              <p>Você ainda não tem tarefas cadastradas</p>
              <p>Crie tarefas e organize seus itens a fazer</p>
            </EmptyContainer>
          ) : (
            <>
              {tasks.map((item) => {
                return (
                  <Task
                    id={item.id}
                    text={item.text}
                    isComplete={item.isComplete}
                    key={item.id}
                    onDeleteTask={deleteTask}
                    onCompleteTask={completeTask}
                  />
                );
              })}
            </>
          )}
        </TasksContainer>
      </main>
    </HomeContainer>
  );
}
