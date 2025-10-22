import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import { createClient } from "@supabase/supabase-js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors()); // allow all origins temporarily

// Debug log to confirm env variables are read
console.log("Supabase URL:", process.env.SUPABASE_URL);
console.log("Supabase Key length:", process.env.SUPABASE_KEY?.length);

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

// Root route
app.get("/", (req, res) => {
  res.send("Hello from EduRate backend!");
});

// Ping Supabase
app.get("/ping-supabase", async (req, res) => {
  try {
    const { data, error } = await supabase.from("courses").select("*").limit(1);
    if (error) throw error;
    res.json({ status: "success", data });
  } catch (err) {
    console.error("Ping Supabase failed:", err.message);
    res.status(500).json({ status: "failed", message: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});