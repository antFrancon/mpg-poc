import { Platform } from 'react-native';

import { StatsApi } from '../API';

// ⚠️ TODO: Extract these constants into appropriate .env files
const apiEnv = {
  LOCALE: 'fr',
  PLATFORM: Platform.OS,
  BASE_SERVER_URL: 'https://api.monpetitgazon.com/',
};

export const statsClient = new StatsApi({
  environment: apiEnv,
});
