



import { useTranslation } from "react-i18next";
import { useEffect, useRef } from "react";
import WEBROUTES from "../../../routers/web/path";
import { Package, CircleHelp, ShieldCheck} from "lucide-react";
import { Link } from "react-router-dom";
import LanguageSwitcher from "../../dashboard/header/ChangeLang";

interface AcountProps {isOpen: boolean;  onClose: () => void; }

const AccountMenu = ({isOpen, onClose }: AcountProps) => {
    const { t } = useTranslation();
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {onClose();}
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {document.removeEventListener("mousedown", handleClickOutside);};
    }, []);

    if (!isOpen) return null;


    return (
        <div className="account-menu__dropdown" ref={menuRef}>


            <LanguageSwitcher />  

            <div className="dropdown_divider" />

            <Link to={WEBROUTES.TRACKORDER} className="dropdown_item" onClick={() =>onClose()}>
                <Package size={18} />
                <div className="text text_sm">{t("store.header.account.trackOrders")}</div>
            </Link>

            <Link to={WEBROUTES.HOME} className="dropdown_item" onClick={() =>onClose()}>
                <CircleHelp size={18} />
                <div className="text text_sm"> {t("store.header.account.help")} </div>
            </Link>

            <Link to={WEBROUTES.POLICY} className="dropdown_item" onClick={() =>onClose()}>
                <ShieldCheck size={18} />
                <div className="text text_sm">{t("store.header.account.terms")}</div>
            </Link>

        </div>
    );
};

export default AccountMenu;