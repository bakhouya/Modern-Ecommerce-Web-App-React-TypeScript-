
// ========================================================================
// ========================================================================
import { NavLink, useNavigate } from "react-router-dom"
import ROUTES from "../../../routers/dashboard/path"
import {SettingsIcon, LogOutIcon, UserCircleIcon } from "lucide-react"
import {useDropdown} from "../../../hooks/useDropdown"
import {useAdminAuth} from "../../../context/admin-auth/AdminAuthContext"
import {getInitials} from "../../../helpers/utils"
// ========================================================================





export default function Avatar() {
    // ----------------------------------------------------------------------
    // ----------------------------------------------------------------------
    const navigate = useNavigate();
    const { isOpen, toggle, dropdownRef, triggerRef } = useDropdown();
    const { user, logout } = useAdminAuth();
    // ----------------------------------------------------------------------
    // 
    // ----------------------------------------------------------------------
    // ----------------------------------------------------------------------
    const handleLogout = () => {logout(); navigate(ROUTES.LOGIN);};
    // ----------------------------------------------------------------------
    // 
    // ----------------------------------------------------------------------
    // ----------------------------------------------------------------------
    return (
      <>
        <div className="panel_header__avatar flex_center_center" ref={triggerRef} onClick={toggle}>
          <div className="text text_md">{getInitials(user?.full_name)}</div>
        </div>

        {isOpen && (
          <div className="dropdown_menu" ref={dropdownRef}>

            <div className="p_10 header_dropdown">
              <div className="flex_start_center gap_15">
                <div className="avatars__lg ">
                    <div className="text text_lg">{getInitials(user?.full_name)}</div>
                </div>
                <div className="">
                    <div className="text text_md">{user?.full_name}</div>
                    <div className="text text_sm">{user?.groups}</div>
                </div>
                  
              </div>
            </div>

            <div className="divider my_8"></div>

            <NavLink to={ROUTES.PROFILE} className="dropdown_menu__item flex_between_center">
              <div className="flex_start_center gap_12">
                  <UserCircleIcon size={18} />
                  <span className="text text_md">Mon profil</span>
              </div>
            </NavLink>

            <NavLink to={ROUTES.HOME} className="dropdown_menu__item flex_between_center">
              <div className="flex_start_center gap_12">
                  <SettingsIcon size={18} />
                  <span className="text text_md">Voir le store</span>
              </div>
            </NavLink>

            <NavLink to={ROUTES.HOME} className="dropdown_menu__item flex_between_center">
              <div className="flex_start_center gap_12">
                  <SettingsIcon size={18} />
                  <span className="text text_md">Modifier Mot de passe</span>
              </div>
            </NavLink>

            <NavLink to={ROUTES.SETTINGS} className="dropdown_menu__item flex_between_center">
              <div className="flex_start_center gap_12">
                  <SettingsIcon size={18} />
                  <span className="text text_md">Paramètres</span>
              </div>
            </NavLink>

            <div className="divider my_8"></div>

            <div className="dropdown_menu__item dropdown_menu__item--danger" onClick={handleLogout}>
              <LogOutIcon size={18} />
              <span className="text text_md text_danger">Déconnexion</span>
            </div>

          </div>
        )}
      </>
    );
    // ----------------------------------------------------------------------
}