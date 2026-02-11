import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

// Mocked DB
interface Post {
  id: number;
  name: string;
}
const posts: Post[] = [
  {
    id: 1,
    name: "Hello World",
  },
];

export const postRouter = createTRPCRouter({  
  seating: publicProcedure
    .query(async () => {
      const today = new Date();
      const day = today.getDate();

      if (day % 2 === 0) {
        return "Harvey";
      } else {
        return "Andrew";
      }
  }),

  todos: publicProcedure
    .query(async () => {
      const res = await fetch("https://api.turtleware.au/api/todos");
      const data = (await res.json()) as {
        id: number;
        title: string;
        completed: boolean;
        dueDate: string | null;
        createdAt: string;
        updatedAt: string | null;
      }[];
      return data;
    }),

  calendar: publicProcedure
    .query(async () => {
      const res = await fetch("https://api.turtleware.au/api/calendar");
      const data = (await res.json()) as {
        count: number;
        events: {
          id: string;
          summary: string;
          start: string;
          end: string;
          status: string;
        }[];
      };
      return data.events;
    }),
});
