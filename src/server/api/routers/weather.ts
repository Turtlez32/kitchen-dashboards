import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

const CurrentWeatherSchema = z.object({
  id: z.number(),
  forecastType: z.string(),
  cityId: z.number(),
  cityName: z.string(),
  country: z.string(),
  lat: z.number(),
  lon: z.number(),
  observationDt: z.string(),
  temp: z.number(),
  feelsLike: z.number(),
  tempMin: z.number(),
  tempMax: z.number(),
  pressure: z.number(),
  humidity: z.number(),
  seaLevel: z.number(),
  grndLevel: z.number(),
  visibility: z.number(),
  windSpeed: z.number(),
  windDeg: z.number(),
  windGust: z.number().nullable(),
  cloudsPct: z.number(),
  weatherId: z.number(),
  weatherMain: z.string(),
  weatherDescription: z.string(),
  weatherIcon: z.string(),
  pop: z.string().nullable(),
  sunrise: z.string(),
  sunset: z.string(),
  insertedAt: z.string(),
});

const ForecastDetailsSchema = z.object({
  id: z.number(),
  forecastDate: z.string(),
  tempMin: z.number(),
  tempMax: z.number(),
  tempAvg: z.number(),
  humidityAvg: z.number(),
  conditions: z.array(z.string()),
  windMax: z.number(),
  popMax: z.number(),
  insertedAt: z.string(),
});

const ForecastResponseSchema = z.object({
  count: z.number(),
  forecast: z.array(ForecastDetailsSchema),
});

const WEATHER_BASE_URL = "https://api.turtleware.au/api/weather";

export const weatherRouter = createTRPCRouter({
  current: publicProcedure
    .query(async () => {
      let res: Response;
      try {
        res = await fetch(`${WEATHER_BASE_URL}/current`);
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to fetch current weather from external API",
          cause: error,
        });
      }

      if (!res.ok) {
        throw new TRPCError({
          code: "BAD_GATEWAY",
          message: `Weather API returned ${res.status} ${res.statusText}`,
        });
      }

      let responseBody: unknown;
      try {
        responseBody = await res.json();
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to parse JSON response from weather API",
          cause: error,
        });
      }

      try {
        const data = CurrentWeatherSchema.parse(responseBody);
        return data;
      } catch (error) {
        console.error("Current weather schema validation error:", error);
        console.error("Response body:", JSON.stringify(responseBody, null, 2));
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Weather API response did not match expected schema",
          cause: error,
        });
      }
    }),

  forecast: publicProcedure
    .query(async () => {
      let res: Response;
      try {
        res = await fetch(`${WEATHER_BASE_URL}/forecast`);
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to fetch weather forecast from external API",
          cause: error,
        });
      }

      if (!res.ok) {
        throw new TRPCError({
          code: "BAD_GATEWAY",
          message: `Forecast API returned ${res.status} ${res.statusText}`,
        });
      }

      let responseBody: unknown;
      try {
        responseBody = await res.json();
        if (typeof responseBody === "object" && responseBody !== null) {
          console.log("Response keys:", Object.keys(responseBody));
        }
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to parse JSON response from forecast API",
          cause: error,
        });
      }

      try {
        const data = ForecastResponseSchema.parse(responseBody);
        return data;
      } catch (error) {
        console.error("Schema validation failed:", error);
        if (error instanceof z.ZodError) {
          console.error("Validation errors:", JSON.stringify(error.issues, null, 2));
        }
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Forecast API response did not match expected schema",
          cause: error,
        });
      }
    }),
});
