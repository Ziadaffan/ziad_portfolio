import { Button } from "@/components/ui/button";
import i18n from "@/i18n";
import { useTranslation } from "react-i18next";

export function LanguageToggle() {
  const { t } = useTranslation();
  const current = i18n.resolvedLanguage ?? i18n.language ?? "en";
  const next = current.startsWith("fr") ? "en" : "fr";

  return (
    <Button
      type="button"
      variant="ghost"
      size="sm"
      onClick={() => void i18n.changeLanguage(next)}
      aria-label={t("language.switch")}
      title={t("language.switch")}
      className="font-mono"
    >
      {t(`language.${next}`)}
    </Button>
  );
}

