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

const mockTodos = [
  {
    id: 1,
    title: "Buy groceries",
    completed: false,
    dueDate: "2026-03-25T00:00:00.000Z",
    type: "groceries",
    assignedTo: "Matthew",
    createdAt: "2026-03-01T00:00:00.000Z",
    updatedAt: null,
  },
];

const mockCalendarResponse = {
  count: 1,
  events: [
    {
      id: "abc123",
      summary: "School pickup",
      start: "2026-03-21T15:00:00+11:00",
      end: "2026-03-21T15:30:00+11:00",
      status: "confirmed",
    },
  ],
};

beforeEach(() => {
  mock.restore();
});

describe("post.todos", () => {
  it("returns parsed todos from the API", async () => {
    spyOn(global, "fetch").mockResolvedValueOnce({
      ok: true,
      json: async () => mockTodos,
    } as Response);

    const caller = createCaller(makeContext());
    const result = await caller.post.todos();

    expect(result).toHaveLength(1);
    expect(result[0]).toMatchObject({ id: 1, title: "Buy groceries" });
  });

  it("sends x-api-key header", async () => {
    const fetchSpy = spyOn(global, "fetch").mockResolvedValueOnce({
      ok: true,
      json: async () => mockTodos,
    } as Response);

    const caller = createCaller(makeContext());
    await caller.post.todos();

    const [url, init] = fetchSpy.mock.calls[0]!;
    expect(url).toBe("https://test-api.example.com/api/todos");
    expect((init?.headers as Record<string, string>)["x-api-key"]).toBe("test-key-123");
  });

  it("throws when the API returns a non-ok response", async () => {
    spyOn(global, "fetch").mockResolvedValueOnce({
      ok: false,
      status: 401,
      statusText: "Unauthorized",
    } as Response);

    const caller = createCaller(makeContext());
    await expect(caller.post.todos()).rejects.toThrow();
  });
});

describe("post.calendar", () => {
  it("returns parsed calendar events from the API", async () => {
    spyOn(global, "fetch").mockResolvedValueOnce({
      ok: true,
      json: async () => mockCalendarResponse,
    } as Response);

    const caller = createCaller(makeContext());
    const result = await caller.post.calendar();

    expect(result).toHaveLength(1);
    expect(result[0]).toMatchObject({ id: "abc123", summary: "School pickup" });
  });

  it("sends x-api-key header to the calendar endpoint", async () => {
    const fetchSpy = spyOn(global, "fetch").mockResolvedValueOnce({
      ok: true,
      json: async () => mockCalendarResponse,
    } as Response);

    const caller = createCaller(makeContext());
    await caller.post.calendar();

    const [url, init] = fetchSpy.mock.calls[0]!;
    expect(url).toBe("https://test-api.example.com/api/calendar");
    expect((init?.headers as Record<string, string>)["x-api-key"]).toBe("test-key-123");
  });

  it("throws when the API returns a non-ok response", async () => {
    spyOn(global, "fetch").mockResolvedValueOnce({
      ok: false,
      status: 503,
      statusText: "Service Unavailable",
    } as Response);

    const caller = createCaller(makeContext());
    await expect(caller.post.calendar()).rejects.toThrow();
  });
});
