import express, { Request, Response } from "express";
import * as dotenv from "dotenv";
import router from "./routes/apiRoutes";

const app = express();
dotenv.config();

app.use(express.json());
express.urlencoded({ extended: true, limit: "5000kb" });

// THIS CODE FIX THAT CORS ERROR
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

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
