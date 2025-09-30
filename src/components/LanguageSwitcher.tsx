import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";

export function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="flex space-x-1">
      <Button
        variant={i18n.language === "en" ? "default" : "ghost"}
        size="sm"
        onClick={() => changeLanguage("en")}
      >
        EN
      </Button>
      <Button
        variant={i18n.language === "od" ? "default" : "ghost"}
        size="sm"
        onClick={() => changeLanguage("od")}
      >
        ଓଡ଼ିଆ
      </Button>
    </div>
  );
}