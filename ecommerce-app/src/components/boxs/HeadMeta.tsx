

import { useEffect } from 'react';
import { useSettings } from '../../context/settings/PublicSettingsContext';

export const HeadMeta = () => {
    const { settingsQuery } = useSettings();
    const settings = settingsQuery.data;

    useEffect(() => {
        if (settings) {
            document.title = settings.meta_title || settings.title || 'Mon Application';

            let metaDescription = document.querySelector('meta[name="description"]');
            if (!metaDescription) {
                metaDescription = document.createElement('meta');
                metaDescription.setAttribute('name', 'description');
                document.head.appendChild(metaDescription);
            }
            metaDescription.setAttribute('content', settings.meta_description || settings.description);

            let metaKeywords = document.querySelector('meta[name="keywords"]');
            if (!metaKeywords) {
                metaKeywords = document.createElement('meta');
                metaKeywords.setAttribute('name', 'keywords');
                document.head.appendChild(metaKeywords);
            }
            metaKeywords.setAttribute('content', settings.meta_keywords || '');

            if (settings.icon) {
                let linkIcon = document.querySelector("link[rel*='icon']") as HTMLLinkElement;
                if (!linkIcon) {
                    linkIcon = document.createElement('link');
                    linkIcon.rel = 'icon';
                    document.head.appendChild(linkIcon);
                }
                linkIcon.href = settings.icon;
            }
        }
    }, [settings]);

    return null; 

};





