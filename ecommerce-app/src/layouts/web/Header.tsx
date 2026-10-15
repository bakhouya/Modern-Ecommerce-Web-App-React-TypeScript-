

import { Link } from 'react-router-dom';
import { useSettings } from '../../context/settings/PublicSettingsContext';

export default function Header () {

    const { settingsQuery } = useSettings();
    const settings = settingsQuery.data ;
   
    return (

        <header className="site-header">
            <div className="web_container">
                <div className="flex_between_center content_header">

                        <Link to={"#"} className="logo" aria-label="NÜR — Accueil">
                            <img src={settings?.logo} alt="" className='logo_header' />
                        </Link>

                        <nav className="main_nav" aria-label="Navigation principale">
                            <ul className="nav_list">
                                <li><Link to={"#"} className="text text_sm nav_link">Accueil</Link></li>
                                <li><Link to={"#"} className="text text_sm nav_link">Nouveautés</Link></li>
                                <li><Link to={"#"} className="text text_sm nav_link">Collections</Link></li>
                                <li><Link to={"#"} className="text text_sm nav_link">Promotions</Link></li>
                                <li><Link to={"#"} className="text text_sm nav_link">Journal</Link></li>
                            </ul>
                        </nav>



                    <div className="header-actions">

                        <Link to={"#"} className="header_action_btn" aria-label="Mes favoris">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                                <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1 1.1L12 21l7.8-7.5 1-1.1a5.5 5.5 0 0 0 0-7.8Z"/>
                            </svg>
                            <span className="btn_badge">3</span>
                        </Link>


                        <Link to={"/panier"} className="header_action_btn" aria-label="Mon panier">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/>
                                    <path d="M3 6h18"/>
                                <path d="M16 10a4 4 0 0 1-8 0"/>
                            </svg>
                        </Link>

                        <Link to={"/panier"} className="cart_user" aria-label="Mon panier">
                            <div className="cart_icon">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                                    <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/>
                                            <path d="M3 6h18"/>
                                    <path d="M16 10a4 4 0 0 1-8 0"/>
                                </svg>
                            </div>
                            <span className="btn_badge">2</span>
                            <span className="text.text_sm weight_700 px_8">0.00{settings?.currency_symbol || "Dh"}</span>
                        </Link>

                    </div>
                </div>
            </div>
        </header>
        
    );
};

// export default Header;