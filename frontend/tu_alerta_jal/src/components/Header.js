import Link from "next/link";
import Image from "next/image";

const Header = ({ user }) => {
    return (
        <header className="bg-white shadow-sm sticky top-0 z-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <div className="flex-shrink-0 flex items-center">
                            <Image
                                alt="logo"
                                src="/logo.png"
                                width={500}
                                height={500}
                                className="max-h-8 w-auto"
                            />
                            <span className="ml-2 text-xl font-bold text-gray-900">
                                Tu Alerta JAL
                            </span>
                        </div>
                        <nav className="hidden md:ml-6 md:flex md:space-x-6">
                            <Link
                                href="/home"
                                className="border-b-2 border-red-500 text-gray-900 px-1 pt-1 text-sm font-medium"
                            >
                                Inicio
                            </Link>
                            <Link
                                href="/dashboard/mis-reportes"
                                className="border-b-2 border-transparent hover:border-gray-300 text-gray-500 hover:text-gray-700 px-1 pt-1 text-sm font-medium"
                            >
                                Mis Reportes
                            </Link>
                            <Link
                                href="/dashboard/mapa"
                                className="border-b-2 border-transparent hover:border-gray-300 text-gray-500 hover:text-gray-700 px-1 pt-1 text-sm font-medium"
                            >
                                Mapa
                            </Link>
                            <Link
                                href="/dashboard/recursos"
                                className="border-b-2 border-transparent hover:border-gray-300 text-gray-500 hover:text-gray-700 px-1 pt-1 text-sm font-medium"
                            >
                                Recursos
                            </Link>
                            <Link
                                href="/dashboard/comunidad"
                                className="border-b-2 border-transparent hover:border-gray-300 text-gray-500 hover:text-gray-700 px-1 pt-1 text-sm font-medium"
                            >
                                Comunidad
                            </Link>
                        </nav>
                    </div>
                    <div className="flex items-center">
                        <button className="p-1 rounded-full text-gray-500 hover:text-gray-600 focus:outline-none">
                            <span className="sr-only">Ver notificaciones</span>
                            <svg
                                className="h-6 w-6"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                                />
                            </svg>
                            {/* <span className="absolute top-1 right-1 block h-2 w-2 rounded-full bg-red-500"></span> */}
                        </button>
                        <div className="ml-3 relative">
                            <div>
                                <button className="flex text-sm rounded-full focus:outline-none items-center">
                                    <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                                        <span className="text-gray-600 font-medium">
                                            {user.name.substring(0, 1)}
                                        </span>
                                    </div>
                                    <span className="ml-2 text-gray-700 text-sm hidden md:block">
                                        {user.name.trim().split(/\s+/)[0]}
                                    </span>
                                    <svg
                                        className="ml-1 h-5 w-5 text-gray-400"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};
export default Header;
