



import { X, Mail, Phone, MapPin, Calendar, Briefcase, Building, Shield, Clock } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { RelativeDate } from '../../../components/ui/Date';
import { getInitials } from '../../../helpers/utils';
import type { UserTypes } from '../../../types/userTypes';

interface Props {user: UserTypes | null; isOpen: boolean; onClose: () => void;}
export const UserDetail = ({ user, isOpen, onClose }: Props) => {
    const { t } = useTranslation();
    if (!user) return null;

    return (
        <>
        <div className={`sidebar-backdrop ${isOpen ? 'open' : ''}`} onClick={onClose} />

        <div className={`user-detail-sidebar ${isOpen ? 'open' : ''}`}>
            {/* Header avec bouton fermer */}
            <div className="sidebar-header">
                <button className="close-btn" onClick={onClose}><X size={24} /></button>
            </div>

            {/* Avatar et nom */}
            <div className="profile-section">
                <div className="avatar-wrapper">
                    {user.avatar ? (
                    <img src={user.avatar} alt={user.full_name} />
                    ) : (
                    <div className="avatar-placeholder">{getInitials(user.full_name)}</div>
                    )}
                    <span className={`status-dot ${user.is_active ? 'active' : 'inactive'}`} />
                </div>
                <h2 className="user-nametext text_lg weight_700">{user.full_name}</h2>
                <span className="user-username text text_sm">@{user.username}</span>
            </div>

            {/* Badges d'état */}
            <div className="badges-section">
                {user.is_active && <span className="badge success">{t('common.active')}</span>}
                {!user.is_active && <span className="badge danger">{t('common.inactive')}</span>}
                {user.is_staff && <span className="badge primary">Staff</span>}
                {user.is_superuser && <span className="badge gold">Super Admin</span>}
                {user.is_on_duty && <span className="badge info">En service</span>}
                {user.is_busy && <span className="badge warning">Occupé</span>}
            </div>

            {/* Détails */}
            <div className="details-section">
            <div className="detail-item text text_sm">
                <Mail size={18} />
                <span>{user.email || 'Non renseigné'}</span>
            </div>
            <div className="detail-item text text_sm">
                <Phone size={18} />
                <span>{user.phone || 'Non renseigné'}</span>
            </div>
            <div className="detail-item text text_sm">
                <MapPin size={18} />
                <span>{user.address || 'Non renseigné'}</span>
            </div>
            <div className="detail-item text text_sm">
                <Building size={18} />
                <span>{user.user_city?.title || 'Ville non définie'}</span>
            </div>
            <div className="detail-item text text_sm">
                <Calendar size={18} />
                <span><RelativeDate date={user.date_joined} /></span>
            </div>
            {user.last_login && (
                <div className="detail-item text text_sm">
                <Clock size={18} />
                <span><RelativeDate date={user.last_login} /></span>
                </div>
            )}
            <div className="detail-item text text_sm">
                <Shield size={18} />
                <span>{user.can_view_all_branches ? 'Peut voir toutes les branches' : 'Branches limitées'}</span>
            </div>
            </div>

            {/* Groupes (Rôles) */}
            {user.user_groups.length > 0 && (
            <div className="groups-section">
                <h4> <Briefcase size={18} /> {t('models.group.plural')}</h4>
                <div className="groups-list">
                {user.user_groups.map((group) => (
                    <span key={group.id} className="group-tag text text_sm">
                    {group.name}
                    </span>
                ))}
                </div>
            </div>
            )}

            {/* Branches */}
            {user.user_branches.length > 0 && (
            <div className="branches-section">
                <h4><Building size={18} />{t('models.branch.plural')}</h4>
                <div className="branches-list">
                {user.user_branches.map((branch) => (
                    <span key={branch.id} className="branch-tag text text_sm">
                    {branch.title}
                    </span>
                ))}
                </div>
            </div>
            )}

        </div>
        </>
    );
};


