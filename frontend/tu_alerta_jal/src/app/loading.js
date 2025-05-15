export default function Loading() {
    return (
        <div className="fixed inset-0 bg-white flex flex-col items-center justify-center z-50">
            <div className="flex flex-col items-center">
                {/* Logo */}
                <div className="mb-8 flex items-center">
                    <div className="h-12 w-12 bg-red-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-2xl">E</span>
                    </div>
                    <span className="ml-3 text-2xl font-bold text-gray-900">
                        Tu Alerta JAL
                    </span>
                </div>

                {/* Spinner */}
                <div className="relative">
                    <div className="h-24 w-24 rounded-full border-t-4 border-b-4 border-red-600 animate-spin"></div>
                    <div className="absolute top-0 left-0 h-24 w-24 rounded-full border-t-4 border-b-4 border-red-200 animate-ping opacity-20"></div>
                </div>

                {/* Loading text */}
                <p className="mt-6 text-gray-600 text-lg">Cargando...</p>
            </div>

            {/* Pulsing dots */}
            <div className="mt-12 flex space-x-3">
                <div className="h-3 w-3 bg-red-600 rounded-full animate-pulse"></div>
                <div className="h-3 w-3 bg-red-600 rounded-full animate-pulse delay-150"></div>
                <div className="h-3 w-3 bg-red-600 rounded-full animate-pulse delay-300"></div>
            </div>
        </div>
    );
}
