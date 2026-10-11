


import { ShoppingCartIcon, TruckIcon, ReceiptIcon} from "lucide-react";
import { useMemo, useState } from "react" ;
import { useTranslation } from 'react-i18next';

import { AnimatedTransition } from "../../../../components/boxs/AnimatedTransition";
import UpdateSettingsOrderInvoices from "../../../../widgets/dashboard/settings/OrderInvoiceSettingView";
import UpdateSettingsDeliveryInvoices from "../../../../widgets/dashboard/settings/DeliveryInvoiceSettingView";
import UpdateSettingsSalesInvoices from "../../../../widgets/dashboard/settings/SalesInvoiceSettingView";

import { OrderInvoiceSettingsProvider } from "../../../../context/settings/OrderInvoiceSettingsContext";
import { DeliveryInvoiceSettingsProvider } from "../../../../context/settings/DeliveryInvoiceSettingsContext";
import { SalesInvoiceSettingsProvider } from "../../../../context/settings/SalesInvoiceSettingsContext";
import { SearchInput } from "../../../../components/ui/SearchInput";
import TabListBlock from "../../../../components/forms/AnimatedTabList";

export default function SettingsInvoices() {
    const { t } = useTranslation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const menuItems = [
        {
            id: 1,
            label: t('orderSettings.pageTitle'),
            icon: <ShoppingCartIcon size={17} />,
        },
        {
            id: 2,
            label: t('deliverySettings.pageTitle'),
            icon: <TruckIcon size={17} />,
        },
        {
            id: 3,
            label: t('salesSettings.pageTitle'),
            icon: <ReceiptIcon size={17} />,
        },
    ];

    const [screen, setScreen] = useState(1);
    const [search, setSearch] = useState("");

    const filteredMenuItems = useMemo(() => {
        return menuItems.filter(item => item.label.toLowerCase().includes(search.toLowerCase()));
    }, [search, menuItems]);

    const selectedLabel = menuItems.find(item => item.id === screen)?.label || "";

    return (
        <section className="wrapper_page">

            <aside className="nav_container">
                <div className="nav_body">
                    <SearchInput placeholder={t('search.placeholder')} value={search} onChange={(e) => setSearch(e.target.value)}/>
                    <TabListBlock items={filteredMenuItems} activeItem={screen} onChange={setScreen}/>
                </div>
            </aside>

            <div className="flex_container">

                <AnimatedTransition transitionKey={`screen-${screen}`} direction="up" duration={0.2}>

                    <OrderInvoiceSettingsProvider>
                        {screen == 1 && (<UpdateSettingsOrderInvoices pageTitle={selectedLabel}/>)}
                    </OrderInvoiceSettingsProvider>

                    <DeliveryInvoiceSettingsProvider>
                        {screen == 2 && (<UpdateSettingsDeliveryInvoices pageTitle={selectedLabel}/>)}
                    </DeliveryInvoiceSettingsProvider>

                    <SalesInvoiceSettingsProvider>
                        {screen == 3 && (<UpdateSettingsSalesInvoices pageTitle={selectedLabel}/>)} 
                    </SalesInvoiceSettingsProvider>
                                      
                </AnimatedTransition>
            </div>

        </section>
    );
}