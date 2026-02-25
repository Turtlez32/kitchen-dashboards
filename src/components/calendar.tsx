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

type CalendarProps = {
  events: CalendarEvent[];
};

const EVENT_TIME_ZONE = "Australia/Sydney";
const EVENT_LOCALE = "en-AU";
const eventColors = [
  { bg: "rgba(255, 184, 208, 0.15)", border: "#FFB8D0", dot: "#FF8FAB" },
  { bg: "rgba(168, 216, 234, 0.15)", border: "#A8D8EA", dot: "#7BC4E0" },
  { bg: "rgba(195, 151, 232, 0.15)", border: "#C397E8", dot: "#B17FDE" },
  { bg: "rgba(126, 218, 185, 0.15)", border: "#7EDAB9", dot: "#5EC99F" },
  { bg: "rgba(255, 179, 153, 0.15)", border: "#FFB399", dot: "#FF9A75" },
];

function formatEventDateTime(dateInput: string) {
  const parsedDate = new Date(dateInput);

  if (Number.isNaN(parsedDate.getTime())) {
    return { dateLabel: "Invalid date", timeLabel: "Invalid time" };
  }

  const dateLabel = parsedDate.toLocaleDateString(EVENT_LOCALE, {
    weekday: "short",
    month: "short",
    day: "numeric",
    timeZone: EVENT_TIME_ZONE,
  });

  const timeLabel = parsedDate.toLocaleTimeString(EVENT_LOCALE, {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: EVENT_TIME_ZONE,
  });

  return { dateLabel, timeLabel };
}

export default function Calendar({ events }: CalendarProps) {
  return (
    <>
      <div className="calendar-section">
        <div className="calendar-section-header">
          <span className="calendar-pulsing-dot" />
          Calendar Events
        </div>
        <div className="calendar-events">
          {events.map((event, idx) => {
            const colorScheme = eventColors[idx % eventColors.length];
            const { dateLabel, timeLabel } = formatEventDateTime(event.start);

            return (
              <div
                key={event.id}
                className="calendar-event-card"
                style={{
                  "--event-bg": colorScheme.bg,
                  "--event-border": colorScheme.border,
                  "--event-dot": colorScheme.dot,
                } as React.CSSProperties}
              >
                <div className="calendar-event-header">
                  <span className="calendar-event-dot" style={{ background: colorScheme.dot }} />
                  <span className="calendar-event-title">{event.summary}</span>
                </div>
                <div className="calendar-event-datetime">
                  {dateLabel} at {timeLabel}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
