import dotenv from "dotenv";

dotenv.config();

console.log("TOKEN:", process.env.ACCESS_TOKEN?.slice(0, 20));
console.log("NODE_ENV:", process.env.NODE_ENV);

import app from "./app.js";

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`
  );
});