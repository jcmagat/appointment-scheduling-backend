import express, { Application, Request, Response } from "express";
import dotenv from "dotenv";
import routes from "./routes";

dotenv.config();

const app: Application = express();
app.use(express.json());

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);

  routes(app);
});
