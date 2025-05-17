"use client";

import { useState } from "react";
import * as querys from "@/lib/querys";
import SimpleModal from "./SimpleModal";
import { useUser } from "@/context/UserContext";
import {
    MapContainer,
    TileLayer,
    Marker,
    Popup,
    useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const CATEGORIES = [
    { id: "medical", name: "Médica" },
    { id: "fire", name: "Incendio" },
    { id: "security", name: "Seguridad" },
    { id: "natural_disaster", name: "Desastre natural" },
    { id: "infrastructure", name: "Infraestructura" },
    { id: "traffic", name: "Tránsito" },
    { id: "vulnerable_people", name: "Personas vulnerables" },
    { id: "other", name: "Otro" },
];

function UbicacionSelector({ onSelect }) {
    useMapEvents({
        click(e) {
            const { lat, lng } = e.latlng;
            onSelect({ lat, lng });
        },
    });
    return null;
}

const AddReportModal = ({ isOpen, onClose }) => {
    const [textAlert, setTextAlert] = useState("");
    const [textAlertIsVisible, setTextAlertIsVisible] = useState(false);
    const { user } = useUser();
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        by_user: user.email,
        locate: null,
        category: "",
        is_anonymous: 0,
    });

    if (!isOpen) return null;

    const locationFromUser = user.location
        ? {
              lat: parseFloat(user.location.split(",")[0]),
              lng: parseFloat(user.location.split(",")[1]),
          }
        : null;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleCheckboxChange = (e) => {
        const { name, checked } = e.target;
        setFormData((prev) => ({ ...prev, [name]: checked ? 1 : 0 }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        let resQuery = await querys.addReport({
            ...formData,
            locate: `${formData.location.lat},${formData.location.lng}`,
        });

        if (resQuery.status === 200) {
            setTextAlert(resQuery.message);
            setTextAlertIsVisible(true);
            setFormData({
                title: "",
                description: "",
                by_user: user.email,
                locate: "",
                category: "",
                is_anonymous: 0,
            });
        } else {
            setTextAlert(resQuery.message);
            setTextAlertIsVisible(true);
        }
    };

    // Close modal when clicking outside or pressing Escape
    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
        // e.target: es el elemento exacto sobre el que hiciste clic.
        // e.currentTarget: es el elemento que tiene el onClick asignado (el backdrop en este caso).
    };

    const userLocationIcon = new L.Icon({
        iconUrl: "/icons/location_user_mark.png",
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32],
        shadowUrl: null,
    });

    const reportLocationIcon = new L.Icon({
        iconUrl: "/icons/red_alert.png",
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32],
        shadowUrl: null,
    });

    return (
        <>
            <div
                className="fixed inset-0 bg-black/40 bg-opacity-50 z-20 flex items-center justify-center p-4"
                onClick={handleBackdropClick}
            >
                <div className="bg-white rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
                    <div className="p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-2xl font-bold text-gray-900">
                                Crear Reporte de Emergencia
                            </h2>
                            <button
                                onClick={onClose}
                                className="text-gray-500 hover:text-gray-700 focus:outline-none cursor-pointer"
                                aria-label="Cerrar"
                            >
                                <svg
                                    className="h-6 w-6"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label
                                    htmlFor="title"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Título
                                </label>
                                <input
                                    type="text"
                                    id="title"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    required
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
                                    placeholder="Ej: Incendio en edificio residencial"
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="description"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Descripción
                                </label>
                                <textarea
                                    id="description"
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    required
                                    rows={4}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
                                    placeholder="Describe la situación con el mayor detalle posible..."
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="category"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Categoría
                                </label>
                                <select
                                    id="category"
                                    name="category"
                                    value={formData.category}
                                    onChange={handleChange}
                                    required
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
                                >
                                    <option value="" disabled>
                                        Selecciona una categoría
                                    </option>
                                    {CATEGORIES.map((category) => (
                                        <option
                                            key={category.id}
                                            value={category.id}
                                        >
                                            {category.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Selecciona la ubicación
                                </label>
                                <div className="w-full h-64 rounded overflow-hidden">
                                    <MapContainer
                                        center={
                                            locationFromUser
                                                ? [
                                                      locationFromUser.lat,
                                                      locationFromUser.lng,
                                                  ]
                                                : [20.6736, -103.344] // valor por defecto si no hay geolocalización
                                        }
                                        zoom={13}
                                        className="h-full w-full z-10"
                                    >
                                        <TileLayer
                                            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>'
                                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                        />

                                        {/* Marcador fijo: ubicación del usuario */}
                                        {locationFromUser && (
                                            <Marker
                                                position={[
                                                    locationFromUser.lat,
                                                    locationFromUser.lng,
                                                ]}
                                                icon={userLocationIcon}
                                            >
                                                <Popup>Tu ubicación</Popup>
                                            </Marker>
                                        )}

                                        {/* Selector: guardar nueva ubicación al hacer clic */}
                                        <UbicacionSelector
                                            onSelect={(coords) =>
                                                setFormData((prev) => ({
                                                    ...prev,
                                                    location: coords,
                                                }))
                                            }
                                        />

                                        {/*  Marcador del reporte */}
                                        {formData.location && (
                                            <Marker
                                                position={[
                                                    formData.location.lat,
                                                    formData.location.lng,
                                                ]}
                                                icon={reportLocationIcon}
                                            >
                                                <Popup>
                                                    Ubicación del reporte
                                                </Popup>
                                            </Marker>
                                        )}
                                    </MapContainer>
                                </div>
                                {!formData.location && (
                                    <p className="text-xs text-gray-500 mt-1">
                                        Da clic en el mapa para elegir la
                                        ubicación.
                                    </p>
                                )}
                            </div>

                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    id="is_anonymous"
                                    name="is_anonymous"
                                    checked={formData.is_anonymous}
                                    onChange={handleCheckboxChange}
                                    className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded accent-red-600"
                                />
                                <label
                                    htmlFor="is_anonymous"
                                    className="ml-2 block text-sm text-gray-700"
                                >
                                    Reportar de forma anónima
                                </label>
                            </div>

                            <div className="flex justify-end space-x-3 pt-4">
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 cursor-pointer"
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500x cursor-pointer"
                                >
                                    Crear Reporte
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <SimpleModal
                isVisible={textAlertIsVisible}
                onClose={() => setTextAlertIsVisible(false)}
            >
                {textAlert}
            </SimpleModal>
        </>
    );
};
export default AddReportModal;
