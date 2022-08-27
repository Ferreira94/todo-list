import { useState } from "react";
import { PlusCircle } from "phosphor-react";

import { useTodo } from "../../hooks/useTodo";

import { FormContainer } from "./style";

export function FormCreateNewTask() {
  const [newTaskText, setNewTaskText] = useState("");
  const { addNewTask } = useTodo();

  // Função responsável por criar a estrutura de uma nova tarefa e chamar a função addNewTask que é responsável por criar a tarefa,  que receberá a estrutura que foi criada, após esse processo ela zera o valor do input responsável pela descrição da nova tarefa.
  function handleCreateNewTask() {
    const task = {
      id: Math.random(),
      text: newTaskText,
      isComplete: false,
    };

    addNewTask(task);
    setNewTaskText("");
  }

  return (
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
  );
}
