import express, { Request, Response } from "express";
import * as dotenv from "dotenv";
import router from "./routes/apiRoutes";

const app = express();
dotenv.config();

app.use(express.json());
express.urlencoded({ extended: true, limit: "1000kb" });

app.use(router);

app.get("/", (req: Request, res: Response) => {
  console.log(req.body);
  res.json({ hello: "uuuuuu" });
});

app.post("/", (req: Request, res: Response) => {
  console.log("post işlemi");
  console.log(req.body);

  res.send(req.body);
});

export default app;
