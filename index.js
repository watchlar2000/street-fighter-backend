import cors from "cors";
import express from "express";
import { initRoutes } from "./routes/routes.js";

import "./config/db.js";

const PORT = 3050;

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

initRoutes(app);

app.use("/", express.static("./client/build"));

app.listen(PORT, () => {});

export { app };
