import { calendarEvents } from "@/lib/mock-data";
export interface CalendarEvent {
  id: string;
  title: string;
  time: string;
  date: string;
  color: string;
  who: string;
}

export const familyMembers = [
  { name: "Elizabeth", emoji: "👩", color: "#F472B6" },
  { name: "Matthew", emoji: "👨", color: "#60A5FA" },
  { name: "Harvey", emoji: "👦", color: "#A78BFA" },
  { name: "Andrew", emoji: "👦", color: "#34D399" },
];

function getMemberColor(name: string): string {
  const member = familyMembers.find((m) => m.name === name);
  return member?.color ?? "#B8A9E8";
}

export default function Calendar() {
    const todayEvents = calendarEvents.filter((e) => e.date === "Today");
    const upcomingEvents = calendarEvents.filter((e) => e.date !== "Today");

    return (
        <>
        <div className="calendar-section">
              <div className="calendar-section-header">
                <span className="calendar-pulsing-dot" />
                Today
              </div>
              <div className="calendar-events">
                {todayEvents.map((ev) => (
                  <div
                    key={ev.id}
                    className="calendar-event-pill"
                    style={{
                      '--ev-color-bg': `${ev.color}18`,
                      '--ev-color-border': `${ev.color}50`,
                      '--ev-color-shadow': `${ev.color}20`,
                    } as React.CSSProperties}
                  >
                    <span className="calendar-event-dot" style={{ background: ev.color }} />
                    <span className="calendar-event-title">{ev.title}</span>
                    <span className="calendar-event-time">{ev.time}</span>
                    <span
                      className="calendar-event-who"
                      style={{ '--who-color-bg': `${getMemberColor(ev.who.split(" ")[0])}22` } as React.CSSProperties}
                    >
                      {ev.who}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="calendar-section">
              <div className="calendar-section-header">
                Upcoming
              </div>
              <div className="calendar-events">
                {upcomingEvents.map((ev) => (
                  <div
                    key={ev.id}
                    className="calendar-event-pill calendar-event-pill--upcoming"
                    style={{
                      '--ev-color-bg': `${ev.color}12`,
                      '--ev-color-border': `${ev.color}35`,
                    } as React.CSSProperties}
                  >
                    <span className="calendar-event-dot" style={{ background: ev.color }} />
                    <span className="calendar-event-title">{ev.title}</span>
                    <span className="calendar-event-time">{ev.time}</span>
                    <span className="calendar-event-date">{ev.date}</span>
                    <span
                      className="calendar-event-who"
                      style={{ '--who-color-bg': `${getMemberColor(ev.who.split(" ")[0])}22` } as React.CSSProperties}
                    >
                      {ev.who}
                    </span>
                  </div>
                ))}
              </div>
            </div>
        </>
    );
}
