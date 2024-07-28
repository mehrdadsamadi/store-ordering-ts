import { MapContainer, TileLayer, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import L from 'leaflet';
import 'leaflet-routing-machine';
import { useEffect } from 'react';
import { MapPin } from 'lucide-react';

// تنظیم آیکون پیش‌فرض leaflet
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface RoutingProps {
    map: L.Map | null;
    startPoint: [number, number];
    endPoint: [number, number];
}

function Routing({ map, startPoint, endPoint }: RoutingProps) {
    useEffect(() => {
        if (!map) return;

        const routingControl = L.Routing.control({
            waypoints: [
                L.latLng(startPoint[0], startPoint[1]), // نقطه شروع
                L.latLng(endPoint[0], endPoint[1])     // نقطه پایان
            ],
            routeWhileDragging: true
        }).addTo(map);

        return () => {
            map.removeControl(routingControl);
        };
    }, [map, startPoint, endPoint]);

    return null;
}

interface MyComponentProps {
    onMove: (center: [number, number]) => void;
    canRouting: boolean;
    startPoint: [number, number];
    endPoint: [number, number];
}

function MyComponent({ onMove, canRouting, startPoint, endPoint }: MyComponentProps) {
    const map = useMapEvents({
        moveend: () => {
            if (!canRouting) {
                const center = map.getCenter();
                onMove([center.lat, center.lng]);
            }
        }
    });

    return canRouting ? <Routing map={map} startPoint={startPoint} endPoint={endPoint} /> : null;
}

interface MapProps {
    setStoreLoc: (center: [number, number]) => void;
    canMove?: boolean;
    center?: [number, number];
    canRouting?: boolean;
    startPoint?: [number, number];
    endPoint?: [number, number];
}

export default function Map({ setStoreLoc, canMove = true, center = [35.715298, 51.404343], canRouting = false, startPoint = [0, 0], endPoint = [0, 0] }: MapProps) {
    return (
        <div className='w-full h-full relative'>
            <MapContainer
                center={center}
                zoom={canMove ? 14 : 16}
                scrollWheelZoom={canMove}
                dragging={canMove}
                zoomControl={canMove}
                className='w-full h-full z-10'
            >
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <MyComponent onMove={setStoreLoc} canRouting={canRouting} startPoint={startPoint} endPoint={endPoint} />
            </MapContainer>
            {
                !canRouting && (
                    <div className='z-50 absolute' style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                        <MapPin color='#1A1D21' className='size-12' />
                    </div>
                )
            }
        </div>
    );
}