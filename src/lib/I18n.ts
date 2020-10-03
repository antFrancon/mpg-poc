import I18n from 'i18n-js';
import { I18nManager } from 'react-native';

import { fr } from '../translations';

I18n.translations = {
  fr,
};

I18n.locale = 'fr';
I18nManager.forceRTL(false);

export { I18n };
