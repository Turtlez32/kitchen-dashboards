import { describe, it, expect, mock, spyOn, beforeEach } from "bun:test";
import { createCaller } from "~/server/api/root";

mock.module("~/env", () => ({
  env: {
    API_BASE_URL: "https://test-api.example.com/api",
    API_KEY: "test-key-123",
    NODE_ENV: "test",
  },
}));

const makeContext = () => ({ headers: new Headers() });

const mockCurrentWeather = {
  id: 1,
  forecastType: "current",
  cityId: 1,
  cityName: "Sydney",
  country: "AU",
  lat: -33.87,
  lon: 151.21,
  observationDt: "2026-03-20T10:00:00Z",
  temp: 22.5,
  feelsLike: 21.0,
  tempMin: 18.0,
  tempMax: 25.0,
  pressure: 1013,
  humidity: 65,
  seaLevel: 1013,
  grndLevel: 1010,
  visibility: 10000,
  windSpeed: 15.0,
  windDeg: 180,
  windGust: null,
  cloudsPct: 20,
  weatherId: 800,
  weatherMain: "Clear",
  weatherDescription: "clear sky",
  weatherIcon: "01d",
  pop: null,
  sunrise: "2026-03-20T06:00:00Z",
  sunset: "2026-03-20T18:00:00Z",
  insertedAt: "2026-03-20T10:00:00Z",
};

const mockForecastResponse = {
  count: 1,
  forecast: [
    {
      id: 1,
      forecastDate: "2026-03-21",
      tempMin: 17.0,
      tempMax: 24.0,
      tempAvg: 20.5,
      humidityAvg: 60,
      conditions: ["Clear"],
      windMax: 20.0,
      popMax: 0,
      insertedAt: "2026-03-20T10:00:00Z",
    },
  ],
};

beforeEach(() => {
  mock.restore();
});

describe("weather.current", () => {
  it("returns parsed current weather from the API", async () => {
    spyOn(global, "fetch").mockResolvedValueOnce({
      ok: true,
      json: async () => mockCurrentWeather,
    } as Response);

    const caller = createCaller(makeContext());
    const result = await caller.weather.current();

    expect(result.cityName).toBe("Sydney");
    expect(result.temp).toBe(22.5);
    expect(result.weatherIcon).toBe("01d");
  });

  it("sends x-api-key header to the weather/current endpoint", async () => {
    const fetchSpy = spyOn(global, "fetch").mockResolvedValueOnce({
      ok: true,
      json: async () => mockCurrentWeather,
    } as Response);

    const caller = createCaller(makeContext());
    await caller.weather.current();

    const [url, init] = fetchSpy.mock.calls[0]!;
    expect(url).toBe("https://test-api.example.com/api/weather/current");
    expect((init?.headers as Record<string, string>)["x-api-key"]).toBe("test-key-123");
  });

  it("throws when the API returns a non-ok response", async () => {
    spyOn(global, "fetch").mockResolvedValueOnce({
      ok: false,
      status: 500,
      statusText: "Internal Server Error",
    } as Response);

    const caller = createCaller(makeContext());
    await expect(caller.weather.current()).rejects.toThrow();
  });
});

describe("weather.forecast", () => {
  it("returns parsed forecast data from the API", async () => {
    spyOn(global, "fetch").mockResolvedValueOnce({
      ok: true,
      json: async () => mockForecastResponse,
    } as Response);

    const caller = createCaller(makeContext());
    const result = await caller.weather.forecast();

    expect(result.count).toBe(1);
    expect(result.forecast[0]).toMatchObject({ tempMax: 24.0, conditions: ["Clear"] });
  });

  it("sends x-api-key header to the weather/forecast endpoint", async () => {
    const fetchSpy = spyOn(global, "fetch").mockResolvedValueOnce({
      ok: true,
      json: async () => mockForecastResponse,
    } as Response);

    const caller = createCaller(makeContext());
    await caller.weather.forecast();

    const [url, init] = fetchSpy.mock.calls[0]!;
    expect(url).toBe("https://test-api.example.com/api/weather/forecast");
    expect((init?.headers as Record<string, string>)["x-api-key"]).toBe("test-key-123");
  });
});
