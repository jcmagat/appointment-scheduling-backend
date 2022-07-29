import { Application, Request, Response } from "express";
import pool from "./database";

function routes(app: Application) {
  app.get("/", (req: Request, res: Response) => {
    res.send("Hello world!");
  });

  // Add a provider
  app.post("/providers", async (req: Request, res: Response) => {
    const name = req.body.name;

    try {
      const query = await pool.query(
        "INSERT INTO provider (provider_name) VALUES ($1) RETURNING *",
        [name]
      );

      res.send(query.rows[0]);
    } catch (error: any) {
      res.status(500).send({
        error: error.message,
      });
    }
  });

  // Get a provider
  app.get("/providers/:id", async (req: Request, res: Response) => {
    const provider_id = req.params.id;

    try {
      const query = await pool.query(
        "SELECT * FROM provider WHERE provider_id = ($1)",
        [provider_id]
      );

      res.send(query.rows[0]);
    } catch (error: any) {
      res.status(500).send({
        error: error.message,
      });
    }
  });

  // Get services and add a service
  app
    .route("/providers/:id/services")
    .get(async (req: Request, res: Response) => {
      const providerId = req.params.id;

      try {
        const query = await pool.query(
          "SELECT * FROM service WHERE provider_id = ($1)",
          [providerId]
        );

        res.send(query.rows);
      } catch (error: any) {
        res.status(500).send({
          error: error.message,
        });
      }
    })
    .post(async (req: Request, res: Response) => {
      const providerId = req.params.id;
      const { name, price, duration } = req.body;

      try {
        const query = await pool.query(
          `INSERT INTO service (provider_id, service_name, price, duration)
          VALUES ($1, $2, $3, $4)
          RETURNING *`,
          [providerId, name, price, duration]
        );

        res.send(query.rows[0]);
      } catch (error: any) {
        res.status(500).send({
          error: error.message,
        });
      }
    });

  // Add a client
  app.post("/clients", async (req: Request, res: Response) => {
    const { firstName, lastName, phone } = req.body;

    try {
      const query = await pool.query(
        "INSERT INTO client (first_name, last_name, phone) VALUES ($1, $2, $3) RETURNING *",
        [firstName, lastName, phone]
      );

      res.send(query.rows[0]);
    } catch (error: any) {
      // console.log(e);

      res.status(500).send({
        error: error.message,
      });
    }
  });

  // Get a client
  app.get("/clients/:id", async (req: Request, res: Response) => {
    const clientId = req.params.id;

    try {
      const query = await pool.query(
        "SELECT * FROM client WHERE client_id = ($1)",
        [clientId]
      );

      res.send(query.rows[0]);
    } catch (error: any) {
      res.status(500).send({
        error: error.message,
      });
    }
  });

  // Get appointments and add an appointment
  app
    .route("/clients/:id/appointments")
    .get(async (req: Request, res: Response) => {
      const clientId = req.params.id;

      try {
        const query = await pool.query(
          "SELECT * FROM appointment WHERE client_id = ($1)",
          [clientId]
        );

        res.send(query.rows);
      } catch (error: any) {
        res.status(500).send({
          error: error.message,
        });
      }
    })
    .post(async (req: Request, res: Response) => {
      const clientId = req.params.id;
      const { serviceId, date, time } = req.body;

      try {
        const query = await pool.query(
          `INSERT INTO appointment (client_id, service_id, appointment_date, appointment_time)
          VALUES ($1, $2, $3, $4)
          RETURNING *`,
          [clientId, serviceId, date, time]
        );

        res.send(query.rows[0]);
      } catch (error: any) {
        res.status(500).send({
          error: error.message,
        });
      }
    });
}

export default routes;
