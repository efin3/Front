import { useState, useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";
import en from "date-fns/locale/en-GB";
import pl from "date-fns/locale/pl";
import ptBR from "date-fns/locale/pt-BR";
import setDefaultOptions from "date-fns/setDefaultOptions";

type LanguageObject = {
  label: string;
  value: string;
};

type UseLanguageReturnType = {
  languageObject: LanguageObject;
  handleLanguageChange: (language: LanguageObject) => void;
};

const getDefaultLocale = (lang: string): Locale => {
  switch (lang) {
    case "ptBR":
      return ptBR;
    case "pl":
      return pl;
    default:
      return en;
  }
};

const getLangFromLocalStorage = (): LanguageObject => {
  const storedLanguage = localStorage.getItem("defaultLanguage");
  if (storedLanguage) {
    return JSON.parse(storedLanguage);
  } else {
    return { label: "Português", value: "ptBR" };
  }
};

export const useLanguage = (): UseLanguageReturnType => {
  const { i18n } = useTranslation();
  const [languageObject, setDefaultLanguage] = useState<LanguageObject>(
    getLangFromLocalStorage()
  );

  useEffect(() => {
    const currentLangObject = getLangFromLocalStorage().value;
    i18n.changeLanguage(currentLangObject);
    setDefaultOptions({ locale: getDefaultLocale(currentLangObject) });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    localStorage.setItem("defaultLanguage", JSON.stringify(languageObject));
  }, [languageObject]);

  const handleLanguageChange = useCallback(
    (language: LanguageObject) => {
      i18n.changeLanguage(language.value);
      setDefaultLanguage(language);
      setDefaultOptions({ locale: getDefaultLocale(language.value) });
    },
    [i18n]
  );

  return { languageObject, handleLanguageChange };
};
