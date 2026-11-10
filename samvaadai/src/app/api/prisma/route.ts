export async function POST(request: Request) {
  const endpoint = process.env.GNANI_PRISMA_URL;
  if (!process.env.GNANI_API_KEY || !endpoint) {
    return Response.json({ error: "Gnani Prisma is not configured for this deployment." }, { status: 503 });
  }

  const form = await request.formData().catch(() => null);
  const audio = form?.get("audio");
  if (!(audio instanceof File) || audio.size === 0 || audio.size > 10_000_000) {
    return Response.json({ error: "Send an audio recording up to 10 MB." }, { status: 400 });
  }

  // The endpoint is configured per Gnani account so the app never guesses an API contract.
  const upstream = new FormData();
  upstream.set("audio", audio, "speech.webm");
  upstream.set("language", String(form?.get("language") || "en-IN"));
  const response = await fetch(endpoint, {
    method: "POST",
    headers: { Authorization: `Bearer ${process.env.GNANI_API_KEY}` },
    body: upstream,
  });
  const body = await response.text();
  if (!response.ok) return Response.json({ error: "Gnani Prisma did not transcribe this recording." }, { status: response.status });
  try { return Response.json(JSON.parse(body), { headers: { "Cache-Control": "no-store" } }); }
  catch { return Response.json({ text: body }, { headers: { "Cache-Control": "no-store" } }); }
}
