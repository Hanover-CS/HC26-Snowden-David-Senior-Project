import express from "express";
import cors from "cors";
import { createClient } from "@supabase/supabase-js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

// Add these debug logs
console.log("=== ENVIRONMENT CHECK ===");
console.log("SUPABASE_URL:", process.env.SUPABASE_URL);
console.log("SUPABASE_KEY exists:", !!process.env.SUPABASE_KEY);
console.log("========================");

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

app.get("/", (req, res) => {
  res.send("Hello from EduRate backend!");
});

app.get("/ping-supabase", async (req, res) => {
  try {
    const { data, error } = await supabase.from("courses").select("*").limit(1);
    if (error) throw error;
    res.json({ status: "success", data });
  } catch (err) {
    res.status(500).json({ status: "failed", message: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});