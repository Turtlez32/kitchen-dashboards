import { env } from "~/env";

interface DinnerData {
  date: string;
  item: string;
  updatedAt: string;
}

function isDinnerData(obj: unknown): obj is DinnerData {
  return (
    typeof obj === "object" &&
    obj !== null &&
    typeof (obj as Record<string, unknown>).date === "string" &&
    typeof (obj as Record<string, unknown>).item === "string" &&
    typeof (obj as Record<string, unknown>).updatedAt === "string"
  );
}

async function fetchDinner(date: string): Promise<DinnerData | null> {
  try {
    const res = await fetch(`${env.API_BASE_URL}/dinner/${date}`, {
      headers: { "x-api-key": env.DINNER_API_KEY },
      next: { revalidate: 300 },
    });
    if (!res.ok) return null;
    const data: unknown = await res.json();
    return isDinnerData(data) ? data : null;
  } catch {
    return null;
  }
}

const FOOD_ICONS = [
  "\uD83C\uDF7D\uFE0F", // plate with cutlery
  "\uD83C\uDF74",       // fork and knife
  "\uD83E\uDD58",       // shallow pan of food
  "\uD83C\uDF72",       // pot of food
  "\uD83E\uDD63",       // bowl with spoon
  "\uD83C\uDF71",       // bento box
  "\uD83E\uDDD1\u200D\uD83C\uDF73", // cook
  "\uD83C\uDF56",       // meat on bone
  "\uD83E\uDD57",       // salad
  "\uD83C\uDF5C",       // steaming bowl
];

function dailyIcon(date: string): string {
  const seed = date.split("").reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
  return FOOD_ICONS[seed % FOOD_ICONS.length]!;
}

export default async function Dinner() {
  const date = new Date().toISOString().split("T")[0];
  const dinner = await fetchDinner(date);
  const icon = dailyIcon(date);

  return (
    <div className="dinner-wrapper">
      <p className="dinner-label">Tonight&apos;s Dinner</p>
      <div className="dinner-name-pill">
        <span className="dinner-plate-icon">{icon}</span>
        <span className="dinner-name">
          {dinner ? dinner.item : "Not set yet"}
        </span>
      </div>
    </div>
  );
}
