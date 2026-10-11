// widgets/dashboard/visitors/Card.tsx
/* ---------------------------------------------------------------------------------*/
/* ---------------------------------------------------------------------------------*/
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ChevronDown, ChevronUp, MapPin, Link, Eye} from 'lucide-react';
import type { VisitorTypes } from '../../../types/visitorTypes';
import { RelativeDate } from '../../../components/ui/Date';
import { VisitorMap } from './VisitorMap';
/* ---------------------------------------------------------------------------------*/

/* ---------------------------------------------------------------------------------*/
/* ---------------------------------------------------------------------------------*/
interface Props {visitor: VisitorTypes;}
/* ---------------------------------------------------------------------------------*/

export const VisitorCard = ({ visitor }: Props) => {
    const { t } = useTranslation();
    const [expanded, setExpanded] = useState(false);

    const getInitial = () => {
        if (visitor.city && visitor.city.length > 0) return visitor.city.charAt(0).toUpperCase();
        if (visitor.ip_address) return visitor.ip_address.charAt(0);
        return '?';
    };

    return (
        <div className={`visitor-card-new ${expanded ? 'expanded' : ''}`}>

            <div className="card-top" onClick={() => setExpanded(!expanded)}>
                    <div className="card-avatar">
                        <span className="avatar-initial">{getInitial()}</span>
                        <span className="country-flag">{visitor.country_code || '🌍'}</span>
                    </div>

                    <div className="card-info">
                        <div className="info-row flex_start_center gap_10">
                            <span className="text text_lg">{visitor.ip_address}</span>
                            <span className="device-badge border radius_30 flex_center_center gap_6 py_3 px_12">                       
                                <div className="text text_sm"> {t(`device.${visitor.device_type}`)} </div>   
                            </span>
                        </div>
                        <div className="info-row flex_start_center gap_10 my_start_6">
                            <span className="flex_start_center gap_6">
                                <div className="text text_sm"> <MapPin size={15} /> {visitor.city}, {visitor.country} </div>                       
                            </span>
                            <div className="slash"></div>
                            <span className="flex_start_center gap_6">
                                <div className="text text_sm"> <Eye size={15} /> {visitor.visits_count} {t('models.visit.plural')} </div>
                            </span>
                        </div>
                    </div>

                <div className="card-actions">
                    <span className="flex_center_center gap_6 border radius_30 py_4 px_10">
                            <RelativeDate date={visitor.created_at} />
                    </span>
                    <button className={`expand-btn ${expanded ? 'active' : ''}`}
                        onClick={(e) => {e.stopPropagation(); setExpanded(!expanded);}}>
                        {expanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                    </button>
                </div>
            </div>

            {expanded && (
                <div className="card-bottom">

                    <div className="map-wrapper">
                        <VisitorMap
                            lat={visitor.latitude}
                            lng={visitor.longitude}
                            city={visitor.city}
                            country={visitor.country}
                        />
                    </div>

                    {visitor.visits.length > 0 && (
                        <div className="visits-section">
                        <h5 className="text text_lg flex_start_center gap_6"><Link size={16} />{t('models.visit.plural')} ({visitor.visits.length})</h5>
                        <div className="visits-list">
                            {visitor.visits.map((visit) => (
                            <div key={visit.id} className="visit-entry">
                                <span className="visit-page">{visit.page_url}</span>
                                <span className="visit-time"><RelativeDate date={visit.created_at} /></span>
                                {visit.referrer && (<span className="visit-referrer">{t('fields.referrer')}: {visit.referrer}</span>)}
                            </div>
                            ))}
                        </div>
                        </div>
                    )}
                </div>
            )}

        </div>
    );

    
};
/* ---------------------------------------------------------------------------------*/