"use client";
import { useClock } from "@/lib/use-clock";

export default function Time() {
    const { time, ampm, dateStr } = useClock();

  return (
    <>
        <div className="time-display">
            {time}
            <span className="time-ampm">{ampm}</span>
        </div>
        <div className="time-date">{dateStr}</div>
    </>
  );
}
