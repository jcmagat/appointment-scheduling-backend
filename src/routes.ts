import { Application } from "express";
import { addProvider, getProvider } from "./controllers/provider.controller";
import { addClient, getClient } from "./controllers/client.controller";
import { addService, getServices } from "./controllers/service.controller";
import {
  addAppointment,
  getAppointments,
} from "./controllers/appointment.controller";

function routes(app: Application) {
  // Get a provider
  app.get("/providers/:id", getProvider);

  // Add a provider
  app.post("/providers", addProvider);

  // Get services and add a service
  app.route("/providers/:id/services").get(getServices).post(addService);

  // Add a client
  app.post("/clients", addClient);

  // Get a client
  app.get("/clients/:id", getClient);

  // Get appointments and add an appointment
  app
    .route("/clients/:id/appointments")
    .get(getAppointments)
    .post(addAppointment);
}

export default routes;
