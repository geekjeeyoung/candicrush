import memoize from 'lodash.memoize';
import {I18nManager} from 'react-native';
import i18n from 'i18n-js';
import * as RNLocalize from 'react-native-localize';

export const translationGetters = {
  // lazy requires coz metro bundler doesn't support symlinks
  kr: () => require('../../Translations/kr.json'),
};

export const Localized = memoize(
  (key, config) =>
    i18n.t(key, config).includes('missing') ? key : i18n.t(key, config),
  (key, config) => (config ? key + JSON.stringify(config) : key),
);

export const setI18nConfig = () => {
  const fallback = {languageTag: 'en', isRTL: false};

  const {languageTag, isRTL} =
    RNLocalize.findBestAvailableLanguage(Object.keys(translationGetters)) ||
    fallback;

  Localized.cache.clear();
  I18nManager.forceRTL(isRTL);
  i18n.translations = {[languageTag]: translationGetters[languageTag]()};
  i18n.locale = languageTag;
};
