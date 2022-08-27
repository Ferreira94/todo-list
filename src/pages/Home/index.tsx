import { useState } from "react";

import { useTodo } from "../../hooks/useTodo";
import {
  CountTasks,
  FormCreateNewTask,
  ListTasksContainer,
} from "../../components";

import { HomeContainer, SelectContainer, SelectText } from "./style";

export function Home() {
  const [isActiveSelect, setIsActiveSelect] = useState<string>("all");
  const { tasks } = useTodo();

  return (
    <HomeContainer>
      <FormCreateNewTask />

      <main>
        <CountTasks />

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

        <ListTasksContainer isActiveSelect={isActiveSelect} />
      </main>
    </HomeContainer>
  );
}
