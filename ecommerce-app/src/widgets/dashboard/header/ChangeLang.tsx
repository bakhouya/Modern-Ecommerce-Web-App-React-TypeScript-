import { useTranslation } from 'react-i18next';

function LanguageSwitcher() {
  const { i18n, t } = useTranslation();

  const changeLanguage = (lng: string | undefined) => {
    i18n.changeLanguage(lng);
    document.documentElement.dir = lng === 'ar' ? 'rtl' : 'ltr';
  };

  return (
    <div className='flex_start_center btns_lang gap_10 row'>
      <button className={`lang_btn col_2 ${i18n.language === 'fr' ? "active" : ""}`} onClick={() => changeLanguage('fr')}
          aria-label={t("store.header.account.language.selectLanguage")}>
          {t("store.header.account.language.french")}
      </button>
      <button className={`lang_btn col_2 ${i18n.language === 'ar' ? "active" : ""}`} onClick={() => changeLanguage('ar')}
          aria-label={t("store.header.account.language.selectLanguage")}>
          {t("store.header.account.language.arabic")}
      </button>
    </div>
  );
}

export default LanguageSwitcher;