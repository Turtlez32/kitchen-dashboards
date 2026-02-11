"use client";

import { useState, useEffect } from "react";
import { Baloo_2, Varela_Round } from "next/font/google";
import Time from "@/components/time";
import Weather from "@/components/weather";
import Todos from "@/components/todos";
import Calendar from "@/components/calendar";

const baloo = Baloo_2({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-baloo",
});

const varela = Varela_Round({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-varela",
});

export default function CandyLandDashboard() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className={`dashboard-screen ${baloo.variable} ${varela.variable}`}>
      <div className="dashboard-grid">
        <div className={`candy-card candy-card--pink candy-card--centered candy-card-bounce ${mounted ? "candy-visible" : ""}`}>
          <Time />
        </div>

        <div className={`candy-card candy-card--blue candy-card--centered candy-card-bounce ${mounted ? "candy-visible" : ""}`}>
          <div className="member-badge">Andrew</div>
        </div>

        <div className={`candy-card candy-card--purple candy-card--centered candy-card-bounce ${mounted ? "candy-visible" : ""}`}>
          {/* <Weather /> */}
        </div>

        <div className={`candy-card candy-card--pink candy-card--centered candy-card-bounce ${mounted ? "candy-visible" : ""}`}>
          <Weather />
        </div>

        <div className={`candy-card candy-card--blue candy-card-bounce ${mounted ? "candy-visible" : ""}`}>
          <h2 className="card-heading">To-Do List</h2>
          <Todos />
        </div>

        <div className={`candy-card candy-card--purple candy-card-bounce ${mounted ? "candy-visible" : ""}`}>
          <Calendar />
        </div>
      </div>
    </div>
  );
}
