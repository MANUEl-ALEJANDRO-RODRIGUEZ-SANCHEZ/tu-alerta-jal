"use client";

import { useState, useEffect } from "react";
import { redirect } from "next/navigation";
import { useUser } from "@/context/UserContext";
import Link from "next/link";
import AddReportModal from "@/components/AddReportModal";
import { getLatestReports } from "@/lib/querys";

export default function HomePage() {
    const { user, setUserSession } = useUser();
    const [isAddReportModalVisible, setIsAddReportModalVisible] =
        useState(false);
    const [recentReports, setRecentReports] = useState([]);

    if (!user || user.name.trim() === "" || user.email.trim() === "")
        return redirect("/login");

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (pos) => {
                    const { latitude, longitude } = pos.coords;
                    console.log("Ubicación:", latitude, longitude);
                    setUserSession({ location: `${latitude},${longitude}` });
                },
                (err) => {
                    console.error("Error al pedir ubicación:", err.message);
                }
            );
        }

        const fetchLatestReports = async (n) => {
            let resQueryLatestReports = await getLatestReports(n);
            if (resQueryLatestReports.status === 200) {
                setRecentReports(resQueryLatestReports.data);
            }
        };

        fetchLatestReports(4);
    }, []);

    return (
        <>
            <div className="min-h-screen bg-gray-50 flex flex-col">
                {/* Main Content */}
                <main className="flex-1 py-6 px-4 sm:px-6 lg:px-8 pb-20 md:pb-6">
                    <div className="max-w-7xl mx-auto">
                        {/* Welcome Section */}
                        <div className="mb-8">
                            <h1 className="text-2xl font-bold text-gray-900">
                                {`Bienvenido, ${user.name}`}
                            </h1>
                            <p className="mt-1 text-sm text-gray-600">
                                Martes, 14 de Mayo, 2025 | Tu ubicación: Ciudad
                                de México
                            </p>
                        </div>

                        {/* Emergency Alert */}
                        <div className="bg-red-50 border-l-4 border-red-600 p-4 mb-8 rounded-md">
                            <div className="flex">
                                <div className="flex-shrink-0">
                                    <svg
                                        className="h-5 w-5 text-red-600"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </div>
                                <div className="ml-3">
                                    <h3 className="text-sm font-medium text-red-800">
                                        Alerta de inundación
                                    </h3>
                                    <div className="mt-2 text-sm text-red-700">
                                        <p>
                                            Se ha reportado inundación en Av.
                                            Insurgentes Sur. Evita la zona si es
                                            posible.
                                        </p>
                                    </div>
                                    <div className="mt-2">
                                        <button className="text-sm font-medium text-red-800 hover:text-red-600">
                                            Ver detalles →
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Quick Actions */}
                        <div className="mb-8">
                            <h2 className="text-lg font-medium text-gray-900 mb-4">
                                Acciones rápidas
                            </h2>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <button
                                    // href="/dashboard/nuevo-reporte"
                                    onClick={() =>
                                        setIsAddReportModalVisible(true)
                                    }
                                    className="bg-red-600 text-white rounded-lg p-4 text-center hover:bg-red-700 transition-colors shadow-md cursor-pointer"
                                >
                                    <svg
                                        className="h-8 w-8 mx-auto"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                                        />
                                    </svg>
                                    <span className="block mt-2 font-medium">
                                        Reportar Emergencia
                                    </span>
                                </button>
                                <Link
                                    href="/map"
                                    className="bg-white text-gray-800 rounded-lg p-4 text-center hover:bg-gray-50 transition-colors shadow-md border border-gray-200"
                                >
                                    <svg
                                        className="h-8 w-8 mx-auto text-gray-600"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                                        />
                                    </svg>
                                    <span className="block mt-2 font-medium">
                                        Ver Mapa
                                    </span>
                                </Link>
                                <Link
                                    href="/my-reports"
                                    className="bg-white text-gray-800 rounded-lg p-4 text-center hover:bg-gray-50 transition-colors shadow-md border border-gray-200"
                                >
                                    <svg
                                        className="h-8 w-8 mx-auto text-gray-600"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                                        />
                                    </svg>
                                    <span className="block mt-2 font-medium">
                                        Mis Reportes
                                    </span>
                                </Link>
                                <Link
                                    href="/dashboard/contactos"
                                    className="bg-white text-gray-800 rounded-lg p-4 text-center hover:bg-gray-50 transition-colors shadow-md border border-gray-200"
                                >
                                    <svg
                                        className="h-8 w-8 mx-auto text-gray-600"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                                        />
                                    </svg>
                                    <span className="block mt-2 font-medium">
                                        Contactos de Emergencia
                                    </span>
                                </Link>
                            </div>
                        </div>

                        {/* Map Preview */}
                        <div className="mb-8">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-lg font-medium text-gray-900">
                                    Emergencias cercanas
                                </h2>
                                <Link
                                    href="/map"
                                    className="text-sm text-red-600 hover:text-red-800"
                                >
                                    Ver mapa completo →
                                </Link>
                            </div>
                            <div className="bg-gray-200 rounded-lg h-64 md:h-80 overflow-hidden shadow-md relative">
                                {/* This would be your actual map component */}
                                <div className="absolute inset-0 bg-gray-300 flex items-center justify-center">
                                    <p className="text-gray-600">
                                        Mapa de emergencias
                                    </p>
                                </div>
                                {/* Map markers */}
                                <div className="absolute top-1/4 left-1/3 h-4 w-4 bg-red-600 rounded-full animate-ping"></div>
                                <div className="absolute top-1/4 left-1/3 h-4 w-4 bg-red-600 rounded-full"></div>

                                <div className="absolute top-1/2 right-1/4 h-4 w-4 bg-yellow-500 rounded-full animate-ping"></div>
                                <div className="absolute top-1/2 right-1/4 h-4 w-4 bg-yellow-500 rounded-full"></div>

                                <div className="absolute bottom-1/3 left-1/2 h-4 w-4 bg-red-600 rounded-full animate-ping"></div>
                                <div className="absolute bottom-1/3 left-1/2 h-4 w-4 bg-red-600 rounded-full"></div>

                                {/* Current location */}
                                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-6 w-6 bg-blue-500 rounded-full border-2 border-white"></div>
                            </div>
                        </div>

                        {/* Recent Reports */}
                        <div className="mb-8">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-lg font-medium text-gray-900">
                                    Reportes recientes
                                </h2>
                                <Link
                                    href="/reports"
                                    className="text-sm text-red-600 hover:text-red-800"
                                >
                                    Ver todos →
                                </Link>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {recentReports.map((report) => (
                                    <div
                                        className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200"
                                        key={report.id}
                                    >
                                        <div className="p-4">
                                            <div className="flex justify-between">
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                                                    Urgente
                                                </span>
                                                <span className="text-sm text-gray-500">
                                                    {report.date}
                                                </span>
                                            </div>
                                            <h3 className="mt-2 text-lg font-medium text-gray-900">
                                                {report.title}
                                            </h3>
                                            <Link
                                                href={`https://www.google.com/maps?q=${report.locate}`}
                                                className="mt-1 text-sm text-red-600 border-b-2"
                                            >
                                                Ir a la ubicacion
                                            </Link>
                                            <div className="mt-3 flex justify-between items-center">
                                                <div className="flex items-center">
                                                    <div className="flex-shrink-0 h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                                                        <span className="text-xs font-medium text-gray-600">
                                                            MR
                                                        </span>
                                                    </div>
                                                    <div className="ml-2">
                                                        <p className="text-sm font-medium text-gray-900">
                                                            María Rodríguez
                                                        </p>
                                                    </div>
                                                </div>
                                                <button className="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200">
                                                    Detalles
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Emergency Tips */}
                        <div className="mb-8">
                            <h2 className="text-lg font-medium text-gray-900 mb-4">
                                Consejos de emergencia
                            </h2>
                            <div className="bg-white rounded-lg shadow-md p-4 border border-gray-200">
                                <h3 className="font-medium text-gray-900">
                                    ¿Qué hacer en caso de sismo?
                                </h3>
                                <ul className="mt-2 text-sm text-gray-600 list-disc pl-5 space-y-1">
                                    <li>
                                        Mantén la calma y ubícate en zonas
                                        seguras
                                    </li>
                                    <li>
                                        Aléjate de ventanas y objetos que puedan
                                        caer
                                    </li>
                                    <li>No uses elevadores</li>
                                    <li>
                                        Sigue las instrucciones de protección
                                        civil
                                    </li>
                                </ul>
                                <div className="mt-3">
                                    <Link
                                        href="/dashboard/recursos/sismos"
                                        className="text-sm font-medium text-red-600 hover:text-red-800"
                                    >
                                        Leer más consejos →
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
            <AddReportModal
                isOpen={isAddReportModalVisible}
                onClose={() => setIsAddReportModalVisible(false)}
            />
        </>
    );
}
