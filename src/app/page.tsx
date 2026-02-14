//import { useState, useEffect } from "react";
import { Baloo_2, Varela_Round } from "next/font/google";
import Time from "@/components/time";
import Weather from "@/components/weather";
import Todos from "@/components/todos";
import Calendar from "@/components/calendar";
import { api ,HydrateClient } from "~/trpc/server";

// Force dynamic rendering to prevent caching and ensure fresh data on each request
export const dynamic = 'force-dynamic';

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

export default async function Home() {
  const calendar = await api.post.calendar();
  const todo = await api.post.todos();
  const seating = await api.post.seating();

  return (
    <HydrateClient>
    <div className={`dashboard-screen ${baloo.variable} ${varela.variable}`}>
      <div className="dashboard-grid">
        <div className={`candy-card candy-card--pink candy-card--centered candy-card-bounce candy-visible`}>
          <Time />
        </div>

        <div className={`candy-card candy-card--blue candy-card--centered candy-card-bounce candy-visible`}>
          <div className="member-badge">{seating}</div>
        </div>

        <div className={`candy-card candy-card--purple candy-card--centered candy-card-bounce candy-visible`}>
          {/* <Weather /> */}
        </div>

        <div className={`candy-card candy-card--pink candy-card--centered candy-card-bounce candy-visible`}>
          <Weather />
        </div>

        <div className={`candy-card candy-card--blue candy-card-bounce candy-visible`}>
          <h2 className="card-heading">To-Do List</h2>
          <Todos todos={todo} />
        </div>

        <div className={`candy-card candy-card--purple candy-card-bounce candy-visible`}>
          <Calendar events={calendar} />
        </div>
      </div>
    </div>
    </HydrateClient>
  );
}
