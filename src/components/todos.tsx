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
                <div key={t.id} className="todo-item"
                  style={{
                    '--cat-color-bg': `${catColor}18`,
                    '--cat-color-border': `${catColor}40`,
                  } as React.CSSProperties }
                  >
                  <div className="todo-checkbox" style={{ '--cat-color': catColor } as React.CSSProperties}>{t.completed}</div>
                  <span className="todo-task">{t.title}</span>     
                  <span className="todo-date" style={{ '--cat-color': catColor } as React.CSSProperties}>{prettyDate(t.dueDate)}</span> 
                  <span className="todo-assignee"
                  style={{
                    '--member-color-bg': `${memColor}25`,
                    '--member-color-border': `${memColor}60`,
                  } as React.CSSProperties  
                  }>{getMemberEmoji(t.assignedTo ?? "")}{t.assignedTo}</span>           
                </div>
                );
              }
            )};
          </div>
        </>
    );
}
