import { Request, Response } from "express";
import pool from "../database";

export const getServices = async (req: Request, res: Response) => {
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
};

export const addService = async (req: Request, res: Response) => {
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
};
