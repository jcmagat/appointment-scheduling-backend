import express, { Application, Request, Response } from "express";
import dotenv from "dotenv";
import pool from "./database";

dotenv.config();

const app: Application = express();
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello world!");
});

app.post("/provider", async (req: Request, res: Response) => {
  const name = req.body.name;

  const query = await pool.query(
    "INSERT INTO provider (provider_name) VALUES ($1) RETURNING *",
    [name]
  );

  res.send(query.rows[0]);
});

const port = process.env.PORT;

app.listen(port, () => console.log(`Listening on port ${port}...`));
