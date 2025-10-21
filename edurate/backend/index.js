import express from "express";
import cors from "cors";
import { createClient } from "@supabase/supabase-js";

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS for all origins (or restrict to your frontend URL)
app.use(cors());
// If you want to restrict to Vercel frontend, use:
// app.use(cors({ origin: 'https://hc-26-snowden-david-senior-project.vercel.app' }));

// Supabase client using environment variables
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

// Root route
app.get("/", (req, res) => {
  res.send("Hello from EduRate backend!");
});

// Test DB route
app.get("/test-db", async (req, res) => {
  try {
    const { data, error } = await supabase.from("courses").select("*");
    if (error) {
      return res.status(500).json({ data: null, error });
    }
    res.json({ data, error: null });
  } catch (err) {
    res.status(500).json({ data: null, error: { message: err.message } });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});