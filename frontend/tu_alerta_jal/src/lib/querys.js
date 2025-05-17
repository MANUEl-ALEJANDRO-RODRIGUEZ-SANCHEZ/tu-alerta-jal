const API_URL = "http://localhost:3002/reports";

// Crear reporte
export async function addReport(report) {
    try {
        const res = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(report),
        });

        if (!res.ok) {
            return { status: res.status, message: "Error al crear reporte" };
        }

        const data = await res.json();
        return { status: 200, message: "Reporte creado correctamente", data };
    } catch (err) {
        return { status: 500, message: "Error al crear reporte" };
    }
}

// Obtener todos los reportes
export async function getReports() {
    try {
        const res = await fetch(API_URL);

        if (!res.ok) {
            return { status: res.status, message: "Error al obtener reportes" };
        }

        const data = await res.json();
        return { status: 200, message: "Reportes obtenidos", data };
    } catch (err) {
        return { status: 500, message: "Error al obtener reportes" };
    }
}

// Obtener un reporte por ID
export async function getReport(id) {
    try {
        const res = await fetch(`${API_URL}/${id}`);

        if (!res.ok) {
            return { status: res.status, message: "Reporte no encontrado" };
        }

        const data = await res.json();
        return { status: 200, message: "Reporte encontrado", data };
    } catch (err) {
        return { status: 500, message: "Error al obtener reporte" };
    }
}

// Obtener los reportes hechos por un usuario
export async function getReportsByUser(email) {
    try {
        const res = await fetch(`${API_URL}?email=${email}`);

        if (!res.ok) {
            return { status: res.status, message: "Reportes no encontrado" };
        }

        const data = await res.json();
        return { status: 200, message: "Reportes encontrados", data };
    } catch (err) {
        return { status: 500, message: "Error al obtener reportes" };
    }
}

// Actualizar reporte
export async function updateReport(id, data) {
    try {
        const res = await fetch(`${API_URL}/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });

        if (!res.ok) {
            return {
                status: res.status,
                message: "Error al actualizar reporte",
            };
        }

        const result = await res.json();
        return { status: 200, message: "Reporte actualizado", data: result };
    } catch (err) {
        return { status: 500, message: "Error al actualizar reporte" };
    }
}

// Eliminar reporte
export async function deleteReport(id) {
    try {
        const res = await fetch(`${API_URL}/${id}`, {
            method: "DELETE",
        });

        if (!res.ok) {
            return { status: res.status, message: "Error al eliminar reporte" };
        }

        const data = await res.json();
        return { status: 200, message: "Reporte eliminado", data };
    } catch (err) {
        return { status: 500, message: "Error al eliminar reporte" };
    }
}
