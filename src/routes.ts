import express, { Application, Request, Response } from "express";
import pool from "./database";

function routes(app: Application) {
  app.get("/", (req: Request, res: Response) => {
    res.send("Hello world!");
  });

  // Add a provider
  app.post("/providers", async (req: Request, res: Response) => {
    const name = req.body.name;

    const query = await pool.query(
      "INSERT INTO provider (provider_name) VALUES ($1) RETURNING *",
      [name]
    );

    res.send(query.rows[0]);
  });

  // Get a provider
  app.get("/providers/:id", async (req: Request, res: Response) => {
    const provider_id = req.params.id;

    const query = await pool.query(
      "SELECT * FROM provider WHERE provider_id = ($1)",
      [provider_id]
    );

    res.send(query.rows[0]);
  });

  // Get and add a service
  app
    .route("/providers/:id/services")
    .get(async (req: Request, res: Response) => {
      const provider_id = req.params.id;

      const query = await pool.query(
        "SELECT * FROM service WHERE provider_id = ($1)",
        [provider_id]
      );

      res.send(query.rows);
    })
    .post(async (req: Request, res: Response) => {
      const { name, providerId, price } = req.body;

      const query = await pool.query(
        "INSERT INTO service (service_name, provider_id, price) VALUES ($1, $2, $3) RETURNING *",
        [name, providerId, price]
      );

      res.send(query.rows[0]);
    });
}

export default routes;
