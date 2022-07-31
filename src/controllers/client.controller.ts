import { Request, Response } from "express";
import pool from "../database";

const getClient = async (req: Request, res: Response) => {
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

const addClient = async (req: Request, res: Response) => {
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

const getAppointments = async (req: Request, res: Response) => {
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

const addAppointment = async (req: Request, res: Response) => {
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

export default { getClient, addClient, getAppointments, addAppointment };
