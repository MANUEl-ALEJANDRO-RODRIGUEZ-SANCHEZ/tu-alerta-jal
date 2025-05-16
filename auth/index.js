import express from "express";
import cors from "cors";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import { pool } from "./db.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({ origin: "*", credentials: true }));
app.use(express.json());

//  Registro de usuario
app.post("/register", async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password)
        return res.status(400).json({ error: "Campos obligatorios" });

    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        const [existing] = await pool.query(
            "SELECT * FROM users WHERE email = ?",
            [email]
        );
        if (existing.length > 0)
            return res.status(409).json({ error: "El usuario ya existe" });

        await pool.query(
            "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
            [name, email, hashedPassword]
        );

        res.status(201).json({ message: "Usuario registrado" });
    } catch (err) {
        res.status(500).json({ error: "Error interno" });
    }
});

//  Login
app.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const [rows] = await pool.query("SELECT * FROM users WHERE email = ?", [
            email,
        ]);
        if (rows.length === 0)
            return res.status(401).json({ error: "Usuario no encontrado" });

        const user = rows[0];
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch)
            return res.status(401).json({ error: "Contraseña incorrecta" });

        res.json({ user: { name: user.name, email: user.email } });
    } catch (err) {
        res.status(500).json({ error: "Error interno" });
    }
});

// Endpoint de prueba
app.get("/user", async (req, res) => {
    const email = req.query.email;
    const [rows] = await pool.query(
        "SELECT name, email FROM users WHERE email = ?",
        [email]
    );

    if (rows.length === 0)
        return res.status(404).json({ error: "Usuario no encontrado" });

    res.json({ user: rows[0] });
});

app.listen(PORT, () => {
    console.log(`Auth service running on port ${PORT}`);
});
