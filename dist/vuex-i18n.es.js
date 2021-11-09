const i18nVuexModule = {
  namespaced: true,
  state: {
    locale: null,
    fallback: null,
    translations: {}
  },
  mutations: {
    SET_LOCALE(state, payload) {
      state.locale = payload.locale;
    },
    ADD_LOCALE(state, payload) {
      var translations = flattenTranslations(payload.translations);
      if (state.translations.hasOwnProperty(payload.locale)) {
        let existingTranslations = state.translations[payload.locale];
        state.translations[payload.locale] = Object.assign({}, existingTranslations, translations);
      } else {
        state.translations[payload.locale] = translations;
      }
      try {
        if (state.translations.__ob__) {
          state.translations.__ob__.dep.notify();
        }
      } catch (ex) {
      }
    },
    REPLACE_LOCALE(state, payload) {
      var translations = flattenTranslations(payload.translations);
      state.translations[payload.locale] = translations;
      try {
        if (state.translations.__ob__) {
          state.translations.__ob__.dep.notify();
        }
      } catch (ex) {
      }
    },
    REMOVE_LOCALE(state, payload) {
      if (state.translations.hasOwnProperty(payload.locale)) {
        if (state.locale === payload.locale) {
          state.locale = null;
        }
        let translationCopy = Object.assign({}, state.translations);
        delete translationCopy[payload.locale];
        state.translations = translationCopy;
      }
    },
    SET_FALLBACK_LOCALE(state, payload) {
      state.fallback = payload.locale;
    }
  },
  actions: {
    setLocale(context, payload) {
      context.commit({
        type: "SET_LOCALE",
        locale: payload.locale
      });
    },
    addLocale(context, payload) {
      context.commit({
        type: "ADD_LOCALE",
        locale: payload.locale,
        translations: payload.translations
      });
    },
    replaceLocale(context, payload) {
      context.commit({
        type: "REPLACE_LOCALE",
        locale: payload.locale,
        translations: payload.translations
      });
    },
    removeLocale(context, payload) {
      context.commit({
        type: "REMOVE_LOCALE",
        locale: payload.locale,
        translations: payload.translations
      });
    },
    setFallbackLocale(context, payload) {
      context.commit({
        type: "SET_FALLBACK_LOCALE",
        locale: payload.locale
      });
    }
  }
};
const flattenTranslations = function flattenTranslations2(translations) {
  let toReturn = {};
  for (let i in translations) {
    if (!translations.hasOwnProperty(i)) {
      continue;
    }
    let objType = typeof translations[i];
    if (isArray$1(translations[i])) {
      let count = translations[i].length;
      for (let index2 = 0; index2 < count; index2++) {
        let itemType = typeof translations[i][index2];
        if (itemType !== "string") {
          console.warn("i18n:", "currently only arrays of strings are fully supported", translations[i]);
          break;
        }
      }
      toReturn[i] = translations[i];
    } else if (objType == "object" && objType !== null) {
      let flatObject = flattenTranslations2(translations[i]);
      for (let x in flatObject) {
        if (!flatObject.hasOwnProperty(x))
          continue;
        toReturn[i + "." + x] = flatObject[x];
      }
    } else {
      toReturn[i] = translations[i];
    }
  }
  return toReturn;
};
function isArray$1(obj) {
  return !!obj && Array === obj.constructor;
}
var plurals = {
  getTranslationIndex: function(languageCode, n) {
    switch (languageCode) {
      case "ay":
      case "bo":
      case "cgg":
      case "dz":
      case "fa":
      case "id":
      case "ja":
      case "jbo":
      case "ka":
      case "kk":
      case "km":
      case "ko":
      case "ky":
      case "lo":
      case "ms":
      case "my":
      case "sah":
      case "su":
      case "th":
      case "tt":
      case "ug":
      case "vi":
      case "wo":
      case "zh":
        return 0;
      case "is":
        return n % 10 !== 1 || n % 100 === 11 ? 1 : 0;
      case "jv":
        return n !== 0 ? 1 : 0;
      case "mk":
        return n === 1 || n % 10 === 1 ? 0 : 1;
      case "ach":
      case "ak":
      case "am":
      case "arn":
      case "br":
      case "fil":
      case "fr":
      case "gun":
      case "ln":
      case "mfe":
      case "mg":
      case "mi":
      case "oc":
      case "pt_BR":
      case "tg":
      case "ti":
      case "tr":
      case "uz":
      case "wa":
      case "zh":
        return n > 1 ? 1 : 0;
      case "lv":
        return n % 10 === 1 && n % 100 !== 11 ? 0 : n !== 0 ? 1 : 2;
      case "lt":
        return n % 10 === 1 && n % 100 !== 11 ? 0 : n % 10 >= 2 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2;
      case "be":
      case "bs":
      case "hr":
      case "ru":
      case "sr":
      case "uk":
        return n % 10 === 1 && n % 100 !== 11 ? 0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2;
      case "mnk":
        return n === 0 ? 0 : n === 1 ? 1 : 2;
      case "ro":
        return n === 1 ? 0 : n === 0 || n % 100 > 0 && n % 100 < 20 ? 1 : 2;
      case "pl":
        return n === 1 ? 0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2;
      case "cs":
      case "sk":
        return n === 1 ? 0 : n >= 2 && n <= 4 ? 1 : 2;
      case "csb":
        return n === 1 ? 0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2;
      case "sl":
        return n % 100 === 1 ? 0 : n % 100 === 2 ? 1 : n % 100 === 3 || n % 100 === 4 ? 2 : 3;
      case "mt":
        return n === 1 ? 0 : n === 0 || n % 100 > 1 && n % 100 < 11 ? 1 : n % 100 > 10 && n % 100 < 20 ? 2 : 3;
      case "gd":
        return n === 1 || n === 11 ? 0 : n === 2 || n === 12 ? 1 : n > 2 && n < 20 ? 2 : 3;
      case "cy":
        return n === 1 ? 0 : n === 2 ? 1 : n !== 8 && n !== 11 ? 2 : 3;
      case "kw":
        return n === 1 ? 0 : n === 2 ? 1 : n === 3 ? 2 : 3;
      case "ga":
        return n === 1 ? 0 : n === 2 ? 1 : n > 2 && n < 7 ? 2 : n > 6 && n < 11 ? 3 : 4;
      case "ar":
        return n === 0 ? 0 : n === 1 ? 1 : n === 2 ? 2 : n % 100 >= 3 && n % 100 <= 10 ? 3 : n % 100 >= 11 ? 4 : 5;
      default:
        return n !== 1 ? 1 : 0;
    }
  }
};
let VuexI18nPlugin = {};
VuexI18nPlugin.install = function install(Vue, store, config) {
  if (typeof arguments[2] === "string" || typeof arguments[3] === "string") {
    console.warn("i18n: Registering the plugin vuex-i18n with a string for `moduleName` or `identifiers` is deprecated. Use a configuration object instead.", "https://github.com/dkfbasel/vuex-i18n#setup");
    config = {
      moduleName: arguments[2],
      identifiers: arguments[3]
    };
  }
  config = Object.assign({
    warnings: true,
    moduleName: "i18n",
    identifiers: ["{", "}"],
    preserveState: false,
    translateFilterName: "translate",
    translateInFilterName: "translateIn",
    onTranslationNotFound: function() {
    }
  }, config);
  const moduleName = config.moduleName;
  const identifiers = config.identifiers;
  const translateFilterName = config.translateFilterName;
  const translateInFilterName = config.translateInFilterName;
  let onTranslationNotFound = config.onTranslationNotFound;
  if (typeof onTranslationNotFound !== "function") {
    console.error("i18n: i18n config option onTranslationNotFound must be a function");
    onTranslationNotFound = function() {
    };
  }
  store.registerModule(moduleName, i18nVuexModule, {
    preserveState: config.preserveState
  });
  if (store.state.hasOwnProperty(moduleName) === false) {
    console.error("i18n: i18n vuex module is not correctly initialized. Please check the module name:", moduleName);
    Vue.prototype.$i18n = function(key) {
      return key;
    };
    Vue.prototype.$getLanguage = function() {
      return null;
    };
    Vue.prototype.$setLanguage = function() {
      console.error("i18n: i18n vuex module is not correctly initialized");
    };
    return;
  }
  let render = renderFn(identifiers, config.warnings);
  let translate = function $t() {
    let locale = store.state[moduleName].locale;
    return translateInLanguage(locale, ...arguments);
  };
  let translateInLanguage = function translateInLanguage2(locale) {
    let args = arguments;
    let key = "";
    let defaultValue = "";
    let options = {};
    let pluralization = null;
    let count = args.length;
    if (count >= 3 && typeof args[2] === "string") {
      key = args[1];
      defaultValue = args[2];
      if (count > 3) {
        options = args[3];
      }
      if (count > 4) {
        pluralization = args[4];
      }
    } else {
      key = args[1];
      defaultValue = key;
      if (count > 2) {
        options = args[2];
      }
      if (count > 3) {
        pluralization = args[3];
      }
    }
    if (!locale) {
      if (config.warnings)
        console.warn("i18n: i18n locale is not set when trying to access translations:", key);
      return defaultValue;
    }
    let translations = store.state[moduleName].translations;
    let fallback = store.state[moduleName].fallback;
    let localeRegional = locale.split("-");
    let translationExists = true;
    if (translations.hasOwnProperty(locale) === false) {
      translationExists = false;
    } else if (translations[locale].hasOwnProperty(key) === false) {
      translationExists = false;
    }
    if (translationExists === true) {
      return render(locale, translations[locale][key], options, pluralization);
    }
    if (localeRegional.length > 1 && translations.hasOwnProperty(localeRegional[0]) === true && translations[localeRegional[0]].hasOwnProperty(key) === true) {
      return render(localeRegional[0], translations[localeRegional[0]][key], options, pluralization);
    }
    let asyncTranslation = onTranslationNotFound(locale, key, defaultValue);
    if (asyncTranslation) {
      Promise.resolve(asyncTranslation).then((value) => {
        let additionalTranslations = {};
        additionalTranslations[key] = value;
        addLocale(locale, additionalTranslations);
      });
    }
    if (translations.hasOwnProperty(fallback) === false) {
      return render(locale, defaultValue, options, pluralization);
    }
    if (translations[fallback].hasOwnProperty(key) === false) {
      return render(fallback, defaultValue, options, pluralization);
    }
    return render(locale, translations[fallback][key], options, pluralization);
  };
  let translateInLanguageFilter = function translateInLanguageFilter2(key, locale, ...args) {
    return translateInLanguage(locale, key, ...args);
  };
  let checkKeyExists = function checkKeyExists2(key, scope = "fallback") {
    let locale = store.state[moduleName].locale;
    let fallback = store.state[moduleName].fallback;
    let translations = store.state[moduleName].translations;
    if (translations.hasOwnProperty(locale) && translations[locale].hasOwnProperty(key)) {
      return true;
    }
    if (scope == "strict") {
      return false;
    }
    let localeRegional = locale.split("-");
    if (localeRegional.length > 1 && translations.hasOwnProperty(localeRegional[0]) && translations[localeRegional[0]].hasOwnProperty(key)) {
      return true;
    }
    if (scope == "locale") {
      return false;
    }
    if (translations.hasOwnProperty(fallback) && translations[fallback].hasOwnProperty(key)) {
      return true;
    }
    return false;
  };
  let setFallbackLocale = function setFallbackLocale2(locale) {
    store.dispatch({
      type: `${moduleName}/setFallbackLocale`,
      locale
    });
  };
  let setLocale = function setLocale2(locale) {
    store.dispatch({
      type: `${moduleName}/setLocale`,
      locale
    });
  };
  let getLocale = function getLocale2() {
    return store.state[moduleName].locale;
  };
  let getLocales = function getLocales2() {
    return Object.keys(store.state[moduleName].translations);
  };
  let addLocale = function addLocale2(locale, translations) {
    return store.dispatch({
      type: `${moduleName}/addLocale`,
      locale,
      translations
    });
  };
  let replaceLocale = function replaceLocale2(locale, translations) {
    return store.dispatch({
      type: `${moduleName}/replaceLocale`,
      locale,
      translations
    });
  };
  let removeLocale = function removeLocale2(locale) {
    if (store.state[moduleName].translations.hasOwnProperty(locale)) {
      store.dispatch({
        type: `${moduleName}/removeLocale`,
        locale
      });
    }
  };
  let phaseOutExistsFn = function phaseOutExistsFn2(locale) {
    if (config.warnings)
      console.warn("i18n: $i18n.exists is depreceated. Please use $i18n.localeExists instead. It provides exactly the same functionality.");
    return checkLocaleExists(locale);
  };
  let checkLocaleExists = function checkLocaleExists2(locale) {
    return store.state[moduleName].translations.hasOwnProperty(locale);
  };
  Vue.prototype.$i18n = {
    locale: getLocale,
    locales: getLocales,
    set: setLocale,
    add: addLocale,
    replace: replaceLocale,
    remove: removeLocale,
    fallback: setFallbackLocale,
    localeExists: checkLocaleExists,
    keyExists: checkKeyExists,
    translate,
    translateIn: translateInLanguage,
    exists: phaseOutExistsFn
  };
  Vue.i18n = {
    locale: getLocale,
    locales: getLocales,
    set: setLocale,
    add: addLocale,
    replace: replaceLocale,
    remove: removeLocale,
    fallback: setFallbackLocale,
    translate,
    translateIn: translateInLanguage,
    localeExists: checkLocaleExists,
    keyExists: checkKeyExists,
    exists: phaseOutExistsFn
  };
  Vue.prototype.$t = translate;
  Vue.prototype.$tlang = translateInLanguage;
  Vue.filter(translateFilterName, translate);
  Vue.filter(translateInFilterName, translateInLanguageFilter);
};
let renderFn = function(identifiers, warnings = true) {
  if (identifiers == null || identifiers.length != 2) {
    console.warn("i18n: You must specify the start and end character identifying variable substitutions");
  }
  let matcher = new RegExp("" + identifiers[0] + "{1}(\\w{1}|\\w.+?)" + identifiers[1] + "{1}", "g");
  let replace = function replace2(translation, replacements) {
    if (!translation.replace) {
      return translation;
    }
    return translation.replace(matcher, function(placeholder) {
      let key = placeholder.replace(identifiers[0], "").replace(identifiers[1], "");
      if (replacements[key] !== void 0) {
        return replacements[key];
      }
      if (warnings) {
        console.group ? console.group("i18n: Not all placeholders found") : console.warn("i18n: Not all placeholders found");
        console.warn("Text:", translation);
        console.warn("Placeholder:", placeholder);
        if (console.groupEnd) {
          console.groupEnd();
        }
      }
      return placeholder;
    });
  };
  let render = function render2(locale, translation, replacements = {}, pluralization = null) {
    let objType = typeof translation;
    let pluralizationType = typeof pluralization;
    let resolvePlaceholders = function() {
      if (isArray(translation)) {
        return translation.map((item) => {
          return replace(item, replacements);
        });
      } else if (objType === "string") {
        return replace(translation, replacements);
      }
    };
    if (pluralization === null) {
      return resolvePlaceholders();
    }
    if (pluralizationType !== "number") {
      if (warnings)
        console.warn("i18n: pluralization is not a number");
      return resolvePlaceholders();
    }
    let resolvedTranslation = resolvePlaceholders();
    let pluralizations = null;
    if (isArray(resolvedTranslation) && resolvedTranslation.length > 0) {
      pluralizations = resolvedTranslation;
    } else {
      pluralizations = resolvedTranslation.split(":::");
    }
    let index2 = plurals.getTranslationIndex(locale, pluralization);
    if (typeof pluralizations[index2] === "undefined") {
      if (warnings) {
        console.warn("i18n: pluralization not provided in locale", translation, locale, index2);
      }
      return pluralizations[0].trim();
    }
    return pluralizations[index2].trim();
  };
  return render;
};
function isArray(obj) {
  return !!obj && Array === obj.constructor;
}
var index = {
  store: i18nVuexModule,
  plugin: VuexI18nPlugin
};
export { index as default };
