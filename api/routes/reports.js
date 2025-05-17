import express from "express";
import { pool } from "../db.js";

const router = express.Router();

// Crear un reporte
router.post("/", async (req, res) => {
    const { title, description, by_user, locate, category, is_anonymous } =
        req.body;

    if (!title || !description)
        return res.status(400).json({ error: "Faltan campos obligatorios" });

    try {
        const [result] = await pool.query(
            `INSERT INTO reports (title, description, by_user, locate, category, is_anonymous)
       VALUES (?, ?, ?, ?, ?, ?)`,
            [title, description, by_user, locate, category, is_anonymous || 0]
        );

        res.status(201).json({ id: result.insertId });
    } catch (err) {
        res.status(500).json({ error: "Error al crear reporte" });
    }
});

// Obtener todos los reportes
router.get("/", async (_req, res) => {
    try {
        const [rows] = await pool.query(
            "SELECT * FROM reports ORDER BY date DESC"
        );
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: "Error al obtener reportes" });
    }
});

// Obtener un solo reporte por ID
router.get("/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const [rows] = await pool.query("SELECT * FROM reports WHERE id = ?", [
            id,
        ]);
        if (rows.length === 0)
            return res.status(404).json({ error: "No encontrado" });
        res.json(rows[0]);
    } catch (err) {
        res.status(500).json({ error: "Error al obtener el reporte" });
    }
});

// Obtener los reportes hechos por un usuarios (email)
router.get("/:email", async (req, res) => {
    const { email } = req.params;

    try {
        const [rows] = await pool.query(
            "SELECT * FROM reports WHERE by_user = ?",
            [email]
        );
        if (rows.length === 0)
            return res.status(404).json({ error: "No encontrado" });
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: "Error al obtener el reporte" });
    }
});

// Obtener los N ultimos reportes
router.get("/latest/:n", async (req, res) => {
    const { n } = req.params;

    try {
        const [rows] = await pool.query(
            "SELECT * FROM reports ORDER BY date DESC LIMIT ?",
            [parseInt(n)]
        );

        if (rows.length === 0) {
            return res.status(404).json({ error: "No encontrados" });
        }

        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: "Error al obtener los reportes" });
    }
});

// Modificar un reporte
router.put("/:id", async (req, res) => {
    const { id } = req.params;
    const { title, description, status } = req.body;

    try {
        await pool.query(
            "UPDATE reports SET title = ?, description = ?, status = ? WHERE id = ?",
            [title, description, status, id]
        );
        res.json({ message: "Reporte actualizado" });
    } catch (err) {
        res.status(500).json({ error: "Error al actualizar" });
    }
});

// Eliminar un reporte
router.delete("/:id", async (req, res) => {
    const { id } = req.params;

    try {
        await pool.query("DELETE FROM reports WHERE id = ?", [id]);
        res.json({ message: "Reporte eliminado" });
    } catch (err) {
        res.status(500).json({ error: "Error al eliminar" });
    }
});

export default router;
