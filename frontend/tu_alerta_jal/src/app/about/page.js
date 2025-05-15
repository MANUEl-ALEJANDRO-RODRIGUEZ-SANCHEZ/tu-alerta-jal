import Image from "next/image";

const AboutPage = () => {
    return (
        <div className="min-h-screen flex flex-col">
            {/* Header */}
            <header className="bg-white shadow-md sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex items-center w-full justify-between">
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
                            <nav className="hidden md:ml-6 md:flex md:space-x-8">
                                <a
                                    href="#"
                                    className="text-gray-900 hover:text-red-600 px-3 py-2 text-sm font-medium"
                                >
                                    Inicio
                                </a>

                                <a
                                    href="#"
                                    className="text-gray-500 hover:text-red-600 px-3 py-2 text-sm font-medium"
                                >
                                    Contacto
                                </a>
                                <a
                                    href="/login"
                                    className="text-gray-500 hover:text-red-600 px-3 py-2 text-sm font-medium"
                                >
                                    Iniciar Sesión
                                </a>
                                <a
                                    href="/register"
                                    className="ml-4 px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700"
                                >
                                    Registrarse
                                </a>
                            </nav>
                        </div>
                        <div className="flex items-center">
                            <button className="md:hidden ml-2 p-2 rounded-md text-gray-500 hover:text-red-600 focus:outline-none">
                                <span className="sr-only">Abrir menú</span>
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
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            <section className="relative bg-red-600">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
                    <div className="md:w-2/3">
                        <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl">
                            Reporta emergencias. Salva vidas.
                        </h1>
                        <p className="mt-6 text-xl text-red-100 max-w-3xl">
                            Tu Alerta JAL conecta a ciudadanos y autoridades
                            para responder rápidamente a situaciones de
                            emergencia en tu comunidad.
                        </p>
                        <div className="mt-10 flex flex-col sm:flex-row gap-4">
                            <a
                                href="/register"
                                className="px-8 py-3 text-base font-medium text-red-700 bg-white rounded-md shadow hover:bg-red-50 sm:w-auto text-center"
                            >
                                Crear una cuenta
                            </a>
                            <a
                                href="#como-funciona"
                                className="px-8 py-3 text-base font-medium text-white border border-white rounded-md hover:bg-red-700 sm:w-auto text-center"
                            >
                                Cómo funciona
                            </a>
                        </div>
                    </div>
                </div>
                <div
                    className="absolute bottom-0 left-0 right-0 h-16 bg-white"
                    style={{ clipPath: "polygon(0 100%, 100% 100%, 100% 0)" }}
                ></div>
            </section>

            {/* Features Section */}
            <section id="como-funciona" className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                            Cómo funciona Tu Alerta JAL
                        </h2>
                        <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
                            Una plataforma diseñada para conectar ciudadanos y
                            autoridades en momentos críticos.
                        </p>
                    </div>

                    <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
                        {/* Feature 1 */}
                        <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                            <div className="w-12 h-12 bg-red-100 rounded-md flex items-center justify-center">
                                <span className="text-red-600 text-xl font-bold">
                                    1
                                </span>
                            </div>
                            <h3 className="mt-4 text-lg font-medium text-gray-900">
                                Reporta emergencias
                            </h3>
                            <p className="mt-2 text-gray-600">
                                Informa sobre situaciones de emergencia en
                                tiempo real con ubicación, fotos y descripción
                                detallada.
                            </p>
                        </div>

                        {/* Feature 2 */}
                        <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                            <div className="w-12 h-12 bg-red-100 rounded-md flex items-center justify-center">
                                <span className="text-red-600 text-xl font-bold">
                                    2
                                </span>
                            </div>
                            <h3 className="mt-4 text-lg font-medium text-gray-900">
                                Notificación inmediata
                            </h3>
                            <p className="mt-2 text-gray-600">
                                Las autoridades y ciudadanos cercanos reciben
                                alertas instantáneas sobre emergencias en su
                                área.
                            </p>
                        </div>

                        {/* Feature 3 */}
                        <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                            <div className="w-12 h-12 bg-red-100 rounded-md flex items-center justify-center">
                                <span className="text-red-600 text-xl font-bold">
                                    3
                                </span>
                            </div>
                            <h3 className="mt-4 text-lg font-medium text-gray-900">
                                Respuesta coordinada
                            </h3>
                            <p className="mt-2 text-gray-600">
                                Facilita la comunicación entre ciudadanos y
                                servicios de emergencia para una respuesta más
                                eficiente.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="bg-gray-50 py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                            Impacto en nuestra comunidad
                        </h2>
                        <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
                            Juntos estamos construyendo comunidades más seguras
                            y preparadas.
                        </p>
                    </div>

                    <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-4">
                        <div className="text-center">
                            <p className="text-4xl font-extrabold text-red-600">
                                5,000+
                            </p>
                            <p className="mt-2 text-gray-600">
                                Usuarios registrados
                            </p>
                        </div>
                        <div className="text-center">
                            <p className="text-4xl font-extrabold text-red-600">
                                1,200+
                            </p>
                            <p className="mt-2 text-gray-600">
                                Emergencias reportadas
                            </p>
                        </div>
                        <div className="text-center">
                            <p className="text-4xl font-extrabold text-red-600">
                                15 min
                            </p>
                            <p className="mt-2 text-gray-600">
                                Tiempo promedio de respuesta
                            </p>
                        </div>
                        <div className="text-center">
                            <p className="text-4xl font-extrabold text-red-600">
                                98%
                            </p>
                            <p className="mt-2 text-gray-600">
                                Tasa de resolución
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Emergency Types */}
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                            Tipos de emergencias
                        </h2>
                        <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
                            Tu Alerta JAL te permite reportar diversos tipos de
                            situaciones críticas.
                        </p>
                    </div>

                    <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                        {/* Emergency Type 1 */}
                        <div className="bg-red-50 rounded-lg p-6 border border-red-100">
                            <h3 className="text-lg font-medium text-red-700">
                                Médicas
                            </h3>
                            <p className="mt-2 text-gray-600">
                                Accidentes, personas heridas o con problemas de
                                salud que requieren atención inmediata.
                            </p>
                        </div>

                        {/* Emergency Type 2 */}
                        <div className="bg-red-50 rounded-lg p-6 border border-red-100">
                            <h3 className="text-lg font-medium text-red-700">
                                Incendios
                            </h3>
                            <p className="mt-2 text-gray-600">
                                Fuegos en edificios, vehículos, bosques o
                                cualquier otro lugar que represente un peligro.
                            </p>
                        </div>

                        {/* Emergency Type 3 */}
                        <div className="bg-red-50 rounded-lg p-6 border border-red-100">
                            <h3 className="text-lg font-medium text-red-700">
                                Seguridad
                            </h3>
                            <p className="mt-2 text-gray-600">
                                Situaciones de riesgo, actividades sospechosas o
                                delitos en progreso.
                            </p>
                        </div>

                        {/* Emergency Type 4 */}
                        <div className="bg-red-50 rounded-lg p-6 border border-red-100">
                            <h3 className="text-lg font-medium text-red-700">
                                Desastres naturales
                            </h3>
                            <p className="mt-2 text-gray-600">
                                Inundaciones, terremotos, deslizamientos de
                                tierra y otros eventos naturales.
                            </p>
                        </div>

                        {/* Emergency Type 5 */}
                        <div className="bg-red-50 rounded-lg p-6 border border-red-100">
                            <h3 className="text-lg font-medium text-red-700">
                                Infraestructura
                            </h3>
                            <p className="mt-2 text-gray-600">
                                Daños en calles, puentes, tendido eléctrico o
                                servicios públicos.
                            </p>
                        </div>

                        {/* Emergency Type 6 */}
                        <div className="bg-red-50 rounded-lg p-6 border border-red-100">
                            <h3 className="text-lg font-medium text-red-700">
                                Tránsito
                            </h3>
                            <p className="mt-2 text-gray-600">
                                Accidentes viales, congestión severa o bloqueos
                                en las vías.
                            </p>
                        </div>

                        {/* Emergency Type 7 */}
                        <div className="bg-red-50 rounded-lg p-6 border border-red-100">
                            <h3 className="text-lg font-medium text-red-700">
                                Personas vulnerables
                            </h3>
                            <p className="mt-2 text-gray-600">
                                Niños, adultos mayores o personas en situación
                                de calle que necesitan asistencia.
                            </p>
                        </div>

                        {/* Emergency Type 8 */}
                        <div className="bg-red-50 rounded-lg p-6 border border-red-100">
                            <h3 className="text-lg font-medium text-red-700">
                                Otros
                            </h3>
                            <p className="mt-2 text-gray-600">
                                Cualquier otra situación que requiera atención
                                urgente de las autoridades.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="bg-red-600 py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
                        Únete a Tu Alerta JAL hoy
                    </h2>
                    <p className="mt-4 text-xl text-red-100 max-w-2xl mx-auto">
                        Sé parte de la red de ciudadanos comprometidos con la
                        seguridad de su comunidad.
                    </p>
                    <div className="mt-8 flex justify-center gap-4 flex-col sm:flex-row">
                        <a
                            href="/register"
                            className="px-8 py-3 text-base font-medium text-red-700 bg-white rounded-md shadow hover:bg-red-50 sm:w-auto text-center"
                        >
                            Crear una cuenta
                        </a>
                        <a
                            href="/login"
                            className="px-8 py-3 text-base font-medium text-white border border-white rounded-md hover:bg-red-700 sm:w-auto text-center"
                        >
                            Iniciar sesión
                        </a>
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                            Lo que dicen nuestros usuarios
                        </h2>
                    </div>

                    <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
                        {/* Testimonial 1 */}
                        <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                            <div className="flex items-center">
                                <div className="h-12 w-12 bg-red-100 rounded-full flex items-center justify-center">
                                    <span className="text-red-600 font-bold">
                                        MP
                                    </span>
                                </div>
                                <div className="ml-4">
                                    <h3 className="text-lg font-medium text-gray-900">
                                        María Pérez
                                    </h3>
                                    <p className="text-gray-600">Ciudadana</p>
                                </div>
                            </div>
                            <p className="mt-4 text-gray-600">
                                "Gracias a Tu Alerta JAL pude reportar un
                                incendio en un edificio cercano. Los bomberos
                                llegaron en minutos y evitaron una tragedia
                                mayor."
                            </p>
                        </div>

                        {/* Testimonial 2 */}
                        <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                            <div className="flex items-center">
                                <div className="h-12 w-12 bg-red-100 rounded-full flex items-center justify-center">
                                    <span className="text-red-600 font-bold">
                                        JR
                                    </span>
                                </div>
                                <div className="ml-4">
                                    <h3 className="text-lg font-medium text-gray-900">
                                        Juan Rodríguez
                                    </h3>
                                    <p className="text-gray-600">
                                        Oficial de Policía
                                    </p>
                                </div>
                            </div>
                            <p className="mt-4 text-gray-600">
                                "Como oficial, esta aplicación ha revolucionado
                                nuestra capacidad de respuesta. Recibimos
                                información precisa y en tiempo real de los
                                ciudadanos."
                            </p>
                        </div>

                        {/* Testimonial 3 */}
                        <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                            <div className="flex items-center">
                                <div className="h-12 w-12 bg-red-100 rounded-full flex items-center justify-center">
                                    <span className="text-red-600 font-bold">
                                        LG
                                    </span>
                                </div>
                                <div className="ml-4">
                                    <h3 className="text-lg font-medium text-gray-900">
                                        Laura González
                                    </h3>
                                    <p className="text-gray-600">
                                        Coordinadora Comunitaria
                                    </p>
                                </div>
                            </div>
                            <p className="mt-4 text-gray-600">
                                "Tu Alerta JAL ha fortalecido el sentido de
                                comunidad en nuestro barrio. Ahora todos estamos
                                más conectados y preparados para cualquier
                                emergencia."
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div>
                            <div className="flex items-center">
                                <Image
                                    alt="logo"
                                    src="/logo.png"
                                    width={500}
                                    height={500}
                                    className="max-h-8 w-auto"
                                />
                                <span className="ml-2 text-xl font-bold">
                                    Tu Alerta JAL
                                </span>
                            </div>
                            <p className="mt-4 text-gray-400">
                                Conectando ciudadanos y autoridades para crear
                                comunidades más seguras.
                            </p>
                        </div>

                        <div>
                            <h3 className="text-sm font-semibold uppercase tracking-wider">
                                Plataforma
                            </h3>
                            <ul className="mt-4 space-y-2">
                                <li>
                                    <a
                                        href="#"
                                        className="text-gray-400 hover:text-white"
                                    >
                                        Inicio
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="text-gray-400 hover:text-white"
                                    >
                                        Reportes
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="text-gray-400 hover:text-white"
                                    >
                                        Mapa
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="text-gray-400 hover:text-white"
                                    >
                                        Recursos
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-sm font-semibold uppercase tracking-wider">
                                Legal
                            </h3>
                            <ul className="mt-4 space-y-2">
                                <li>
                                    <a
                                        href="#"
                                        className="text-gray-400 hover:text-white"
                                    >
                                        Términos de servicio
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="text-gray-400 hover:text-white"
                                    >
                                        Política de privacidad
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="text-gray-400 hover:text-white"
                                    >
                                        Cookies
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-sm font-semibold uppercase tracking-wider">
                                Contacto
                            </h3>
                            <ul className="mt-4 space-y-2">
                                <li className="text-gray-400">
                                    info@emergenciapp.com
                                </li>
                                <li className="text-gray-400">
                                    +1 (555) 123-4567
                                </li>
                                <li className="text-gray-400">
                                    Av. Principal #123, Ciudad
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="mt-12 border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between">
                        <p className="text-gray-400 text-sm">
                            &copy; 2025 Tu Alerta JAL. Todos los derechos
                            reservados.
                        </p>
                        <div className="mt-4 md:mt-0 flex space-x-6">
                            <a
                                href="#"
                                className="text-gray-400 hover:text-white"
                            >
                                <span className="sr-only">Facebook</span>
                                <svg
                                    className="h-6 w-6"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                    aria-hidden="true"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </a>
                            <a
                                href="#"
                                className="text-gray-400 hover:text-white"
                            >
                                <span className="sr-only">Twitter</span>
                                <svg
                                    className="h-6 w-6"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                    aria-hidden="true"
                                >
                                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                                </svg>
                            </a>
                            <a
                                href="#"
                                className="text-gray-400 hover:text-white"
                            >
                                <span className="sr-only">Instagram</span>
                                <svg
                                    className="h-6 w-6"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                    aria-hidden="true"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};
export default AboutPage;
