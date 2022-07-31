import { Request, Response } from "express";
import pool from "../database";

const getProvider = async (req: Request, res: Response) => {
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
};

const addProvider = async (req: Request, res: Response) => {
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
};

const getServices = async (req: Request, res: Response) => {
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

const addService = async (req: Request, res: Response) => {
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

export default { getProvider, addProvider, getServices, addService };
