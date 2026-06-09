import expresss from "express";

const app = expresss();

app.use(expresss.json());

app.get("/", (_req, res) => {
  res.send("Health OK!");
});

export default app;
