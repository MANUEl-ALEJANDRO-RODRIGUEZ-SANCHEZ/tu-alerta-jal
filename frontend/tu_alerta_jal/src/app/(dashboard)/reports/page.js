"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import AddReportModal from "@/components/AddReportModal";
import { getReports } from "@/lib/querys";
import { useUser } from "@/context/UserContext";

// Mapeo de categorías

const CATEGORIES = {
    medical: { name: "Médica", color: "bg-blue-100 text-blue-800" },
    fire: { name: "Incendio", color: "bg-red-100 text-red-800" },
    security: { name: "Seguridad", color: "bg-purple-100 text-purple-800" },
    natural_disaster: {
        name: "Desastre natural",
        color: "bg-orange-100 text-orange-800",
    },
    infrastructure: {
        name: "Infraestructura",
        color: "bg-gray-100 text-gray-800",
    },
    traffic: { name: "Tránsito", color: "bg-yellow-100 text-yellow-800" },
    vulnerable_people: {
        name: "Personas vulnerables",
        color: "bg-green-100 text-green-800",
    },
    other: { name: "Otro", color: "bg-indigo-100 text-indigo-800" },
};

// Mapeo de estados
const STATUS = {
    pendiente: { name: "Pendiente", color: "bg-yellow-100 text-yellow-800" },
    en_progreso: { name: "En proceso", color: "bg-blue-100 text-blue-800" },
    resuelto: { name: "Resuelto", color: "bg-green-100 text-green-800" },
    cerrado: { name: "Cerrado", color: "bg-gray-100 text-gray-800" },
};

export default function ReportsPage() {
    const [REPORTS, setREPORTS] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("");
    const [statusFilter, setStatusFilter] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { user } = useUser();

    const fetchReport = async () => {
        let resQuery = await getReports(user.email);
        if (resQuery.status === 200) {
            setREPORTS(resQuery.data);
        }
    };

    useEffect(() => {
        fetchReport();
    }, []);

    // Filtrar reportes
    const filteredReports = REPORTS.filter((report) => {
        const matchesSearch =
            searchTerm === "" ||
            report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            report.description
                .toLowerCase()
                .includes(searchTerm.toLowerCase()) ||
            report.location.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesCategory =
            categoryFilter === "" || report.category === categoryFilter;
        const matchesStatus =
            statusFilter === "" || report.status === statusFilter;

        return matchesSearch && matchesCategory && matchesStatus;
    });

    // Formatear fecha
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat("es", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        }).format(date);
    };

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                        <h1 className="text-2xl font-bold text-gray-900">
                            Reportes de Emergencia
                        </h1>
                        <button
                            onClick={handleOpenModal}
                            className="mt-4 md:mt-0 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                        >
                            Crear Nuevo Reporte
                        </button>
                    </div>
                </div>
            </header>

            {/* Filters */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <div className="bg-white shadow-sm rounded-lg p-4 mb-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label
                                htmlFor="search"
                                className="block text-sm font-medium text-gray-700 mb-1"
                            >
                                Buscar
                            </label>
                            <input
                                type="text"
                                id="search"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="Buscar por título, descripción o ubicación"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="category"
                                className="block text-sm font-medium text-gray-700 mb-1"
                            >
                                Categoría
                            </label>
                            <select
                                id="category"
                                value={categoryFilter}
                                onChange={(e) =>
                                    setCategoryFilter(e.target.value)
                                }
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
                            >
                                <option value="">Todas las categorías</option>
                                {Object.entries(CATEGORIES).map(
                                    ([id, { name }]) => (
                                        <option key={id} value={id}>
                                            {name}
                                        </option>
                                    )
                                )}
                            </select>
                        </div>

                        <div>
                            <label
                                htmlFor="status"
                                className="block text-sm font-medium text-gray-700 mb-1"
                            >
                                Estado
                            </label>
                            <select
                                id="status"
                                value={statusFilter}
                                onChange={(e) =>
                                    setStatusFilter(e.target.value)
                                }
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
                            >
                                <option value="">Todos los estados</option>
                                {Object.entries(STATUS).map(
                                    ([id, { name }]) => (
                                        <option key={id} value={id}>
                                            {name}
                                        </option>
                                    )
                                )}
                            </select>
                        </div>
                    </div>
                </div>

                {/* Reports Count */}
                <div className="mb-4 text-sm text-gray-600">
                    Mostrando {filteredReports.length} de {REPORTS.length}{" "}
                    reportes
                </div>

                {/* Reports List - Card View for Mobile, Table for Desktop */}
                <div className="block md:hidden space-y-4">
                    {filteredReports.map((report) => (
                        <div
                            key={report.id}
                            className="bg-white shadow-sm rounded-lg overflow-hidden"
                        >
                            <div className="p-4">
                                <div className="flex justify-between items-start">
                                    <h2 className="text-lg font-medium text-gray-900">
                                        {report.title}
                                    </h2>
                                    <span
                                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                            STATUS[report.status].color
                                        }`}
                                    >
                                        {STATUS[report.status].name}
                                    </span>
                                </div>
                                <p className="mt-1 text-sm text-gray-600 line-clamp-2">
                                    {report.description}
                                </p>
                                <div className="mt-2">
                                    <span
                                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                            CATEGORIES[report.category].color
                                        }`}
                                    >
                                        {CATEGORIES[report.category].name}
                                    </span>
                                </div>
                                <div className="mt-3 text-sm text-gray-500">
                                    <div className="flex items-center">
                                        <svg
                                            className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                        <Link
                                            href={`https://www.google.com/maps?q=${report.locate}`}
                                            target="_blank"
                                            className="text-red-600 hover:text-red-800"
                                        >
                                            Ir a google maps
                                        </Link>
                                    </div>
                                    <div className="flex items-center mt-1">
                                        <svg
                                            className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                        {formatDate(report.date)}
                                    </div>
                                </div>
                                <div className="mt-4">
                                    <Link
                                        href={`/reportes/${report.id}`}
                                        className="text-red-600 hover:text-red-800 font-medium text-sm"
                                    >
                                        Ver detalles
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Table View for Desktop */}
                <div className="hidden md:block">
                    <div className="bg-white shadow-sm overflow-hidden rounded-lg">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        Título
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        Categoría
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        Ubicación
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        Fecha
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        Estado
                                    </th>
                                    <th
                                        scope="col"
                                        className="relative px-6 py-3"
                                    >
                                        <span className="sr-only">
                                            Acciones
                                        </span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {filteredReports.map((report) => (
                                    <tr
                                        key={report.id}
                                        className="hover:bg-gray-50"
                                    >
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-medium text-gray-900">
                                                {report.title}
                                            </div>
                                            <div className="text-sm text-gray-500 line-clamp-1">
                                                {report.description}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span
                                                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                                    CATEGORIES[report.category]
                                                        .color
                                                }`}
                                            >
                                                {
                                                    CATEGORIES[report.category]
                                                        .name
                                                }
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-500">
                                                <Link
                                                    href={`https://www.google.com/maps?q=${report.locate}`}
                                                    target="_blank"
                                                    className="text-red-600 hover:text-red-800"
                                                >
                                                    Ir a google maps
                                                </Link>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-500">
                                                {formatDate(report.date)}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span
                                                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                                    STATUS[report.status].color
                                                }`}
                                            >
                                                {STATUS[report.status].name}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <Link
                                                href={`/reportes/${report.id}`}
                                                className="text-red-600 hover:text-red-800"
                                            >
                                                Ver detalles
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* No Results */}
                {filteredReports.length === 0 && (
                    <div className="bg-white shadow-sm rounded-lg p-8 text-center">
                        <svg
                            className="mx-auto h-12 w-12 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                        <h3 className="mt-2 text-sm font-medium text-gray-900">
                            No se encontraron reportes
                        </h3>
                        <p className="mt-1 text-sm text-gray-500">
                            Intenta con otros filtros o crea un nuevo reporte.
                        </p>
                        <div className="mt-6">
                            <button
                                onClick={handleOpenModal}
                                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                            >
                                Crear Nuevo Reporte
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Create Report Modal */}
            <AddReportModal isOpen={isModalOpen} onClose={handleCloseModal} />
        </div>
    );
}
