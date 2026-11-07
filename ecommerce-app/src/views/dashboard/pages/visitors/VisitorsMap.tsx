




// import { MapPin, Users, MapPinned, MapPinOff, Monitor, Smartphone, Tablet, RefreshCw, ChevronRight} from "lucide-react";
// import { MapContainer, TileLayer, CircleMarker, Popup, ZoomControl, useMap} from "react-leaflet";
// import { useEffect, useMemo, useState } from "react";
// import "leaflet/dist/leaflet.css";

// import type { VisitorMapLocation } from "../../../../types/statisticsTypes";
// import { useVisitorMapQuery } from "../../../../controllers/useStatistics";
// import { LoadingDisplay } from "../../../../components/ui/LoadingDisplay";
// import { NotFound } from "../../../../components/ui/NoutFound";
// import SearchableSelect from "../../../../components/forms/SearchableSelect";

// const DEFAULT_CENTER: [number, number] = [25, 0];

// const formatDate = (date: string) => new Intl.DateTimeFormat("fr-FR", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit"}).format(new Date(date));

// const getDeviceIcon = (device: string) => {
//   switch (device.toLowerCase()) {
//     case "mobile":
//       return <Smartphone size={15} />;
//     case "tablet":
//       return <Tablet size={15} />;
//     default:
//       return <Monitor size={15} />;
//   }
// };

// const getVisitorLocation = (visitor: VisitorMapLocation) => [visitor.city, visitor.country].filter(Boolean).join(", ") || "Localisation inconnue";


// function FitVisitorsBounds({visitors}: {visitors: VisitorMapLocation[];}) {
//   const map = useMap();

//   useEffect(() => {
//     if (!visitors.length) return;

//     if (visitors.length === 1) {
//       map.setView([visitors[0].latitude, visitors[0].longitude], 7);
//       return;
//     }
//     const bounds = visitors.map((visitor) => [visitor.latitude, visitor.longitude] as [number, number]);

//     map.fitBounds(bounds, {padding: [45, 45], maxZoom: 7,});
//   }, [map, visitors]);
//   return null;
// }


// const VisitorsMap = () => {
//   const { data, isLoading, isError, refetch, isFetching} = useVisitorMapQuery();

//   const [search, setSearch] = useState("");
//   const [selectedCountry, setSelectedCountry] = useState("all");

//   const visitors = data?.results ?? [];

//   const countries = useMemo(() =>
//       Array.from(new Set(visitors.map((visitor) => visitor.country).filter((country): country is string => Boolean(country)))).sort(), [visitors]
//   );

//   const filteredVisitors = useMemo(() => {
//     const normalizedSearch = search.trim().toLowerCase();

//     return visitors.filter((visitor) => {
//       const matchesSearch = [ visitor.city, visitor.country, visitor.country_code, visitor.device_type].filter(Boolean).some((value) => value!.toLowerCase().includes(normalizedSearch));

//       const matchesCountry = selectedCountry === "all" || visitor.country === selectedCountry;
//       return matchesSearch && matchesCountry;
//     });
//   }, [visitors, search, selectedCountry]);

//   if (isLoading) {return (<LoadingDisplay/>);}

//   if (isError || !data) {return (<NotFound/>);}

//   return (
//     <main className="visitors-map-page">

//       <header className="visitors-map-header">
//         <div className="visitors-map-heading">
//           <div className="visitors-map-heading-icon"><MapPin size={24} /></div>
//           <div>
//             <div className="text text_lg weight_600">Carte des visiteurs</div>
//             <div className="text text_sm">Visualisez les emplacements géographiques de vos visiteurs.</div>
//           </div>
//         </div>

//         <button className="visitors-map-refresh" onClick={() => refetch()} disabled={isFetching}>
//           <RefreshCw size={16} className={isFetching ? "is-spinning" : ""}/>
//           <div className="text text_xs"> Actualiser </div>
//         </button>
//       </header>

//       <section className="visitors-map-stats">

//         <article className="visitors-map-stat-card">
//           <div className="visitors-map-stat-icon visitors-map-stat-icon--blue">
//             <Users size={34} />
//           </div>
//           <div className="visitors-map-stat-content">
//             <span className="text text_sm">Total des visiteurs</span>
//             <div className="flex_start_center gap_10">
//                 <strong className="text text_xl text_primary">{data.total_visitors}</strong>
//                 <small className="text text_xs">Tous les enregistrements</small>
//             </div>
            
//           </div>
//         </article>

//         <article className="visitors-map-stat-card">
//           <div className="visitors-map-stat-icon visitors-map-stat-icon--green">
//             <MapPinned size={34} />
//           </div>
//           <div className="visitors-map-stat-content">
//             <span className="text text_sm">Avec localisation</span>
//             <div className="flex_start_center gap_10">
//                 <strong className="text text_xl text_primary">{data.visitors_with_location}</strong>
//                 <small className="text text_xs">Coordonnées disponibles</small>
//             </div>
//           </div>
//         </article>

//         <article className="visitors-map-stat-card">
//           <div className="visitors-map-stat-icon visitors-map-stat-icon--red">
//             <MapPinOff size={34} />
//           </div>
//           <div className="visitors-map-stat-content">
//             <span className="text text_sm">Sans localisation</span>
//             <div className="flex_start_center gap_10">
//                 <strong className="text text_xl text_primary">{data.visitors_without_location}</strong>
//                 <small className="text text_xs">Coordonnées indisponibles</small>
//             </div>
//           </div>
//         </article>

//       </section>

//       <section className="visitors-map-layout">
//         <article className="visitors-map-map-card">
//           <div className="visitors-map-card-header">
//             <div>
//               <div className="text text_lg weight_600">Répartition géographique</div>
//               <div className="text text_sm"> {filteredVisitors.length} visiteur(s) affiché(s) sur la carte</div>
//             </div>

//             <div className="visitors-map-live">
//               <span></span>
//               <div className="text text_xs"> Données disponibles  </div>
//             </div>

//           </div>

//           <div className="visitors-map-controls">
//             <label className="visitors-map-search">
//               <MapPin size={24} />
//               <input type="search" placeholder="Rechercher une ville ou un pays..." value={search} onChange={(event) => setSearch(event.target.value)}/>
//             </label>
//             <div className="select_map">
//                 <SearchableSelect
//                     options={[
//                         {value: "all", label: "Tous les pays"}, ...countries.map((country) => ({value: country, label: country,})),
//                     ]}
//                     value={selectedCountry}
//                     onChange={setSelectedCountry}
//                     placeholder="Rechercher un pays..."/>
//             </div>

//           </div>

//           <div className="visitors-map-canvas">
//             <MapContainer
//               center={DEFAULT_CENTER}
//               zoom={2}
//               minZoom={2}
//               maxZoom={15}
//               scrollWheelZoom
//               zoomControl={false}
//               worldCopyJump
//               className="visitors-leaflet-map"
//             >
//             <TileLayer
//                 attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//                 url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
//             />

//               <ZoomControl position="topleft" />

//               <FitVisitorsBounds visitors={filteredVisitors} />

//               {filteredVisitors.map((visitor) => (
//                 <CircleMarker
//                   key={visitor.id}
//                   center={[visitor.latitude, visitor.longitude]}
//                   radius={7}
//                   pathOptions={{
//                     color: "#a5b4fc",
//                     weight: 2,
//                     fillColor: "#6557f5",
//                     fillOpacity: 0.95,
//                   }}
//                 >
//                   <Popup>
//                     <div className="visitor-map-popup">
//                       <strong>{getVisitorLocation(visitor)}</strong>
//                       <span>
//                         {visitor.country_code ?? "Code pays indisponible"}
//                       </span>
//                       <span className="visitor-map-popup-device">
//                         {getDeviceIcon(visitor.device_type)}
//                         {visitor.device_type}
//                       </span>
//                       <time>{formatDate(visitor.created_at)}</time>
//                     </div>
//                   </Popup>
//                 </CircleMarker>
//               ))}
//             </MapContainer>

//             {filteredVisitors.length === 0 && (
//               <div className="visitors-map-empty-overlay">
//                 <MapPinOff size={28} />
//                 <strong>Aucun visiteur trouvé</strong>
//                 <span>Modifiez vos critères de recherche.</span>
//               </div>
//             )}
//           </div>

//           <footer className="visitors-map-map-footer">
//             <span>
//               <i className="visitors-map-legend-dot" />
//               Emplacement d'un visiteur
//             </span>
//             <span>
//               <MapPin size={15} />
//               {filteredVisitors.length} emplacement(s)
//             </span>
//           </footer>
//         </article>

//         <aside className="visitors-map-recent-card">
//           <div className="visitors-map-card-header">
//             <div>
//               <div className="text text_lg weight_600">Visiteurs récents</div>
//               <div className="text text_sm">Dernières visites enregistrées</div>
//             </div>
//             <span className="visitors-map-count">
//               {filteredVisitors.length}
//             </span>
//           </div>

//           <div className="visitors-map-visitor-list">
//             {filteredVisitors.map((visitor) => (
//               <article
//                 className="visitors-map-visitor"key={visitor.id}>

//                 <div className="visitors-map-visitor-icon">
//                   <MapPin size={20} />
//                 </div>

//                 <div className="visitors-map-visitor-info">
//                      <div className="flex_start_center gap_10">
//                         <div className="text text_sm weight_600">{visitor.city || "Ville inconnue"}</div>
//                         <div className="slash"></div>
//                         <div className="text text_sm">
//                             {visitor.country || "Pays inconnu"}
//                             {visitor.country_code ? ` (${visitor.country_code})`: ""}
//                         </div>
//                     </div>
//                     <small className="text text_sm"> {getDeviceIcon(visitor.device_type)} {visitor.device_type}</small>
//                 </div>
//                 <div className="flex_start_center gap_10">
//                     <div className="text text_xs">{formatDate(visitor.created_at)}</div>
//                     <ChevronRight size={20} className="visitors-map-visitor-chevron"/>
//                 </div>
//               </article>
//             ))}

//             {filteredVisitors.length === 0 && ( <NotFound/> )}
//           </div>
//         </aside>
//       </section>

//     </main>
//   );
// };

// export default VisitorsMap;



import { MapPin, Users, MapPinned, MapPinOff, Monitor, Smartphone, Tablet, RefreshCw, ChevronRight} from "lucide-react";
import { MapContainer, TileLayer, CircleMarker, Popup, ZoomControl, useMap} from "react-leaflet";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import "leaflet/dist/leaflet.css";

import type { VisitorMapLocation } from "../../../../types/statisticsTypes";
import { useVisitorMapQuery } from "../../../../controllers/useStatistics";
import { LoadingDisplay } from "../../../../components/ui/LoadingDisplay";
import { NotFound } from "../../../../components/ui/NoutFound";
import SearchableSelect from "../../../../components/forms/SearchableSelect";

const DEFAULT_CENTER: [number, number] = [25, 0];

const formatDate = (date: string, locale: string) => new Intl.DateTimeFormat(locale, { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit"}).format(new Date(date));

const getDeviceIcon = (device: string) => {
  switch (device.toLowerCase()) {
    case "mobile":
      return <Smartphone size={15} />;
    case "tablet":
      return <Tablet size={15} />;
    default:
      return <Monitor size={15} />;
  }
};

const getVisitorLocation = (visitor: VisitorMapLocation) => [visitor.city, visitor.country].filter(Boolean).join(", ") || "unknown_location";


function FitVisitorsBounds({visitors}: {visitors: VisitorMapLocation[];}) {
  const map = useMap();

  useEffect(() => {
    if (!visitors.length) return;

    if (visitors.length === 1) {
      map.setView([visitors[0].latitude, visitors[0].longitude], 7);
      return;
    }
    const bounds = visitors.map((visitor) => [visitor.latitude, visitor.longitude] as [number, number]);

    map.fitBounds(bounds, {padding: [45, 45], maxZoom: 7,});
  }, [map, visitors]);
  return null;
}


const VisitorsMap = () => {
  const { t, i18n } = useTranslation();
  const { data, isLoading, isError, refetch, isFetching} = useVisitorMapQuery();

  const [search, setSearch] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("all");

  const visitors = data?.results ?? [];

  const countries = useMemo(() =>
      Array.from(new Set(visitors.map((visitor) => visitor.country).filter((country): country is string => Boolean(country)))).sort(), [visitors]
  );

  const filteredVisitors = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return visitors.filter((visitor) => {
      const matchesSearch = [ visitor.city, visitor.country, visitor.country_code, visitor.device_type].filter(Boolean).some((value) => value!.toLowerCase().includes(normalizedSearch));

      const matchesCountry = selectedCountry === "all" || visitor.country === selectedCountry;
      return matchesSearch && matchesCountry;
    });
  }, [visitors, search, selectedCountry]);

  if (isLoading) {return (<LoadingDisplay/>);}

  if (isError || !data) {return (<NotFound/>);}

  return (
    <main className="visitors-map-page">

      <header className="visitors-map-header">
        <div className="visitors-map-heading">
          <div className="visitors-map-heading-icon"><MapPin size={24} /></div>
          <div>
            <div className="text text_lg weight_600">{t("visitors_map.title")}</div>
            <div className="text text_sm">{t("visitors_map.subtitle")}</div>
          </div>
        </div>

        <button className="visitors-map-refresh" onClick={() => refetch()} disabled={isFetching}>
          <RefreshCw size={16} className={isFetching ? "is-spinning" : ""}/>
          <div className="text text_xs"> {t("visitors_map.refresh")} </div>
        </button>
      </header>

      <section className="visitors-map-stats">

        <article className="visitors-map-stat-card">
          <div className="visitors-map-stat-icon visitors-map-stat-icon--blue">
            <Users size={34} />
          </div>
          <div className="visitors-map-stat-content">
            <span className="text text_sm">{t("visitors_map.total_visitors")}</span>
            <div className="flex_start_center gap_10">
                <strong className="text text_xl text_primary">{data.total_visitors}</strong>
                <small className="text text_xs">{t("visitors_map.all_records")}</small>
            </div>
            
          </div>
        </article>

        <article className="visitors-map-stat-card">
          <div className="visitors-map-stat-icon visitors-map-stat-icon--green">
            <MapPinned size={34} />
          </div>
          <div className="visitors-map-stat-content">
            <span className="text text_sm">{t("visitors_map.with_location")}</span>
            <div className="flex_start_center gap_10">
                <strong className="text text_xl text_primary">{data.visitors_with_location}</strong>
                <small className="text text_xs">{t("visitors_map.coordinates_available")}</small>
            </div>
          </div>
        </article>

        <article className="visitors-map-stat-card">
          <div className="visitors-map-stat-icon visitors-map-stat-icon--red">
            <MapPinOff size={34} />
          </div>
          <div className="visitors-map-stat-content">
            <span className="text text_sm">{t("visitors_map.without_location")}</span>
            <div className="flex_start_center gap_10">
                <strong className="text text_xl text_primary">{data.visitors_without_location}</strong>
                <small className="text text_xs">{t("visitors_map.coordinates_unavailable")}</small>
            </div>
          </div>
        </article>

      </section>

      <section className="visitors-map-layout">
        <article className="visitors-map-map-card">
          <div className="visitors-map-card-header">
            <div>
              <div className="text text_lg weight_600">{t("visitors_map.geographic_distribution")}</div>
              <div className="text text_sm"> {t("visitors_map.visitors_displayed", { count: filteredVisitors.length })}</div>
            </div>

            <div className="visitors-map-live">
              <span></span>
              <div className="text text_xs"> {t("visitors_map.data_available")}  </div>
            </div>

          </div>

          <div className="visitors-map-controls">
            <label className="visitors-map-search">
              <MapPin size={24} />
              <input type="search" placeholder={t("visitors_map.search_placeholder")} value={search} onChange={(event) => setSearch(event.target.value)}/>
            </label>
            <div className="select_map">
                <SearchableSelect
                    options={[
                        {value: "all", label: t("visitors_map.all_countries")}, ...countries.map((country) => ({value: country, label: country,})),
                    ]}
                    value={selectedCountry}
                    onChange={setSelectedCountry}
                    placeholder={t("visitors_map.search_country_placeholder")}/>
            </div>

          </div>

          <div className="visitors-map-canvas">
            <MapContainer
              center={DEFAULT_CENTER}
              zoom={2}
              minZoom={2}
              maxZoom={15}
              scrollWheelZoom
              zoomControl={false}
              worldCopyJump
              className="visitors-leaflet-map"
            >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

              <ZoomControl position="topleft" />

              <FitVisitorsBounds visitors={filteredVisitors} />

              {filteredVisitors.map((visitor) => (
                <CircleMarker
                  key={visitor.id}
                  center={[visitor.latitude, visitor.longitude]}
                  radius={7}
                  pathOptions={{
                    color: "#a5b4fc",
                    weight: 2,
                    fillColor: "#6557f5",
                    fillOpacity: 0.95,
                  }}
                >
                  <Popup>
                    <div className="visitor-map-popup">
                      <strong>{getVisitorLocation(visitor) === "unknown_location" ? t("visitors_map.unknown_location") : getVisitorLocation(visitor)}</strong>
                      <span>
                        {visitor.country_code ?? t("visitors_map.country_code_unavailable")}
                      </span>
                      <span className="visitor-map-popup-device">
                        {getDeviceIcon(visitor.device_type)}
                        {visitor.device_type}
                      </span>
                      <time>{formatDate(visitor.created_at, i18n.language)}</time>
                    </div>
                  </Popup>
                </CircleMarker>
              ))}
            </MapContainer>

            {filteredVisitors.length === 0 && (
              <div className="visitors-map-empty-overlay">
                <MapPinOff size={28} />
                <strong>{t("visitors_map.no_visitor_found")}</strong>
                <span>{t("visitors_map.modify_search_criteria")}</span>
              </div>
            )}
          </div>

          <footer className="visitors-map-map-footer">
            <span>
              <i className="visitors-map-legend-dot" />
              {t("visitors_map.visitor_location")}
            </span>
            <span>
              <MapPin size={15} />
              {t("visitors_map.locations_count", { count: filteredVisitors.length })}
            </span>
          </footer>
        </article>

        <aside className="visitors-map-recent-card">
          <div className="visitors-map-card-header">
            <div>
              <div className="text text_lg weight_600">{t("visitors_map.recent_visitors")}</div>
              <div className="text text_sm">{t("visitors_map.latest_visits")}</div>
            </div>
            <span className="visitors-map-count">
              {filteredVisitors.length}
            </span>
          </div>

          <div className="visitors-map-visitor-list">
            {filteredVisitors.map((visitor) => (
              <article
                className="visitors-map-visitor"key={visitor.id}>

                <div className="visitors-map-visitor-icon">
                  <MapPin size={20} />
                </div>

                <div className="visitors-map-visitor-info">
                     <div className="flex_start_center gap_10">
                        <div className="text text_sm weight_600">{visitor.city || t("visitors_map.unknown_city")}</div>
                        <div className="slash"></div>
                        <div className="text text_sm">
                            {visitor.country || t("visitors_map.unknown_country")}
                            {visitor.country_code ? ` (${visitor.country_code})`: ""}
                        </div>
                    </div>
                    <small className="text text_sm"> {getDeviceIcon(visitor.device_type)} {visitor.device_type}</small>
                </div>
                <div className="flex_start_center gap_10">
                    <div className="text text_xs">{formatDate(visitor.created_at, i18n.language)}</div>
                    <ChevronRight size={20} className="visitors-map-visitor-chevron"/>
                </div>
              </article>
            ))}

            {filteredVisitors.length === 0 && ( <NotFound/> )}
          </div>
        </aside>
      </section>

    </main>
  );
};

export default VisitorsMap;
