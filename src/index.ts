import express, { Application } from "express";
import dotenv from "dotenv";
import providerRouter from "./routes/provider.routes";
import clientRouter from "./routes/client.routes";

dotenv.config();

const app: Application = express();
app.use(express.json());

// Routes
app.use("/providers", providerRouter);
app.use("/clients", clientRouter);

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
