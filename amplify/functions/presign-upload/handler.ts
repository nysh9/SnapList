import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { randomUUID } from 'node:crypto';

/**
 * Mints a presigned PUT URL for ONE photo, scoped to a single object key and the
 * PUT method, expiring in 5 minutes. The browser then PUTs the file bytes
 * straight to S3 at that URL — this function never sees the image.
 *
 * Contract (MVP, anonymous — no auth yet):
 *   Request  (JSON body): { "contentType": "image/jpeg", "sessionId"?: "..." }
 *   Response (JSON):      { "uploadUrl": "...", "key": "uploads/<sess>/<uuid>.jpg", "expiresIn": 300 }
 *
 * `sessionId` groups a user's 1–3 photos under one prefix. The client passes a
 * value it generated (a random id kept for the session); if absent we mint one.
 * It maps to the {entity_id} segment in storage/resource.ts.
 */

const BUCKET_NAME = process.env.BUCKET_NAME;
const URL_TTL_SECONDS = 300; // 5 min — long enough to upload, short enough to be safe

// Only allow the image types we actually accept. Keeps the presigned URL from
// being usable to drop arbitrary content into the bucket.
const ALLOWED_CONTENT_TYPES: Record<string, string> = {
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
  'image/heic': 'heic',
};

// One client per container (reused across warm invocations).
const s3 = new S3Client({});

type PresignRequest = {
  contentType?: string;
  sessionId?: string;
};

function json(statusCode: number, body: unknown) {
  return {
    statusCode,
    headers: {
      'content-type': 'application/json',
      // CORS — the browser calls this cross-origin from the static site.
      // Tighten allowed origin to the real domain once hosting is set up (3.5).
      'access-control-allow-origin': '*',
      'access-control-allow-methods': 'POST,OPTIONS',
      'access-control-allow-headers': 'content-type',
    },
    body: JSON.stringify(body),
  };
}

/**
 * Handler is written against the Lambda Function URL event shape (a body string
 * we JSON.parse). If we later front this with API Gateway (task 2.6), the event
 * still carries `.body`, so this keeps working.
 */
export const handler = async (event: { body?: string; requestContext?: unknown }) => {
  if (!BUCKET_NAME) {
    // Misconfiguration, not a client error — surfaces loudly in CloudWatch.
    console.error('BUCKET_NAME env var is not set');
    return json(500, { error: 'server_misconfigured' });
  }

  let req: PresignRequest;
  try {
    req = event.body ? (JSON.parse(event.body) as PresignRequest) : {};
  } catch {
    return json(400, { error: 'invalid_json' });
  }

  const contentType = req.contentType;
  if (!contentType || !(contentType in ALLOWED_CONTENT_TYPES)) {
    return json(400, {
      error: 'unsupported_content_type',
      allowed: Object.keys(ALLOWED_CONTENT_TYPES),
    });
  }

  // Sanitize the client-supplied sessionId to a safe key segment; mint one if absent.
  const sessionId = sanitizeSegment(req.sessionId) ?? randomUUID();
  const ext = ALLOWED_CONTENT_TYPES[contentType];
  const key = `uploads/${sessionId}/${randomUUID()}.${ext}`;

  try {
    const command = new PutObjectCommand({
      Bucket: BUCKET_NAME,
      Key: key,
      ContentType: contentType,
    });
    // The presigned URL encodes: this bucket, this exact key, the PUT method,
    // this content-type, and a 5-min expiry — and nothing else.
    const uploadUrl = await getSignedUrl(s3, command, { expiresIn: URL_TTL_SECONDS });

    return json(200, { uploadUrl, key, sessionId, expiresIn: URL_TTL_SECONDS });
  } catch (err) {
    console.error('failed to presign', err);
    return json(500, { error: 'presign_failed' });
  }
};

/** Allow only characters safe in an S3 key segment; reject anything weird. */
function sanitizeSegment(value: string | undefined): string | null {
  if (!value) return null;
  const cleaned = value.replace(/[^a-zA-Z0-9-_]/g, '');
  return cleaned.length >= 8 && cleaned.length <= 64 ? cleaned : null;
}
