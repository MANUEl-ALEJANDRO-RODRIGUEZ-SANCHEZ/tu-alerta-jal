// SE USA RUTAS AGRUPADAS PARA PODER USAR UN LAYOUT PARA TODA LA APP (HEADER; FOOTER; Etc)
"use client";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { useUser } from "@/context/UserContext";
import { redirect } from "next/navigation";

export default function LoggedLayout({ children }) {
    const { user } = useUser();

    if (!user || user.name.trim() === "" || user.email.trim() === "")
        return redirect("/login");

    return (
        <>
            <Header user={user} />
            <main>{children}</main>
            <Footer />
        </>
    );
}
