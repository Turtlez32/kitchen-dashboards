export interface CalendarEvent {
  id: string;
  title: string;
  time: string;
  date: string;
  color: string;
  who: string;
}

export const calendarEvents: CalendarEvent[] = [
  { id: "1", title: "Soccer Practice", time: "9:00 AM", date: "Today", color: "#FF6B6B", who: "Emma" },
  { id: "2", title: "Dentist Appointment", time: "11:30 AM", date: "Today", color: "#4ECDC4", who: "Dad" },
  { id: "3", title: "Piano Lesson", time: "3:00 PM", date: "Today", color: "#FFE66D", who: "Liam" },
  { id: "4", title: "Family Movie Night", time: "7:00 PM", date: "Today", color: "#A78BFA", who: "Everyone" },
  { id: "5", title: "Farmers Market", time: "8:00 AM", date: "Tomorrow", color: "#34D399", who: "Mom & Emma" },
  { id: "6", title: "Book Club", time: "2:00 PM", date: "Tomorrow", color: "#F472B6", who: "Mom" },
  { id: "7", title: "Birthday Party — Jake", time: "4:00 PM", date: "Saturday", color: "#FB923C", who: "Liam" },
];

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
