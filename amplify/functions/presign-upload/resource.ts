import { defineFunction } from '@aws-amplify/backend';

/**
 * presignUpload — mints short-lived, scoped presigned PUT URLs so the browser
 * uploads photos DIRECTLY to S3. The image bytes never pass through this Lambda
 * or any server (see learning.md 1.6: cost, Lambda payload limits, scalability).
 *
 * How it gets permission to touch S3 (learning.md 0.2 — the interview question):
 * it does NOT hold access keys. Amplify gives it an EXECUTION ROLE, and
 * `storage/resource.ts` grants that role `write` on `uploads/*` via
 * `allow.resource(presignUpload)`. No secrets in code.
 *
 * BUCKET_NAME is injected at deploy time in backend.ts (the bucket name isn't
 * known until CloudFormation creates it).
 *
 * Task 1.2. Invocation path (Function URL vs API Gateway) is wired in backend.ts.
 */
export const presignUpload = defineFunction({
  name: 'presign-upload',
  entry: './handler.ts',
  timeoutSeconds: 15,
  memoryMB: 256,
});
