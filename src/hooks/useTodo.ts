import { useContext } from "react";
import { TodoContext } from "../contexts/TodoContext";

export function useTodo() {
  const context = useContext(TodoContext);

  return context;
}
