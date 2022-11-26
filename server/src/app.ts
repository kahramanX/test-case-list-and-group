import express, { Request, Response } from "express";
import * as dotenv from "dotenv";
import router from "./routes/apiRoutes";

const app = express();
dotenv.config();

// THIS CODE FIX THAT CORS ERROR
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

app.use("/api", router);

// Test
/* import MemberModel from "./models/MemberSchema";
import GroupModel from "./models/GroupSchema";

app.get("/test/:id", (req: Request, res: Response) => {
  MemberModel.findOne({ _id: req.params.id })
    .populate("group ") // key to populate
    .exec()
    .then((user: any) => {
      console.log(user);
      res.json(user);
    });
}); */

export default app;
