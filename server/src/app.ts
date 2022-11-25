import express, { Request, Response } from "express";
import * as dotenv from "dotenv";
import router from "./routes/apiRoutes";

const app = express();

app.use(express.json());
express.urlencoded({ extended: true, limit: "1000kb" });

dotenv.config();

app.use(router);

app.get("/", (req: Request, res: Response) => {
  res.json({ hello: "uuuuuu" });
});

app.use((req: Request, res: Response) => {
  res.json({ status: "Error", message: "There is no API endpoint" });
});

export default app;
