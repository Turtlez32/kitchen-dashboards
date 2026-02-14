import { z } from "zod";
import { TRPCError } from "@trpc/server";
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

const TodoSchema = z.object({
  id: z.number(),
  title: z.string(),
  completed: z.boolean(),
  dueDate: z.string().nullable(),
  type: z.string().nullable(),
  assignedTo: z.string().nullable(),
  createdAt: z.string(),
  updatedAt: z.string().nullable(),
});

const CalendarEventSchema = z.object({
  id: z.string(),
  summary: z.string(),
  start: z.string(),
  end: z.string(),
  status: z.string(),
});

const CalendarResponseSchema = z.object({
  count: z.number(),
  events: z.array(CalendarEventSchema),
});

const TodoResponseSchema = z.array(TodoSchema);

export const postRouter = createTRPCRouter({
  seating: publicProcedure
    .query(async () => {
      // Get current date in Australia/Sydney timezone
      const today = new Date();
      const formatter = new Intl.DateTimeFormat('en-AU', {
        timeZone: 'Australia/Sydney',
        day: 'numeric'
      });
      const day = parseInt(formatter.format(today), 10);

      if (day % 2 === 0) {
        return "Andrew";
      } else {
        return "Harvey";
      }
  }),

  todos: publicProcedure
    .query(async () => {
      let res: Response;
      try {
        res = await fetch("https://api.turtleware.au/api/todos");
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to fetch todos from external API",
          cause: error,
        });
      }

      if (!res.ok) {
        throw new TRPCError({
          code: "BAD_GATEWAY",
          message: `Todos API returned ${res.status} ${res.statusText}`,
        });
      }

      let responseBody: unknown;
      try {
        responseBody = await res.json();
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to parse JSON response from todos API",
          cause: error,
        });
      }

      try {
        const data = TodoResponseSchema.parse(responseBody);
        return data;
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Todos API response did not match expected schema",
          cause: error,
        });
      }
    }),

  calendar: publicProcedure
    .query(async () => {
      let res: Response;
      try {
        res = await fetch("https://api.turtleware.au/api/calendar");
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to fetch calendar from external API",
          cause: error,
        });
      }

      if (!res.ok) {
        throw new TRPCError({
          code: "BAD_GATEWAY",
          message: `Calendar API returned ${res.status} ${res.statusText}`,
        });
      }

      let responseBody: unknown;
      try {
        responseBody = await res.json();
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to parse JSON response from calendar API",
          cause: error,
        });
      }

      try {
        const data = CalendarResponseSchema.parse(responseBody);
        return data.events;
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Calendar API response did not match expected schema",
          cause: error,
        });
      }
    }),
});
