"use client";

import { useTodos } from "@/lib/use-todos";
import Todos, { type TodoEvent } from "@/components/todos";

type TodosContainerProps = {
  initialTodos: TodoEvent[];
};

export default function TodosContainer({ initialTodos }: TodosContainerProps) {
  const todos = useTodos(initialTodos);
  return <Todos todos={todos} />;
}
