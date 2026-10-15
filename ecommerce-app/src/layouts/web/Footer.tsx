
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaYoutube, FaLinkedinIn, FaXTwitter} from "react-icons/fa6";
import { useSettings } from "../../context/settings/PublicSettingsContext";
import WEBROUTES from "../../routers/web/path";

const Footer = () => {
    const { t } = useTranslation();
    const { settingsQuery }             = useSettings();
    const settings                      = settingsQuery.data ;

    const socialLinks = [
    {
        key: "facebook_url",
        label: t("store.footer.social.facebook"),
        Icon: FaFacebookF,
    },
    {
        key: "instagram_url",
        label: t("store.footer.social.instagram"),
        Icon: FaInstagram,
    },
    {
        key: "youtube_url",
        label: t("store.footer.social.youtube"),
        Icon: FaYoutube,
    },
    {
        key: "linkedin_url",
        label: t("store.footer.social.linkedin"),
        Icon: FaLinkedinIn,
    },
    {
        key: "x_url",
        label: t("store.footer.social.x"),
        Icon: FaXTwitter,
    },
    ];  

    return (
        <footer className="footer web_container">

            <div className="footer__container">
               <div className="footer__brand">
                    <div className="footer__logo">
                        <img src={settings?.logo} alt={settings?.title} />
                    </div>
                    <div className="text text_sm"> {settings?.description} </div>
                </div>

                <div className="footer__top">

                    <div className="footer__column">
                        <div className="text text_lg weight_600">{t("store.footer.boutique")}</div>
                        <Link className="text text_sm" to={WEBROUTES.HOME}> {t("store.footer.home")} </Link>
                        <Link className="text text_sm" to={WEBROUTES.HOME}>{t("store.footer.products")}</Link>
                        <Link className="text text_sm" to={WEBROUTES.HOME}>{t("store.footer.offers")}</Link>
                    </div>


                    <div className="footer__column">
                        <div className="text text_lg weight_600">{t("store.footer.assistance")}</div>
                        <Link className="text text_sm flex_start_center gap_10" to={WEBROUTES.TRACKORDER}> {t("store.footer.trackOrder")} </Link>
                        <Link className="text text_sm flex_start_center gap_10" to={WEBROUTES.HOME}> {t("store.footer.helpCenter")} </Link>
                        <Link className="text text_sm flex_start_center gap_10" to={WEBROUTES.POLICY}> {t("store.footer.terms")} </Link>
                    </div>


                    <div className="footer__column footer__contact">
                        <h3 className="text text_lg weight_500">{t("store.footer.contact")}</h3>
                        <div className="text text_sm flex_start_center p_limit_1 gap_10"> {settings?.email} </div>
                        <div className="text text_sm flex_start_center p_limit_1 gap_10"> {settings?.address} </div>
                        <div className="text text_sm flex_start_center p_limit_1 gap_10"> {settings?.phone} </div>
                    </div>

                </div>

                <div className="footer__bottom">
                    <div className="footer__bottom-copyright">
                        <span className="footer__copyright-icon">©</span>
                        <span className="text text_sm">
                            {t("store.footer.copyright", {
                                year: new Date().getFullYear(),
                                title: settings?.title ?? "",
                            })}
                        </span>
                    </div>

                    <div className="footer__bottom-socials">
                        {socialLinks.map(({ key, label, Icon }) => {
                        const url = settings?.[key as keyof typeof settings];

                        if (typeof url !== "string" || !url.trim()) return null;

                        return (
                            <a
                            key={key}
                            href={url}
                            className={`footer__social-link footer__social-link--${key}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={label}
                            title={label}
                            >
                            <Icon size={17} strokeWidth={1.8} />
                            </a>
                        );
                        })}
                    </div>
                </div>

            </div>

        </footer>
    );
};

export default Footer;