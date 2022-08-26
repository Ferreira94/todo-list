import { Check, Circle, Trash } from "phosphor-react";
import { TaskContainer } from "./style";
import { useTodo } from "../../hooks/useTodo";

interface ITaskProps {
  text: string;
  id: number;
  isComplete: boolean;
  // onCompleteTask: (id: number) => void;
  // onDeleteTask: (id: number) => void;
}

export function Task({
  id,
  text,
  isComplete,
}: // onCompleteTask,
// onDeleteTask,
ITaskProps) {
  const { handleRemoveTask, handleTaskComplete } = useTodo();

  return (
    <TaskContainer>
      {isComplete ? (
        <div>
          <Check size={18} />
        </div>
      ) : (
        <button onClick={() => handleTaskComplete(id)}>
          <Circle size={18} />
        </button>
      )}

      {!isComplete ? <p>{text}</p> : <span>{text}</span>}

      {!isComplete && (
        <button onClick={!isComplete ? () => handleRemoveTask(id) : () => {}}>
          <Trash />
        </button>
      )}
    </TaskContainer>
  );
}
