

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

const defaultIcon = new Icon({ iconUrl: markerIcon, shadowUrl: markerShadow, iconSize: [25, 41], iconAnchor: [12, 41]});
interface VisitorMapProps { lat: number; lng: number; city?: string; country?: string;}

export const VisitorMap = ({ lat, lng, city, country }: VisitorMapProps) => {
    
    // const position: [number, number] = [33.5731, -7.5898];
    const position: [number, number] = [lat, lng];

    return (
        <div className="visitor-map-container">
        <MapContainer
            center={position}
            zoom={8}
            scrollWheelZoom={false}
            style={{ height: '200px', width: '100%', borderRadius: '4px', backgroundColor: '#F9F9F9' }}
        >
            <TileLayer 
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
            <Marker position={position} icon={defaultIcon}>
                <Popup>{city && country ? `${city}, ${country}` : position.join(', ')}</Popup>
            </Marker>
        </MapContainer>
        </div>
    );
};