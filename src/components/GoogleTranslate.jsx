import React, { useEffect } from "react";

const GoogleTranslate = () => {
  useEffect(() => {
    const initGoogleTranslate = () => {
      const existingElement = document.getElementById(
        "google_translate_element"
      );
      if (existingElement) {
        existingElement.innerHTML = "";
      }

      new window.google.translate.TranslateElement(
        {
          pageLanguage: "en", 

        },
        "google_translate_element"
      );
    };

    if (
      window.google &&
      window.google.translate &&
      window.google.translate.TranslateElement
    ) {
      initGoogleTranslate();
    } else {
      window.googleTranslateElementInit = initGoogleTranslate;

      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src =
        "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      document.body.appendChild(script);

      return () => {
        if (script) {
          document.body.removeChild(script);
        }
        delete window.googleTranslateElementInit;
      };
    }
  }, []);

  return <div id="google_translate_element" />;
};

export default GoogleTranslate;
