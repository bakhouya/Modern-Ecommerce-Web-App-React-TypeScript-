import './App.css'
import { useEffect } from "react";
import RouterUrl from "./routers/routers"
import { RouterProvider} from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import { SettingsProvider } from './context/settings/PublicSettingsContext';
import { HeadMeta } from './components/boxs/HeadMeta';
import { useTranslation } from 'react-i18next';

export default function App() {
    const { i18n } = useTranslation();
    useEffect(() => {AOS.init({duration: 400,});}, []); 
    useEffect(() => {document.documentElement.dir = i18n.language === 'ar' ? 'rtl' : 'ltr';}, [i18n.language]);
    
    return (
        <SettingsProvider>
            <HeadMeta />
            <RouterProvider router={RouterUrl} /> 
        </SettingsProvider>
        
    );

}


