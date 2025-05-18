import express from "express";
import cors from "cors";
import nearbyRoutes from "./routes/nearby.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/nearby", nearbyRoutes);

app.listen(3003, () => {
    console.log("Contenedor maps corriendo en puerto 3003");
});
