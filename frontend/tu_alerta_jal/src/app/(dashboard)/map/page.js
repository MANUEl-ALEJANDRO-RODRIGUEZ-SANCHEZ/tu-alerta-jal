"use client";

import { useState, useEffect } from "react";
import { getNearbyReports } from "@/lib/maps";
import { useUser } from "@/context/UserContext";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const Map = () => {
    const { user } = useUser();
    const [nearbyReports, setNearbyReports] = useState([]);
    const [userLat, setUserLat] = useState(null);
    const [userLng, setUserLng] = useState(null);

    useEffect(() => {
        const fetchReports = async () => {
            if (!user.location) return;

            const [latStr, lngStr] = user.location.split(",");
            const lat = parseFloat(latStr);
            const lng = parseFloat(lngStr);
            setUserLat(lat);
            setUserLng(lng);

            const radius = 10;
            const res = await getNearbyReports(lat, lng, radius);
            if (res.status === 200) {
                setNearbyReports(res.data);
            }
        };

        fetchReports();
    }, [user.location]);

    const userLocationIcon = new L.Icon({
        iconUrl: "/icons/location_user_mark.png",
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32],
    });

    const reportLocationIcon = new L.Icon({
        iconUrl: "/icons/red_alert.png",
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32],
    });

    return (
        <div className="h-screen grid place-items-center">
            <div className="w-full h-full rounded overflow-hidden m-auto">
                <MapContainer
                    center={
                        userLat && userLng
                            ? [userLat, userLng]
                            : [20.6736, -103.344]
                    }
                    zoom={15}
                    className="h-full w-full z-10"
                >
                    <TileLayer
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />

                    {/* Ubicación del usuario */}
                    {userLat && userLng && (
                        <Marker
                            position={[userLat, userLng]}
                            icon={userLocationIcon}
                        >
                            <Popup>Tu ubicación</Popup>
                        </Marker>
                    )}

                    {/* Marcadores de reportes cercanos */}
                    {nearbyReports.map((report) => {
                        const [lat, lng] = report.locate
                            .split(",")
                            .map(parseFloat);
                        return (
                            <Marker
                                key={report.id}
                                position={[lat, lng]}
                                icon={reportLocationIcon}
                            >
                                <Popup>
                                    <strong>{report.title}</strong>
                                    <br />
                                    {report.description}
                                    <br />
                                    <span className="text-xs text-gray-500">
                                        Categoría: {report.category}
                                    </span>
                                </Popup>
                            </Marker>
                        );
                    })}
                </MapContainer>
            </div>
        </div>
    );
};

export default Map;
