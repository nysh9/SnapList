import { defineBackend } from '@aws-amplify/backend';
import { FunctionUrlAuthType, HttpMethod } from 'aws-cdk-lib/aws-lambda';
import { auth } from './auth/resource';
import { storage } from './storage/resource';
import { presignUpload } from './functions/presign-upload/resource';

/**
 * SnapList backend (Amplify Gen 2).
 *
 * `defineBackend` is the root of the app — everything below it compiles
 * down to CDK -> CloudFormation -> real AWS resources (see learning.md L0.4).
 *
 * Resources:
 *   - auth          : Cognito identity backbone (login comes later; MVP is anonymous)
 *   - storage       : S3 bucket for uploaded photos
 *   - presignUpload : Lambda that mints presigned S3 PUT URLs -> task 1.2
 *   - (next) extractAttributes fn (Bedrock vision) -> task 1.3
 */
const backend = defineBackend({
  auth,
  storage,
  presignUpload,
});

// The bucket name isn't known until CloudFormation creates it, so inject it as
// an env var into the function at synth time (learning.md 1.1 — Lambda env vars).
backend.presignUpload.addEnvironment(
  'BUCKET_NAME',
  backend.storage.resources.bucket.bucketName,
);

// MVP invocation path: a public Lambda Function URL (no API Gateway yet — that
// comes with the async orchestration in task 2.6). AuthType.NONE = anonymous,
// which matches the anonymous MVP; abuse throttling is task 3.3.
const presignUrl = backend.presignUpload.resources.lambda.addFunctionUrl({
  authType: FunctionUrlAuthType.NONE,
  cors: {
    allowedOrigins: ['*'], // tighten to the real domain at deploy (3.5)
    allowedMethods: [HttpMethod.POST],
    allowedHeaders: ['content-type'],
  },
});

// Publish the URL into amplify_outputs.json so the frontend can read it.
backend.addOutput({
  custom: {
    presignUploadUrl: presignUrl.url,
  },
});
