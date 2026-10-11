// widgets/dashboard/visitors/List.tsx
/* ---------------------------------------------------------------------------------*/
/* ---------------------------------------------------------------------------------*/
import { useTranslation } from 'react-i18next';
import type { VisitorTypes } from '../../../types/visitorTypes';
import { VisitorCard } from './Card';
import { LoadingDisplay } from '../../../components/ui/LoadingDisplay';
import { SectionHeader } from '../../../components/ui/SectionHeader';
/* ---------------------------------------------------------------------------------*/

/* ---------------------------------------------------------------------------------*/
/* ---------------------------------------------------------------------------------*/
interface Props {
  data: VisitorTypes[];
  isFetching: boolean;
  totalCount: number;
}
/* ---------------------------------------------------------------------------------*/

export const VisitorList = ({ data, isFetching, totalCount }: Props) => {
        const { t } = useTranslation();

        if (data.length === 0) {
            return (
            <div className="empty-state">
                <p className="text text_md text_secondary">{t('common.noData')}</p>
            </div>
            );
        }

        return (
            <div className="">
                <div className="bulkBar">            
                    <div className="">
                        <SectionHeader title={` ${totalCount}  ${t('models.visitor.plural')}`} description={t('models.visitor.desc')}/>
                    </div>
                </div>
            <div className="">
                {isFetching && (<LoadingDisplay />)}

                <div className="visitor-list">

                    <div className="visitor-grid">
                        {data.map((visitor) => (
                            <VisitorCard key={visitor.id} visitor={visitor} />
                        ))}
                    </div>
                </div>
            </div>
            </div>
        );
};
/* ---------------------------------------------------------------------------------*/