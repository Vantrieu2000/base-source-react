import { createIntl, createIntlCache, IntlConfig } from 'react-intl';

let intl: any;

export const setLanguage = (config: IntlConfig) => {
  const cache = createIntlCache();
  intl = createIntl(config, cache);
}

export const formatMsg = (msg : any, context?: any) => {
  const result = intl?.formatMessage(msg, context);
  return result;
}
