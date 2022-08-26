import { Check, Circle, Trash } from "phosphor-react";
import { TaskContainer } from "./style";

interface ITaskProps {
  text: string;
  id: number;
  isComplete: boolean;
  onCompleteTask: (id: number) => void;
  onDeleteTask: (id: number) => void;
}

export function Task({
  id,
  text,
  isComplete,
  onCompleteTask,
  onDeleteTask,
}: ITaskProps) {
  return (
    <TaskContainer>
      {isComplete ? (
        <div>
          <Check size={18} />
        </div>
      ) : (
        <button onClick={() => onCompleteTask(id)}>
          <Circle size={18} />
        </button>
      )}

      {!isComplete ? <p>{text}</p> : <span>{text}</span>}

      {!isComplete && (
        <button onClick={!isComplete ? () => onDeleteTask(id) : () => {}}>
          <Trash />
        </button>
      )}
    </TaskContainer>
  );
}
