export interface TodoItem {
  id: string;
  task: string;
  assignee: string;
  completed: boolean;
  category: "groceries" | "chores" | "errands" | "school" | "fun";
}

export const familyMembers = [
  { name: "Elizabeth", emoji: "👩", color: "#F472B6" },
  { name: "Matthew", emoji: "👨", color: "#60A5FA" },
  { name: "Harvey", emoji: "👦", color: "#A78BFA" },
  { name: "Andrew", emoji: "👦", color: "#34D399" },
];

export const todoItems: TodoItem[] = [
  { id: "1", task: "Buy milk & eggs", assignee: "Mom", completed: false, category: "groceries" },
  { id: "2", task: "Mow the lawn", assignee: "Dad", completed: false, category: "chores" },
  { id: "3", task: "Science project poster", assignee: "Emma", completed: true, category: "school" },
  { id: "4", task: "Walk Biscuit 🐕", assignee: "Liam", completed: false, category: "chores" },
  { id: "5", task: "Pick up dry cleaning", assignee: "Dad", completed: false, category: "errands" },
  { id: "6", task: "Clean bedroom", assignee: "Emma", completed: false, category: "chores" },
  { id: "7", task: "Return library books", assignee: "Liam", completed: true, category: "errands" },
  { id: "8", task: "Get bananas & apples", assignee: "Mom", completed: false, category: "groceries" },
  { id: "9", task: "Pack lunch for field trip", assignee: "Mom", completed: false, category: "school" },
  { id: "10", task: "Plan weekend hike", assignee: "Dad", completed: false, category: "fun" },
];

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

function ScallopBorder({ color = "#FFE4F0" }: { color?: string }) {
  return (
    <svg width="100%" height="12" viewBox="0 0 400 12" preserveAspectRatio="none">
      <path
        d="M0 12 Q10 0 20 12 Q30 0 40 12 Q50 0 60 12 Q70 0 80 12 Q90 0 100 12 Q110 0 120 12 Q130 0 140 12 Q150 0 160 12 Q170 0 180 12 Q190 0 200 12 Q210 0 220 12 Q230 0 240 12 Q250 0 260 12 Q270 0 280 12 Q290 0 300 12 Q310 0 320 12 Q330 0 340 12 Q350 0 360 12 Q370 0 380 12 Q390 0 400 12"
        fill={color}
      />
    </svg>
  );
}

export default function Todos() {
    const incompleteTodos = todoItems.filter((t) => !t.completed);
    const completedTodos = todoItems.filter((t) => t.completed);

    return (
        <>
        <div className="todo-list">
            {incompleteTodos.map((t) => {
              const catColor = categoryColors[t.category];
              const memColor = getMemberColor(t.assignee);
              return (
                <div
                  key={t.id}
                  className="todo-item"
                  style={{
                    '--cat-color-bg': `${catColor}18`,
                    '--cat-color-border': `${catColor}40`,
                  } as React.CSSProperties}
                >
                  <div
                    className="todo-checkbox"
                    style={{ '--cat-color': catColor } as React.CSSProperties}
                  />
                  <span className="todo-task">{t.task}</span>
                  <span
                    className="todo-assignee"
                    style={{
                      '--member-color-bg': `${memColor}25`,
                      '--member-color-border': `${memColor}60`,
                    } as React.CSSProperties}
                  >
                    {getMemberEmoji(t.assignee)} {t.assignee}
                  </span>
                </div>
              );
            })}

            {completedTodos.length > 0 && (
              <>
                <div className="todo-divider">
                  <ScallopBorder color="#D4F0E8" />
                </div>
                {completedTodos.map((t) => {
                  const catColor = categoryColors[t.category];
                  const memColor = getMemberColor(t.assignee);
                  return (
                    <div key={t.id} className="todo-item--completed">
                      <div
                        className="todo-checkbox--filled"
                        style={{
                          '--cat-color-gradient': `linear-gradient(135deg, ${catColor}, ${catColor}AA)`,
                        } as React.CSSProperties}
                      >
                        ✓
                      </div>
                      <span className="todo-task--completed">{t.task}</span>
                      <span
                        className="todo-assignee--completed"
                        style={{
                          '--member-color-bg': `${memColor}18`,
                        } as React.CSSProperties}
                      >
                        {getMemberEmoji(t.assignee)} {t.assignee}
                      </span>
                    </div>
                  );
                })}
              </>
            )}
          </div>
        </>
    );
}
