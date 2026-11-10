export async function GET() {
  const username = process.env.TURN_USERNAME;
  const credential = process.env.TURN_CREDENTIAL;
  const urls = [
    process.env.TURN_URL_UDP,
    process.env.TURN_URL_TCP,
    "turn:global.relay.metered.ca:443",
    process.env.TURN_URL_TLS,
    "turn:global.relay.metered.ca:443",
  ].filter((url): url is string => Boolean(url));

  return Response.json({
    iceServers: [
      { urls: process.env.TURN_STUN_URL ?? "stun:stun.l.google.com:19302" },
      ...(username && credential && urls.length ? [{ urls, username, credential }] : []),
      { urls: "stun:stun.l.google.com:19302" },
    ],
  }, { headers: { "Cache-Control": "no-store" } });
}
