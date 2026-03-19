import { describe, it, expect } from "bun:test";
import { render, screen } from "@testing-library/react";
import Todos, { type TodoEvent } from "@/components/todos";

const mockTodos: TodoEvent[] = [
  {
    id: 1,
    title: "Buy groceries",
    completed: false,
    dueDate: "2026-03-25T00:00:00.000Z",
    type: "groceries",
    assignedTo: "Matthew",
    createdAt: "2026-03-01T00:00:00.000Z",
    updatedAt: null,
  },
  {
    id: 2,
    title: "School run",
    completed: false,
    dueDate: null,
    type: "school",
    assignedTo: "Elizabeth",
    createdAt: "2026-03-01T00:00:00.000Z",
    updatedAt: null,
  },
];

describe("Todos", () => {
  it("renders all todo items", () => {
    render(<Todos todos={mockTodos} />);
    expect(screen.getByText("Buy groceries")).toBeInTheDocument();
    expect(screen.getByText("School run")).toBeInTheDocument();
  });

  it("renders assignee names", () => {
    render(<Todos todos={mockTodos} />);
    expect(screen.getByText(/Matthew/)).toBeInTheDocument();
    expect(screen.getByText(/Elizabeth/)).toBeInTheDocument();
  });

  it("renders due date when present", () => {
    render(<Todos todos={mockTodos} />);
    expect(screen.getByText(/Mar 25/)).toBeInTheDocument();
  });

  it("shows 'No due date' when dueDate is null", () => {
    render(<Todos todos={mockTodos} />);
    expect(screen.getByText("No due date")).toBeInTheDocument();
  });

  it("renders an empty list without crashing", () => {
    const { container } = render(<Todos todos={[]} />);
    expect(container.querySelector(".todo-list")).toBeInTheDocument();
  });
});
