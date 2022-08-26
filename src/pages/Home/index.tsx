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
} from "./style";

export function Home() {
  const [newTaskText, setNewTaskText] = useState("");
  const { addNewTask, tasks, tasksCompleteCount } = useTodo();

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
    console.log(tasks, tasksCompleteCount);
  }, []);

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

        <TasksContainer>
          {tasks.length < 0 ? (
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
      </main>
    </HomeContainer>
  );
}
