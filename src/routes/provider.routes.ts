import express from "express";
import providerController from "../controllers/provider.controller";

const router = express.Router();

router.get("/:id", providerController.getProvider);

router.post("/", providerController.addProvider);

router
  .route("/:id/services")
  .get(providerController.getServices)
  .post(providerController.addService);

router.get("/:id/appointments", providerController.getAppointments);

export default router;
