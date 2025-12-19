import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import dotenv from 'dotenv';
import analysisRoutes from "./routes/analysis.routes.js";
import userRoutes from "./routes/user.routes.js";

const app = express();
dotenv.config();

app.use(cors());
app.use(express.json());

connectDB();

app.get("/", (_, res) => {
  res.send("ResumeMatch AI API running");
});

app.use("/api", analysisRoutes);
app.use("/api/user", userRoutes);


app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
