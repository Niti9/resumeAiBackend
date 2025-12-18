import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import dotenv from 'dotenv';

const app = express();
dotenv.config();

app.use(cors());
app.use(express.json());

connectDB();

app.get("/", (_, res) => {
  res.send("ResumeMatch AI API running");
});

const PORT = 2000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
