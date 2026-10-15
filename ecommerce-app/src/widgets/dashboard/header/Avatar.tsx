

// ========================================================================
import { NavLink, useNavigate } from "react-router-dom";
import ROUTES from "../../../routers/dashboard/path";
import {
  SettingsIcon,
  LogOutIcon,
  UserCircleIcon,
  StoreIcon,
  MoonIcon,
  SunIcon,
} from "lucide-react"; 
import { useDropdown } from "../../../hooks/useDropdown";
import { useAdminAuth } from "../../../context/admin-auth/AdminAuthContext";
import { getInitials } from "../../../helpers/utils";
import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react"; 
// ========================================================================

export default function Avatar() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { isOpen, toggle, dropdownRef, triggerRef } = useDropdown();
  const { user, logout } = useAdminAuth();

  // ====== Dark Mode State ======
  const [isDark, setIsDark] = useState<boolean>(() => {
    const saved = localStorage.getItem("theme");
    return saved === "dark" ? true : false;
  });

  useEffect(() => {
    if (isDark) {
      document.body.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark((prev) => !prev);
  };

  const handleLogout = () => {
    logout();
    navigate(ROUTES.LOGIN);
  };

  // ========================================================================
  return (
    <>
      <div className="panel_header__avatar flex_center_center" ref={triggerRef} onClick={toggle}>
        <div className="text text_md">{getInitials(user?.full_name)}</div>
      </div>

      {isOpen && (
        <div className="dropdown_menu" ref={dropdownRef}>

          <div className="p_10 header_dropdown">
            <div className="flex_start_center gap_15">
              <div className="avatars__lg">
                <div className="text text_lg">{getInitials(user?.full_name)}</div>
              </div>
              <div>
                <div className="text text_md">{user?.full_name}</div>
                <div className="text text_sm">{user?.groups}</div>
              </div>
            </div>
          </div>

          <div className="divider my_8"></div>
  
          <NavLink to={ROUTES.PROFILE} className="dropdown_menu__item flex_between_center">
            <div className="flex_start_center gap_10">
              <UserCircleIcon size={18} className="text text_sm"/>
              <span className="text text_sm">{t('profile.avatar.myProfile')}</span>
            </div>
          </NavLink>

          <NavLink to={ROUTES.HOME} className="dropdown_menu__item flex_between_center">
            <div className="flex_start_center gap_10">
              <StoreIcon size={18} className="text text_sm"/>
              <span className="text text_sm">{t('profile.avatar.viewStore')}</span>
            </div>
          </NavLink>

          <NavLink to={ROUTES.SETTINGS} className="dropdown_menu__item flex_between_center">
            <div className="flex_start_center gap_10">
              <SettingsIcon size={18} className="text text_sm"/>
              <span className="text text_sm">{t('profile.avatar.settings')}</span>
            </div>
          </NavLink>

          <div className="dropdown_menu__item flex_between_center" onClick={toggleTheme}>
            <div className="flex_start_center gap_10">
                {isDark ? <MoonIcon size={18} className="text text_sm"/> : <SunIcon size={18} className="text text_sm"/>}
                <span className="text text_sm">
                  {/* {isDark ? t('profile.avatar.darkMode') : t('profile.avatar.lightMode')} */}
                  {isDark ? "Dark" : "Light"}
                </span>
            </div>
            <label htmlFor="theme-toggle" className="switch">
                <input type="checkbox" checked={isDark} onChange={toggleTheme}  id="theme-toggle"/>
                <span className="slider round"></span>
            </label>
          </div>

          <div className="divider my_8"></div>

          <div className="dropdown_menu__item dropdown_menu__item--danger" onClick={handleLogout}>
            <LogOutIcon size={18} />
            <span className="text text_sm text_danger">{t('profile.avatar.logout')}</span>
          </div>
        </div>
      )}
    </>
  );
}




