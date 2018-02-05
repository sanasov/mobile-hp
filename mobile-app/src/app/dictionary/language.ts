let toStringLocale = () => this.locale;

export let Language = {
  EN: {locale: "EN", native: "English", toString: toStringLocale}, // английский
  ES: {locale: "ES", native: "Español", toString: toStringLocale}, // испанский
  PT: {locale: "PT", native: "Portugues", toString: toStringLocale}, // португальский
  FR: {locale: "FR", native: "Français", toString: toStringLocale}, // французский
  DE: {locale: "DE", native: "Deutsch", toString: toStringLocale}, // немецкий
  JA: {locale: "JA", native: "日本", toString: toStringLocale}, // японский
  RU: {locale: "RU", native: "Русский", toString: toStringLocale} // русский
};
