import { Platform } from 'react-native';

import { StatsApi } from '../API';

import { I18n } from './I18n';

// ⚠️ TODO: Extract these constants into appropriate .env files
const apiEnv = {
  LOCALE: I18n.currentLocale(),
  PLATFORM: Platform.OS,
  BASE_SERVER_URL: 'https://api.monpetitgazon.com/',
};

export const statsClient = new StatsApi({
  environment: apiEnv,
});
