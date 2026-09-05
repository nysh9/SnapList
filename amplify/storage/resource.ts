import { defineStorage } from '@aws-amplify/backend';
import { presignUpload } from '../functions/presign-upload/resource';

/**
 * S3 bucket for user-uploaded garment photos.
 *
 * Access is a placeholder for the anonymous MVP (guest read/write under
 * uploads/). Task 1.2 refines this: we add a `presignUpload` Lambda that mints
 * scoped, time-limited presigned PUT URLs and grant it access via
 * `allow.resource(presignUpload)` — so the browser uploads straight to S3 and
 * no server ever handles the image bytes.
 *
 * See learning.md module 1.6 (S3 + presigned URLs).
 */
export const storage = defineStorage({
  name: 'snaplistPhotos',
  access: (allow) => ({
    'uploads/{entity_id}/*': [
      allow.guest.to(['read', 'write']),
      allow.authenticated.to(['read', 'write']),
      // Grant the presign Lambda's EXECUTION ROLE write on uploads/* so it can
      // mint presigned PUT URLs. This is the "no keys in code" grant (0.2).
      allow.resource(presignUpload).to(['write']),
    ],
  }),
});
