import en from "./en.json";
import ta from "./ta.json";

const languages = {
  en,
  ta
};

export default (language = "en") => {
  return languages[language];
};