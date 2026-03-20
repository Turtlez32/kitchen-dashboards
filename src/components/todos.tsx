import { familyMembers } from "@/lib/mock-data";

export type TodoEvent = {
  id: number;
  title: string;
  completed: boolean;
  dueDate: string | null;
  type: string | null;
  assignedTo: string | null;
  createdAt: string;
  updatedAt: string | null;
}

type TodoProps = {
  todos: TodoEvent[];
};

const categoryColors: Record<string, string> = {
  groceries: "#7EDAB9",
  chores: "#B8A9E8",
  errands: "#FFB899",
  school: "#A8D8EA",
  fun: "#FF8FAB",
};

function getMemberColor(name: string): string {
  const member = familyMembers.find((m) => m.name === name);
  return member?.color ?? "#B8A9E8";
}

function getMemberEmoji(name: string): string {
  const member = familyMembers.find((m) => m.name === name);
  return member?.emoji ?? "👤";
}

function prettyDate(dateStr: string | null): string {
  if (!dateStr) return "No due date";
  const date = new Date(dateStr);
  const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric' };
  return date.toLocaleDateString(undefined, options);
}

export default function Todos({todos}: TodoProps) {
    return (
        <>
        <div className="todo-list">
            {todos.map((t) => {
              const catColor = categoryColors[t.type ?? ""] || "#B8A9E8";
              const memColor = getMemberColor(t.assignedTo ?? "");
              return (
                <div key={t.id} className={t.completed ? "todo-item todo-item--completed" : "todo-item"}
                  style={{
                    '--cat-color-bg': `${catColor}18`,
                    '--cat-color-border': `${catColor}40`,
                  } as React.CSSProperties }
                  >
                  <div
                    className={t.completed ? "todo-checkbox--filled" : "todo-checkbox"}
                    style={{ '--cat-color': catColor, background: t.completed ? catColor : undefined } as React.CSSProperties}
                  >
                    {t.completed ? "✓" : null}
                  </div>
                  <span className={t.completed ? "todo-task todo-task--completed" : "todo-task"}>{t.title}</span>
                  <span className="todo-date" style={{ '--cat-color': catColor } as React.CSSProperties}>{prettyDate(t.dueDate)}</span>
                  <span className={t.completed ? "todo-assignee--completed" : "todo-assignee"}
                  style={{
                    '--member-color-bg': `${memColor}25`,
                    '--member-color-border': `${memColor}60`,
                  } as React.CSSProperties
                  }>{getMemberEmoji(t.assignedTo ?? "")}{t.assignedTo}</span>
                </div>
                );
              }
            )}
          </div>
        </>
    );
}
