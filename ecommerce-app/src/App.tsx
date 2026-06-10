import './App.css'
import { useEffect } from "react";
import RouterUrl from "./routers/routers"
import { RouterProvider} from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import { SettingsProvider } from './context/settings/PublicSettingsContext';
import { HeadMeta } from './components/boxs/HeadMeta';
// import "swiper/css";

export default function App() {

    useEffect(() => {AOS.init({duration: 400,});}, []); 
    
    return (
        <SettingsProvider>
            <HeadMeta />
            <RouterProvider router={RouterUrl} /> 
        </SettingsProvider>
        
    );

}


