export interface WeatherData {
  current: {
    temp: number;
    feelsLike: number;
    condition: string;
    icon: string;
    humidity: number;
    wind: number;
  };
  forecast: {
    day: string;
    high: number;
    low: number;
    condition: string;
    icon: string;
  }[];
}

export interface CalendarEvent {
  id: string;
  title: string;
  time: string;
  date: string;
  color: string;
  who: string;
}

export interface TodoItem {
  id: string;
  task: string;
  assignee: string;
  completed: boolean;
  category: "groceries" | "chores" | "errands" | "school" | "fun";
}

export const weatherData: WeatherData = {
  current: {
    temp: 72,
    feelsLike: 70,
    condition: "Partly Cloudy",
    icon: "⛅",
    humidity: 45,
    wind: 8,
  },
  forecast: [
    { day: "Mon", high: 74, low: 58, condition: "Sunny", icon: "☀️" },
    { day: "Tue", high: 71, low: 55, condition: "Cloudy", icon: "☁️" },
    { day: "Wed", high: 68, low: 52, condition: "Rain", icon: "🌧️" },
    { day: "Thu", high: 75, low: 60, condition: "Sunny", icon: "☀️" },
    { day: "Fri", high: 77, low: 62, condition: "Clear", icon: "🌤️" },
  ],
};

export const calendarEvents: CalendarEvent[] = [
  {
    id: "1",
    title: "Soccer Practice",
    time: "9:00 AM",
    date: "Today",
    color: "#FF6B6B",
    who: "Emma",
  },
  {
    id: "2",
    title: "Dentist Appointment",
    time: "11:30 AM",
    date: "Today",
    color: "#4ECDC4",
    who: "Dad",
  },
  {
    id: "3",
    title: "Piano Lesson",
    time: "3:00 PM",
    date: "Today",
    color: "#FFE66D",
    who: "Liam",
  },
  {
    id: "4",
    title: "Family Movie Night",
    time: "7:00 PM",
    date: "Today",
    color: "#A78BFA",
    who: "Everyone",
  },
  {
    id: "5",
    title: "Farmers Market",
    time: "8:00 AM",
    date: "Tomorrow",
    color: "#34D399",
    who: "Mom & Emma",
  },
  {
    id: "6",
    title: "Book Club",
    time: "2:00 PM",
    date: "Tomorrow",
    color: "#F472B6",
    who: "Mom",
  },
  {
    id: "7",
    title: "Birthday Party — Jake",
    time: "4:00 PM",
    date: "Saturday",
    color: "#FB923C",
    who: "Liam",
  },
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

export const familyMembers = [
  { name: "Elizabeth", emoji: "👩", color: "#F472B6" },
  { name: "Matthew", emoji: "👨", color: "#60A5FA" },
  { name: "Harvey", emoji: "👦", color: "#A78BFA" },
  { name: "Andrew", emoji: "👦", color: "#34D399" },
];
