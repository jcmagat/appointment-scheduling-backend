import { Request, Response } from "express";
import pool from "../database";

export const getProvider = async (req: Request, res: Response) => {
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

export const addProvider = async (req: Request, res: Response) => {
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
