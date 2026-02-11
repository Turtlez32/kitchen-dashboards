import { calendarEvents } from "@/lib/mock-data";

export const familyMembers = [
  { name: "Elizabeth", emoji: "👩", color: "#F472B6" },
  { name: "Matthew", emoji: "👨", color: "#60A5FA" },
  { name: "Harvey", emoji: "👦", color: "#A78BFA" },
  { name: "Andrew", emoji: "👦", color: "#34D399" },
];

export type CalendarEvent = {
  id: string;
  summary: string;
  start: string;
  end: string;
  status: string;
};

function getMemberColor(name: string): string {
  const member = familyMembers.find((m) => m.name === name);
  return member?.color ?? "#B8A9E8";
}

type CalendarProps = {
  events: CalendarEvent[];
};

export default function Calendar({ events }: CalendarProps) {
    const todayEvents = calendarEvents.filter((e) => e.date === "Today");
    const upcomingEvents = calendarEvents.filter((e) => e.date !== "Today");

    return (
        <>
        <div className="calendar-section">
              <div className="calendar-section-header">
                <span className="calendar-pulsing-dot" />
                Calendar Events
              </div>
              <div className="calendar-events">
                {events.map((event) => (
                  <div
                    key={event.id}
                    className="calendar-event-pill"
                  >
                    {/* <span className="calendar-event-dot" style={{ background: ev.color }} /> */}
                    <span className="calendar-event-title">{event.summary}</span>
                    <span className="calendar-event-time">
                      {new Date(event.start).toLocaleDateString(undefined, { weekday: "short", month: "short", day: "numeric" })}{" "}
                      {new Date(event.start).toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" })}</span>
                    {/* <span
                      className="calendar-event-who"
                      style={{ '--who-color-bg': `${getMemberColor(ev.who.split(" ")[0])}22` } as React.CSSProperties}
                    > */}
                      {/* {event.who} */}
                    {/* </span> */}
                  </div>
                ))}

              </div>
            </div>
        </>
    );
}
