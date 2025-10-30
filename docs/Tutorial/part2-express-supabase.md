---
title: "Tutorial Part 2: Express Server and Supabase Connection"
layout: default
---
# Part 2: Express Server and Supabase Connection

[← Part 1: Setup](part1-setup.md) | [Back to Index](Index.md) | [Part 3: Testing and next steps →](part3-testing-nextsteps.md)

---

## Overview

In this section, you'll create an Express.js server, set up a Supabase project, and establish a connection between them.

**Time estimate:** 30 minutes

---

## Section A: Creating Your Express Server

### Step 1: Create Your Server File

Create a new file called `index.js` in your project root:
```bash
touch index.js
```

Add the following code to `index.js`:
```javascript
import express from "express";

const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
  res.send("Hello from Express!");
});

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
```

**Code breakdown:**
- `import express from "express"` - Loads the Express framework
- `const app = express()` - Creates an Express application instance
- `app.get()` - Defines a route that responds to GET requests
- `app.listen()` - Starts the server on the specified port

See [Express routing documentation](https://expressjs.com/en/guide/routing.html) for more details on route definitions.

---

### Step 2: Run Your Server

Start the server using npm:
```bash
npm start
```

**Expected output:**
```
✅ Server running on http://localhost:3000
```

Open your browser and visit `http://localhost:3000`. You should see:
```
Hello from Express!
```

> 🎉 **Congratulations!** You've created your first Express server.

Press `Ctrl+C` (or `Cmd+C` on Mac) to stop the server.

---

### Step 3: Enable Auto-Restart with Nodemon

Instead of manually restarting the server after every code change, use nodemon:
```bash
npm run dev
```

**Expected output:**
```
[nodemon] 3.0.2
[nodemon] to restart at any time, enter `rs`
[nodemon] watching path(s): *.*
[nodemon] watching extensions: js,mjs,json
[nodemon] starting `node index.js`
✅ Server running on http://localhost:3000
```

Now when you save changes to `index.js`, the server automatically restarts!

---

### Step 4: Add Essential Middleware

Update `index.js` to include environment variables, CORS, and JSON parsing:
```javascript
import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());           // Enable CORS
app.use(express.json());   // Parse JSON bodies

// Routes
app.get("/", (req, res) => {
  res.json({ 
    message: "Welcome to the Course API",
    version: "1.0.0"
  });
});

app.get("/health", (req, res) => {
  res.json({ 
    status: "healthy",
    timestamp: new Date().toISOString()
  });
});

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
```

**Key additions:**
- `dotenv.config()` loads variables from `.env`
- `app.use(cors())` enables cross-origin requests
- `app.use(express.json())` parses incoming JSON data

> 📝 **Note:** Always import and configure `dotenv` **before** using `process.env`.

See [Express middleware guide](https://expressjs.com/en/guide/using-middleware.html) for comprehensive examples.

---

### Understanding Express Middleware

**What is middleware?** Functions that execute during the request-response cycle. They can:
- Modify the request or response objects
- End the request-response cycle
- Call the next middleware function

**Common middleware types:**
1. **Application-level:** `app.use(cors())`
2. **Built-in:** `express.json()`
3. **Third-party:** `cors`, `dotenv`
4. **Error-handling:** Catches errors in the application

---

## Section B: Setting Up Supabase

### Step 1: Create Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign in
2. Click **"New Project"**
3. Fill in the project details:
   - **Name:** `course-management`
   - **Database Password:** Create a strong password (save this!)
   - **Region:** Choose closest to you
4. Click **"Create new project"**

**Wait 2-3 minutes** for Supabase to provision your database.

---

### Step 2: Get Your API Credentials

Once your project is ready:

1. Navigate to **Settings** → **API** in the left sidebar
2. Find your **Project URL** (looks like `https://abc123.supabase.co`)
3. Find your **service_role key** under "Project API keys"

> ⚠️ **Security Warning:** The `service_role` key has full database access. **Never** expose it in frontend code or commit it to public repositories.

See [Supabase API keys documentation](https://supabase.com/docs/guides/api/api-keys) for security best practices.

---

### Step 3: Add Credentials to `.env`

Update your `.env` file with your Supabase credentials:
```env
PORT=3000
SUPABASE_URL=https://your-project-ref.supabase.co
SUPABASE_KEY=your-service-role-key-here
```

Replace the placeholder values with your actual Supabase credentials from Step 2.

---

### Step 4: Create Database Table

In the Supabase dashboard:

1. Go to **Database** → **Table Editor**
2. Click **"New Table"**
3. Configure your table:
   - **Name:** `courses`
   - **Enable Row Level Security (RLS):** Uncheck for now

4. Add columns by clicking **"Add Column"**:

| Column Name | Type | Default Value | Primary | Required |
|-------------|------|---------------|---------|----------|
| `id` | `int8` | Auto-increment | ✅ | ✅ |
| `created_at` | `timestamptz` | `now()` | | ✅ |
| `name` | `text` | | | ✅ |
| `professor` | `text` | | | |
| `department` | `text` | | | |

5. Click **"Save"**

> 📝 **Note:** We disabled RLS (Row Level Security) for simplicity. In production, enable RLS and create proper security policies. See [Supabase Row Level Security](https://supabase.com/docs/guides/auth/row-level-security).

---

## Section C: Connecting Express to Supabase

### Step 1: Initialize Supabase Client

Update your `index.js` to connect to Supabase:
```javascript
import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import { createClient } from "@supabase/supabase-js";

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize Supabase client
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

console.log("✅ Supabase client initialized");

// Routes
app.get("/", (req, res) => {
  res.json({ 
    message: "Welcome to the Course API",
    version: "1.0.0"
  });
});

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
```

**What this does:**
- `createClient()` establishes the connection to Supabase
- Environment variables keep your credentials secure
- The console log confirms successful initialization

See [Supabase JavaScript Client reference](https://supabase.com/docs/reference/javascript/initializing) for advanced configuration.

---

### Step 2: Create a Test Endpoint

Add a route to verify the Supabase connection:
```javascript
// Test Supabase connection
app.get("/api/test-connection", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("courses")
      .select("*")
      .limit(1);
    
    if (error) throw error;

    res.json({
      status: "success",
      message: "Supabase connection works!",
      data: data
    });
  } catch (err) {
    res.status(500).json({
      status: "failed",
      message: "Supabase connection failed",
      error: err.message
    });
  }
});
```

**Code breakdown:**
- `supabase.from("courses")` selects the courses table
- `.select("*")` fetches all columns
- `.limit(1)` returns only 1 row (efficient for testing)
- Error handling catches connection issues

---

### Step 3: Test Your Connection

With your server running (`npm run dev`), test the endpoint:
```bash
curl http://localhost:3000/api/test-connection
```

**Expected response (table is empty):**
```json
{
  "status": "success",
  "message": "Supabase connection works!",
  "data": []
}
```

If you see this, your Express server is successfully connected to Supabase! 🎉

---

### Step 4: Add Sample Data (Optional)

Let's add a sample course to test with real data:

1. In Supabase dashboard, go to **Table Editor**
2. Click on `courses` table
3. Click **"Insert row"**
4. Fill in:
   - **name:** `Introduction to Programming`
   - **professor:** `Dr. Smith`
   - **department:** `Computer Science`
5. Click **"Save"**

Now test again:
```bash
curl http://localhost:3000/api/test-connection
```

**Expected response (with data):**
```json
{
  "status": "success",
  "message": "Supabase connection works!",
  "data": [
    {
      "id": 1,
      "created_at": "2025-10-27T12:00:00Z",
      "name": "Introduction to Programming",
      "professor": "Dr. Smith",
      "department": "Computer Science"
    }
  ]
}
```

---

## Checkpoint

✅ You should now have:
- A fully functional Express.js server
- CORS and JSON parsing configured
- A Supabase project with a `courses` table
- Express successfully connected to Supabase
- A test endpoint that verifies the connection

---

## Troubleshooting

### Issue: `Error: Invalid Supabase URL or key`

**Cause:** Environment variables not loaded correctly.

**Solution:**
1. Verify `.env` file exists in project root
2. Check for typos in `SUPABASE_URL` and `SUPABASE_KEY`
3. Restart your server (`npm run dev`) to reload environment variables
4. Add debug logging:
```javascript
   console.log("URL:", process.env.SUPABASE_URL);
   console.log("Key exists:", !!process.env.SUPABASE_KEY);
```

### Issue: `Error: relation "courses" does not exist`

**Cause:** Table not created in Supabase.

**Solution:**
1. Go to Supabase → Database → Table Editor
2. Verify `courses` table exists
3. Check you're in the correct project
4. Refresh the Supabase dashboard

### Issue: `TypeError: Cannot read property 'from' of undefined`

**Cause:** Supabase client not initialized.

**Solution:**
1. Verify `createClient()` is called before routes
2. Check import statement: `import { createClient } from "@supabase/supabase-js"`
3. Ensure `@supabase/supabase-js` is installed: `npm list @supabase/supabase-js`

See [Supabase troubleshooting guide](https://supabase.com/docs/guides/getting-started/troubleshooting) for more solutions.

---

## Practice Exercise 1: Add Environment Validation

**Goal:** Ensure required environment variables are present before starting the server.

Add this validation at the top of your `index.js` (after `dotenv.config()`):
```javascript
if (!process.env.SUPABASE_URL || !process.env.SUPABASE_KEY) {
  console.error("❌ Missing required environment variables");
  console.error("Please check your .env file");
  process.exit(1);
}
```

**Test it:** Temporarily remove your `SUPABASE_URL` from `.env` and run the server. It should exit with an error message.

---

## Practice Exercise 2: Create a Health Check with Database Status

**Goal:** Enhance the `/health` endpoint to include database connection status.

Replace the existing `/health` route with:
```javascript
app.get("/health", async (req, res) => {
  let dbStatus = "unknown";
  
  try {
    const { error } = await supabase
      .from("courses")
      .select("id")
      .limit(1);
    
    dbStatus = error ? "error" : "connected";
  } catch (err) {
    dbStatus = "error";
  }
  
  res.json({ 
    status: "healthy",
    timestamp: new Date().toISOString(),
    database: dbStatus
  });
});
```

**Test it:**
```bash
curl http://localhost:3000/health
```

**Expected response:**
```json
{
  "status": "healthy",
  "timestamp": "2025-10-27T15:30:00.000Z",
  "database": "connected"
}
```

---

## Summary

In this section, you:
- ✅ Created an Express.js server with middleware
- ✅ Set up a Supabase project and database table
- ✅ Connected Express to Supabase using environment variables
- ✅ Built a test endpoint to verify the connection
- ✅ Learned troubleshooting techniques for common issues

**Next:** You'll implement testing and learn about what next steps you can take after 
completing this tutorial!

---

[← Part 1: Setup](part1-setup.md) | [Back to Index](Index.md) | [Part 3: Testing and next steps →](part3-testing-nextsteps.md)