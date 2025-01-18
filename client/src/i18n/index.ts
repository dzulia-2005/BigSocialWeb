import i18n from "i18next";
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import homepage from "./en/pages/home.json"
import profilepage from "./en/pages/profile.json"
import notification from "./en/pages/notification.json"
import chat from "./en/pages/chat.json"



const options = {  
  order: ["path", "subdomain"],

  lookupQuerystring: "lang",
  lookupFromPathIndex: 0,
  lookupFromSubdomainIndex: 0,
};

const lngDetector = new LanguageDetector();

i18n.use(lngDetector)
.use(initReactI18next)
.init({
    detection: options,
    resources: {
      en : {
        translation : {
          "homepage":homepage,
          "profilepage":profilepage,
          "notification":notification,
          "chat":chat
        } 
      }
    },
    lng: "en", 
    fallbackLng: "en",

    interpolation: {
      escapeValue: false 
    }
  });

  export default i18n; 