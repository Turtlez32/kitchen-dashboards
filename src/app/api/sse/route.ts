import { env } from "~/env";

export const dynamic = "force-dynamic";

export async function GET() {
  let upstream: Response;
  try {
    upstream = await fetch(`${env.API_BASE_URL}/events`, {
      headers: { "x-api-key": env.API_KEY },
    });
  } catch {
    return new Response("Failed to connect to SSE source", { status: 502 });
  }

  if (!upstream.ok || !upstream.body) {
    return new Response("SSE source unavailable", { status: 502 });
  }

  return new Response(upstream.body, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}
