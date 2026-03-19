import { describe, it, expect, spyOn, beforeEach } from "bun:test";
import { render, screen, act } from "@testing-library/react";
import DarkModeToggle from "@/components/dark-mode-toggle";

beforeEach(() => {
  document.documentElement.classList.remove("dark");
  localStorage.clear();
});

describe("DarkModeToggle", () => {
  it("renders a button", async () => {
    await act(async () => render(<DarkModeToggle />));
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("clicking toggles the dark class on <html>", async () => {
    await act(async () => render(<DarkModeToggle />));

    const button = screen.getByRole("button");
    const wasDark = document.documentElement.classList.contains("dark");

    await act(async () => button.click());

    expect(document.documentElement.classList.contains("dark")).toBe(!wasDark);
  });

  it("clicking twice returns to original state", async () => {
    await act(async () => render(<DarkModeToggle />));

    const button = screen.getByRole("button");
    const initial = document.documentElement.classList.contains("dark");

    await act(async () => button.click());
    await act(async () => button.click());

    expect(document.documentElement.classList.contains("dark")).toBe(initial);
  });

  it("shows sun emoji during dark hours (10 PM)", async () => {
    spyOn(Date.prototype, "getHours").mockReturnValue(22);

    await act(async () => render(<DarkModeToggle />));

    expect(screen.getByRole("button").textContent).toContain("☀️");
  });

  it("shows moon emoji outside dark hours (10 AM)", async () => {
    spyOn(Date.prototype, "getHours").mockReturnValue(10);

    await act(async () => render(<DarkModeToggle />));

    expect(screen.getByRole("button").textContent).toContain("🌙");
  });
});
