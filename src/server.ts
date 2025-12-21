import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import dotenv from 'dotenv';
import analysisRoutes from "./routes/analysis.routes.js";
import userRoutes from "./routes/user.routes.js";

const app = express();
dotenv.config();

const allowedOrigins = [
  "https://resume-ai-teal-ten.vercel.app", 
  "https://resume-ai-teal-ten.vercel.app/",
  "http://localhost:5173",
  "http://localhost:3000",
];
app.use(cors({
  origin: function(origin, callback) {
    console.log("Incoming request from origin:", origin);
    // Allow requests with no origin (like Postman) or allowed origins
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.error("CORS Blocked for:", origin);
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));
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
