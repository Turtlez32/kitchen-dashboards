import { env } from "~/env";

export const dynamic = "force-dynamic";

export async function GET() {
  const date = new Date().toISOString().split("T")[0];
  let upstream: Response;

  try {
    upstream = await fetch(`${env.API_BASE_URL}/dinner/${date}`, {
      headers: { "x-api-key": env.DINNER_API_KEY },
      cache: "no-store",
    });
  } catch {
    return new Response("Failed to connect to dinner API", { status: 502 });
  }

  if (!upstream.ok) {
    return new Response("Dinner API unavailable", { status: upstream.status });
  }

  const data = await upstream.json() as unknown;
  return Response.json(data);
}
