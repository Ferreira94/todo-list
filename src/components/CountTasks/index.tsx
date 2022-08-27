import { useTodo } from "../../hooks/useTodo";

import { CountTaskContainer } from "./style";

export function CountTasks() {
  const { tasks, tasksCompleteCount } = useTodo();

  return (
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
  );
}
