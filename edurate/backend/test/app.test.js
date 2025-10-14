import request from "supertest";
import express from "express";

const app = express();
app.get("/", (req, res) => res.send("Hello from EduRate backend!"));

test("GET / returns Hello message", async () => {
  const res = await request(app).get("/");
  expect(res.statusCode).toBe(200);
  expect(res.text).toMatch(/EduRate/);
});