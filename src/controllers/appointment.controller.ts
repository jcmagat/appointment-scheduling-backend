import { Request, Response } from "express";
import pool from "../database";

export const getAppointments = async (req: Request, res: Response) => {
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
};

export const addAppointment = async (req: Request, res: Response) => {
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
};
