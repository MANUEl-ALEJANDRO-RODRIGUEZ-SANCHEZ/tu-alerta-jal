export async function registerUser(user) {
    let { name, email, password } = user;
    try {
        const res = await fetch("http://localhost:3001/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, password }),
        });

        if (res.ok) {
            return { status: 200, message: "success" };
        } else {
            const data = await res.json();
            return { status: 500, message: data.error || "Error desconocido" };
        }
    } catch (err) {
        return { status: 400, message: "No se pudo conectar al servidor" };
    }
}

export async function logInUser(user) {
    let { email, password } = user;
    try {
        const res = await fetch("http://localhost:3001/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });

        if (res.ok) {
            const data = await res.json();
            return { status: 200, message: "success", user: data.user };
        } else {
            const data = await res.json();
            return {
                status: 500,
                message: data.error || "Error de autenticación",
            };
        }
    } catch (err) {
        return { status: 400, message: "No se pudo conectar al servidor" };
    }
}
