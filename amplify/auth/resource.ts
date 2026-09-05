import { defineAuth } from '@aws-amplify/backend';

/**
 * Cognito identity backbone.
 *
 * The MVP is ANONYMOUS — we are not forcing login yet. This resource mainly
 * provisions the identity pool (incl. a guest/unauthenticated role) that S3
 * storage access rules hang off of. Real sign-in (the resume's "Cognito"
 * bullet) is a later task — don't claim it until it's actually wired up.
 *
 * See learning.md module 2.3.
 */
export const auth = defineAuth({
  loginWith: {
    email: true,
  },
});
