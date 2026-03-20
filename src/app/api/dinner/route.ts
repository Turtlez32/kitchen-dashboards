import { env } from "~/env";

export async function GET() {
  const date = new Intl.DateTimeFormat("sv-SE", {
    timeZone: "Australia/Sydney",
  }).format(new Date());
  let upstream: Response;

  try {
    upstream = await fetch(`${env.API_BASE_URL}/dinner/${date}`, {
      headers: { "x-api-key": env.DINNER_API_KEY },
      next: { revalidate: 300 },
    });
  } catch {
    return new Response("Failed to connect to dinner API", { status: 502 });
  }

  if (!upstream.ok) {
    return new Response("Dinner API unavailable", { status: upstream.status });
  }

  const data = await upstream.json() as unknown;
  return Response.json(data, {
    headers: { "Cache-Control": "s-maxage=300, stale-while-revalidate=60" },
  });
}
