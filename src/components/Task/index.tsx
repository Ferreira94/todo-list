import { Check, Circle, Pencil, Trash, X } from "phosphor-react";
import { TaskContainer, ContainerInput } from "./style";
import { useTodo } from "../../hooks/useTodo";
import { useState } from "react";

interface ITaskProps {
  text: string;
  id: number;
  isComplete: boolean;
}

export function Task({ id, text, isComplete }: ITaskProps) {
  const { handleRemoveTask, handleTaskComplete, handleEditTask } = useTodo();
  const [editText, setEditText] = useState(text);
  const [isEdit, setIsEdit] = useState(false);

  function editTask() {
    handleEditTask(id, editText);
    setIsEdit(false);
  }

  return (
    <>
      {!isEdit ? (
        <TaskContainer>
          <button onClick={() => handleTaskComplete(id)}>
            {isComplete ? (
              <div>
                <Check size={18} />
              </div>
            ) : (
              <Circle size={18} />
            )}
          </button>

          {!isComplete ? <p>{text}</p> : <span>{text}</span>}

          {!isComplete && (
            <button onClick={() => setIsEdit(true)}>
              <Pencil size={18} />
            </button>
          )}
          <button onClick={() => handleRemoveTask(id)}>
            <Trash size={18} />
          </button>
        </TaskContainer>
      ) : (
        <ContainerInput>
          <button>
            <Pencil size={18} />
          </button>
          <input
            value={editText}
            onChange={(event) => setEditText(event.target.value)}
          />

          <button
            onClick={() => {
              setIsEdit(false), setEditText(text);
            }}
          >
            <X size={18} />
          </button>
          <button onClick={editTask} disabled={!editText}>
            <Check size={18} />
          </button>
        </ContainerInput>
      )}
    </>
  );
}
