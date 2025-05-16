import Link from "next/link";
import { redirect } from "next/navigation";
import AuthForm from "@/components/AuthForm";
import Image from "next/image";

export default async function LoginPage() {
    return (
        <main className="min-h-screen flex items-center justify-center bg-gray-50 flex-col">
            <Image
                alt="logo"
                src="/logo.png"
                width={500}
                height={500}
                className="w-1/3 max-w-[200px] drop-shadow-black/20 drop-shadow-lg"
                priority
            />
            <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-lg">
                <div className="text-center flex flex-col gap-2">
                    <h1 className="text-3xl font-bold text-red-600">
                        Tu Alerta JAL
                    </h1>
                    <p className="mt-2 text-sm text-gray-600">
                        Plataforma de reportes de emergencias ciudadanas
                    </p>
                    <Link
                        href="/about"
                        className="text-red-600 hover:text-red-500"
                    >
                        Sobre nosotros
                    </Link>
                </div>

                <AuthForm />

                <div className="text-center text-sm text-gray-600">
                    <p>Al registrarte, aceptas nuestros</p>
                    <div className="mt-1 space-x-1">
                        <Link
                            href="/terms"
                            className="text-red-600 hover:text-red-500"
                        >
                            Términos de Servicio
                        </Link>
                        <span>y</span>
                        <Link
                            href="/privacy"
                            className="text-red-600 hover:text-red-500"
                        >
                            Política de Privacidad
                        </Link>
                    </div>
                </div>
            </div>
        </main>
    );
}
