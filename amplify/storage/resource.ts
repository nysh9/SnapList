import { defineStorage } from '@aws-amplify/backend';

export const storage = defineStorage({
  name: 'snaplistPhotos',
  access: (allow) => ({
    'uploads/{entity_id}/*': [
      allow.guest.to(['read', 'write']),
      allow.authenticated.to(['read', 'write']),
    ],
  }),
});
