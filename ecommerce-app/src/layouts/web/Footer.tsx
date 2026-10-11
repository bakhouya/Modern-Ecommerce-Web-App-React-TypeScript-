import { Link } from "react-router-dom";
import { ArrowUpRight, CircleHelp, Mail, MapPin, Package, ShieldCheck} from "lucide-react";
import { useSettings } from "../../context/settings/PublicSettingsContext";

const Footer = () => {
    const { settingsQuery }             = useSettings();
    const settings                      = settingsQuery.data ;
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
                        <div className="text text_lg weight_500">Boutique</div>
                        <Link className="text text_sm" to="/"> Accueil</Link>
                        <Link className="text text_sm" to="/products">Nos produits</Link>
                        <Link className="text text_sm" to="/offers">Offres</Link>
                    </div>


                    <div className="footer__column">
                        <div className="text text_lg weight_500">Assistance</div>
                        <Link className="text text_sm flex_start_center gap_10" to="/track-order"> Suivre ma commande</Link>
                        <Link className="text text_sm flex_start_center gap_10" to="/help"> Centre d'aide </Link>
                        <Link className="text text_sm flex_start_center gap_10" to="/terms"> Conditions </Link>
                    </div>


                    <div className="footer__column footer__contact">
                        <h3 className="text text_lg weight_500">Contact</h3>
                        <div className="text text_sm flex_start_center p_limit_1 gap_10"> {settings?.email} </div>
                        <div className="text text_sm flex_start_center p_limit_1 gap_10"> {settings?.address} </div>
                    </div>

                </div>

                <div className="footer__bottom">
                    <span className="text text_sm">© {new Date().getFullYear()} {settings?.title} </span>
                    <span className="text text_sm"> Paiement sécurisé · Livraison fiable</span>
                </div>

            </div>

        </footer>
    );
};

export default Footer;