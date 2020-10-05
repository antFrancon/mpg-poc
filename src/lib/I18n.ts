import I18n from 'i18n-js';
import { I18nManager } from 'react-native';

import { fr } from '../translations';

I18n.translations = {
  fr,
};

I18n.locale = 'fr';
I18nManager.forceRTL(false);

const getFormattedNumber = (numberToFormat: number, precision = 1) => {
  const locale = I18n.currentLocale();

  return I18n.toNumber(numberToFormat, {
    precision,
    separator: locale === 'fr' ? ',' : '.',
  });
};

const getFormattedPercentage = (percentage: number) => {
  return `${Math.round(percentage * 100 * 100) / 100}%`;
};

export { I18n, getFormattedNumber, getFormattedPercentage };
