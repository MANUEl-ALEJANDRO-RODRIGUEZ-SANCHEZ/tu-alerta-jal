import express from "express";
import { pool } from "../db.js";

const router = express.Router();

router.get("/", async (req, res) => {
    const { lat, lng, radius = 5 } = req.query; // radio en km

    if (!lat || !lng)
        return res.status(400).json({ error: "Faltan coordenadas" });

    try {
        const [rows] = await pool.query(
            `
      SELECT *,
        (
          6371 * acos(
            cos(radians(?)) *
            cos(radians(SUBSTRING_INDEX(locate, ',', 1))) *
            cos(radians(SUBSTRING_INDEX(locate, ',', -1)) - radians(?)) +
            sin(radians(?)) *
            sin(radians(SUBSTRING_INDEX(locate, ',', 1)))
          )
        ) AS distance
      FROM reports
      HAVING distance < ?
      ORDER BY distance ASC
      `,
            [lat, lng, lat, radius]
        );

        res.json(rows);
    } catch (err) {
        console.error("Error al buscar cercanos:", err);
        res.status(500).json({ error: "Error interno" });
    }
});

export default router;
