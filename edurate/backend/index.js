import express from "express";
import { createClient } from "@supabase/supabase-js";

const app = express();
const PORT = process.env.PORT || 3000;

// Supabase client using environment variables
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

app.get("/", (req, res) => {
  res.send("Hello from EduRate backend!");
});

app.get("/test-db", async (req, res) => {
  const { data, error } = await supabase.from("courses").select("*");
  res.json({ data, error });
});

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});