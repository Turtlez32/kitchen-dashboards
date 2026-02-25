"use client";
import { useEffect, useState } from "react";

const DARK_START = 21; // 9 PM
const DARK_END = 6;    // 6 AM

function scheduledDark(): boolean {
  const hour = new Date().getHours();
  return hour >= DARK_START || hour < DARK_END;
}

function applyDark(dark: boolean) {
  document.documentElement.classList.toggle("dark", dark);
}

export default function DarkModeToggle() {
  const [dark, setDark] = useState<boolean>(false);

  useEffect(() => {
    // Apply on mount
    const initial = scheduledDark();
    applyDark(initial);
    setDark(initial);

    // Re-check every minute so the switch happens automatically at 9pm / 6am
    const timer = setInterval(() => {
      const scheduled = scheduledDark();
      applyDark(scheduled);
      setDark(scheduled);
    }, 60 * 1000);

    return () => clearInterval(timer);
  }, []);

  // Manual toggle overrides until the next minute tick corrects it
  function toggle() {
    const next = !dark;
    setDark(next);
    applyDark(next);
  }

  return (
    <button type="button" className="dark-mode-toggle" onClick={toggle} aria-label="Toggle dark mode">
      {dark ? "☀️" : "🌙"}
    </button>
  );
}
