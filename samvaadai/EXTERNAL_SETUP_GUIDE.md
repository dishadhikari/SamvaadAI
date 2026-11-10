# External setup guide

## TURN

Set `TURN_USERNAME`, `TURN_CREDENTIAL` and the listed Metered URLs in `.env.local`. The `/api/ice` response is intentionally non-cacheable because it returns credentials to the authenticated call client at connection time. For public production, use expiring TURN credentials and restrict the endpoint with application authentication.

## Gnani Prisma and Timbre

The API key is held only in the Node runtime as `GNANI_API_KEY`. Add the official account-specific URLs delivered by Gnani:

- `GNANI_PRISMA_URL`: accepts a multipart `audio` file and `language`, returns JSON with transcription content.
- `GNANI_TIMBRE_URL`: accepts JSON containing `text`, `language`, and `voice`, returns audio bytes.

The server sends the key as a bearer token and does not forward it to the browser. Exact models, voice identifiers, request fields and response shapes must match the product access provisioned to the account; configure adapters accordingly if Gnani supplies a different contract.

## ISL model

MediaPipe Hand Landmarker runs from an official hosted model asset and exposes actual webcam landmarks. Add reviewed ISL dataset/model weights only after evaluating their vocabulary, signer diversity, licensing and community review. The UI intentionally requires user edits and explicit approval, even after a classifier is added.

## Deploy

Use a Node host that supports the custom `server.ts` and WebSocket upgrades. Serverless platforms that do not preserve Socket.IO connections need a separate signaling service. Serve over HTTPS: browsers permit camera and microphone access only in secure contexts (except localhost).
