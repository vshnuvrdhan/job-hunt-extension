import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import generateRoutes from "./routes/generate.js";
import followUpRoutes from "./routes/followup.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/generate/followup", followUpRoutes);
app.use("/generate", generateRoutes);

app.listen(5000, () => {
  console.log("Backend running on http://localhost:5000");
});
