import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import reportsRoutes from "./routes/reports.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3002;

app.use(cors());
app.use(express.json());

app.use("/reports", reportsRoutes);

app.listen(PORT, () => {
    console.log(`API service running on port ${PORT}`);
});
