import express, { Request, Response } from "express";
import * as dotenv from "dotenv";
import router from "./routes/apiRoutes";

const app = express();
dotenv.config();

// you need to set mergeParams: true on the router,
// if you want to access params from the parent router
//const itemRouter = express.Router({ mergeParams: true });

app.use(express.json());
express.urlencoded({ extended: true, limit: "5000kb" });

app.use("/api", router);

export default app;
