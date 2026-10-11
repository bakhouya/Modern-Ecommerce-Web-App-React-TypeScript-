

import { EditIcon, TrashIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { RelativeDate } from '../../../components/ui/Date';
import { format, type Locale } from 'date-fns';
import { fr, enUS, arMA } from "date-fns/locale";
import { useSettings } from '../../../context/settings/PublicSettingsContext';
import type { OfferTypes } from '../../../types/offersTypes';
import { Link } from 'react-router-dom';

interface Props {
  item          : OfferTypes;
  isSelected    : boolean;
  onToggleSelect: (id: string) => void;
  onDelete: (id: string) => void;
}

export const OfferCard = ({ item, isSelected, onToggleSelect, onDelete }: Props) => {
    const { t , i18n} = useTranslation();
    const localeMap: Record<string, Locale> = {fr: fr, en: enUS, ar: arMA};
    const locale = localeMap[i18n.language] || fr ; 

    const { settingsQuery } = useSettings();
    const settings = settingsQuery.data;

    return (

        <div className={`card_flex col_1 md:col_1 lg:col_1  ${isSelected ? 'selected' : ''}`}>

            <div className="flex_between_center gap_15">
                <div className="text text_lg weight_700">{item.title}</div>
                <div className="flex_start_center gap_15">
                    
                    <div className="slash"></div>
                    <input type="checkbox" checked={isSelected} onChange={() => onToggleSelect(item.id)} className="icon-checkbox"/>  
                    <span className={`text text_sm  ${item.status ? 'item_active': 'item_inactive'}`}>
                        {item.status ? t('common.active') : t('common.inactive')}
                    </span>
                   
                </div>                  
            </div>

            <div className="flex_start_center gap_10 ">
                <RelativeDate date={item.created_at} />
            </div>

            <div className="flex_between_center gap_10 my_start_8 row">
                <div className="text_center col_2 radius p_8 bg_2_primary">
                    <div className="text text_sm">{t("coupons.percentage")}</div>
                    <div className="text text_xl">{Number(item.discount_percentage)}%</div>
                </div>

                <div className="text_center col_2 radius p_8 bg_2_secondary">
                    <div className="text text_sm">{t("coupons.minimum_cart_total")}</div>
                    <div className="text text_xl p_limit_1">{item.min_order_price}{settings?.currency_code} </div>
                </div>

                <div className="text_center col_2 radius p_8 bg_2_success">
                    <div className="text text_sm">{t("coupons.starts_at")}</div>
                    {/* <RelativeDate date={item.start_date} /> */}
                    <div className="text text_xl p_limit_1">
                        {format(new Date(item.start_date), "dd MMM yyyy 'à' HH:mm", {locale: locale ,})}
                    </div>
                    
                </div>

                <div className="text_center col_2 radius p_8 bg_2_danger">
                    <div className="text text_sm">{t("coupons.ends_at")}</div>
                    <div className="text text_xl p_limit_1">
                        {format(new Date(item.end_date), "dd MMM yyyy 'à' HH:mm", {locale: locale ,})}
                    </div>
                </div>
            </div>

                       
            <div className="flex_end_center gap_12 footer_flex_card">
                <Link to={`/admin/marketing/offers/${item.id}/edit`}  className="btn primary_outline sm " type="button">
                    <EditIcon size={13}/>
                    <div className="text text_sm"> {t('common.edit')} </div>
                </Link>
                <button onClick={() => onDelete(item.id)} className="btn danger sm " type="button">
                    <TrashIcon size={13} />
                    <div className="text text_sm"> {t('common.delete')} </div>
                </button>
            </div>

        </div>

    )
};



