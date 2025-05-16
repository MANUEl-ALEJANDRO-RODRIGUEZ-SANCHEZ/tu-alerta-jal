"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import SimpleModal from "./SimpleModal";
import { logInUser, registerUser } from "@/lib/auth";
import { useUser } from "@/context/UserContext";

const AuthForm = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [alert, setAlert] = useState("");
    const [isAlertVisible, setIsAlertVisible] = useState(false);
    const router = useRouter();
    const { setUserSession } = useUser();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        const formData = new FormData(e.currentTarget);
        const email = formData.get("email");
        const password = formData.get("password");

        try {
            if (isLogin) {
                let resLogInUser = await logInUser({ email, password });
                if (resLogInUser.status === 200) {
                    setUserSession({
                        name: resLogInUser.user.name,
                        email: resLogInUser.user.email,
                    });
                    router.push("/home");
                } else {
                    setError(resLogInUser.message);
                }
            } else {
                // Validar campos adicionales para registro
                const name = formData.get("name");
                const confirmPassword = formData.get("confirmPassword");

                if (password !== confirmPassword) {
                    throw new Error("Las contraseñas no coinciden");
                }
                let resRegisterUser = await registerUser({
                    name,
                    email,
                    password,
                });
                if (resRegisterUser.status === 200) {
                    setAlert("Registro exitoso, ahora incia sesión");
                    setIsAlertVisible(true);
                    setIsLogin(true);
                } else {
                    setError(resRegisterUser.message);
                }
            }
        } catch (err) {
            setError(
                err instanceof Error ? err.message : "Ha ocurrido un error"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className="mt-8 space-y-6">
                <div className="flex justify-center space-x-4">
                    <button
                        type="button"
                        className={`px-4 py-2 text-sm font-medium rounded-md ${
                            isLogin
                                ? "bg-red-600 text-white"
                                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                        }`}
                        onClick={() => setIsLogin(true)}
                    >
                        Iniciar Sesión
                    </button>
                    <button
                        type="button"
                        className={`px-4 py-2 text-sm font-medium rounded-md ${
                            !isLogin
                                ? "bg-red-600 text-white"
                                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                        }`}
                        onClick={() => setIsLogin(false)}
                    >
                        Registrarse
                    </button>
                </div>

                {error && (
                    <div className="p-3 text-sm text-white bg-red-500 rounded-md">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    {!isLogin && (
                        <div>
                            <label
                                htmlFor="name"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Nombre completo
                            </label>
                            <input
                                id="name"
                                name="name"
                                type="text"
                                required={!isLogin}
                                className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
                                placeholder="Juan Pérez"
                            />
                        </div>
                    )}

                    <div>
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Correo electrónico
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            required
                            className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
                            placeholder="ejemplo@correo.com"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Contraseña
                        </label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            required
                            className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
                            placeholder={
                                isLogin
                                    ? "Tu contraseña"
                                    : "Crea una contraseña"
                            }
                        />
                    </div>

                    {!isLogin && (
                        <div>
                            <label
                                htmlFor="confirmPassword"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Confirmar contraseña
                            </label>
                            <input
                                id="confirmPassword"
                                name="confirmPassword"
                                type="password"
                                required={!isLogin}
                                className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
                                placeholder="Confirma tu contraseña"
                            />
                        </div>
                    )}

                    {isLogin && (
                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input
                                    id="remember-me"
                                    name="remember-me"
                                    type="checkbox"
                                    className="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
                                />
                                <label
                                    htmlFor="remember-me"
                                    className="block ml-2 text-sm text-gray-700"
                                >
                                    Recordarme
                                </label>
                            </div>

                            <div className="text-sm">
                                <button
                                    type="button"
                                    className="text-red-600 hover:text-red-500"
                                >
                                    ¿Olvidaste tu contraseña?
                                </button>
                            </div>
                        </div>
                    )}

                    <div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? (
                                <span>Procesando...</span>
                            ) : isLogin ? (
                                "Iniciar Sesión"
                            ) : (
                                "Crear Cuenta"
                            )}
                        </button>
                    </div>
                </form>
            </div>
            <SimpleModal
                isVisible={isAlertVisible}
                onClose={() => setIsAlertVisible(false)}
            >
                {alert}
            </SimpleModal>
        </>
    );
};
export default AuthForm;
