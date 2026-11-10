const languagePattern = /^(en-IN|hi|bn|ta|te|mr|gu|kn|ml|pa)$/;

export async function POST(request: Request) {
  const { text, language = "en-IN", voice = "Yashvi" } = await request.json().catch(() => ({}));
  if (typeof text !== "string" || !text.trim() || text.length > 1000) return Response.json({ error: "Provide text up to 1,000 characters." }, { status: 400 });
  if (typeof language !== "string" || !languagePattern.test(language)) return Response.json({ error: "Unsupported language." }, { status: 400 });
  const endpoint = process.env.GNANI_TIMBRE_URL;
  if (!process.env.GNANI_API_KEY || !endpoint) return Response.json({ error: "Gnani Timbre is not configured for this deployment." }, { status: 503 });
  const response = await fetch(endpoint, {
    method: "POST",
    headers: { Authorization: `Bearer ${process.env.GNANI_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({ language, voice, text: text.trim() }),
  });
  if (!response.ok) return Response.json({ error: "Gnani Timbre could not generate audio." }, { status: response.status });
  return new Response(response.body, { headers: { "Content-Type": response.headers.get("content-type") ?? "audio/wav", "Cache-Control": "no-store" } });
}
