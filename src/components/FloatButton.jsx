import { FloatButton } from "antd";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { GlobalOutlined } from "@ant-design/icons";
import flag_vn from "@/assets/image/flag/flag_vietnam.png";
import flag_eng from "@/assets/image/flag/flag_england.png";

const LanguageSelector = () => {
  const { i18n } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState(
    () => sessionStorage.getItem("language") || "eng"
  );

  const changeLanguage = (languageValue) => {
    i18n.changeLanguage(languageValue);
    sessionStorage.setItem("language", languageValue);
    setCurrentLanguage(languageValue);
  };

  useEffect(() => {
    const storedLanguage = sessionStorage.getItem("language");
    if (storedLanguage) {
      i18n.changeLanguage(storedLanguage);
      setCurrentLanguage(storedLanguage);
    }
  }, [i18n]);

  return (
    <FloatButton.Group
      trigger="hover"
      type="primary"
      style={{ bottom: 100 }}
      icon={<GlobalOutlined />}
    >
      <FloatButton
        onClick={() => changeLanguage("vie")}
        icon={<img src={flag_vn} alt="flag_vn" className="object-cover" />}
        active={currentLanguage === "vie"}
      />
      <FloatButton
        onClick={() => changeLanguage("eng")}
        icon={<img src={flag_eng} alt="flag_eng" className="object-cover" />}
        active={currentLanguage === "eng"}
      />
    </FloatButton.Group>
  );
};

export default LanguageSelector;
