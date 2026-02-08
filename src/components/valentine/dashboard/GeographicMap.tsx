import { MapContainer, TileLayer, CircleMarker, Popup, Tooltip as LeafletTooltip } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { GEO_DATA } from "@/data/dashboardData";

// Needed to fix default icon issue in Leaflet with Webpack/Vite
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

const GeographicMap = () => {
    return (
        <div className="h-[400px] w-full rounded-xl overflow-hidden border border-border relative z-0">
            <h4 className="absolute top-4 right-4 z-[400] bg-background/90 backdrop-blur px-3 py-1 rounded-full text-xs font-semibold text-primary shadow-sm uppercase tracking-wider">
                Carte de la Pression Amoureuse
            </h4>
            <MapContainer
                center={[20, 0]}
                zoom={2}
                scrollWheelZoom={false}
                className="h-full w-full"
                style={{ background: '#242424' }}
            >
                {/* Dark mode styled tiles */}
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                    url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                />

                {GEO_DATA.map((location, idx) => (
                    <CircleMarker
                        key={idx}
                        center={[location.lat, location.lng]}
                        pathOptions={{
                            color: location.score > 80 ? '#d63031' : location.score > 70 ? '#e84393' : '#fd79a8',
                            fillColor: location.score > 80 ? '#d63031' : location.score > 70 ? '#e84393' : '#fd79a8',
                            fillOpacity: 0.6,
                            weight: 2
                        }}
                        radius={location.score / 3} // Size based on score
                    >
                        <Popup className="custom-popup">
                            <div className="p-2 text-center">
                                <h3 className="font-bold text-lg text-foreground">{location.city}</h3>
                                <p className="text-xs text-muted-foreground uppercase tracking-widest mb-2">{location.label}</p>
                                <div className="space-y-1 text-sm">
                                    <div className="flex justify-between gap-4">
                                        <span>Pression:</span>
                                        <span className="font-bold text-primary">{location.score}/100</span>
                                    </div>
                                    <div className="flex justify-between gap-4">
                                        <span>Budget:</span>
                                        <span className="font-bold">{location.budget}€</span>
                                    </div>
                                </div>
                            </div>
                        </Popup>
                        <LeafletTooltip direction="top" offset={[0, -10]} opacity={1}>
                            <span className="font-bold">{location.city}</span>
                        </LeafletTooltip>
                    </CircleMarker>
                ))}
            </MapContainer>
        </div>
    );
};

export default GeographicMap;
