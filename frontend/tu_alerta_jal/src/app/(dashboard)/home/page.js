import { redirect } from "next/navigation";
import { getUserSession } from "@/app/lib/auth";

export default function HomePage() {
    const user = getUserSession();

    if (!user) {
        redirect("/login");
    }

    return (
        <div>
            <h1>Bienvenido, {user.name}</h1>
            {/* Tu contenido protegido */}
        </div>
    );
}
