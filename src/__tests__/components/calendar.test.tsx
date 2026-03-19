import { describe, it, expect } from "bun:test";
import { render, screen } from "@testing-library/react";
import Calendar, { type CalendarEvent } from "@/components/calendar";

const mockEvents: CalendarEvent[] = [
  {
    id: "evt-1",
    summary: "School pickup",
    start: "2026-03-21T15:00:00+11:00",
    end: "2026-03-21T15:30:00+11:00",
    status: "confirmed",
  },
  {
    id: "evt-2",
    summary: "Dentist appointment",
    start: "2026-03-22T10:00:00+11:00",
    end: "2026-03-22T11:00:00+11:00",
    status: "confirmed",
  },
];

describe("Calendar", () => {
  it("renders the section heading", () => {
    render(<Calendar events={mockEvents} />);
    expect(screen.getByText("Calendar Events")).toBeInTheDocument();
  });

  it("renders all event titles", () => {
    render(<Calendar events={mockEvents} />);
    expect(screen.getByText("School pickup")).toBeInTheDocument();
    expect(screen.getByText("Dentist appointment")).toBeInTheDocument();
  });

  it("renders the correct number of event cards", () => {
    render(<Calendar events={mockEvents} />);
    const cards = document.querySelectorAll(".calendar-event-card");
    expect(cards).toHaveLength(2);
  });

  it("renders an empty list without crashing", () => {
    const { container } = render(<Calendar events={[]} />);
    expect(container.querySelector(".calendar-events")).toBeInTheDocument();
  });
});
