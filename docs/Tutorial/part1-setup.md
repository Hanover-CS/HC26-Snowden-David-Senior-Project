---
title: "Tutorial Part 1: Setup"
layout: default
---

# Part 1: Project Setup and Installation

[← Back to Index](index.md) | [Part 2: Express Server →](part2-express-supabase.md)

---

## Overview

In this section, you'll initialize a Node.js project, install the necessary dependencies, and configure your development environment for building an Express + Supabase backend.

**Time estimate:** 15 minutes

---

## Step 1: Create Your Project Directory

Open your terminal and create a new project folder:
```bash
mkdir course-api-backend
cd course-api-backend
```

**What this does:** Creates a dedicated folder for your backend code and navigates into it.

---

## Step 2: Initialize npm

Initialize a new Node.js project:
```bash
npm init -y
```

**Expected output:**
```json
{
  "name": "course-api-backend",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}
```

The `-y` flag accepts all default options. This creates a `package.json` file that tracks your project's metadata and dependencies.

> 📝 **Note:** The `package.json` file is the heart of any Node.js project. It manages dependencies, scripts, and project configuration.

---

## Step 3: Install Required Dependencies

Install the core packages needed for this tutorial:
```bash
npm install express @supabase/supabase-js cors dotenv
```

**Package breakdown:**

| Package | Purpose | Documentation |
|---------|---------|---------------|
| `express` | Web framework for building the API server | [Express Docs](https://expressjs.com/en/4x/api.html) |
| `@supabase/supabase-js` | Official Supabase client for database operations | [Supabase JS Client](https://supabase.com/docs/reference/javascript/introduction) |
| `cors` | Middleware to enable Cross-Origin Resource Sharing | [CORS Package](https://www.npmjs.com/package/cors) |
| `dotenv` | Loads environment variables from `.env` files | [Dotenv Docs](https://www.npmjs.com/package/dotenv) |

**Expected output:**
```bash
added 57 packages, and audited 58 packages in 3s
found 0 vulnerabilities
```

---

## Step 4: Install Development Dependencies

Install `nodemon` as a development dependency:
```bash
npm install --save-dev nodemon
```

**What is nodemon?** A tool that automatically restarts your server when you save code changes, making development faster and more efficient.

See the [nodemon documentation](https://nodemon.io/) for advanced configuration options.

---

## Step 5: Configure ES Modules

Edit your `package.json` to enable modern JavaScript `import` syntax:
```json
{
  "name": "course-api-backend",
  "version": "1.0.0",
  "type": "module",
  "main": "index.js",
  "scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "dependencies": {
    "@supabase/supabase-js": "^2.75.0",
    "cors": "^2.8.5",
    "dotenv": "^17.2.3",
    "express": "^4.19.2"
  },
  "devDependencies": {
    "nodemon": "^3.0.2"
  }
}
```

**Key changes:**
- Added `"type": "module"` to enable ES6 imports
- Created `start` script for production
- Created `dev` script for development with auto-restart

> ⚠️ **Important:** The `"type": "module"` setting allows you to use `import` instead of `require()`. This is the modern JavaScript standard.

---

## Step 6: Create Environment Variables File

Create a `.env` file in your project root:
```bash
touch .env
```

Add the following content to `.env`:
```env
PORT=3000
SUPABASE_URL=your-supabase-url-here
SUPABASE_KEY=your-supabase-key-here
```

**Placeholder values:** We'll fill in the actual Supabase credentials in [Part 3](part3-supabase-connection.md#step-2-get-your-api-credentials).

---

## Step 7: Create `.gitignore`

Create a `.gitignore` file to prevent sensitive files from being committed to version control:
```bash
echo "node_modules/
.env
.DS_Store" > .gitignore
```

**Why this matters:** The `.env` file contains sensitive API keys that should **never** be committed to GitHub. The `.gitignore` file ensures this.

See [Git documentation on .gitignore](https://git-scm.com/docs/gitignore) for more patterns.

---
## Next Up!

[← Back to Index](index.md) | [Part 2: Express & Supabase →](part2-express-supabase.md)

---