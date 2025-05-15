import { redirect } from "next/navigation";
import { getUserSession } from "./lib/auth";

export default function RootPage() {
    const user = getUserSession();
    redirect(user ? "/home" : "/login");
}
