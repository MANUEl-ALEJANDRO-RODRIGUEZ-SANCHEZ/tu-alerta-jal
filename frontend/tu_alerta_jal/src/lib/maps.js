const API_URL = "http://localhost:3003/nearby";

export async function getNearbyReports(lat, lng, r) {
    try {
        const res = await fetch(`${API_URL}?lat=${lat}&lng=${lng}&radius=${r}`);

        if (!res.ok) {
            return { status: res.status, message: "Error al cargar el mapa" };
        }

        const data = await res.json();
        return { status: 200, message: "Consulta al mapa exitosa", data };
    } catch (err) {
        return { status: 500, message: "Error al cargar el mapa" };
    }
}
