
import { NavLink } from "react-router-dom";
import { useState} from "react";
import { BellIcon, CheckCircleIcon} from "lucide-react";
import { useDropdown } from "../../../hooks/useDropdown";

export default function Notification() {
  const { isOpen, toggle, dropdownRef, triggerRef } = useDropdown();

  const [notifications] = useState([
    { id: 1, text: "Nouvelle commande #1234", time: "Il y a 5 minutes", isRead: true, type: "order" },
    { id: 2, text: "Paiement reçu pour #1230", time: "Il y a 1 heure", isRead: false, type: "payment" },
    { id: 3, text: "Nouveau message de support", time: "Il y a 3 heures", isRead: true, type: "message" },
    { id: 4, text: "Produit 'X' en stock", time: "Hier", isRead: true, type: "stock" },
  ]);
  const unreadCount = notifications.filter((n) => !n.isRead).length;


  return (
    <>
      <button className="panel_header__notification" ref={triggerRef} onClick={toggle}>
        <BellIcon size={20} />
        {unreadCount > 0 && <span className="badge">{unreadCount}</span>}
      </button>


      {isOpen && (
        <div className="notifications-dropdown" ref={dropdownRef}>

            <div className="notifications-dropdown__header">
                <span className="text text_xl weight_600">Notifications</span>
            </div>

          <div className="notifications-dropdown__list">
            {notifications.length === 0 ? (
              <div className="empty-state">Aucune notification</div>
            ) : (
              notifications.map((notif) => (
                <>
                <div className="divider my_5"></div>
                <NavLink to={""} key={notif.id} className={`notification_item ${!notif.isRead ? "unread" : ""}`}>
                    <div className="avatars__icon_render avatars__lg">
                        <CheckCircleIcon size={16} />
                    </div>

                    <div className="notification_item__content">
                        <div className="text text_md">{notif.text}</div>
                        <span className="text text_sm">{notif.time}</span>
                    </div>

                    {!notif.isRead && (
                        <button  title="Marquer comme lu" className="btns btn_sm">
                            <CheckCircleIcon size={18} />
                        </button>
                    )}

                </NavLink>
                </>
              ))
            )}
          </div>

          {notifications.length > 0 && (
            <div className="notifications-dropdown__footer">
              <NavLink to={""} className="show_more text text_md">Voir toutes</NavLink>  
            </div>
          )}
        </div>
      )}


    </>
  );
}















