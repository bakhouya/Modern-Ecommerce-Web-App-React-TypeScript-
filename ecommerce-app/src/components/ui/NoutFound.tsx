

import { useTranslation } from 'react-i18next';
import  Empty  from '../../assets/images/empty.png'

export const NotFound = () => {
    const { t } = useTranslation();

    return (
        <div className="flex_center_center spaners_container">
            
            <div className="">
                <div className="mx_auto my_end_10"> 
                    <img src={Empty} alt="Empty Data" width={100} className="mx_auto"/> 
                </div>
                <div className="text text_xl text_center"> {t('common.noData')} </div>
                <div className="text text_sm text_center"> {t('common.noDadaDesc')} </div>
            </div>
            
        </div>
    )

};


