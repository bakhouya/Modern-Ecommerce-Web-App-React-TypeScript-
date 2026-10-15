// widgets/dashboard/visitors/Page.tsx
/* ---------------------------------------------------------------------------------*/
/* ---------------------------------------------------------------------------------*/
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { createVisitorHooks } from '../../../../controllers/useVisitor';
import { LoadingDisplay } from '../../../../components/ui/LoadingDisplay';
import { FilterHeader } from '../../../../components/ui/FilterHeader';
import { SearchInput } from '../../../../components/ui/SearchInput';
import { AccordionRadioFilter } from '../../../../components/filters/AccordionRadioFilter';
import { Pagination } from '../../../../components/ui/Pagination';
import { VisitorList } from '../../../../widgets/dashboard/visitors/List';

/* ---------------------------------------------------------------------------------*/

/* ---------------------------------------------------------------------------------*/
/* ---------------------------------------------------------------------------------*/
const PAGE_SIZE = 10;
/* ---------------------------------------------------------------------------------*/

/* ---------------------------------------------------------------------------------*/
/* ---------------------------------------------------------------------------------*/
export const VisitorsPage = () => {
    const { t } = useTranslation();
    const { useAll } = createVisitorHooks();

    // ==== State ====
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState('');
    const [deviceType, setDeviceType] = useState<string | null>(null);
    // const [city, setCity] = useState<string | null>(null);
    // const [country, setCountry] = useState<string | null>(null);

    const deviceOptions = [
        { id: 'desktop', label: t('device.desktop') },
        { id: 'mobile', label: t('device.mobile') },
        { id: 'tablet', label: t('device.tablet') },
    ];

    const { data, isLoading, isFetching } = useAll({
        page,
        search: search || undefined,
        device_type: deviceType || undefined,
        // city: city || undefined,
        // country: country || undefined,
    });

    const visitors = data?.results || [];
    const totalPages = Math.ceil((data?.pagination?.count || 0) / PAGE_SIZE);

    if (isLoading) return <LoadingDisplay />;

    return (
        <div className="wrapper_page">
            <aside className="nav_container">
                <FilterHeader title={t('filters.title')} />
                <div className="scroll">
                <SearchInput
                    placeholder={t('search.placeholder')}
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

                <AccordionRadioFilter
                    title={t('device.title')}
                    items={deviceOptions}
                    selectedId={deviceType}
                    onChange={setDeviceType}
                    open={true}
                />

                </div>
            </aside>

            <div className="flex_container">
                <VisitorList
                    data={visitors}
                    isFetching={isFetching}
                    totalCount={data?.pagination?.count || 0}
                />
                {totalPages > 1 && (
                    <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
                )}
            </div>
        </div>
    );
    
};
/* ---------------------------------------------------------------------------------*/