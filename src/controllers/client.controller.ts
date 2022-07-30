import { Request, Response } from "express";
import pool from "../database";

export const getClient = async (req: Request, res: Response) => {
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
};

export const addClient = async (req: Request, res: Response) => {
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
};
