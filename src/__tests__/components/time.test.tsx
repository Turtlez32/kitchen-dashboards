import { describe, it, expect, mock } from "bun:test";
import { render, screen } from "@testing-library/react";
import Time from "@/components/time";

mock.module("@/lib/use-clock", () => ({
  useClock: () => ({
    time: "10:30",
    ampm: "AM",
    dateStr: "Friday, 21 Mar 2026",
  }),
}));

describe("Time", () => {
  it("renders the time", () => {
    render(<Time />);
    expect(screen.getByText(/10:30/)).toBeInTheDocument();
  });

  it("renders AM/PM", () => {
    render(<Time />);
    expect(screen.getByText("AM")).toBeInTheDocument();
  });

  it("renders the date string", () => {
    render(<Time />);
    expect(screen.getByText("Friday, 21 Mar 2026")).toBeInTheDocument();
  });
});
