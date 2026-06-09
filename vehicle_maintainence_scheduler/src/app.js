import express from "express";

import schedulerRoutes from "./routes/scheduler.route.js";

const app = express();

app.use(express.json());

app.use("/api", schedulerRoutes);

export default app;