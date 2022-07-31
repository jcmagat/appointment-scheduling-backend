import express from "express";
import clientController from "../controllers/client.controller";

const router = express.Router();

router.get("/:id", clientController.getClient);

router.post("/", clientController.addClient);

router
  .route("/:id/appointments")
  .get(clientController.getAppointments)
  .post(clientController.addAppointment);

export default router;
