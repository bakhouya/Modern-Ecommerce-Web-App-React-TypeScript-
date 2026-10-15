


import { useSettings } from '../../../context/settings/PublicSettingsContext';


interface Props {collapsed: boolean;}
export default function Logo({ collapsed }: Props) {

    const { settingsQuery } = useSettings();
    const settings = settingsQuery.data;

    return (
        <div className="sidebar__top">
            <div className="sidebar__logo">
            {!collapsed 
                ? (<img src={settings?.logo} alt="aurora" className=""/>)
                : (<img src={settings?.icon} alt="aurora" className=""/>)}
            </div>
        </div>
    )
}

