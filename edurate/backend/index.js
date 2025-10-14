import express from "express";
const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Hello from EduRate backend!");
});

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
}); 

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://lhhaskcrrtaquzcddxpd.supabase.com";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxoaGFza2NycnRhcXV6Y2RkeHBkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA0MzA4MzMsImV4cCI6MjA3NjAwNjgzM30.UVf6sMs05MEcKvYs-P4YAPtsNKifX4NaoSsg6cTJrFc";
const supabase = createClient(supabaseUrl, supabaseKey);

app.get("/test-db", async (req, res) => {
  const { data, error } = await supabase.from("courses").select("*");
  res.json({ data, error });
});