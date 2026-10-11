

import { useTranslation } from "react-i18next";
import { useState } from "react";
import { Link } from 'react-router-dom';
import { useSettings } from '../../context/settings/PublicSettingsContext';
import CategoryMenu from "../../widgets/web/categories/CategoryMenu"
import CartModal from "../../widgets/web/header/CartMiniModal"
import AccountMenu from "../../widgets/web/header/AccountMenu"
import MobileBottomNav from "./MobileBottomNav"
import { usePublicCategoryParents } from "../../controllers/useCategory"
import { useCart } from "../../controllers/useCart"
import WEBROUTES from "../../routers/web/path";


function Header() {
    const { t } = useTranslation();
    const [isCartOpen, setIsCartOpen]   = useState(false);
    const [isMenuOpen, setIsMenuOpen]   = useState(false);
    const [isAccounOpen, setIsAccounOpen]   = useState(false);

    const {data: categoriesParents }    = usePublicCategoryParents();
    const {data: cart }                 = useCart();
    const { settingsQuery }             = useSettings();
    const settings                      = settingsQuery.data ;
    const categories = [
        { key: "judicialAuctions", label: t("store.header.navigation.judicialAuctions") },
        { key: "supermarket", label: t("store.header.navigation.supermarket") },
        { key: "nationalAid", label: t("store.header.navigation.nationalAid") },
        { key: "couponCenter", label: t("store.header.navigation.couponCenter") }
    ];


    return (
        <>
        <header className="store-header">

            <div className="announcement web_container">
                <div className="announcement__content">
                    <span className="text text_xs ">{t("store.header.announcement.freeShipping")}</span>
                    <span className="announcement__separator">•</span>
                    <span className="text text_xs ">{t("store.header.announcement.easyReturns")}</span>
                    <span className="announcement__separator">•</span>
                    <span className="text text_xs ">{t("store.header.announcement.trackOrder")}</span>
                </div>
            </div>

            <div className="header-main">
                <div className="header-main__inner web_container">

                    <Link to={WEBROUTES.HOME} className="logo">
                        <img src={settings?.logo} alt="" className='logo_header' loading="lazy"/>
                    </Link>

                    <div className="flex_start_center searchBox__web">
                         <button type="button" className="category_button" onClick={() => setIsMenuOpen(true)}>
                            {/* <Menu size={21} /> */}
                            <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24">
                                <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" 
                                    stroke-width="1.5" d="M3.891 20.109C5.282 21.5 7.521 21.5 12 21.5c4.478 0 6.718 0 8.109-1.391S21.5 16.479 21.5 12c0-4.478 0-6.718-1.391-8.109S16.479 2.5 12 2.5c-4.478 0-6.718 0-8.109 1.391S2.5 7.521 2.5 12c0 4.478 0 6.718 1.391 8.109M7 8h10M7 12h10M7 16h10"/>
                            </svg>
                        </button>
                        <CategoryMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} categories={categoriesParents}/>
                        <Link to={WEBROUTES.SEARCHING} className="search">
                            <svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" viewBox="0 0 24 24">
                                <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="1.5"><path d="M6.75 3.27093C8.14732 2.46262 9.76964 2 11.5 2C16.7467 2 21 6.25329 21 11.5C21 16.7467 16.7467 21 11.5 21C6.25329 21 2 16.7467 2 11.5C2 9.76964 2.46262 8.14732 3.27093 6.75"/>
                                <path d="M18.2173 18.2178L21.9999 22.0004"/></g>
                            </svg>
                            <input type="text" placeholder={t("store.header.search.placeholder")} aria-label={t("store.header.search.ariaLabel")}/>
                        </Link>
                    </div>
                    
                    <div className="header-actions">
                        <button className="action action--icon text_center" 
                            onClick={() => setIsAccounOpen((prev) => !prev)} aria-label={t("store.header.account.ariaLabel")}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="1.35em" height="1.35em" viewBox="0 0 24 24">
                                <path fill="currentColor" 
                                fill-rule="evenodd" 
                                d="M12 1.25a4.75 4.75 0 1 0 0 9.5a4.75 4.75 0 0 0 0-9.5M8.75 6a3.25 3.25 0 1 1 6.5 0a3.25 3.25 0 0 1-6.5 0M12 12.25c-2.313 0-4.445.526-6.024 1.414C4.42 14.54 3.25 15.866 3.25 17.5v.102c-.001 1.162-.002 2.62 1.277 3.662c.629.512 1.51.877 2.7 1.117c1.192.242 2.747.369 4.773.369s3.58-.127 4.774-.369c1.19-.24 2.07-.605 2.7-1.117c1.279-1.042 1.277-2.5 1.276-3.662V17.5c0-1.634-1.17-2.96-2.725-3.836c-1.58-.888-3.711-1.414-6.025-1.414M4.75 17.5c0-.851.622-1.775 1.961-2.528c1.316-.74 3.184-1.222 5.29-1.222c2.104 0 3.972.482 5.288 1.222c1.34.753 1.961 1.677 1.961 2.528c0 1.308-.04 2.044-.724 2.6c-.37.302-.99.597-2.05.811c-1.057.214-2.502.339-4.476.339s-3.42-.125-4.476-.339c-1.06-.214-1.68-.509-2.05-.81c-.684-.557-.724-1.293-.724-2.601" clip-rule="evenodd"/>
                            </svg>
                            <div className="text text_sm"> {t("store.header.account.title")} </div>
                            <AccountMenu isOpen={isAccounOpen} onClose={() => setIsAccounOpen(false)}/>
                        </button>
                        

                        {/* <button className="action" aria-label={t("store.header.favorites.ariaLabel")}>
                            <Heart size={22} className="mx_auto"/>
                            <div className="text text_sm">  {t("store.header.favorites.title")} </div>
                            <span className="badge_actions">2</span>
                        </button> */}

                        <button className="action" onClick={() => setIsCartOpen(true)} aria-label={t("store.header.cart.ariaLabel")}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="1.3em" height="1.3em" viewBox="0 0 24 24">
                                <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="1.5">
                                    <path d="M3.86376 16.4552C3.00581 13.0234 2.57684 11.3075 3.47767 10.1538C4.3785 9 6.14721 9 9.68462 9H14.3153C17.8527 9 19.6214 9 20.5222 10.1538C21.4231 11.3075 20.9941 13.0234 20.1362 16.4552C19.5905 18.6379 19.3176 19.7292 18.5039 20.3646C17.6901 21 16.5652 21 14.3153 21H9.68462C7.43476 21 6.30983 21 5.49605 20.3646C4.68227 19.7292 4.40943 18.6379 3.86376 16.4552Z"/><path d="M9 4C9 3.44772 9.44772 3 10 3H14C14.5523 3 15 3.44772 15 4C15 4.55228 14.5523 5 14 5H10C9.44772 5 9 4.55228 9 4Z"/><path d="M19.4606 9.39865L18.7897 6.89465C18.5157 5.89005 18.3788 5.38775 18.0978 5.00946C17.8181 4.63273 17.4379 4.34234 17.0008 4.17152C16.562 4 16.0413 4 15.0001 4M4.53946 9.39861L5.21045 6.89465C5.48437 5.89005 5.62134 5.38775 5.90227 5.00946C6.18205 4.63273 6.56221 4.34234 6.99928 4.17152C7.43814 4 7.95878 4 9.00005 4"/>
                                </g>
                            </svg>
                            <div className="text text_sm weight_600">{cart?.discount ?? "0.00"}{settings?.currency_symbol}</div>
                            <div className="badge_actions">{cart?.items ?? 0}</div>
                        </button>

                        <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} cart={cart}/>
                        

                    </div>
                
                </div>
            </div>

            {/* <nav className="navigation">
                <div className="navigation__inner web_container">
                    <div className="flex_between_center">

                        <CategoryMenu categories={categoriesParents}/>

                        <div className="navigation__links">
                            {categories.map((category, index) => (  
                            <Link to={"#"} key={category} className={`link_menu`}>
                                <div className="text text_sm">  {category}   </div>
                            </Link>
                            ))}
                        </div>

                    </div>
                    <Link to={"#"} className="links_offers">
                        <div className="text text_sm white"> {t("header.navigation.offers")} </div>
                    </Link> 

                </div>
            </nav> */}

        </header>


        <MobileBottomNav categories={categoriesParents} cart={cart}/>
        </>
    );

}

export default Header;