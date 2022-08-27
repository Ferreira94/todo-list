import { useState } from "react";
import { Check, Circle, Pencil, Trash, X } from "phosphor-react";

import { useTodo } from "../../hooks/useTodo";
import { ITaskProps } from "../../interfaces";

import { TaskContainer, ContainerInput } from "./style";

export function Task({ id, text, isComplete }: ITaskProps) {
  const { removeTask, completeTask, editTask } = useTodo();
  const [editText, setEditText] = useState(text);
  const [isEdit, setIsEdit] = useState(false);

  return (
    <>
      {!isEdit ? (
        <TaskContainer>
          <button onClick={() => completeTask(id)}>
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
          <button onClick={() => removeTask(id)}>
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
          <button
            onClick={() => {
              editTask(id, editText);
              setIsEdit(false);
            }}
            disabled={!editText}
          >
            <Check size={18} />
          </button>
        </ContainerInput>
      )}
    </>
  );
}
